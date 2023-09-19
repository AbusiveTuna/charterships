import React from 'react';
import { useDrop } from 'react-dnd';
import './css/DroppableTile.css';

function DroppableTile({ location, hasShip, placeShip, shipImage, shipPlacements }) { // Add shipImage prop
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'ship',
        drop: (item) => placeShip(location, item.length),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    let tileStatus = 'Empty';
    if (hasShip) {
        tileStatus = 'HasShip';
    }

    // Calculate the background position
    const number = parseInt(location.slice(1));
    const shipStart = Object.keys(shipPlacements).find(key => shipPlacements[key] === hasShip);
    const position = shipStart ? (number - parseInt(shipStart.slice(1))) * 100 : 0;

    // Set the background image style
    const style = hasShip ? { backgroundImage: `url(${shipImage})`, backgroundPosition: `${position}% 0` } : {};

    return (
        <div 
            className={`tile ${tileStatus} ${isOver ? 'Over' : ''} ${canDrop ? 'CanDrop' : ''}`} 
            ref={drop}
            style={style} // Apply the style here
        >
            {/* Display a ship here if this tile has a ship */}
            {hasShip && <img src={shipImage} alt="Ship" style={{ width: '100%', height: '100%', visibility: 'hidden' }} />} {/* Hide the img element */}
        </div>
    );
}

export default DroppableTile;