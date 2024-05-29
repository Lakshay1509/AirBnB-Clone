import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const access = user.generateAccessToken();
    const refresh = user.generateRefreshToken();
    user.refreshToken = refresh; // Fixed typo
    await user.save({ validateBeforeSave: false });
    return { access, refresh };
  } catch (error) {
    throw new ApiError(500, "Error generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if ([email, name, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Please fill in all fields");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    email,
    name: name.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Error creating user");
  }

  return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Invalid credentials");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { access, refresh } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  return res.status(200)
    .cookie("access", access, options)
    .cookie("refresh", refresh, options)
    .json(new ApiResponse(200, {
      user: loggedInUser, access, refresh
    }, "User logged in successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const token = req.cookies.access;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  res.status(200).json(new ApiResponse(200, "User profile fetched successfully", token));
});

export { registerUser, loginUser, getUserProfile };
