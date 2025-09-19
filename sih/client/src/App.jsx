import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Destinations from './pages/Destinations';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/explore" element={<div className="container mx-auto p-8">Explore Page</div>} />
          <Route path="/learn-more" element={<div className="container mx-auto p-8">Learn More Page</div>} />
          <Route path="/about" element={<div className="container mx-auto p-8">About Page</div>} />
          <Route path="/services" element={<div className="container mx-auto p-8">Services Page</div>} />
          <Route path="/contact" element={<div className="container mx-auto p-8">Contact Page</div>} />
          <Route path="/signup" element={<div className="container mx-auto p-8">Sign Up Page</div>} />
            <Route path="/destinations" element={<Destinations />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
