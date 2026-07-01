/*==================================================
  CodeNova Technologies
  backend/routes/dashboardRoutes.js
  Admin Dashboard API Routes
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

    getDashboard,

    getStatistics,

    getAnalytics,

    getRecentActivities,

    getNotifications,

    getSystemStatus,

    getRevenueReport,

    getUserReport,

    getProjectReport,

    getContactReport,

    clearNotifications,

    dashboardSettings

} = require("../controllers/dashboardController");

/*=========================================
=              Middleware                 =
=========================================*/

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

/*=========================================
=          Protected Dashboard APIs       =
=========================================*/

/* Dashboard Home */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getDashboard

);

/* Dashboard Statistics */

router.get(

    "/statistics",

    authMiddleware,

    adminMiddleware,

    getStatistics

);

/* Dashboard Analytics */

router.get(

    "/analytics",

    authMiddleware,

    adminMiddleware,

    getAnalytics

);

/* Recent Activities */

router.get(

    "/activities",

    authMiddleware,

    adminMiddleware,

    getRecentActivities

);

/* Notifications */

router.get(

    "/notifications",

    authMiddleware,

    adminMiddleware,

    getNotifications

);

/* Clear Notifications */

router.delete(

    "/notifications",

    authMiddleware,

    adminMiddleware,

    clearNotifications

);

/*=========================================
=             Reports APIs                =
=========================================*/

/* Revenue Report */

router.get(

    "/reports/revenue",

    authMiddleware,

    adminMiddleware,

    getRevenueReport

);

/* User Report */

router.get(

    "/reports/users",

    authMiddleware,

    adminMiddleware,

    getUserReport

);

/* Portfolio Report */

router.get(

    "/reports/projects",

    authMiddleware,

    adminMiddleware,

    getProjectReport

);

/* Contact Report */

router.get(

    "/reports/contacts",

    authMiddleware,

    adminMiddleware,

    getContactReport

);

/*=========================================
=         Dashboard Configuration         =
=========================================*/

/* System Status */

router.get(

    "/system-status",

    authMiddleware,

    adminMiddleware,

    getSystemStatus

);

/* Dashboard Settings */

router.put(

    "/settings",

    authMiddleware,

    adminMiddleware,

    dashboardSettings

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Admin Dashboard",

            message:

                "Dashboard Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "GET /",

                "GET /statistics",

                "GET /analytics",

                "GET /activities",

                "GET /notifications",

                "DELETE /notifications",

                "GET /reports/revenue",

                "GET /reports/users",

                "GET /reports/projects",

                "GET /reports/contacts",

                "GET /system-status",

                "PUT /settings"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "Dashboard Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of dashboardRoutes.js
=========================================*/
