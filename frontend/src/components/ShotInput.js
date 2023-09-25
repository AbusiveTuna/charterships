import React, { useState } from 'react';
import axios from 'axios';
import './css/ShotInput.css';

function ShotInput( {teamBoards} ) {
    const [tile, setTile] = useState('');
    const [activationCode, setActivationCode] = useState('');
    const [selectedBoard, setSelectedBoard] = useState(teamBoards[0]); // default to first team board
    //TODO:
    //Limit both inputs to only certain characters/whatever size.
    //Fix CSS
    //Configure AWS and get these calls setup.
    const handleFire = () => {
        const endpoint = '/replaceMeLater';

        const data = {
            tile: tile,
            activationCode: activationCode,
            teamBoard: selectedBoard
        };

        axios.post(endpoint, data)
        .then(response => {
            const { status, tile } = response.data;
            if (status === 'hit') {
                // Update the specific tile on your board
                if (selectedBoard === teamBoards[0]) {
                    setShipPlacements1(prevState => ({ ...prevState, [tile]: 'hit' }));
                } else {
                    setShipPlacements2(prevState => ({ ...prevState, [tile]: 'hit' }));
                }
            }
            alert(`You ${status} a ship at ${tile}!`);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div className="shot-input">
            <label>
                Tile to shoot:
                <input type="text" value={tile} onChange={e => setTile(e.target.value)} />
            </label>
            <label>
                Activation Code:
                <input type="text" value={activationCode} onChange={e => setActivationCode(e.target.value)} />
            </label>
            <label>
                Team Board:
                <select value={selectedBoard} onChange={e => setSelectedBoard(e.target.value)}>
                    {teamBoards.map((board, index) => (
                        <option key={index} value={board}>{board}</option>
                    ))}
                </select>
            </label>
            <button onClick={handleFire}>Fire!</button>
        </div>
    );
}

export default ShotInput;
