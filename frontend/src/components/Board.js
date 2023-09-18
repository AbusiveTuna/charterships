import React from 'react';
import Tile from './Tile';
import './css/Board.css';

function Board() {
    // Create an array of tile locations
    const locations = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].flatMap(letter => Array.from({length: 10}, (_, i) => letter + (i + 1)));

    return (
        <div className="board">
            <div className="label"></div>
            {Array.from({length: 10}, (_, i) => i + 1).map(number => <div key={number} className="label">{number}</div>)}
            {locations.map((location, index) => (
                <React.Fragment key={location}>
                    {index % 10 === 0 && <div className="label">{location[0]}</div>}
                    <Tile location={location} />
                </React.Fragment>
            ))}
        </div>
    );
}

export default Board;
