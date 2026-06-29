import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null); // the customer data
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');
      if (urlToken) {
        localStorage.setItem('userToken', urlToken);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      const token = localStorage.getItem('userToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers,
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(!!data.isAuthenticated);
        setIsAdmin(!!data.isAdmin || data.role === 'admin');
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const endpoint = isAdmin ? '/api/auth/logout' : '/api/auth/user-logout';
      const token = localStorage.getItem('userToken');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        credentials: 'include'
      });
      localStorage.removeItem('userToken');
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    // Calling checkAuth to sync latest state from backend cookie
    await checkAuth();
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('userToken');
    const headers = {
      ...options.headers,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, loading, checkAuth, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
