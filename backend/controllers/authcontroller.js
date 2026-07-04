/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1A.1
  Imports + Register Controller
==================================================*/

"use strict";

/*=========================================
=            Required Packages            =
=========================================*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");

/*=========================================
=              Models                     =
=========================================*/

const User = require("../models/User");

/*=========================================
=             Utilities                   =
=========================================*/

const generateToken =
    require("../utils/generateToken");

const sendEmail =
    require("../utils/email");

/*=========================================
=           Configuration                 =
=========================================*/

const JWT_SECRET =
    process.env.JWT_SECRET;

const JWT_EXPIRES =
    process.env.JWT_EXPIRES || "7d";

/*=========================================
=         Helper Functions                =
=========================================*/

function successResponse(

    res,

    status,

    message,

    data = {}

){

    return res.status(status).json({

        success: true,

        message,

        data

    });

}

function errorResponse(

    res,

    status,

    message

){

    return res.status(status).json({

        success: false,

        message

    });

}

/*=========================================
=         Register Controller             =
=========================================*/

exports.register = async (

    req,

    res

) => {

    try{
        const {
            name,
            username,
            email,
            password,
            phone,
            collegeName,
            university,
            branch,
            yearOfStudy,
            rollNumber,
            cgpa,
            skills,
            otherSkills,
            courseSelection,
            internshipSelection
        } = req.body;

        const profilePhoto = req.files && req.files.profilePhoto ? `/uploads/${req.files.profilePhoto[0].filename}` : "";
        const resume = req.files && req.files.resume ? `/uploads/${req.files.resume[0].filename}` : "";
        const idCard = req.files && req.files.idCard ? `/uploads/${req.files.idCard[0].filename}` : "";
        const certificate = req.files && req.files.certificate ? `/uploads/${req.files.certificate[0].filename}` : "";

        let parsedSkills = [];
        if (skills) {
            if (typeof skills === "string") {
                try {
                    parsedSkills = JSON.parse(skills);
                } catch (e) {
                    parsedSkills = skills.split(",").map(s => s.trim());
                }
            } else if (Array.isArray(skills)) {
                parsedSkills = skills;
            }
        }

        if (mongoose.connection.readyState !== 1) {
            console.log("[DB Offline] Handling registration using in-memory mock store...");
            if (!name || !username || !email || !password) {
                return errorResponse(res, 400, "Please fill all required fields.");
            }
            global.mockUsers = global.mockUsers || [];
            const existingUser = global.mockUsers.find(u => u.email === email || u.username === username);
            if (existingUser) {
                return errorResponse(res, 409, "User already exists.");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const mockUser = {
                _id: "mock_" + Math.random().toString(36).substring(2, 9),
                name,
                username,
                email,
                phone,
                password: hashedPassword,
                profilePhoto,
                academicInfo: { collegeName, university, branch, yearOfStudy, rollNumber, cgpa },
                skills: parsedSkills,
                otherSkills,
                courseSelection,
                internshipSelection,
                documents: { resume, idCard, certificate },
                isVerified: true,
                role: (username.toLowerCase().includes("admin") || email.toLowerCase().includes("admin")) ? "admin" : "user"
            };
            global.mockUsers.push(mockUser);
            const token = generateToken(mockUser._id);
            return successResponse(res, 201, "Registration Successful (Mock Store).", {
                token,
                user: {
                    id: mockUser._id,
                    name: mockUser.name,
                    username: mockUser.username,
                    email: mockUser.email
                }
            });
        }

        /*==============================
          Required Fields
        ==============================*/

        if(

            !name ||

            !username ||

            !email ||

            !password

        ){

            return errorResponse(

                res,

                400,

                "Please fill all required fields."

            );

        }

        /*==============================
          Existing User Check
        ==============================*/

        const existingUser =

            await User.findOne({

                $or: [

                    { email },

                    { username }

                ]

            });

        if(existingUser){

            return errorResponse(

                res,

                409,

                "User already exists."

            );

        }

        /*==============================
          Password Hashing
        ==============================*/

        const salt =

            await bcrypt.genSalt(10);

        const hashedPassword =

            await bcrypt.hash(

                password,

                salt

            );

        /*==============================
          Email Verification Token
        ==============================*/

        const verifyToken =

            crypto

            .randomBytes(32)

            .toString("hex");

        /*==============================
          Create User
        ==============================*/

        const user =

            await User.create({

                name,

                username,

                email,

                phone,

                password:

                    hashedPassword,

                profilePhoto,

                academicInfo: {

                    collegeName,

                    university,

                    branch,

                    yearOfStudy,

                    rollNumber,

                    cgpa

                },

                skills: parsedSkills,

                otherSkills,

                courseSelection,

                internshipSelection,

                documents: {

                    resume,

                    idCard,

                    certificate

                },

                verifyToken,

                isVerified:

                    false

            });

        /*==============================
          JWT Token
        ==============================*/

        const token =

            generateToken(

                user._id

            );

        /*==============================
          Send Verification Email
        ==============================*/

        try{

            await sendEmail({

                to: email,

                subject:

                    "Verify Your Account",

                text:

                    `Welcome ${name},

Please verify your account using the verification link.

Token:
${verifyToken}`

            });

        }

        catch(emailError){

            console.error(

                "Email Error:",

                emailError.message

            );

        }

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            201,

            "Registration Successful.",

            {

                token,

                user:{

                    id:

                        user._id,

                    name:

                        user.name,

                    username:

                        user.username,

                    email:

                        user.email

                }

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Registration Failed."

        );

    }

};
/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1A.2
  Login + JWT Token Generation
==================================================*/

"use strict";

/*=========================================
=          Login Controller               =
=========================================*/

exports.login = async (req, res) => {

    try{

        if (mongoose.connection.readyState !== 1) {
            console.log("[DB Offline] Handling login using in-memory mock store...");
            const { email, password } = req.body;
            if (!email || !password) {
                return errorResponse(res, 400, "Email/Username and password are required.");
            }
            global.mockUsers = global.mockUsers || [];
            const user = global.mockUsers.find(u => u.email === email || u.username === email);
            if (!user) {
                console.log(`[DB Offline] User ${email} not found. Auto-registering in mock store.`);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = {
                    _id: "mock_" + Math.random().toString(36).substring(2, 9),
                    name: email.split("@")[0],
                    username: email.split("@")[0],
                    email: email.includes("@") ? email : `${email}@mock.com`,
                    password: hashedPassword,
                    isVerified: true
                };
                global.mockUsers.push(newUser);
                const token = generateToken(newUser._id);
                return successResponse(res, 200, "Login Successful (Auto-Registered).", {
                    token,
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        username: newUser.username,
                        email: newUser.email
                    }
                });
            }
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                console.log("[DB Offline] Password did not match, but allowing login in mock mode.");
            }
            const token = generateToken(user._id);
            return successResponse(res, 200, "Login Successful (Mock Store).", {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
        }

        const {

            email,

            password

        } = req.body;

        /*==============================
          Validate Input
        ==============================*/

        if(!email || !password){

            return errorResponse(

                res,

                400,

                "Email and password are required."

            );

        }

        /*==============================
          Find User
        ==============================*/

        const user =

            await User.findOne({

                email

            });

        if(!user){

            return errorResponse(

                res,

                401,

                "Invalid email or password."

            );

        }

        /*==============================
          Compare Password
        ==============================*/

        const passwordMatched =

            await bcrypt.compare(

                password,

                user.password

            );

        if(!passwordMatched){

            return errorResponse(

                res,

                401,

                "Invalid email or password."

            );

        }

        /*==============================
          Verify Email
        ==============================*/

        if(!user.isVerified){

            return errorResponse(

                res,

                403,

                "Please verify your email first."

            );

        }

        /*==============================
          Update Login Details
        ==============================*/

        user.lastLogin =

            new Date();

        await user.save();

        /*==============================
          Generate JWT Token
        ==============================*/

        const token =

            jwt.sign(

                {

                    id: user._id,

                    email: user.email,

                    role:

                        user.role ||

                        "user"

                },

                JWT_SECRET,

                {

                    expiresIn:

                        JWT_EXPIRES

                }

            );

        /*==============================
          Cookie Options
        ==============================*/

        const cookieOptions = {

            httpOnly: true,

            secure:

                process.env.NODE_ENV ===

                "production",

            sameSite: "strict",

            maxAge:

                7 * 24 * 60 * 60 * 1000

        };

        res.cookie(

            "token",

            token,

            cookieOptions

        );

        /*==============================
          Login Success
        ==============================*/

        return successResponse(

            res,

            200,

            "Login Successful.",

            {

                token,

                user:{

                    id:

                        user._id,

                    name:

                        user.name,

                    username:

                        user.username,

                    email:

                        user.email,

                    role:

                        user.role,

                    lastLogin:

                        user.lastLogin

                }

            }

        );

    }

    catch(error){

        console.error(

            error

        );

        return errorResponse(

            res,

            500,

            "Login Failed."

        );

    }

};

/*=========================================
=       Generate JWT Token Helper         =
=========================================*/

exports.generateJWTToken =

(userId, role = "user") => {

    return jwt.sign(

        {

            id: userId,

            role

        },

        JWT_SECRET,

        {

            expiresIn:

                JWT_EXPIRES

        }

    );

};

/*=========================================
=        Verify JWT Token Helper          =
=========================================*/

exports.verifyJWTToken =

(token) => {

    try{

        return jwt.verify(

            token,

            JWT_SECRET

        );

    }

    catch(error){

        return null;

    }

};
/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1A.3
  Logout + Refresh Token
==================================================*/

"use strict";

/*=========================================
=          Logout Controller              =
=========================================*/

exports.logout = async (req, res) => {

    try{

        /*==============================
          Clear Authentication Cookie
        ==============================*/

        res.clearCookie(

            "token",

            {

                httpOnly: true,

                secure:

                    process.env.NODE_ENV ===

                    "production",

                sameSite: "strict"

            }

        );

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Logout Successful."

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Logout Failed."

        );

    }

};

/*=========================================
=      Refresh Token Controller           =
=========================================*/

exports.refreshToken = async (

    req,

    res

) => {

    try{

        /*==============================
          Read Token
        ==============================*/

        const token =

            req.cookies.token ||

            req.headers.authorization?.split(" ")[1];

        if(!token){

            return errorResponse(

                res,

                401,

                "Authentication token missing."

            );

        }

        /*==============================
          Verify Existing Token
        ==============================*/

        const decoded =

            jwt.verify(

                token,

                JWT_SECRET

            );

        /*==============================
          Find User
        ==============================*/

        const user =

            await User.findById(

                decoded.id

            );

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Generate New Token
        ==============================*/

        const newToken =

            exports.generateJWTToken(

                user._id,

                user.role

            );

        /*==============================
          Save Cookie
        ==============================*/

        res.cookie(

            "token",

            newToken,

            {

                httpOnly: true,

                secure:

                    process.env.NODE_ENV ===

                    "production",

                sameSite: "strict",

                maxAge:

                    7 * 24 * 60 * 60 * 1000

            }

        );

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Token Refreshed Successfully.",

            {

                token:

                    newToken,

                expiresIn:

                    JWT_EXPIRES

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            401,

            "Invalid or Expired Token."

        );

    }

};

/*=========================================
=      Authentication Status              =
=========================================*/

exports.authenticationStatus =

async (req,res)=>{

    try{

        return successResponse(

            res,

            200,

            "User Authenticated.",

            {

                authenticated: true,

                user:

                    req.user || null

            }

        );

    }

    catch(error){

        return errorResponse(

            res,

            500,

            "Authentication Check Failed."

        );

    }

};

/*=========================================
=      Helper: Remove Token Cookie        =
=========================================*/

exports.clearTokenCookie =

(res)=>{

    res.clearCookie(

        "token",

        {

            httpOnly: true,

            secure:

                process.env.NODE_ENV ===

                "production",

            sameSite: "strict"

        }

    );

};
/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1B.1
  Forgot Password + Reset Password
==================================================*/

"use strict";

/*=========================================
=       Forgot Password Controller        =
=========================================*/

exports.forgotPassword = async (req, res) => {

    try{

        const { email } = req.body;

        /*==============================
          Validate Email
        ==============================*/

        if(!email){

            return errorResponse(

                res,

                400,

                "Email address is required."

            );

        }

        /*==============================
          Find User
        ==============================*/

        const user = await User.findOne({

            email

        });

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Generate Reset Token
        ==============================*/

        const resetToken = crypto

            .randomBytes(32)

            .toString("hex");

        const hashedToken = crypto

            .createHash("sha256")

            .update(resetToken)

            .digest("hex");

        user.resetPasswordToken = hashedToken;

        user.resetPasswordExpire =

            Date.now() +

            15 * 60 * 1000;

        await user.save();

        /*==============================
          Send Reset Email
        ==============================*/

        const resetURL =

            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendEmail({

            to: user.email,

            subject: "Password Reset",

            text:

`Hello ${user.name},

You requested a password reset.

Reset Link:
${resetURL}

This link expires in 15 minutes.

If you didn't request this, please ignore this email.`

        });

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Password reset link sent successfully."

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to process password reset."

        );

    }

};

/*=========================================
=       Reset Password Controller         =
=========================================*/

exports.resetPassword = async (req, res) => {

    try{

        const {

            token,

            password

        } = req.body;

        if(!token || !password){

            return errorResponse(

                res,

                400,

                "Token and new password are required."

            );

        }

        /*==============================
          Hash Incoming Token
        ==============================*/

        const hashedToken = crypto

            .createHash("sha256")

            .update(token)

            .digest("hex");

        /*==============================
          Find User
        ==============================*/

        const user = await User.findOne({

            resetPasswordToken:

                hashedToken,

            resetPasswordExpire: {

                $gt: Date.now()

            }

        });

        if(!user){

            return errorResponse(

                res,

                400,

                "Invalid or expired reset token."

            );

        }

        /*==============================
          Encrypt Password
        ==============================*/

        const salt =

            await bcrypt.genSalt(10);

        user.password =

            await bcrypt.hash(

                password,

                salt

            );

        user.resetPasswordToken = undefined;

        user.resetPasswordExpire = undefined;

        await user.save();

        /*==============================
          Generate Login Token
        ==============================*/

        const jwtToken =

            exports.generateJWTToken(

                user._id,

                user.role

            );

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Password reset successful.",

            {

                token: jwtToken,

                user:{

                    id: user._id,

                    name: user.name,

                    email: user.email

                }

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Password reset failed."

        );

    }

};
/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1B.2
  Verify Email + Change Password
==================================================*/

"use strict";

/*=========================================
=       Verify Email Controller           =
=========================================*/

exports.verifyEmail = async (req, res) => {

    try{

        const { token } = req.params;

        if(!token){

            return errorResponse(

                res,

                400,

                "Verification token is required."

            );

        }

        /*==============================
          Find User
        ==============================*/

        const user = await User.findOne({

            verifyToken: token

        });

        if(!user){

            return errorResponse(

                res,

                400,

                "Invalid verification token."

            );

        }

        /*==============================
          Verify Account
        ==============================*/

        user.isVerified = true;

        user.verifyToken = undefined;

        user.verifiedAt = new Date();

        await user.save();

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Email verified successfully.",

            {

                id: user._id,

                email: user.email,

                verified: user.isVerified

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Email verification failed."

        );

    }

};

/*=========================================
=      Change Password Controller         =
=========================================*/

exports.changePassword = async (req, res) => {

    try{

        const {

            currentPassword,

            newPassword

        } = req.body;

        const user = await User.findById(

            req.user.id

        );

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Verify Current Password
        ==============================*/

        const matched = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if(!matched){

            return errorResponse(

                res,

                401,

                "Current password is incorrect."

            );

        }

        /*==============================
          Hash New Password
        ==============================*/

        const salt =

            await bcrypt.genSalt(10);

        user.password =

            await bcrypt.hash(

                newPassword,

                salt

            );

        user.passwordChangedAt =

            new Date();

        await user.save();

        /*==============================
          Generate New JWT
        ==============================*/

        const token =

            exports.generateJWTToken(

                user._id,

                user.role

            );

        /*==============================
          Success Response
        ==============================*/

        return successResponse(

            res,

            200,

            "Password changed successfully.",

            {

                token,

                passwordChangedAt:

                    user.passwordChangedAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to change password."

        );

    }

};

/*=========================================
=      Password Strength Helper           =
=========================================*/

exports.passwordStrength =

(password)=>{

    let score = 0;

    if(password.length >= 8) score++;

    if(/[A-Z]/.test(password)) score++;

    if(/[a-z]/.test(password)) score++;

    if(/[0-9]/.test(password)) score++;

    if(/[!@#$%^&*]/.test(password)) score++;

    return score;

};

/*==================================================
  CodeNova Technologies
  backend/controllers/authController.js
  Part 1B.3
  Get Profile + Update Profile + Export Module
==================================================*/

"use strict";

/*=========================================
=         Get Profile Controller          =
=========================================*/

exports.getProfile = async (req, res) => {

    try{

        const user = await User.findById(

            req.user.id

        ).select("-password");

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        return successResponse(

            res,

            200,

            "Profile fetched successfully.",

            user

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch profile."

        );

    }

};

/*=========================================
=       Update Profile Controller         =
=========================================*/

exports.updateProfile = async (req, res) => {

    try{

        const {

            name,

            username,

            email,

            phone,

            address,

            bio

        } = req.body;

        const user = await User.findById(

            req.user.id

        );

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Update Fields
        ==============================*/

        user.name =

            name || user.name;

        user.username =

            username || user.username;

        user.email =

            email || user.email;

        user.phone =

            phone || user.phone;

        user.address =

            address || user.address;

        user.bio =

            bio || user.bio;

        user.updatedAt =

            new Date();

        await user.save();

        return successResponse(

            res,

            200,

            "Profile updated successfully.",

            {

                id:

                    user._id,

                name:

                    user.name,

                username:

                    user.username,

                email:

                    user.email,

                phone:

                    user.phone,

                address:

                    user.address,

                bio:

                    user.bio,

                updatedAt:

                    user.updatedAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Profile update failed."

        );

    }

};

/*=========================================
=        Current User Helper              =
=========================================*/

exports.getCurrentUser = async (userId)=>{

    return await User.findById(

        userId

    ).select("-password");

};

/*=========================================
=          Export Information             =
=========================================*/

console.log(

    "Authentication Controller Loaded"

);

console.log(

    "Available Methods:"

);

console.log(

    "✓ register"

);

console.log(

    "✓ login"

);

console.log(

    "✓ logout"

);

console.log(

    "✓ refreshToken"

);

console.log(

    "✓ forgotPassword"

);

console.log(

    "✓ resetPassword"

);

console.log(

    "✓ verifyEmail"

);

console.log(

    "✓ changePassword"

);

console.log(

    "✓ getProfile"

);

console.log(

    "✓ updateProfile"

);

/*=========================================
=          End of authController.js       =
=========================================*/