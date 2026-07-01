/*==================================================
  CodeNova Technologies
  backend/routes/userRoutes.js
  User CRUD Routes
==================================================*/

"use strict";

/*=========================================
=            Required Modules             =
=========================================*/

const express = require("express");

const router = express.Router();

/*=========================================
=              Controllers                =
=========================================*/

const {

    getUsers,

    getUser,

    createUser,

    updateUser,

    deleteUser,

    updateProfile,

    uploadAvatar,

    changeUserStatus,

    searchUsers,

    getUserStatistics

} = require("../controllers/userController");

/*=========================================
=              Middleware                 =
=========================================*/

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const validationMiddleware =
    require("../middleware/validationMiddleware");

const uploadMiddleware =
    require("../middleware/uploadMiddleware");

/*=========================================
=          Protected User Routes          =
=========================================*/

/* Get All Users */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getUsers

);

/* Search Users */

router.get(

    "/search",

    authMiddleware,

    adminMiddleware,

    searchUsers

);

/* User Statistics */

router.get(

    "/statistics",

    authMiddleware,

    adminMiddleware,

    getUserStatistics

);

/* Get User By ID */

router.get(

    "/:id",

    authMiddleware,

    getUser

);

/* Create User */

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    createUser

);

/* Update User */

router.put(

    "/:id",

    authMiddleware,

    validationMiddleware,

    updateUser

);

/* Delete User */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteUser

);

/*=========================================
=          Profile Management             =
=========================================*/

/* Update Profile */

router.put(

    "/profile/update",

    authMiddleware,

    validationMiddleware,

    updateProfile

);

/* Upload Avatar */

router.post(

    "/profile/avatar",

    authMiddleware,

    uploadMiddleware.single("avatar"),

    uploadAvatar

);

/* Change User Status */

router.patch(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    changeUserStatus

);

/*=========================================
=              Health Check               =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success:true,

            module:"User Management",

            message:

                "User Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "GET /",

                "GET /:id",

                "POST /",

                "PUT /:id",

                "DELETE /:id",

                "PUT /profile/update",

                "POST /profile/avatar",

                "PATCH /:id/status"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "User CRUD Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of userRoutes.js
=========================================*/
