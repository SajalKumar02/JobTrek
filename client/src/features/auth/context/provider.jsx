import { useCallback, useEffect, useState } from 'react';

import AuthContext from './context';

import AuthServices from '@/features/auth/services';

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [error,setError] = useState();

  const handleAuth = useCallback(
    async ({ email, password }) => {
      setLoading(true);
      const response = await AuthServices.handleLogin(email, password);
      if (response.data && response.data.success) {
        setAuthenticated(true);
        setUser(response.data.user);
      }
      setLoading(false);
      return response.data;
    },
    [setLoading, setAuthenticated],
  );

  const logOut = useCallback(async () => {
    const response = await AuthServices.handleLogOut();
    if (response.data && response.data.success) {
      setAuthenticated(false);
      setUser(undefined);
    }
    return response.data;
  }, [setAuthenticated, setUser]);

  const updateUserProfile = useCallback(
    async (updatedProfile) => {
      const response = await AuthServices.updateUserProfile(updatedProfile);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
      return response.data;
    },
    [setUser],
  );

  const updateUserEmail = useCallback(
    async (updatedEmail) => {
      const response = await AuthServices.updateUserEmail(updatedEmail);
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
      return response.data;
    },
    [setUser],
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await AuthServices.getUser();
        if (response.data && response.data.success) {
          setUser(response.data.user);
          setAuthenticated(true);
        } else {
          setUser(null);
          setAuthenticated(false);
        }
      } catch {
        setUser(null);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
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
        updateUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
