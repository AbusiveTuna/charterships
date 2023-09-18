const express = require('express');
const crypto = require('crypto');
const db = require('../db/db');
const router = express.Router();

router.get('/newGame', async (req, res) => {
    try {
        //Get game name from request
        const gameName = req.query.gameName;

        //Check game name for malicious characters or SQL injection
        if (!gameName || gameName.length > 24 || !/^[a-zA-Z0-9-_ ]*$/.test(gameName)) {
            return res.status(400).send('Invalid game name');
        }

        //Generate two 6-character PINs
        const pin1 = crypto.randomBytes(3).toString('hex');
        const pin2 = crypto.randomBytes(3).toString('hex');

        //Generate 200 8-character codes
        const codes = Array.from({length: 200}, () => crypto.randomBytes(4).toString('hex'));

        //Convert array of codes to comma-separated string
        const codesString = codes.join(',');

        //Insert a new game into the database
        const result = await db.query(
            'INSERT INTO games (game_name, pin1, pin2, player1_board, player2_board, codes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [gameName, pin1, pin2, null, null, codesString]
        );

        // Send the PINs and codes back to the client
        res.json({
            gameName: gameName,
            pin1: pin1,
            pin2: pin2,
            codes: codes
        });
    } catch (err) {
        res.status(500).send('Error creating game');
    }
});


router.put('/placeShips', async (req, res) => {
    try {
        // Extract the pin and board from the request body
        const { pin, board } = req.body;

        // Update the game in the database
        const result = await db.query(
            `UPDATE games 
             SET player1_board = CASE WHEN pin1 = $1 THEN $2 ELSE player1_board END,
                 player2_board = CASE WHEN pin2 = $1 THEN $2 ELSE player2_board END
             WHERE pin1 = $1 OR pin2 = $1`,
            [pin, board]
        );

        // Send a success message back to the client
        res.json({ message: 'Game updated successfully' });
    } catch (err) {
        console.error('Error updating game', err);
        res.status(500).send('Error updating game');
    }
});

router.post('/fireShot', async (req, res) => {
    try {
        // Get data from request
        const { gameName, board, tile, code } = req.body;

        // Check code for validity and malicious characters
        if (!code || code.length !== 8 || !/^[a-zA-Z0-9]*$/.test(code)) {
            return res.status(400).send('Invalid code');
        }

        // Query the database by game name
        const result = await db.query(
            'SELECT * FROM games WHERE game_name = $1',
            [gameName]
        );

        const game = result.rows[0];

        // Check if the code is valid
        if (!game.codes.split(',').includes(code)) {
            return res.status(400).send('Invalid code');
        }

        // Parse the board
        const boardData = JSON.parse(game[board]);

        // Check if the tile is already marked
        if (boardData[tile]) {
            return res.status(400).send('Tile already marked');
        }

        // Mark the tile and check for a hit or miss
        const isHit = checkForHit(tile); // You'll need to implement this function

        boardData[tile] = isHit ? 'hit' : 'miss';

        // Update the board in the database
        await db.query(
            `UPDATE games SET ${board} = $1 WHERE game_name = $2`,
            [JSON.stringify(boardData), gameName]
        );

        // Send back whether it was a hit or miss
        res.json({ result: isHit ? 'hit' : 'miss' });
    } catch (err) {
        res.status(500).send('Error firing shot');
    }
});


module.exports = router;
