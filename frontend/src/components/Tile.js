import React from 'react';
import { useDrop } from 'react-dnd';
import './css/Tile.css';

function Tile({ location, hasShip, placeShip, shipImage, shipPlacements, isDraggable }) { 
    const [{ isOver, canDrop }, drop] = isDraggable ? useDrop({ 
        accept: 'ship',
        drop: (item) => placeShip(location, item.length, item.rotation),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }) : [{}, null];

    let tileStatus = 'Empty';
    if (hasShip) {
        tileStatus = 'HasShip';
    }
    const number = parseInt(location.slice(1));
    const shipStart = Object.keys(shipPlacements).find(key => shipPlacements[key] === hasShip);
    const position = shipStart ? (number - parseInt(shipStart.slice(1))) * 100 : 0;

    const style = hasShip ? { backgroundImage: `url(${shipImage})`, backgroundPosition: `${position}% 0` } : {};

    return (
        <div 
            className={`tile ${tileStatus} ${isOver ? 'Over' : ''} ${canDrop ? 'CanDrop' : ''}`} 
            ref={drop}
            style={style}
        >
            {}
            {hasShip && <img src={shipImage} alt="Ship" style={{ width: '100%', height: '100%', visibility: 'hidden' }} />} {}
        </div>
    );
}

export default Tile;
