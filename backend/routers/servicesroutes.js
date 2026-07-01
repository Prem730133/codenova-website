/*==================================================
  CodeNova Technologies
  backend/routes/serviceRoutes.js
  Services Routes
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

    getAllServices,

    getServiceById,

    createService,

    updateService,

    deleteService,

    searchServices,

    featuredServices,

    serviceStatistics,

    serviceCategories,

    toggleServiceStatus

} = require("../controllers/serviceController");

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

/* Get All Services */

router.get(

    "/",

    getAllServices

);

/* Search Services */

router.get(

    "/search",

    searchServices

);

/* Featured Services */

router.get(

    "/featured",

    featuredServices

);

/* Service Categories */

router.get(

    "/categories",

    serviceCategories

);

/* Get Service By ID */

router.get(

    "/:id",

    getServiceById

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Create Service */

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    createService

);

/* Update Service */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateService

);

/* Delete Service */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteService

);

/* Toggle Service Status */

router.patch(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    toggleServiceStatus

);

/* Service Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    serviceStatistics

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success:true,

            module:"Service Management",

            message:

                "Service Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "GET /",

                "GET /search",

                "GET /featured",

                "GET /categories",

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
=          Route Loaded Log               =
=========================================*/

console.log(

    "Service Routes Loaded"

);

/*=========================================
=            Export Router                =
=========================================*/

module.exports = router;

/*=========================================
  End of serviceRoutes.js
=========================================*/