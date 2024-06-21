import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    // If no role, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If role is not allowed, redirect to not authorized page or 404
    return <Navigate to="/403" replace />;
  }

  // If role is allowed, render the route
  return <Outlet />;
};

export default ProtectedRoute;
