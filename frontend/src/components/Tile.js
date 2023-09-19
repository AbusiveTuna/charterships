import React from 'react';
import { useDrop } from 'react-dnd';

function Tile({ location, hasShip, placeShip }) {
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

    return (
        <div 
            className={`tile ${tileStatus} ${isOver ? 'Over' : ''} ${canDrop ? 'CanDrop' : ''}`} 
            ref={drop}
        >
            {}
        </div>
    );
}

export default Tile;
