import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const GameDetailsPage = () => {
    const location = useLocation();
    const { gameName, pin1, pin2, codes } = location.state;
    const { gamePin } = useParams();
    
    return (
        <div className="game-page">
            <h1>{gameName}</h1>
            <p>PIN 1: {pin1}</p>
            <p>PIN 2: {pin2}</p>
            <h2>Codes:</h2>
            <textarea readOnly value={codes.join('\n')} />
        </div>
    );
};

export default GameDetailsPage;
