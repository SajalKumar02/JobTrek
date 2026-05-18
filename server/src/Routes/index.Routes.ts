import { Router } from 'express';

import AuthRouter from './auth.Router';
import UserRouter from './user.Router';
import JobRouter from './job.Router';

const IndexRouter = Router();

IndexRouter
    .use('/auth', AuthRouter)
    .use('/user', UserRouter)
    .use('/jobs', JobRouter);

export default IndexRouter;
