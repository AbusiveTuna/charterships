import React from 'react';
import { useParams } from 'react-router-dom';

const GamePage = () => {
    const { gamePin } = useParams();

    return (
        <div>
            <h1>Game Page</h1>
            <p>This is the game page for game with PIN: {gamePin}</p>
        </div>
    );
};

export default GamePage;
