import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, hasRole, loading } = useAuthContext();
  const location = useLocation();

  // loading spinner durante il caricamento
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Caricamento...
      </div>
    );
  }

  //in mancana di aut ti rimanda al login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // nel caso vengano aggiunti più ruoli e non si possieda  quello necessario
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2>Accesso Negato</h2>
        <p>Non hai i permessi necessari per accedere a questa pagina.</p>
        <button onClick={() => window.history.back()}>
          Torna Indietro
        </button>
      </div>
    );
  }

  // se passa i test manda la pagina richeista
  return children;
};

export default ProtectedRoute;