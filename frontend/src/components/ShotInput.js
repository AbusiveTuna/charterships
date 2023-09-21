import React, { useState } from 'react';
import './css/ShotInput.css';

function ShotInput() {
    const [tile, setTile] = useState('');
    const [activationCode, setActivationCode] = useState('');

    const handleFire = () => {
        // Handle the fire event here
    };

    return (
        <div className="shot-input">
            <label>
                Tile to shoot:
                <input type="text" value={tile} onChange={e => setTile(e.target.value)} />
            </label>
            <label>
                Activation Code:
                <input type="text" value={activationCode} onChange={e => setActivationCode(e.target.value)} />
            </label>
            <button onClick={handleFire}>Fire!</button>
        </div>
    );
}

export default ShotInput;
