/*==================================================
  CodeNova Technologies
  backend/routes/careerRoutes.js
  Career Applications Routes
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

    getAllJobs,

    getJobById,

    createJob,

    updateJob,

    deleteJob,

    applyForJob,

    getApplications,

    getApplicationById,

    updateApplicationStatus,

    deleteApplication,

    searchJobs,

    featuredJobs,

    careerStatistics

} = require("../controllers/careerController");

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
=              Public Routes              =
=========================================*/

/* Get All Career Opportunities */

router.get(

    "/",

    getAllJobs

);

/* Search Jobs */

router.get(

    "/search",

    searchJobs

);

/* Featured Jobs */

router.get(

    "/featured",

    featuredJobs

);

/* Get Job By ID */

router.get(

    "/job/:id",

    getJobById

);

/* Apply For Job */

router.post(

    "/apply",

    uploadMiddleware.single("resume"),

    validationMiddleware,

    applyForJob

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Create New Job */

router.post(

    "/job",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    createJob

);

/* Update Job */

router.put(

    "/job/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateJob

);

/* Delete Job */

router.delete(

    "/job/:id",

    authMiddleware,

    adminMiddleware,

    deleteJob

);

/* Get All Applications */

router.get(

    "/applications",

    authMiddleware,

    adminMiddleware,

    getApplications

);

/* Get Application By ID */

router.get(

    "/applications/:id",

    authMiddleware,

    adminMiddleware,

    getApplicationById

);

/* Update Application Status */

router.patch(

    "/applications/:id/status",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateApplicationStatus

);

/* Delete Application */

router.delete(

    "/applications/:id",

    authMiddleware,

    adminMiddleware,

    deleteApplication

);

/* Career Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    careerStatistics

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Career Management",

            message:

                "Career Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "GET /",

                "GET /search",

                "GET /featured",

                "GET /job/:id",

                "POST /apply",

                "POST /job",

                "PUT /job/:id",

                "DELETE /job/:id",

                "GET /applications",

                "GET /applications/:id",

                "PATCH /applications/:id/status",

                "DELETE /applications/:id",

                "GET /admin/statistics"

            ]

        });

    }

);

/*=========================================
=            Route Loaded Log             =
=========================================*/

console.log(

    "Career Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of careerRoutes.js
=========================================*/