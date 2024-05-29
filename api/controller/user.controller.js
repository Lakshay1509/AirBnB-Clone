import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

import { User } from "../models/user.model.js"

import { ApiResponse } from "../utils/ApiResponse.js"

import mongoose from "mongoose"

const generateAccessandRefereshToken = async (userId) => {

    try {

        const user = await User.findById(userId)
        const access = user.generateAccessToken()
        const referesh = user.generateRefreshToken()
        user.refereshToken = referesh
        await user.save({ validateBeforeSave: false })
        return { access, referesh }


    }

    catch (error) {
        throw new ApiError(500, "Error generating token")
    }
}



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


    const createdUser = await User.findById(user._id).select("-password -refereshToken")

    if (!createdUser) {
        throw new ApiError(500, "Error creating user")
    }


    return res.status(201).json(new ApiResponse(200, "User created successfully", createdUser))
})


const loginUser = asyncHandler(async (req, res) => {


    //req body
    //username or email
    //find the user
    //checkk for password
    //access and refersh token
    //send cookies
    //send response

    const { email, password } = req.body


    if (!email) {
        throw new ApiError(400, "Please provide email")
    }

    const user = await User.findOne({
        $or: [{ email }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPassword = await user.isPasswordCorrect(password)

    if (!isPassword) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { access, referesh } = await generateAccessandRefereshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refereshToken")


    const options = {
        httpOnly: true,
        secure: true

    }

    return res.status(200).cookie("access", access, options).cookie("referesh", referesh, options).json(new ApiResponse(200, {
        user: loggedInUser, access, referesh
    },
        "User logged in successfully"
    ))


})



export {registerUser ,loginUser}