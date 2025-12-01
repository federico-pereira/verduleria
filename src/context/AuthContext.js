// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from '../services/AxiosInstance';

const AuthContext = createContext(null);
const STORAGE_KEY = 'auth:user';
const TOKEN_KEY = 'auth:token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // hidratar user y token
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          // Intentar obtener datos del usuario actual
          const response = await axios.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        // Si falla, limpiar token inválido
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // persistir user
  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [user]);

  // login con backend API
  const login = async ({ username, password }) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      const { token } = response.data;
      
      // Guardar token
      localStorage.setItem(TOKEN_KEY, token);
      
      // Obtener datos del usuario
      const userResponse = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(userResponse.data);
      return userResponse.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

// Helper to get token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
