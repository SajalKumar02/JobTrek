import { createContext, useEffect, useState } from 'react';
import http from '../../features/api/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const handleAuth = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await http.post(
        '/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (response.data && response.data.success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      setAuthenticated(false);
      console.error('Authentication error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const response = await http.post('/auth/logout');
      if (response.data && response.data.success) {
        setAuthenticated(false);
        return response.data.success === true;
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthenticated(false);
      setUser(undefined);
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedProfile) => {
    try {
      const response = await http.patch('/user/profile', updatedProfile);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      } else {
        throw new Error(response.data?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const getUserProfile = async () => {
      try {
        const response = await http.get('/user/me');
        if (response.data && response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    };

    getUserProfile();
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
