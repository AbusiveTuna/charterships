import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: {
                board: Array(100).fill(null),
                ships: []
            },
            player2: {
                board: Array(100).fill(null),
                ships: []
            },
            phase: 'setup' // 'setup' or 'play'
        };
    }

    // Method to start the play phase
    startPlay() {
        this.setState({ phase: 'play' });
    }

    render() {
        const { player1, player2, phase } = this.state;

        return (
            <div>
                <h1>Battleship Game</h1>
                <h2>{phase.charAt(0).toUpperCase() + phase.slice(1)} Phase</h2>
                {phase === 'setup' && <button onClick={() => this.startPlay()}>Start Play</button>}
                <Board tiles={player1.board} />
                <Board tiles={player2.board} />
            </div>
        );
    }
}

export default Game;
