/*==================================================
  CodeNova Technologies
  backend/models/User.js
  User Model Schema
==================================================*/

"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        verifyToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verifiedAt: {
            type: Date
        },
        role: {
            type: String,
            default: "user"
        },
        lastLogin: {
            type: Date
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpire: {
            type: Date
        },
        address: {
            type: String
        },
        bio: {
            type: String
        },
        passwordChangedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
