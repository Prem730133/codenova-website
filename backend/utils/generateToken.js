/*==================================================
  CodeNova Technologies
  backend/utils/generateToken.js
  JWT Token Generator
==================================================*/

"use strict";

const jwt = require("jsonwebtoken");

module.exports = (id, role = "user") => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET || "supersecretcodenovakey123",
        {
            expiresIn: process.env.JWT_EXPIRES || "7d"
        }
    );
};
