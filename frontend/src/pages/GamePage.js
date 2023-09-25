import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Board from '../components/Board';
import ShotInput from '../components/ShotInput';
import './css/GamePage.css';
import shipImage from '../assets/testShip.png';
import shipImage1 from '../assets/testShip1.png';
import shipImage2 from '../assets/testShip2.png';

const GamePage = () => {
    // Initialize the states for both boards
    const { gamePin } = useParams();
    const [error, setError] = useState(null);
    const [shipPlacements1, setShipPlacements1] = React.useState({});
    const [shipPlacements2, setShipPlacements2] = React.useState({});
    const [team1Name, setTeam1Name] = useState('Team 1');
    const [team2Name, setTeam2Name] = useState('Team 2');
    const [teamBoards, setTeamBoards] = useState(['Team 1', 'Team 2']);

    const shipImages = { // Define your ship images
        2: shipImage,
        3: shipImage1,
        4: shipImage2,
        5: shipImage
    };

    useEffect(() => {
        axios.get(`/replaceMeLater/${gamePin}`)
            .then(response => {
                const { team1Name, team2Name, shipPlacements1, shipPlacements2 } = response.data;
                setTeam1Name(team1Name);
                setTeam2Name(team2Name);
                setShipPlacements1(shipPlacements1);
                setShipPlacements2(shipPlacements2);
                setTeamBoards([team1Name, team2Name]);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError('Game not found');
            });
    }, [gamePin]);

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="game-page">
            <div className="team-board">
            <h2>{team1Name}</h2>
                <Board shipImages={shipImages} shipPlacements={shipPlacements1} setShipPlacements={setShipPlacements1} isSetUp={true} />
            </div>
            <div className="team-board">
            <h2>{team2Name}</h2>
                <Board shipImages={shipImages} shipPlacements={shipPlacements2} setShipPlacements={setShipPlacements2} isSetUp={true} />
            </div>
            <div className="shot-input"> 
                <ShotInput teamBoards={teamBoards}></ShotInput> 
            </div>
            <div className="buffer"></div>
        </div>
    );
};

export default GamePage;
