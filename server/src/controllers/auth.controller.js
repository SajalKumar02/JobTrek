import { authService } from "../services/auth.service.js";
import { mountTokenToResponse } from "../utils/token.util.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // passing email and password
    const result = await authService.loginUser(email, password);
    // accepted user, access token and refresh token

    // passing tokens and response object(res)
    mountTokenToResponse(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      success: true,
      data: { user: result.user },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.registerUser(email, password);

    mountTokenToResponse(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      success: true,
      data: { user: result.user },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Delegate logout to service which will clear cookies and revoke token if present
    await authService.logoutUser(req, res);

    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAllData = async (req, res) => {
  try {
    await authService.deleteAll();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const dispatchAccessToken = async (req, res) => {
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
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
