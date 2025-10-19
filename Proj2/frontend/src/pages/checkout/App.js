import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OrderOptions from './components/OrderOptions';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-options" element={<OrderOptions />} />
        {/* Add login route later */}
        <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;