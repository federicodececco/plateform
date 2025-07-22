
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //url del backend, da sostituire eventualmente con un .env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  //salva jwt nel local storage
  const saveToken = (token) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  //cancella il token dal local storage, per un eventuale logout
  const removeToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  //parsing del jtw
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Errore nel parsing del JWT:', error);
      return null;
    }
  };

  //check per vedere se il jwt è scaduto o meno
  const isTokenExpired = (token) => {
    try {
      const payload = parseJwt(token);
      if (!payload || !payload.exp) return true;
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  //funzione di login effettiva
  const login = async (username, password) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login fallito');
      }

      //salva il jwt
      const jwtToken = data.accessToken;
      saveToken(jwtToken);

      //prende le info del jwt
      const userInfo = parseJwt(jwtToken);
      if (userInfo) {
        const roles = userInfo.authorities || [];
        setUser({
          username: data.username,
          roles: roles
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Errore durante il login:', error);
      return {
        success: false,
        error: error.message || 'Errore durante il login'
      };
    } finally {
      setLoading(false);
    }
  };

  //funzione di logout
  const logout = async () => {
    try {

      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch(() => {

        });
      }
    } finally {
      removeToken();
      setUser(null);
    }
  };

  //verificato lo stato di autenticazione
  const isAuthenticated = () => {
    return !!token && !isTokenExpired(token);
  };

  //funzione per effettuare chiamate autentcate
  const authenticatedFetch = async (url, options = {}) => {
    if (!token || isTokenExpired(token)) {
      logout();
      throw new Error('Token non valido o scaduto');
    }

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...options, ...defaultOptions });

    //log out automatico in caso di autenticazione non più valida
    if (response.status === 401) {
      logout();
      throw new Error('Sessione scaduta');
    }

    return response;
  };

  //controlla i permessi dello user
  const hasRole = (requiredRole) => {
    return user?.roles?.includes(requiredRole) || false;
  };

  //refresh del jwt, da sostituire in futuro con un refresh token
  const refreshToken = async () => {
    try {
      if (!token || isTokenExpired(token)) {
        logout();
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        saveToken(data.token);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Errore nel refresh del token:', error);
      logout();
      return false;
    }
  };

  //recupera il jwt dal local storage al caricamento
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken && !isTokenExpired(storedToken)) {
        setToken(storedToken);
        const userInfo = parseJwt(storedToken);
        if (userInfo) {
          const roles = userInfo.authorities || [];
          setUser({
            username: userInfo.sub,
            roles: roles
          });
        }
      } else if (storedToken) {
        // Token scaduto, rimuovilo
        removeToken();
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  //refresh automatico del token mentre sei connesso
  useEffect(() => {
    if (!token) return;

    const payload = parseJwt(token);
    if (!payload || !payload.exp) return;

    const timeUntilExpiry = payload.exp * 1000 - Date.now();
    // 5min
    const refreshTime = timeUntilExpiry - 5 * 60 * 1000;

    if (refreshTime > 0) {
      const timeoutId = setTimeout(() => {
        refreshToken();
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    authenticatedFetch,
    hasRole,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve essere usato all'interno di AuthProvider");
  }
  return context;
}

export { useAuthContext, AuthProvider };