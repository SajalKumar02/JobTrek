import { Router } from 'express';

import { getUser, editUser } from '../Controllers/user.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

const UserRouter = Router();

UserRouter.get('/profile', authMiddleware, getUser);
UserRouter.patch('/profile', authMiddleware, editUser);

// Resume/Application Related
// POST   /api/user/resume            // Upload resume
// GET    /api/user/resume            // Get resume details
// DELETE /api/user/resume            // Delete resume

export default UserRouter;
