import React, { createContext, useContext, useCallback } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoaded, isSignedIn, getToken, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();

  // Map Clerk user to our existing app's expected shape
  const user = clerkUser ? {
    id: clerkUser.id,
    name: clerkUser.fullName || clerkUser.firstName || 'User',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    profilePicture: clerkUser.imageUrl || '',
  } : null;

  // Instead of isAdmin coming from token initially, you can set rules based on emails
  // For production, you should use Clerk Public Metadata to store roles
  const isAdmin = user?.email === 'admin@tripsoul.com'; // Replace with real admin check

  const fetchWithAuth = useCallback(async (url, options = {}) => {
    const token = await getToken();
    const headers = {
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers
    });
  }, [getToken]);

  const logout = async () => {
    await signOut();
  };

  const login = () => {
    // With Clerk, login is handled by <SignInButton /> in the UI, 
    // so this might not be needed, but we provide it for compatibility.
    console.log("Login triggered - should be handled by Clerk UI");
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!isSignedIn, 
      isAdmin, 
      user, 
      login, 
      logout, 
      loading: !isLoaded, 
      fetchWithAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

