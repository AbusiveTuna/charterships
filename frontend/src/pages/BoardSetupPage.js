import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../components/Board';
import DraggableShip from '../components/Ship'; 
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="setup-page">
                <h1>Setup Page</h1>
                <p>This is the setup page for board with PIN: {boardPin}</p>
                <div className="board-container">
                    <div className="board">
                        <Board shipImages={shipImages} /> {}
                    </div>
                    <div className="ships">
                        <DraggableShip length={2} shipImage={shipImage} />
                        <DraggableShip length={3} shipImage={shipImage1} />
                        <DraggableShip length={3} shipImage={shipImage1} />
                        <DraggableShip length={4} shipImage={shipImage2} />
                        <DraggableShip length={5} shipImage={shipImage} />
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default SetupPage;
