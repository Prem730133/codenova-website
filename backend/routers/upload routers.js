/*==================================================
  CodeNova Technologies
  backend/routes/uploadRoutes.js
  File Upload API Routes
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

    uploadSingleFile,

    uploadMultipleFiles,

    uploadImage,

    uploadDocument,

    getUploadedFiles,

    getFileById,

    downloadFile,

    updateFile,

    deleteFile,

    fileStatistics

} = require("../controllers/uploadController");

/*=========================================
=              Middleware                 =
=========================================*/

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const uploadMiddleware =
    require("../middleware/uploadMiddleware");

const validationMiddleware =
    require("../middleware/validationMiddleware");

/*=========================================
=          Public Upload Routes           =
=========================================*/

/* Upload Single File */

router.post(

    "/single",

    uploadMiddleware.single("file"),

    validationMiddleware,

    uploadSingleFile

);

/* Upload Multiple Files */

router.post(

    "/multiple",

    uploadMiddleware.array(

        "files",

        10

    ),

    validationMiddleware,

    uploadMultipleFiles

);

/* Upload Image */

router.post(

    "/image",

    uploadMiddleware.single(

        "image"

    ),

    validationMiddleware,

    uploadImage

);

/* Upload Document */

router.post(

    "/document",

    uploadMiddleware.single(

        "document"

    ),

    validationMiddleware,

    uploadDocument

);

/*=========================================
=         Protected File Routes           =
=========================================*/

/* Get All Uploaded Files */

router.get(

    "/",

    authMiddleware,

    adminMiddleware,

    getUploadedFiles

);

/* Get File By ID */

router.get(

    "/:id",

    authMiddleware,

    getFileById

);

/* Download File */

router.get(

    "/download/:id",

    authMiddleware,

    downloadFile

);

/* Update File Information */

router.put(

    "/:id",

    authMiddleware,

    adminMiddleware,

    validationMiddleware,

    updateFile

);

/* Delete File */

router.delete(

    "/:id",

    authMiddleware,

    adminMiddleware,

    deleteFile

);

/* File Statistics */

router.get(

    "/admin/statistics",

    authMiddleware,

    adminMiddleware,

    fileStatistics

);

/*=========================================
=           Upload Status API             =
=========================================*/

router.get(

    "/status/check",

    (req,res)=>{

        res.status(200).json({

            success:true,

            module:"File Upload",

            message:

                "Upload Routes Working Successfully",

            timestamp:

                new Date(),

            endpoints:[

                "POST /single",

                "POST /multiple",

                "POST /image",

                "POST /document",

                "GET /",

                "GET /:id",

                "GET /download/:id",

                "PUT /:id",

                "DELETE /:id",

                "GET /admin/statistics"

            ]

        });

    }

);

/*=========================================
=          Route Initialization           =
=========================================*/

console.log(

    "Upload Routes Loaded"

);

/*=========================================
=             Export Router               =
=========================================*/

module.exports = router;

/*=========================================
  End of uploadRoutes.js
=========================================*/