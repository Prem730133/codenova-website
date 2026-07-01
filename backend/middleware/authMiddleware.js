/*==================================================
  CodeNova Technologies
  backend/middleware/authMiddleware.js
  JWT Authentication Middleware
==================================================*/

"use strict";

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Authentication token missing."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretcodenovakey123");
        
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed. Invalid or expired token."
        });
    }
};
