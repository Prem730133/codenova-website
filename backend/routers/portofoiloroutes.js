/*==================================================
  CodeNova Technologies
  backend/routes/portfolioRoutes.js
  Portfolio Project Routes
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

    getAllProjects,

    getProjectById,

    createProject,

    updateProject,

    deleteProject,

    searchProjects,

    featuredProjects,

    projectStatistics,

    projectCategories,

    getProjectsByTechnology,

    uploadProjectImages,

    toggleProjectStatus

} = require("../controllers/portfolioController");

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

/* Get All Portfolio Projects */

router.get(

    "/",

    getAllProjects

);

/* Search Projects */

router.get(

    "/search",

    searchProjects

);

/* Featured Projects */

router.get(

    "/featured",

    featuredProjects

);

/* Project Categories */

router.get(

    "/categories",

    projectCategories

);

/* Projects By Technology */

router.get(

    "/technology/:technology",

    getProjectsByTechnology

);

/* Get Project By ID */

router.get(

    "/:id",

    getProjectById

);

/*=========================================
=            Protected Routes             =
=========================================*/

/* Create Project */

router.post(

    "/",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    createProject

);

/* Upload Project Images */

router.post(

    "/:id/upload",

    authMiddleware,

    adminMiddleware,

    uploadMiddleware.array("images", 5),

    uploadProjectImages

);

/* Update Project */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateProject

);

/* Delete Project */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteProject

);

/* Toggle Project Status */

router.patch(

    "/:id/status",

    authMiddleware,

    adminMiddleware,

    toggleProjectStatus

);

/* Project Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    projectStatistics

);

/*=========================================
=             Health Check                =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success: true,

            module: "Portfolio Management",

            message:

                "Portfolio Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints: [

                "GET /",

                "GET /search",

                "GET /featured",

                "GET /categories",

                "GET /technology/:technology",

                "GET /:id",

                "POST /",

                "POST /:id/upload",

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

    "Portfolio Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of portfolioRoutes.js
=========================================*/