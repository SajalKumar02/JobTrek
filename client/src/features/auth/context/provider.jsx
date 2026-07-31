import { useEffect, useMemo, useState } from 'react';

import AuthContext from './context';

import AuthServices from '@/features/auth/services';
import { setAccessToken } from '@/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setAccessToken(token ?? null);
  }, [token]);

  const handleAuth = async ({ email, password }) => {
    const response = await AuthServices.auth(email, password);
    if (response.data && response.data.success) {
      setToken(response.data.accessToken);
      setUser(response.data.user);
    }
    return response.data;
  };

  const logOut = async () => {
    try {
      const response = await AuthServices.logOut();
      return response;
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setToken(null);
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await AuthServices.getUser();
        setToken(response.data.accessToken);
        setUser(response.data.user);
      } catch {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      isAuthenticated: !!token,
      isLoading: token === undefined,
      handleAuth,
      logOut,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
