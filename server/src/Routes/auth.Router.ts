import { Router } from 'express';

import {
  registerOrLogin,
  changePassword,
  refreshAccessToken,
  logout,
  deleteAllData,
} from '../Controllers/auth.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

const AuthRouter = Router();

AuthRouter.post('/', registerOrLogin)
  .get('/protected-route-check', authMiddleware, (req, res) => res.send('Protected Data'))
  .get('/access-token', refreshAccessToken) // AccessToken is expired, so we will send a new one
  .put("/change-password", authMiddleware, changePassword)
  .get('/logout', authMiddleware, logout)
  .delete('/', deleteAllData);

export default AuthRouter;
