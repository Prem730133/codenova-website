/*==================================================
  CodeNova Technologies
  backend/models/Contact.js
  Contact Model Schema
==================================================*/

"use strict";

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "unread",
            enum: ["unread", "read", "replied"]
        },
        readAt: {
            type: Date
        },
        reply: {
            text: {
                type: String
            },
            repliedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            repliedAt: {
                type: Date
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);
