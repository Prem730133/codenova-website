/*==================================================
  CodeNova Technologies
  backend/controllers/dashboardController.js
  Admin Dashboard Controller (Mock Implementation)
==================================================*/

"use strict";

function successResponse(res, status, message, data = {}) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

exports.getDashboard = async (req, res) => {
    return successResponse(res, 200, "Dashboard details fetched successfully.", {
        usersCount: 45,
        contactsCount: 15,
        servicesCount: 5,
        projectsCount: 8
    });
};

exports.getStatistics = async (req, res) => {
    return successResponse(res, 200, "Statistics fetched successfully.", {
        traffic: { visitors: 10450, unique: 8400 }
    });
};

exports.getAnalytics = async (req, res) => {
    return successResponse(res, 200, "Analytics fetched successfully.", {
        bounceRate: "28.5%",
        avgSessionDuration: "4m 12s"
    });
};

exports.getRecentActivities = async (req, res) => {
    return successResponse(res, 200, "Recent activities fetched successfully.", {
        activities: [
            { id: "1", type: "user_signup", description: "New developer registered.", timestamp: new Date() },
            { id: "2", type: "contact_submission", description: "Inquiry on mobile development.", timestamp: new Date() }
        ]
    });
};

exports.getNotifications = async (req, res) => {
    return successResponse(res, 200, "Notifications fetched successfully.", {
        notifications: [
            { id: "1", message: "Server memory usage at 72%.", read: false }
        ]
    });
};

exports.getSystemStatus = async (req, res) => {
    return successResponse(res, 200, "System status fetched successfully.", {
        status: "healthy",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    });
};

exports.getRevenueReport = async (req, res) => {
    return successResponse(res, 200, "Revenue report fetched successfully.", { totalRevenue: 15000 });
};

exports.getUserReport = async (req, res) => {
    return successResponse(res, 200, "User report fetched successfully.", { activeUsers: 40 });
};

exports.getProjectReport = async (req, res) => {
    return successResponse(res, 200, "Project report fetched successfully.", { completed: 100, active: 8 });
};

exports.getContactReport = async (req, res) => {
    return successResponse(res, 200, "Contact report fetched successfully.", { totalInquiries: 320 });
};

exports.clearNotifications = async (req, res) => {
    return successResponse(res, 200, "Notifications cleared successfully.");
};

exports.dashboardSettings = async (req, res) => {
    return successResponse(res, 200, "Dashboard settings saved successfully.");
};
