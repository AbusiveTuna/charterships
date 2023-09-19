import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const [gameName, setGameName] = useState('');
    const [error, setError] = useState('');

    const handleNewGame = async () => {
        if (!gameName || gameName.length > 24 || !/^[a-zA-Z0-9-_ ]*$/.test(gameName)) {
            setError('Invalid game name. Please enter a game name that is no larger than 24 characters and does not contain any non alphanumeric characters.');
            return;
        }

        // Fix API call once AWS is setup.
        const response = await fetch(`/newGame?gameName=${gameName}`);
        const data = await response.json();

        const pins = data.pin1 + data.pin2;

        navigate(`/newGameDetails/${pins}`, { state: data });
    };

    return (
        <div className="landing-page">
            <h1>Charter Ships</h1>
            <p>Welcome to Charter Ships, a fun and engaging online Battleship game. To get started, enter a game name and click the "Create New Game" button below.</p>
            <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} placeholder="Enter game name" />
            {error && <p>{error}</p>}
            <button onClick={handleNewGame}>Create New Game</button>
        </div>
    );
};

export default LandingPage;
