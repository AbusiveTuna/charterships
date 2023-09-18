import React from 'react';
import { useParams } from 'react-router-dom';

const SetupPage = () => {
    const { boardPin } = useParams();

    return (
        <div>
            <h1>Setup Page</h1>
            <p>This is the setup page for board with PIN: {boardPin}</p>
        </div>
    );
};

export default SetupPage;
