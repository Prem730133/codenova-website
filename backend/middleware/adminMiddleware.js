/*==================================================
  CodeNova Technologies
  backend/middleware/adminMiddleware.js
  Admin Authorization Middleware
==================================================*/

"use strict";

module.exports = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Administrator privileges required."
        });
    }
};
