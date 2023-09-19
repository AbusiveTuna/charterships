import React, { useState } from 'react';
import DroppableTile from './DroppableTile';
import './css/Board.css';

function Board({ shipImages }) { 

    const locations = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].flatMap(letter => Array.from({length: 10}, (_, i) => letter + (i + 1)));

    const [shipPlacements, setShipPlacements] = useState({});

    const placeShip = (location, length) => {
        const letter = location[0];
        const number = parseInt(location.slice(1));

        //Check if the ship would go off the board
        if (number + length > 11) {
            return;
        }

        //Create an array of locations for this ship
        const shipLocations = Array.from({length}, (_, i) => letter + (number + i));

        setShipPlacements(prevPlacements => {
            const newPlacements = {...prevPlacements};
            for (const loc of shipLocations) {
                newPlacements[loc] = length;
            }
            return newPlacements;
        });
    };

    return (
        <div className="board">
            <div className="label"></div>
            {Array.from({length: 10}, (_, i) => i + 1).map(number => <div key={number} className="label">{number}</div>)}
            {locations.map((location, index) => (
                <React.Fragment key={location}>
                    {index % 10 === 0 && <div className="label">{location[0]}</div>}
                    <DroppableTile 
                        location={location} 
                        hasShip={shipPlacements[location]} 
                        placeShip={placeShip} 
                        shipImage={shipImages[shipPlacements[location]]}
                        shipPlacements={shipPlacements}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}

export default Board;
