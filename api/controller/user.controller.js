import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


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

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Error creating user");
  }

  return res.status(201).json(new ApiResponse(201, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email or password not provided");
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found");
    throw new ApiError(404, "Invalid credentials");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    console.log("Password incorrect");
    throw new ApiError(401, "Invalid credentials");
  }

  jwt.sign(
    { email: user.email, id: user._id ,name:user.name},
    process.env.ACCESS_TOKEN_SECRET,
    {},
    (err, token) => {
      if (err) {
        console.log("JWT sign error", err);
        throw err;
      }

      console.log("User logged in successfully", user);
      res.cookie('token', token).json(new ApiResponse(200, "User logged in successfully", user));
    }
  );
});


const getUserProfile = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,{},(err,data)=>{
    if(err){
      throw new ApiError(401, "Unauthorized");
    }
    
    return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", data));

  })
});

export { registerUser, loginUser,getUserProfile };
