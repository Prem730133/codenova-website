/*==================================================
  CodeNova Technologies
  backend/controllers/portfolioController.js
  Portfolio Projects Controller (Mock Implementation)
==================================================*/

"use strict";

function successResponse(res, status, message, data = {}) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

exports.getAllProjects = async (req, res) => {
    return successResponse(res, 200, "Portfolio projects fetched successfully.", {
        projects: [
            { id: "1", title: "Corporate Business Website", category: "Web Development", description: "Responsive business website", client: "Acme Corp" },
            { id: "2", title: "Food Delivery Application", category: "Mobile Apps", description: "Cross-platform mobile application", client: "QuickBite" },
            { id: "3", title: "Banking Dashboard UI", category: "UI/UX Design", description: "A modern banking dashboard UI", client: "Global Bank" }
        ]
    });
};

exports.getProjectById = async (req, res) => {
    return successResponse(res, 200, "Project details fetched successfully.", {
        project: { id: req.params.id, title: "Mock Project", category: "Web Apps", description: "Detailed mock project description." }
    });
};

exports.createProject = async (req, res) => {
    return successResponse(res, 201, "Project created successfully.", { project: req.body });
};

exports.updateProject = async (req, res) => {
    return successResponse(res, 200, "Project updated successfully.", { project: req.body });
};

exports.deleteProject = async (req, res) => {
    return successResponse(res, 200, "Project deleted successfully.");
};

exports.searchProjects = async (req, res) => {
    return successResponse(res, 200, "Projects searched successfully.", { projects: [] });
};

exports.featuredProjects = async (req, res) => {
    return successResponse(res, 200, "Featured projects fetched successfully.", {
        projects: [
            { id: "1", title: "Corporate Business Website", category: "Web Development", isFeatured: true }
        ]
    });
};

exports.projectStatistics = async (req, res) => {
    return successResponse(res, 200, "Project statistics fetched successfully.", {
        totalProjects: 3,
        webApps: 1,
        mobileApps: 1,
        uiuxDesign: 1
    });
};

exports.projectCategories = async (req, res) => {
    return successResponse(res, 200, "Categories fetched successfully.", {
        categories: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud Solutions"]
    });
};

exports.getProjectsByTechnology = async (req, res) => {
    return successResponse(res, 200, "Projects fetched by technology.", { projects: [] });
};

exports.uploadProjectImages = async (req, res) => {
    return successResponse(res, 200, "Images uploaded successfully.", { imageUrls: [] });
};

exports.toggleProjectStatus = async (req, res) => {
    return successResponse(res, 200, "Project status toggled successfully.");
};
