import { useEffect, useState } from 'react';

import http from '../../api/api';

import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleAuth = async ({ email, password }) => {
    setLoading(true);
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
    setLoading(false);
    return response.data;
  };

  const logOut = async () => {
    const response = await http.post('/auth/logout');
    if (response.data && response.data.success) {
      setAuthenticated(false);
      setUser(undefined);
    }
    return response.data;
  };

  const updateUserProfile = async (updatedProfile) => {
    const response = await http.patch('/user/username', updatedProfile);
    if (response.data && response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const updateUserEmail = async (updatedEmail) => {
    const response = await http.patch('/user/email', updatedEmail);
    if (response.data && response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  useEffect(() => {
    if (loading) return;

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
