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
      }
      return response.data;
    } catch (error) {
      setAuthenticated(false);
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await http.post('/auth/logout');
      if (response.data && response.data.success) {
        setAuthenticated(false);
        setUser(undefined);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || 'Logout failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedProfile) => {
    try {
      const response = await http.patch('/user/username', updatedProfile);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Failed to update profile',
      };
    }
  };

  const updateUserEmail = async (updatedEmail) => {
    try {
      const response = await http.patch('/user/email', updatedEmail);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Failed to update email',
      };
    }
  };

  const checkAccessToken = async () => {
    try {
      const response = await http.get('/auth/access/check');

      if (response.data && response.data.success) {
        setAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    } finally {
      setUser(undefined);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    // only run when loading is off
    const getUserProfile = async () => {
      try {
        const response = await http.get('/user/me');
        if (response.data && response.data.success) {
          setAuthenticated(response.data.success);
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getUserProfile();
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        updateUserProfile,
        updateUserEmail,
        checkAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
