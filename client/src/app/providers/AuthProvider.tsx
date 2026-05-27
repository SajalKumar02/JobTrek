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
    console.log('Logout Working');
    try {
      const response = await http.post('/auth/logout');
      console.log(response.data);
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

  // useEffect(() => {
  //   const init = async () => {
  //     if (loading && !authenticated) return;
  //     // try should run when
  //     // there is no loading (loading === false) and
  //     // authenticated is true (authenticate === true)
  //     try {
  //       // await http.post('/auth/token/refresh');
  //       setAuthenticated(true);

  //       const userRes = await http.get('/user/me');
  //       setUser(userRes.data.user);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   init();
  // }, [authenticated, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,
        handleAuth,
        logOut,
        getUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
export default AuthProvider;
