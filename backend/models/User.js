/*==================================================
  CodeNova Technologies
  backend/models/User.js
  User Model Schema (Expanded)
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
        profilePhoto: {
            type: String
        },
        academicInfo: {
            collegeName: { type: String },
            university: { type: String },
            branch: { type: String },
            yearOfStudy: { type: String },
            rollNumber: { type: String },
            cgpa: { type: Number }
        },
        skills: {
            type: [String],
            default: []
        },
        otherSkills: {
            type: String
        },
        courseSelection: {
            type: String
        },
        internshipSelection: {
            type: String
        },
        documents: {
            resume: { type: String },
            idCard: { type: String },
            certificate: { type: String }
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
