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
      const response = await fetch(`${API_BASE_URL}/api/auth/verify?t=${new Date().getTime()}`, {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
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
      await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // If coming back from Google login, browser sometimes needs a moment to register the cookie
    if (window.location.search.includes('login=success')) {
      setTimeout(() => {
        checkAuth().then(() => {
          // Clean up the URL
          window.history.replaceState({}, document.title, window.location.pathname);
        });
      }, 500); // 500ms delay gives browser time to settle the cookie
    } else {
      checkAuth();
    }
  }, []);

  const login = async () => {
    // Calling checkAuth to sync latest state from backend cookie
    await checkAuth();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
