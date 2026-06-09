import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RedirectToSignIn } from '@clerk/react';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (adminOnly) {
    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
  }

  // General user route protection
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <RedirectToSignIn />
  );
};

export default ProtectedRoute;
