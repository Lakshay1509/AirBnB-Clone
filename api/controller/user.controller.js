import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

import { User } from "../models/user.model.js"

import { ApiResponse } from "../utils/ApiResponse.js"

import mongoose from "mongoose"



const registerUser = asyncHandler(async (req, res) => {

    
    const {email, name, password } = req.body
    //console.log(email)

    if (
        [email, name, password].some((field) => field.trim() === "")
    ) {
        throw new ApiError(400, "Please fill in all fields")

    }
    

    const existedUser = await User.findOne({
        $or: [{ email }]
    })
    if (existedUser) {

        throw new ApiError(409, "User already exist")
    }


    const user = await User.create({
        email,
        name: name.toLowerCase(),
        password,

    })


    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Error creating user")
    }


    return res.status(201).json(new ApiResponse(200, "User created successfully", createdUser))
})



export {registerUser}