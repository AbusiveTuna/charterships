import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNewGame = async () => {
        // Call your API to create a new game
        const response = await fetch('/newGame');
        const data = await response.json();

        // Navigate to the game page with the PINs
        navigate(`/game/`);
    };

    return (
        <div className="landing-page">
            <h1>Charter Ships</h1>
            <p>Welcome to Charter Ships, a fun and engaging online Battleship game. To get started, click the "Create New Game" button below.</p>
            <button onClick={handleNewGame}>Create New Game</button>
        </div>
    );
};

export default LandingPage;
