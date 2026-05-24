import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenLoginTime');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Check for token in localStorage on mount
    const token = localStorage.getItem('adminToken');
    const loginTime = localStorage.getItem('adminTokenLoginTime');
    
    let timer;
    if (token && loginTime) {
      const oneDay = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - parseInt(loginTime);
      
      if (elapsed > oneDay) {
        // Session expired after 1 day
        logout();
      } else {
        setIsAuthenticated(true);
        // Setup timer to automatically logout when 1 day is complete
        const remainingTime = oneDay - elapsed;
        timer = setTimeout(() => {
          logout();
        }, remainingTime);
      }
    } else if (token) {
      // Fallback if token exists but no timestamp (older sessions)
      setIsAuthenticated(true);
    }
    setLoading(false);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminTokenLoginTime', Date.now().toString());
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
