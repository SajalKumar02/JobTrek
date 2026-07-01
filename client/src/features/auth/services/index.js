import http from '@/api';

const AuthServices = {
  getUser: async () => {
    try {
      const response = await http.get('/user/me', {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw new Error('Could Not Fetch User', { cause: error });
    }
  },
  // Experimental
  updateUserEmail: async (updatedEmail) => {
    try {
      const response = await http.patch('/user/email', updatedEmail);
      return response;
    } catch (error) {
      throw new Error('Could Not Update User Email', { cause: error });
    }
  },
  updateUserProfile: async (updateBody) => {
    try {
      const response = await http.patch('/user/username', updateBody);
      return response;
    } catch (error) {
      throw new Error('Could Not Update User Profile', { cause: error });
    }
  },
  handleLogin: async (email, password) => {
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
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`, { cause: error });
      } else {
        throw new Error('Login failed due to an unknown error.', { cause: error });
      }
    }
  },
  handleLogOut: async () => {
    try {
      const response = await http.post('/auth/logout');
      return response;
    } catch (error) {
      throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error.'}`, { cause: error });
    }
  },
};

export default AuthServices;
