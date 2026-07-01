/*==================================================
  CodeNova Technologies
  backend/server.js
  Part 1A.1
  Express Setup + Middleware
==================================================*/

"use strict";

/*=========================================
=            Required Packages            =
=========================================*/

const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

/*=========================================
=         Load Environment File           =
=========================================*/

dotenv.config();

/*=========================================
=          Create Express App             =
=========================================*/

const app = express();

/*=========================================
=          Application Settings           =
=========================================*/

const PORT =
    process.env.PORT || 5000;

const NODE_ENV =
    process.env.NODE_ENV || "development";

/*=========================================
=            Global Middleware            =
=========================================*/

// Parse JSON

app.use(

    express.json({

        limit: "10mb"

    })

);

// Parse URL Encoded Data

app.use(

    express.urlencoded({

        extended: true,

        limit: "10mb"

    })

);

// Parse Cookies

app.use(

    cookieParser()

);

/*=========================================
=             Security Middleware         =
=========================================*/

app.use(

    helmet({

        crossOriginResourcePolicy: false

    })

);

app.use(

    cors({

        origin: process.env.CLIENT_URL ||

            "*",

        credentials: true

    })

);

/*=========================================
=          Compression Middleware         =
=========================================*/

app.use(

    compression()

);

/*=========================================
=             Logger Middleware           =
=========================================*/

app.use(

    morgan(

        NODE_ENV === "production"

        ? "combined"

        : "dev"

    )

);

/*=========================================
=           Rate Limiting                 =
=========================================*/

const apiLimiter = rateLimit({

    windowMs:

        15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message:

            "Too many requests. Please try again later."

    }

});

app.use(

    "/api",

    apiLimiter

);

/*=========================================
=          Static Public Folder           =
=========================================*/

app.use(

    express.static(

        path.join(

            __dirname,

            "../client"

        )

    )

);

/*=========================================
=           Health Check Route            =
=========================================*/

app.get(

    "/",

    (req,res)=>{

        res.status(200).json({

            success: true,

            application:

                "CodeNova Backend",

            version: "1.0.0",

            environment:

                NODE_ENV,

            message:

                "Server Running Successfully"

        });

    }

);

/*=========================================
=           API Status Route              =
=========================================*/

app.get(

    "/api/status",

    (req,res)=>{

        res.status(200).json({

            success: true,

            uptime:

                process.uptime(),

            timestamp:

                new Date(),

            memory:

                process.memoryUsage()

        });

    }

);

/*=========================================
=        Global Request Logger            =
=========================================*/

app.use(

    (req,res,next)=>{

        console.log(

            `[${new Date().toISOString()}]`,

            req.method,

            req.originalUrl

        );

        next();

    }

);

/*=========================================
=         Middleware Complete             =
=========================================*/

console.log(

    "Express Middleware Loaded"

);

console.log(

    "Environment:",

    NODE_ENV

);

console.log(

    "Server Port:",

    PORT

);
/*==================================================
  CodeNova Technologies
  backend/server.js
  Part 1A.2
  Database Connection + Routes
==================================================*/

"use strict";

/*=========================================
=          Database Configuration         =
=========================================*/

const connectDB =
    require("./config/db");

/*=========================================
=             API Routes                  =
=========================================*/

const authRoutes =
    require("./routers/auth routes");

const userRoutes =
    require("./routers/user routes");

const contactRoutes =
    require("./routers/contactroutes");

const serviceRoutes =
    require("./routers/servicesroutes");

const portfolioRoutes =
    require("./routers/portofoiloroutes");

const pricingRoutes =
    require("./routers/pricingroutes");

const careerRoutes =
    require("./routers/carrerroutes");

const newsletterRoutes =
    require("./routers/newsletterrouters");

const dashboardRoutes =
    require("./routers/dashboardroutes");

const uploadRoutes =
    require("./routers/upload routers");

/*=========================================
=        Connect Database                 =
=========================================*/

async function initializeDatabase(){

    try{

        await connectDB();

        console.log(

            "Database Connected Successfully"

        );

    }

    catch(error){

        console.error(

            "Database Connection Failed"

        );

        console.error(

            error.message

        );

        process.exit(1);

    }

}

initializeDatabase();

/*=========================================
=         Register API Routes             =
=========================================*/

app.use(

    "/api/auth",

    authRoutes

);

app.use(

    "/api/users",

    userRoutes

);

app.use(

    "/api/contact",

    contactRoutes

);

app.use(

    "/api/services",

    serviceRoutes

);

app.use(

    "/api/portfolio",

    portfolioRoutes

);

app.use(

    "/api/pricing",

    pricingRoutes

);

app.use(

    "/api/careers",

    careerRoutes

);

app.use(

    "/api/newsletter",

    newsletterRoutes

);

app.use(

    "/api/dashboard",

    dashboardRoutes

);

app.use(

    "/api/upload",

    uploadRoutes

);

/*=========================================
=            API Information              =
=========================================*/

app.get(

    "/api",

    (req,res)=>{

        res.status(200).json({

            success:true,

            application:

                "CodeNova Technologies",

            backend:

                "Express.js",

            version:

                "1.0.0",

            database:

                "Connected",

            endpoints:[

                "/api/auth",

                "/api/users",

                "/api/contact",

                "/api/services",

                "/api/portfolio",

                "/api/pricing",

                "/api/careers",

                "/api/newsletter",

                "/api/dashboard",

                "/api/upload"

            ]

        });

    }

);

/*=========================================
=         Unknown API Route               =
=========================================*/

app.use(

    "/api/*",

    (req,res)=>{

        res.status(404).json({

            success:false,

            message:

                "API Route Not Found",

            url:

                req.originalUrl

        });

    }

);

/*=========================================
=        Route Initialization Log         =
=========================================*/

console.log(

    "Authentication Routes Loaded"

);

console.log(

    "User Routes Loaded"

);

console.log(

    "Contact Routes Loaded"

);

console.log(

    "Service Routes Loaded"

);

console.log(

    "Portfolio Routes Loaded"

);

console.log(

    "Pricing Routes Loaded"

);

console.log(

    "Career Routes Loaded"

);

console.log(

    "Newsletter Routes Loaded"

);

console.log(

    "Dashboard Routes Loaded"

);

console.log(

    "Upload Routes Loaded"

);

/*==================================================
  CodeNova Technologies
  backend/server.js
  Part 1A.3
  Error Handling + Server Initialization
==================================================*/

"use strict";

/*=========================================
=         404 Page Not Found              =
=========================================*/

app.use((req, res) => {

    res.status(404).json({

        success: false,

        status: 404,

        message: "Requested resource not found.",

        method: req.method,

        path: req.originalUrl,

        timestamp: new Date().toISOString()

    });

});

/*=========================================
=        Global Error Middleware          =
=========================================*/

app.use((err, req, res, next) => {

    console.error("========== SERVER ERROR ==========");

    console.error(err.stack);

    console.error("==================================");

    const statusCode =
        err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        status: statusCode,

        message:

            err.message ||

            "Internal Server Error",

        ...(NODE_ENV === "development" && {

            stack: err.stack

        })

    });

});

/*=========================================
=     Handle Uncaught Exceptions          =
=========================================*/

process.on(

    "uncaughtException",

    (error) => {

        console.error(

            "UNCAUGHT EXCEPTION"

        );

        console.error(

            error.name

        );

        console.error(

            error.message

        );

        console.error(

            error.stack

        );

        process.exit(1);

    }

);

/*=========================================
=    Handle Unhandled Rejections          =
=========================================*/

process.on(

    "unhandledRejection",

    (reason) => {

        console.error(

            "UNHANDLED PROMISE REJECTION"

        );

        console.error(reason);

    }

);

/*=========================================
=         Graceful Shutdown               =
=========================================*/

process.on(

    "SIGINT",

    () => {

        console.log(

            "\nStopping Server..."

        );

        process.exit(0);

    }

);

process.on(

    "SIGTERM",

    () => {

        console.log(

            "\nServer Terminated."

        );

        process.exit(0);

    }

);

/*=========================================
=       Start Express Server              =
=========================================*/

const server = app.listen(

    PORT,

    () => {

        console.log(

            "==================================="

        );

        console.log(

            " CodeNova Technologies Backend "

        );

        console.log(

            "==================================="

        );

        console.log(

            "Server Started Successfully"

        );

        console.log(

            `Environment : ${NODE_ENV}`

        );

        console.log(

            `Port        : ${PORT}`

        );

        console.log(

            `URL         : http://localhost:${PORT}`

        );

        console.log(

            `Started At  : ${new Date().toLocaleString()}`

        );

        console.log(

            "==================================="

        );

    }

);

/*=========================================
=      Server Error Event                 =
=========================================*/

server.on(

    "error",

    (error) => {

        console.error(

            "Server Startup Failed"

        );

        console.error(

            error.message

        );

    }

);

/*=========================================
=      Server Close Event                 =
=========================================*/

server.on(

    "close",

    () => {

        console.log(

            "Express Server Closed"

        );

    }

);

/*=========================================
=      Export Express App                 =
=========================================*/

module.exports = {

    app,

    server

};

/*=========================================
=         Development Banner              =
=========================================*/

console.log(
"=========================================="
);

console.log(
" CodeNova Technologies "
);

console.log(
" Express.js Backend "
);

console.log(
" Version : 1.0.0 "
);

console.log(
" Environment : " + NODE_ENV
);

console.log(
" Backend Ready Successfully "
);

console.log(
"=========================================="
);
