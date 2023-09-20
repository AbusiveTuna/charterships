import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../components/Board';
import Ship from '../components/Ship'; 
import shipImage from '../assets/testShip.png';
import shipImage1 from '../assets/testShip1.png';
import shipImage2 from '../assets/testShip2.png';
import './css/BoardSetupPage.css';

const SetupPage = () => {
    const { boardPin } = useParams();

    const shipImages = {
        2: shipImage,
        3: shipImage1,
        4: shipImage2,
        5: shipImage
    };

    const [ships, setShips] = useState({
        2: { length: 2, placed: false },
        3: { length: 3, placed: false },
        4: { length: 4, placed: false },
        5: { length: 5, placed: false }
    });

    const [shipPlacements, setShipPlacements] = useState({});

    const moveShip = (fromLocation, toLocation) => {
        setShips(prevShips => {
            const shipLength = shipPlacements[fromLocation];
            const newShips = {...prevShips};
            newShips[shipLength].placed = false;
            return newShips;
        });
    
        setShipPlacements(prevPlacements => {
            const newPlacements = {...prevPlacements};
            delete newPlacements[fromLocation];
            newPlacements[toLocation] = shipPlacements[fromLocation];
            return newPlacements;
        });
    };
    
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="setup-page">
                <h1>Setup Page</h1>
                <p>This is the setup page for board with PIN: {boardPin}</p>
                <div className="board-container">
                    <div className="board">
                    <Board shipImages={shipImages} ships={ships} setShips={setShips} moveShip={moveShip} shipPlacements={shipPlacements} setShipPlacements={setShipPlacements} />
                    </div>
                    <div className="ships">
                        <Ship length={2} shipImage={shipImage} ships={ships} setShips={setShips} />
                        <Ship length={3} shipImage={shipImage1} ships={ships} setShips={setShips} />
                        <Ship length={3} shipImage={shipImage1} ships={ships} setShips={setShips} />
                        <Ship length={4} shipImage={shipImage2} ships={ships} setShips={setShips} />
                        <Ship length={5} shipImage={shipImage} ships={ships} setShips={setShips} />
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default SetupPage;

//TODO 5 unique ship images that look better.
//TODO Submit button that saves locations to the DB
//TODO a way to load boards when the game is hit from the game link
//TODO shooting pieces based on codes
//TODO Detecting when a game is over.