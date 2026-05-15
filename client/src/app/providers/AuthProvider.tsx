import { createContext, useEffect, useState } from 'react';
import http from '../../features/api/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAuth = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await http.post('/auth', {
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

  const refreshToken = async () => {
    setLoading(true);
    try {
      const response = await http.get('/auth/access-token');
      if (response.data && response.data.success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
      console.error('Token refresh error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const response = await http.get('/auth/logout');
      if (response.data && response.data.success) {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkProtected = async () => {
      setLoading(true);
      try {
        const response = await http.get('/auth/protected-route-check');
        if (response.data && response.data.message === 'ACCESS TOKEN EXPIRED') {
          await refreshToken();
        } else if (response.data) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
        console.error('Protected check error:', error);
      } finally {
        setLoading(false);
      }
    };
    checkProtected();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading, handleAuth, refreshToken, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
