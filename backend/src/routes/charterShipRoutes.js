const express = require('express');
const crypto = require('crypto');
const db = require('../db/db');
const router = express.Router();

router.get('/newGame', async (req, res) => {
    try {
        //Generate two 6-character PINs
        const pin1 = crypto.randomBytes(3).toString('hex');
        const pin2 = crypto.randomBytes(3).toString('hex');

        //Insert a new game into the database
        const result = await db.query(
            'INSERT INTO games (pin1, pin2, player1_board, player2_board) VALUES ($1, $2, $3, $4) RETURNING id',
            [pin1, pin2, null, null]
        );

        // Send the PINs back to the client
        res.json({
            pin1: pin1,
            pin2: pin2
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


module.exports = router;
