import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ThankYou from './pages/ThankYou';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/bye" element={<ThankYou />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;