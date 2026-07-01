/*==================================================
  CodeNova Technologies
  backend/routes/authRoutes.js
  Authentication Routes
==================================================*/

"use strict";

/*=========================================
=            Required Modules             =
=========================================*/

const express = require("express");

const router = express.Router();

/*=========================================
=             Controllers                 =
=========================================*/

const {

    register,

    login,

    logout,

    getProfile,

    updateProfile,

    changePassword,

    forgotPassword,

    resetPassword,

    refreshToken,

    verifyEmail

} = require("../controllers/authController");

/*=========================================
=             Middleware                  =
=========================================*/

const authMiddleware =
    require("../middleware/authMiddleware");

const validationMiddleware =
    require("../middleware/validationMiddleware");

/*=========================================
=             Public Routes               =
=========================================*/

/*
    POST
    Register New User
*/

router.post(

    "/register",

    validationMiddleware,

    register

);

/*
    POST
    Login User
*/

router.post(

    "/login",

    validationMiddleware,

    login

);

/*
    POST
    Forgot Password
*/

router.post(

    "/forgot-password",

    validationMiddleware,

    forgotPassword

);

/*
    POST
    Reset Password
*/

router.post(

    "/reset-password",

    validationMiddleware,

    resetPassword

);

/*
    GET
    Verify Email
*/

router.get(

    "/verify-email/:token",

    verifyEmail

);

/*
    POST
    Refresh JWT Token
*/

router.post(

    "/refresh-token",

    refreshToken

);

/*=========================================
=            Protected Routes             =
=========================================*/

/*
    POST
    Logout
*/

router.post(

    "/logout",

    authMiddleware,

    logout

);

/*
    GET
    Current User Profile
*/

router.get(

    "/profile",

    authMiddleware,

    getProfile

);

/*
    PUT
    Update Profile
*/

router.put(

    "/profile",

    authMiddleware,

    validationMiddleware,

    updateProfile

);

/*
    PUT
    Change Password
*/

router.put(

    "/change-password",

    authMiddleware,

    validationMiddleware,

    changePassword

);

/*=========================================
=              Test Route                 =
=========================================*/

router.get(

    "/status",

    (req,res)=>{

        res.status(200).json({

            success:true,

            module:"Authentication",

            message:

                "Authentication API Working",

            timestamp:

                new Date()

        });

    }

);

/*=========================================
=            Route Information            =
=========================================*/

console.log(

    "Authentication Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of authRoutes.js
=========================================*/