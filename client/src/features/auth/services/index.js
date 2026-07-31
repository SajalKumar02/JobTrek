import http from '@/api';

const AuthServices = {
  auth: async (email, password) => {
    const response = await http.post(
      '/auth/',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  },
  logOut: async () => {
    const response = await http.post('/auth/logout');
    return response;
  },
  getUser: async () => {
    const response = await http.get('/auth/me');
    return response;
  },
};

export default AuthServices;
