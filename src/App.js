import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
