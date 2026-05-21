import { createContext, useEffect, useState } from 'react';
import http from '../../features/api/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();

  const handleAuth = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await http.post('/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await http.post('/auth/logout');
      setAuthenticated(false);
      window.location.href = '/register';
    } catch (error) {
      setAuthenticated(false);
      console.error('Logout error:', error);
      window.location.href = '/register';
    } finally {
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
    const refreshingAccessToken = async () => {
      try {
        const response = await http.post('/auth/token/refresh');
        if (response.data.success) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    refreshingAccessToken();

    const getUser = async () => {
      try {
        setLoading(true);
        const response = await http.get('/user/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error('Get user error:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

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
