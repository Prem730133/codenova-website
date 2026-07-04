/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1A.1
  Imports + Get All Users + Get User By ID
==================================================*/

"use strict";

/*=========================================
=            Required Packages            =
=========================================*/

const bcrypt = require("bcryptjs");

/*=========================================
=                Models                   =
=========================================*/

const User = require("../models/User");

/*=========================================
=              Helpers                    =
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
=           Get All Users                 =
=========================================*/

exports.getUsers = async (

    req,

    res

) => {

    try{
        const mongoose = require("mongoose");
        if (mongoose.connection.readyState !== 1) {
            global.mockUsers = global.mockUsers || [];
            return successResponse(res, 200, "Users fetched successfully (Mock Store).", {
                total: global.mockUsers.length,
                users: global.mockUsers
            });
        }

        const users =

            await User.find()

            .select("-password")

            .sort({

                createdAt: -1

            });

        return successResponse(

            res,

            200,

            "Users fetched successfully.",

            {

                total:

                    users.length,

                users

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch users."

        );

    }

};

/*=========================================
=          Get User By ID                 =
=========================================*/

exports.getUser = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const user =

            await User.findById(id)

            .select("-password");

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

            "User fetched successfully.",

            user

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch user."

        );

    }

};

/*=========================================
=        Get Current User Profile         =
=========================================*/

exports.getCurrentUser = async (

    req,

    res

) => {

    try{

        const user =

            await User.findById(

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

            "Current user profile fetched.",

            user

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to retrieve profile."

        );

    }

};

/*=========================================
=          Helper Functions               =
=========================================*/

exports.userExists = async (

    email

) => {

    return await User.findOne({

        email

    });

};

exports.findUserByUsername =

async (username)=>{

    return await User.findOne({

        username

    });

};

/*=========================================
=        Controller Initialization        =
=========================================*/

console.log(

    "User Controller Initialized"

);

console.log(

    "Get Users Ready"

);

console.log(

    "Get User By ID Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1A.2
  Create User + Update User
==================================================*/

"use strict";

/*=========================================
=            Create User                  =
=========================================*/

exports.createUser = async (

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

            role

        } = req.body;

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

                "Please provide all required fields."

            );

        }

        /*==============================
          Check Existing User
        ==============================*/

        const existingUser =

            await User.findOne({

                $or:[

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
          Encrypt Password
        ==============================*/

        const salt =

            await bcrypt.genSalt(10);

        const hashedPassword =

            await bcrypt.hash(

                password,

                salt

            );

        /*==============================
          Create User
        ==============================*/

        const user =

            await User.create({

                name,

                username,

                email,

                password:

                    hashedPassword,

                phone,

                role:

                    role || "user"

            });

        return successResponse(

            res,

            201,

            "User created successfully.",

            {

                id:

                    user._id,

                name:

                    user.name,

                username:

                    user.username,

                email:

                    user.email,

                role:

                    user.role

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to create user."

        );

    }

};

/*=========================================
=            Update User                  =
=========================================*/

exports.updateUser = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const {

            name,

            username,

            email,

            phone,

            role,

            status

        } = req.body;

        const user =

            await User.findById(id);

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

        user.role =

            role || user.role;

        user.status =

            status || user.status;

        user.updatedAt =

            new Date();

        await user.save();

        return successResponse(

            res,

            200,

            "User updated successfully.",

            {

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

                status:

                    user.status,

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

            "Unable to update user."

        );

    }

};
/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1A.3
  Delete User + Search Users
==================================================*/

"use strict";

/*=========================================
=            Delete User                  =
=========================================*/

exports.deleteUser = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        /*==============================
          Find User
        ==============================*/

        const user =

            await User.findById(id);

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Delete User
        ==============================*/

        await User.findByIdAndDelete(id);

        return successResponse(

            res,

            200,

            "User deleted successfully.",

            {

                id,

                deleted: true

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to delete user."

        );

    }

};

/*=========================================
=            Search Users                 =
=========================================*/

exports.searchUsers = async (

    req,

    res

) => {

    try{

        const {

            keyword,

            role,

            status

        } = req.query;

        const filter = {};

        /*==============================
          Keyword Search
        ==============================*/

        if(keyword){

            filter.$or = [

                {

                    name:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    username:{

                        $regex: keyword,

                        $options:"i"

                    }

                },

                {

                    email:{

                        $regex: keyword,

                        $options:"i"

                    }

                }

            ];

        }

        /*==============================
          Role Filter
        ==============================*/

        if(role){

            filter.role = role;

        }

        /*==============================
          Status Filter
        ==============================*/

        if(status){

            filter.status = status;

        }

        /*==============================
          Execute Search
        ==============================*/

        const users =

            await User.find(filter)

            .select("-password")

            .sort({

                createdAt:-1

            });

        return successResponse(

            res,

            200,

            "Search completed successfully.",

            {

                total:

                    users.length,

                users

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to search users."

        );

    }

};

/*=========================================
=           Helper Functions              =
=========================================*/

exports.countUsers = async () => {

    return await User.countDocuments();

};

exports.findUserByEmail = async (

    email

) => {

    return await User.findOne({

        email

    });

};

/*=========================================
=          Controller Ready               =
=========================================*/

console.log(

    "Delete User Controller Ready"

);

console.log(

    "Search Users Controller Ready"

);
/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1B.1
  Update Profile + Upload Avatar
==================================================*/

"use strict";

/*=========================================
=           Update Profile                =
=========================================*/

exports.updateProfile = async (

    req,

    res

) => {

    try{

        const user =

            await User.findById(

                req.user.id

            );

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        const {

            name,

            username,

            email,

            phone,

            address,

            bio

        } = req.body;

        /*==============================
          Update User Fields
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

                user

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to update profile."

        );

    }

};

/*=========================================
=           Upload Avatar                 =
=========================================*/

exports.uploadAvatar = async (

    req,

    res

) => {

    try{

        const user =

            await User.findById(

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
          Validate Upload
        ==============================*/

        if(!req.file){

            return errorResponse(

                res,

                400,

                "Please upload an image."

            );

        }

        /*==============================
          Save Avatar Information
        ==============================*/

        user.avatar = {

            filename:

                req.file.filename,

            originalName:

                req.file.originalname,

            mimeType:

                req.file.mimetype,

            size:

                req.file.size,

            path:

                req.file.path

        };

        user.updatedAt =

            new Date();

        await user.save();

        return successResponse(

            res,

            200,

            "Avatar uploaded successfully.",

            {

                avatar:

                    user.avatar

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Avatar upload failed."

        );

    }

};

/*=========================================
=        Remove Avatar Helper             =
=========================================*/

exports.removeAvatar = async (

    req,

    res

) => {

    try{

        const user =

            await User.findById(

                req.user.id

            );

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        user.avatar = null;

        user.updatedAt =

            new Date();

        await user.save();

        return successResponse(

            res,

            200,

            "Avatar removed successfully."

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to remove avatar."

        );

    }

};

/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1B.2
  Change User Status + User Statistics
==================================================*/

"use strict";

/*=========================================
=        Change User Status               =
=========================================*/

exports.changeUserStatus = async (

    req,

    res

) => {

    try{

        const { id } = req.params;

        const { status } = req.body;

        /*==============================
          Validate Status
        ==============================*/

        const allowedStatus = [

            "active",

            "inactive",

            "blocked",

            "pending"

        ];

        if(

            !allowedStatus.includes(status)

        ){

            return errorResponse(

                res,

                400,

                "Invalid user status."

            );

        }

        /*==============================
          Find User
        ==============================*/

        const user =

            await User.findById(id);

        if(!user){

            return errorResponse(

                res,

                404,

                "User not found."

            );

        }

        /*==============================
          Update Status
        ==============================*/

        user.status = status;

        user.updatedAt =

            new Date();

        await user.save();

        return successResponse(

            res,

            200,

            "User status updated successfully.",

            {

                id: user._id,

                name: user.name,

                status: user.status,

                updatedAt: user.updatedAt

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to update user status."

        );

    }

};

/*=========================================
=          User Statistics                =
=========================================*/

exports.getUserStatistics = async (

    req,

    res

) => {

    try{

        const totalUsers =

            await User.countDocuments();

        const activeUsers =

            await User.countDocuments({

                status: "active"

            });

        const inactiveUsers =

            await User.countDocuments({

                status: "inactive"

            });

        const blockedUsers =

            await User.countDocuments({

                status: "blocked"

            });

        const adminUsers =

            await User.countDocuments({

                role: "admin"

            });

        const regularUsers =

            await User.countDocuments({

                role: "user"

            });

        return successResponse(

            res,

            200,

            "User statistics fetched successfully.",

            {

                totalUsers,

                activeUsers,

                inactiveUsers,

                blockedUsers,

                adminUsers,

                regularUsers

            }

        );

    }

    catch(error){

        console.error(error);

        return errorResponse(

            res,

            500,

            "Unable to fetch user statistics."

        );

    }

};

/*=========================================
=          Statistics Helper              =
=========================================*/

exports.userCountByRole = async (

    role

) => {

    return await User.countDocuments({

        role

    });

};

exports.userCountByStatus = async (

    status

) => {

    return await User.countDocuments({

        status

    });

};

/*=========================================
  End of Part 1B.2
=========================================*/
/*==================================================
  CodeNova Technologies
  backend/controllers/userController.js
  Part 1B.3
  Helper Functions + Export Information
==================================================*/

"use strict";

/*=========================================
=          Helper Functions               =
=========================================*/

/* Find User By Email */

exports.findUserByEmail = async (

    email

) => {

    return await User.findOne({

        email

    });

};

/* Find User By Username */

exports.findUserByUsername = async (

    username

) => {

    return await User.findOne({

        username

    });

};

/* Find User By ID */

exports.findUserById = async (

    id

) => {

    return await User.findById(id);

};

/* Count Total Users */

exports.countUsers = async () => {

    return await User.countDocuments();

};

/* Check User Exists */

exports.userExists = async (

    email

) => {

    const user =

        await User.findOne({

            email

        });

    return !!user;

};

/* Generate Public Profile */

exports.publicProfile = (

    user

) => {

    return {

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

        role:

            user.role,

        status:

            user.status,

        avatar:

            user.avatar,

        createdAt:

            user.createdAt

    };

};

/*=========================================
=         Validation Helpers              =
=========================================*/

exports.isAdmin = function(user){

    return (

        user &&

        user.role === "admin"

    );

};

exports.isActiveUser = function(user){

    return (

        user &&

        user.status === "active"

    );

};

exports.currentTimestamp = function(){

    return new Date()

        .toISOString();

};

/*=========================================
=       Controller Information            =
=========================================*/

const ControllerInfo = {

    name:

        "User Controller",

    version:

        "1.0.0",

    company:

        "CodeNova Technologies",

    framework:

        "Express.js",

    initialized:

        true

};

console.log(

    "===================================="

);

console.log(

    "User Controller Loaded"

);

console.table(

    ControllerInfo

);

console.log(

    "Available Controllers"

);

console.log(

    "✓ getUsers"

);

console.log(

    "✓ getUser"

);

console.log(

    "✓ createUser"

);

console.log(

    "✓ updateUser"

);

console.log(

    "✓ deleteUser"

);

console.log(

    "✓ searchUsers"

);

console.log(

    "✓ updateProfile"

);

console.log(

    "✓ uploadAvatar"

);

console.log(

    "✓ changeUserStatus"

);

console.log(

    "✓ getUserStatistics"

);

console.log(

    "===================================="

);

