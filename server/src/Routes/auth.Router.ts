import { Router } from "express";

import {
    registerOrLogin,
} from "../Controllers/auth.Controller";

import {
    tokenMiddleware
} from "../Middleware/auth.Middleware";

const AuthRouter = Router()

AuthRouter
    .post("/", registerOrLogin)

export default AuthRouter;