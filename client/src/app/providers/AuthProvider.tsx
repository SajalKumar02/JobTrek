import { createContext, useEffect, useState } from 'react';
import http from '../../features/api/api';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    http
      .post('/auth/token/refresh')
      .then((response) => {
        if (response.data.success) {
          setAuthenticated(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, handleAuth, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
