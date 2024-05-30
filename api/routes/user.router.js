import {Router} from 'express';

import {loginUser, registerUser, getUserProfile, logout} from '../controller/user.controller.js';

import {verifyJWT} from '../middleware/auth.middleware.js';


const router = Router();


router.route("/register").post(
    
    registerUser)

router.route("/login").post(
        
        loginUser
)

router.route("/profile").get(getUserProfile)

router.route("/logout").post(logout)

export default router;