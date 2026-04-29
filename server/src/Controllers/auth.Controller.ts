import { Request, Response } from "express";

import { authService } from "../Services/auth.Services";
import { mountTokenToResponse } from "../Utils/token.Util";

// Single endpoint for register/login (smart auth)
export const registerOrLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authService.registerOrLoginUser(email, password);

        mountTokenToResponse(res, result.accessToken, result.refreshToken);

        res.status(200).json({
            success: true,
            data: { user: result.user },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        const statusCode = error instanceof Error && 'statusCode' in error ?
            (error as any).statusCode
            : 500
        res.status(statusCode).json({
            success: false,
            message: message,
        });
    }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).send({
                message: "Refresh token not found",
                success: false
            })
        }

        const result = await authService.refreshTokenForUser(refreshToken);

        mountTokenToResponse(res, result.accessToken, refreshToken);

        res.status(200).json({
            success: true,
            data: { user: result.user }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        const statusCode = error instanceof Error && 'statusCode' in error ?
            (error as any).statusCode
            : 500
        res.status(statusCode).json({
            success: false,
            message: message,
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        // Delegate logout to service which will clear cookies and revoke token if present
        await authService.logoutUser(req);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ success: true, message: "Logged out" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        const statusCode = error instanceof Error && 'statusCode' in error ?
            (error as any).statusCode
            : 500
        res.status(statusCode).json({
            success: false,
            message: message,
        });
    }
};

export const deleteAllData = async (req: Request, res: Response) => {
    try {
        await authService.deleteAll();

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        const statusCode = error instanceof Error && 'statusCode' in error ?
            (error as any).statusCode
            : 500
        res.status(statusCode).json({
            success: false,
            message: message,
        });
    }
};

export const dispatchAccessToken = async (req: Request, res: Response) => {
    // get refresh token from cookies
    // check from db - authenticate User
    // initiate generation of new access token
    // add new token to response
    try {
        const { accessToken, refreshToken, user } = await authService.dispatchAccessToken(req, res);

        mountTokenToResponse(res, accessToken, refreshToken);
        res.json({
            success: true,
            message: "new access token dispatched",
            data: { user },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        const statusCode = error instanceof Error && 'statusCode' in error ?
            (error as any).statusCode
            : 500
        res.status(statusCode).json({
            success: false,
            message: message,
        });
    }
};
