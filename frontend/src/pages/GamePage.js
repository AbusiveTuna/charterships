import React from 'react';
import Board from '../components/Board';
import ShotInput from '../components/ShotInput';
import './css/GamePage.css';
import shipImage from '../assets/testShip.png';
import shipImage1 from '../assets/testShip1.png';
import shipImage2 from '../assets/testShip2.png';

const GamePage = () => {
    // Initialize the states for both boards
    const [shipPlacements1, setShipPlacements1] = React.useState({});
    const [shipPlacements2, setShipPlacements2] = React.useState({});

    const shipImages = { // Define your ship images
        2: shipImage,
        3: shipImage1,
        4: shipImage2,
        5: shipImage
    };

    return (
        <div className="game-page">
            <div className="team-board">
                <h2>Team 1</h2>
                <Board shipImages={shipImages} shipPlacements={shipPlacements1} setShipPlacements={setShipPlacements1} isSetUp={true} />
            </div>
            <div className="team-board">
                <h2>Team 2</h2>
                <Board shipImages={shipImages} shipPlacements={shipPlacements2} setShipPlacements={setShipPlacements2} isSetUp={true} />
            </div>
            <div className="shot-input"> 
                <ShotInput></ShotInput>
            </div>
            <div className="buffer"></div>
        </div>
    );
};

export default GamePage;
