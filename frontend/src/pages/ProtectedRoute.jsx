import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute ({ children }) {
  const { isAuthenticated, loading } = useAuthContext();
   if (loading) {
    return (<div>Sono una pagina di caricamento</div> );
  }
 return isAuthenticated() ? children : <Navigate to="/login" replace />;
};