import React, { useState } from 'react';

function Tile() {
    const [hasShip, setHasShip] = useState(false); // If a ship was placed in it
    const [hasBeenShot, setHasBeenShot] = useState(false); // If the tile was shot

    // Method to place a ship on the tile
    function placeShip() {
        setHasShip(true);
    }

    // Method to shoot the tile
    function shootTile() {
        setHasBeenShot(true);
    }

    let tileStatus = 'Empty';
    if (hasBeenShot) {
        tileStatus = hasShip ? 'Hit' : 'Miss';
    }
    
    return (
        <div className={`tile ${tileStatus}`}>
        </div>
    );
}

export default Tile;
