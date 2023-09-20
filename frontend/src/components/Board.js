import React, { useState } from 'react';
import Tile from './Tile';
import './css/Board.css';

function Board({ shipImages, ships, setShips, moveShip }) {

    const locations = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].flatMap(letter => Array.from({length: 10}, (_, i) => letter + (i + 1)));

    const [shipPlacements, setShipPlacements] = useState({});

    const placeShip = (location, length, rotation) => {
        const letter = location[0];
        const number = parseInt(location.slice(1));
    
        // Check if the ship would go off the board
        let shipLocations;
        if (rotation === 'horizontal') {
            // Check if the ship would go off the board horizontally
            if (number + length > 11) {
                return;
            }
            shipLocations = Array.from({length}, (_, i) => letter + (number + i));
        } else {
            // Check if the ship would go off the board vertically
            if (letter.charCodeAt(0) - 64 + length > 11) {
                return;
            }
            shipLocations = Array.from({length}, (_, i) => String.fromCharCode(letter.charCodeAt(0) + i) + number);
        }
    
        // Check if any of the ship's locations are already occupied
        for (const loc of shipLocations) {
            if (shipPlacements[loc]) {
                return;  // If a location is occupied, don't place the ship and exit the function
            }
        }
    
        setShipPlacements(prevPlacements => {
            const newPlacements = {...prevPlacements};
            for (const loc of shipLocations) {
                newPlacements[loc] = length;
            }
            return newPlacements;
        });
    
        setShips(prevShips => ({
            ...prevShips,
            [length]: { ...prevShips[length], placed: true }
        }));
    };
    

    return (
        <div className="board">
            <div className="label"></div>
            {Array.from({length: 10}, (_, i) => i + 1).map(number => <div key={number} className="label">{number}</div>)}
            {locations.map((location, index) => (
                <React.Fragment key={location}>
                    {index % 10 === 0 && <div className="label">{location[0]}</div>}
                    <Tile 
                        location={location} 
                        hasShip={shipPlacements[location]} 
                        placeShip={placeShip} 
                        moveShip={moveShip} 
                        shipImage={shipImages[shipPlacements[location]]}
                        shipPlacements={shipPlacements}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

export default Board;
