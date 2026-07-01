/*==================================================
  CodeNova Technologies
  backend/routes/newsletterRoutes.js
  Newsletter Subscription Routes
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

    subscribe,

    unsubscribe,

    getSubscribers,

    getSubscriberById,

    updateSubscriber,

    deleteSubscriber,

    searchSubscribers,

    sendNewsletter,

    newsletterStatistics,

    exportSubscribers

} = require("../controllers/newsletterController");

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

/* Subscribe Newsletter */

router.post(

    "/subscribe",

    validationMiddleware,

    subscribe

);

/* Unsubscribe Newsletter */

router.post(

    "/unsubscribe",

    validationMiddleware,

    unsubscribe

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Get All Subscribers */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getSubscribers

);

/* Search Subscribers */

router.get(

    "/search",

    authMiddleware,

    adminMiddleware,

    searchSubscribers

);

/* Get Subscriber By ID */

router.get(

    "/:id",

    authMiddleware,

    adminMiddleware,

    getSubscriberById

);

/* Update Subscriber */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateSubscriber

);

/* Delete Subscriber */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteSubscriber

);

/* Send Newsletter */

router.post(

    "/send",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    sendNewsletter

);

/* Export Subscribers */

router.get(

    "/export/csv",

    authMiddleware,

    adminMiddleware,

    exportSubscribers

);

/* Newsletter Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    newsletterStatistics

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Newsletter Management",

            message:

                "Newsletter Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "POST /subscribe",

                "POST /unsubscribe",

                "GET /",

                "GET /search",

                "GET /:id",

                "PUT /:id",

                "DELETE /:id",

                "POST /send",

                "GET /export/csv",

                "GET /admin/statistics"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "Newsletter Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of newsletterRoutes.js
=========================================*/