// loginUser()
// registerUser()
// refreshUserToken()
// logoutUser()
// Database operations

// auth.service.js - Business logic + database operations

// Orchestrates multiple operations
// Calls database models
// Calls token service
// Returns data to controllers

import bcrypt from "bcryptjs";

import UserModel from "../model/user.model.js";
import TokenModel from "../model/token.model.js";

import { generateUsernameForUser } from "../utils/username.util.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from "../utils/token.util.js";
import { passwordHash } from "../utils/password.util.js";

export const authService = {
  // accepting email and password
  // passing tokens and user
  loginUser: async (email, password) => {
    // Email or Password missing
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find User by Email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid Email or password");
    }

    // Check Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate tokens
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    // Delete any existing refresh tokens for this user
    await TokenModel.deleteMany({ userId: user._id });

    // Store refresh token in refresh token table
    await TokenModel.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Return user data and tokens
    return { accessToken, refreshToken, user };
  },
  // accepting email and password
  // passing tokens and user
  registerUser: async (email, password) => {
    // No Email
    if (!email) {
      throw new Error("Email is required");
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      email: email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash Password - Pass plain password
    const hashPassword = await passwordHash(password);
    // Accept Hashed Password

    // Create New Username
    const newUsername = await generateUsernameForUser();
    // Generate tokens
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    const user = await UserModel.create({
      email,
      password: hashPassword,
      username: newUsername,
    });

    // Delete any existing refresh tokens for this user
    await TokenModel.deleteMany({ userId: user._id });

    await TokenModel.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken, user };
  },
  // logoutUser: accepts (req, res) and performs idempotent logout
  // - clears auth cookies
  // - revokes refresh token in DB if provided
  logoutUser: async (req, res) => {
    // extract token from cookies, body or Authorization header
    const refreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken || (req?.headers?.authorization ? req.headers.authorization.split(" ")[1] : undefined);

    // Clear auth cookies
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
    } catch (err) {
      // ignore cookie clear errors - still proceed
    }

    // If there is a refresh token, try to remove it from DB. Do not throw if removal fails.
    if (refreshToken) {
      try {
        await TokenModel.deleteOne({ refreshToken });
      } catch (err) {
        // Log or ignore; controller will still return success to client
        console.warn("Failed to revoke refresh token:", err.message);
      }
    }

    return;
  },
  // accepts req,res
  // return newAccess, newRefresh, user
  dispatchAccessToken: async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken || req?.body?.refreshToken || (req?.headers?.authorization ? req.headers.authorization.split(" ")[1] : undefined);

    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    // check by email or _id
    const decoded = verifyAccessToken(refreshToken);

    // find token in DB
    const storedToken = await TokenModel.findOne({ refreshToken });

    if (!storedToken) {
      throw new Error("Refresh Token not found");
    }

    res.clearCookie("refreshToken");

    // find User by ID
    const user = await UserModel.findById(storedToken.userId);
    if (!user) {
      throw new Error("User not found for the provided token");
    }

    const accessToken = generateAccessToken({ email: user.email });
    const newRefreshToken = generateRefreshToken({ email: user.email });

    // delete old refresh token
    await TokenModel.deleteOne({ refreshToken });

    // store new refresh token (use correct field name 'refreshToken')
    await TokenModel.create({
      userId: user._id,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // return tokens with consistent property names
    return { accessToken, refreshToken: newRefreshToken, user };
  },
  // accepting no parameter
  // passing nothing
  deleteAll: async () => {
    await UserModel.deleteMany({});
    await TokenModel.deleteMany({});
    return;
  },
};
