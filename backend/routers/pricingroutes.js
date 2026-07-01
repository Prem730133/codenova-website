/*==================================================
  CodeNova Technologies
  backend/routes/pricingRoutes.js
  Pricing Plans Routes
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

    getAllPlans,

    getPlanById,

    createPlan,

    updatePlan,

    deletePlan,

    searchPlans,

    featuredPlans,

    comparePlans,

    pricingStatistics,

    togglePlanStatus,

    calculatePrice

} = require("../controllers/pricingController");

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

/* Get All Pricing Plans */

router.get(

    "/",

    getAllPlans

);

/* Search Pricing Plans */

router.get(

    "/search",

    searchPlans

);

/* Featured Plans */

router.get(

    "/featured",

    featuredPlans

);

/* Compare Pricing Plans */

router.get(

    "/compare",

    comparePlans

);

/* Price Calculator */

router.post(

    "/calculate",

    validationMiddleware,

    calculatePrice

);

/* Get Plan By ID */

router.get(

    "/:id",

    getPlanById

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Create Pricing Plan */

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    createPlan

);

/* Update Pricing Plan */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updatePlan

);

/* Delete Pricing Plan */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deletePlan

);

/* Toggle Pricing Plan Status */

router.patch(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    togglePlanStatus

);

/* Pricing Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    pricingStatistics

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Pricing Management",

            message:

                "Pricing Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints: [

                "GET /",

                "GET /search",

                "GET /featured",

                "GET /compare",

                "POST /calculate",

                "GET /:id",

                "POST /",

                "PUT /:id",

                "DELETE /:id",

                "PATCH /:id/status",

                "GET /admin/statistics"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "Pricing Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of pricingRoutes.js
=========================================*/