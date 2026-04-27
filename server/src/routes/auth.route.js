import { Router } from "express";

const AuthRoute = Router();

// prettier-ignore
import {
    login,
    register,
    logout,
    dispatchAccessToken,
    deleteAllData,
} from "../controllers/auth.controller.js";

// prettier-ignore
AuthRoute
    .post("/login", login)
    .post("/register", register)
    .post("/logout", logout)
    .post("/updateAccessToken", dispatchAccessToken)

    .delete("/", deleteAllData);

export default AuthRoute;
