import { Router } from 'express';

import AuthRouter from './auth.Router';
import UserRouter from './user.Router';
import JobRouter from './job.Router';

const IndexRouter = Router();

// prettier-ignore
IndexRouter
    .use('/auth', AuthRouter)
    .use('/user', UserRouter)
    .use('/jobs', JobRouter)
    .get("/", (req,res) =>{
        const cookie = req.cookies.accessToken ? true : false;
        return res.json({success: true, message: "Server is running...", cookie})
    })

export default IndexRouter;
