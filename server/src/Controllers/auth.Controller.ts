import { authService } from '../Services/auth.Services';

import { asyncHandler } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';
import {
  clearRefreshToken,
  mountRefreshTokenToResponse,
} from '../Utils/token.Util';

import { RegisterOrLoginValidator } from '../Validators/auth.Validator';
import {
  AuthenticatedRequest,
  AuthRequestBody,
  AuthResponse,
  BaseResponse,
  RequestWithRefreshToken,
} from '../Types';

import { Request } from 'express';

export const AuthController = asyncHandler(
  async (req: AuthRequestBody, res: AuthResponse) => {
    const { email, password } = req.body;

    const validatorResult = RegisterOrLoginValidator.safeParse({
      email,
      password,
    });

    if (!validatorResult.success) {
      throw new ApiError(validatorResult.error.issues[0].message, 400);
    }

    const result = await authService.authUser(email, password);

    mountRefreshTokenToResponse(res, result.refreshToken);

    res.status(result.isNewUser ? 201 : 200).json({
      success: true,
      message: result.isNewUser ? 'User Registered' : 'User Logged In',
      user: result.user,
      accessToken: result.accessToken,
    });
  }
);

export const LogOutController = asyncHandler(
  async (req: Request, res: BaseResponse) => {
    clearRefreshToken(res);

    return res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  }
);

export const RefreshTokenController = asyncHandler(
  async (req: RequestWithRefreshToken, res: AuthResponse) => {
    const { newAccessToken, newRefreshToken } =
      await authService.issueNewAuthTokens(req);

    mountRefreshTokenToResponse(res, newRefreshToken);

    return res.status(200).json({
      success: true,
      message: 'New access token issued',
      accessToken: newAccessToken,
    });
  }
);

export const GetCurrentUserController = asyncHandler(
  async (req: AuthenticatedRequest, res: AuthResponse) => {
    const result = await authService.getCurrentUser(req);

    return res.status(200).json({
      success: true,
      message: 'Authenticated',
      user: result.user,
      accessToken: result.accessToken,
    });
  }
);
