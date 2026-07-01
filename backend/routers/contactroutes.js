/*==================================================
  CodeNova Technologies
  backend/routes/contactRoutes.js
  Contact Form Routes
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

    submitContact,

    getAllContacts,

    getContactById,

    updateContact,

    deleteContact,

    replyToContact,

    markAsRead,

    getUnreadContacts,

    searchContacts,

    contactStatistics

} = require("../controllers/contactController");

/*=========================================
=              Middleware                 =
=========================================*/

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const validationMiddleware =
    require("../middleware/validationMiddleware");

/*=========================================
=              Public Routes              =
=========================================*/

/* Submit Contact Form */

router.post(

    "/",

    validationMiddleware,

    submitContact

);

/* Search Contact */

router.get(

    "/search",

    validationMiddleware,

    searchContacts

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Get All Contacts */

router.get(

    "/all",

    authMiddleware,

    adminMiddleware,

    getAllContacts

);

/* Get Contact Statistics */

router.get(

    "/statistics",

    authMiddleware,

    adminMiddleware,

    contactStatistics

);

/* Get Unread Contacts */

router.get(

    "/unread",

    authMiddleware,

    adminMiddleware,

    getUnreadContacts

);

/* Get Contact By ID */

router.get(

    "/:id",

    authMiddleware,

    adminMiddleware,

    getContactById

);

/* Update Contact */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateContact

);

/* Delete Contact */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteContact

);

/* Reply To Contact */

router.post(

    "/:id/reply",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    replyToContact

);

/* Mark Contact As Read */

router.patch(

    "/:id/read",

    authMiddleware,

    adminMiddleware,

    markAsRead

);

/*=========================================
=            Health Check Route           =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Contact Management",

            message:

                "Contact Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints: [

                "POST /",

                "GET /all",

                "GET /search",

                "GET /statistics",

                "GET /unread",

                "GET /:id",

                "PUT /:id",

                "DELETE /:id",

                "POST /:id/reply",

                "PATCH /:id/read"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "Contact Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of contactRoutes.js
=========================================*/