/*==================================================
  CodeNova Technologies
  backend/models/Service.js
  Service Model Schema
==================================================*/

"use strict";

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        duration: {
            type: String
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Service", serviceSchema);
