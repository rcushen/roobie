import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import ResultsPage from './components/pages/ResultsPage';
import AboutPage from './components/pages/AboutPage';
import ContactUsPage from './components/pages/ContactUsPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
      </Routes>
    </div>
  );
}

export default App;
