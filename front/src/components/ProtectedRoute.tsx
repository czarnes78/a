// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../auth/AdminAuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAdmin } = useAdminAuth();
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
