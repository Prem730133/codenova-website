/*==================================================
  CodeNova Technologies
  backend/config/db.js
  Database Connection Setup
==================================================*/

"use strict";

const mongoose = require("mongoose");

// Disable Mongoose command buffering to prevent requests from hanging if MongoDB is offline
mongoose.set("bufferCommands", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/codenova", {
            serverSelectionTimeoutMS: 3000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.warn("==================================================");
        console.warn("WARNING: MongoDB connection failed!");
        console.warn("Reason:", error.message);
        console.warn("The server will start, but database APIs will fail fast.");
        console.warn("==================================================");
        // We do not rethrow the error, allowing server.js to start.
    }
};

module.exports = connectDB;
