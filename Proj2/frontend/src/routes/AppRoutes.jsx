// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import OrderOptions from '../pages/OrderOptions/OrderOptions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/order-options" element={<OrderOptions />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;