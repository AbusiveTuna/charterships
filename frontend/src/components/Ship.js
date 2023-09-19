import React, { useState } from 'react';

function Ship({ length, shipImage }) {
    const [locations, setLocations] = useState([]);
    const [hits, setHits] = useState(Array(length).fill(false));

    // Method to place the ship at certain locations
    const place = (newLocations) => {
        if (newLocations.length !== length) {
            throw new Error('Invalid locations for ship placement');
        }
        setLocations(newLocations);
    };

    // Method to check if the ship has been hit
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

    // Method to check if the ship has been sunk
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
