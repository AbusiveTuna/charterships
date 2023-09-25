import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GameDetailsPage from './pages/GameDetailsPage';
import GamePage from './pages/GamePage';
import BoardSetupPage from './pages/BoardSetupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/newGameDetails/:gamePin" element={<GameDetailsPage />} />
        <Route path="/game/:gamePin" element={<GamePage />} />
        <Route path="/setup/:boardPin" element={<BoardSetupPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
