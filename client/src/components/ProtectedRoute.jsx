import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem('userName');
  return userName ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
