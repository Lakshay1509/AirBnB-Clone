import {Router} from 'express';

import {loginUser, registerUser, getUserProfile, logout} from '../controller/user.controller.js';

import {verifyJWT} from '../middleware/auth.middleware.js';

import {uploadByLink} from "../controller/media.controller.js"


const router = Router();


router.route("/register").post(
    
    registerUser)

router.route("/login").post(
        
        loginUser
)

router.route("/profile").get(getUserProfile)

router.route("/logout").post(logout)

router.route("/upload-by-link").post(uploadByLink)

export default router;