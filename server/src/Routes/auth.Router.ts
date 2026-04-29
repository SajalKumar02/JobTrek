import { Router } from "express";

import {
    registerOrLogin,
    refreshAccessToken,
    logout
} from "../Controllers/auth.Controller";

import {
    authMiddleware
} from "../Middleware/auth.Middleware";

const AuthRouter = Router()

AuthRouter
    .post("/", registerOrLogin)
    .get("/", authMiddleware, (req, res) => res.send("Protected Data"))
    .post("/refresh-token", refreshAccessToken) // AccessToken is expired, so we will send a new one
    .post("/logout", authMiddleware, logout);

export default AuthRouter;