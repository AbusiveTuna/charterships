import React, { useState } from 'react';

function Ship({ length, shipImage }) {
    const [locations, setLocations] = useState([]);
    const [hits, setHits] = useState(Array(length).fill(false));

    const checkHit = (location) => {
        const index = locations.indexOf(location);
        if (index > -1) {
            setHits(prevHits => {
                const newHits = [...prevHits];
                newHits[index] = true;
                return newHits;
            });
            return true;
        }
        return false;
    };

    const isSunk = () => {
        return hits.every(hit => hit);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('shipLength', length);
    };

    return (
        <img 
            src={shipImage} 
            alt="Ship" 
            draggable 
            onDragStart={handleDragStart} 
            style={{ width: `${length * 50}px`, height: '50px' }} // Adjust size as necessary
        />
    );
}

export default Ship;
