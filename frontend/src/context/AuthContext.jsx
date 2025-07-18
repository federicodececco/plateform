import { create } from 'domain';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = ()=>{
    const context = useContext(AuthContext);
    return context;
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //salva il token nel local storage
  const saveToken = (token) => {
    localStorage.setItem('authToken', token);
    setToken(token);
  };

    // rimuove il token
  const removeToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      saveToken(data.token);
      
      // ricava le info sull-utente 
      const userInfo = parseJwt(data.token);
      setUser({ username: userInfo.sub });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // logout
  const logout = () => {
    removeToken();
    setUser(null);
  };

  // verifica l'autenitcazione
  const isAuthenticated = () => {
    return !!token && !isTokenExpired(token);
  };

  // parsing di jwt
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
      return null;
    }
  };

  // check di scadenza del token
  const isTokenExpired = (token) => {
    try {
      const payload = parseJwt(token);
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  // retrive del token dal local storage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      const userInfo = parseJwt(storedToken);
      setUser({ username: userInfo.sub });
    } else if (storedToken) {
      removeToken();
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};