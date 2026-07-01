/*==================================================
  CodeNova Technologies
  backend/controllers/pricingController.js
  Pricing Plans Controller (Mock Implementation)
==================================================*/

"use strict";

function successResponse(res, status, message, data = {}) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

exports.getAllPlans = async (req, res) => {
    return successResponse(res, 200, "Pricing plans fetched successfully.", {
        plans: [
            { id: "1", name: "Startup Plan", price: 49, duration: "month", features: ["1 Web App", "Basic SEO", "Support"] },
            { id: "2", name: "Business Plan", price: 149, duration: "month", features: ["3 Web Apps", "Advanced SEO", "Priority Support"] },
            { id: "3", name: "Enterprise Plan", price: 499, duration: "month", features: ["Custom Apps", "Dedicated SEO Team", "24/7 Phone Support"] }
        ]
    });
};

exports.getPlanById = async (req, res) => {
    return successResponse(res, 200, "Plan details fetched successfully.", {
        plan: { id: req.params.id, name: "Mock Plan", price: 99, duration: "month", features: [] }
    });
};

exports.createPlan = async (req, res) => {
    return successResponse(res, 201, "Pricing plan created successfully.", { plan: req.body });
};

exports.updatePlan = async (req, res) => {
    return successResponse(res, 200, "Pricing plan updated successfully.", { plan: req.body });
};

exports.deletePlan = async (req, res) => {
    return successResponse(res, 200, "Pricing plan deleted successfully.");
};

exports.searchPlans = async (req, res) => {
    return successResponse(res, 200, "Pricing plans searched successfully.", { plans: [] });
};

exports.featuredPlans = async (req, res) => {
    return successResponse(res, 200, "Featured plans fetched successfully.", {
        plans: [
            { id: "2", name: "Business Plan", price: 149, isFeatured: true }
        ]
    });
};

exports.comparePlans = async (req, res) => {
    return successResponse(res, 200, "Plans compared successfully.", { comparisons: {} });
};

exports.pricingStatistics = async (req, res) => {
    return successResponse(res, 200, "Pricing statistics fetched successfully.", {
        totalPlans: 3,
        activePlans: 3
    });
};

exports.togglePlanStatus = async (req, res) => {
    return successResponse(res, 200, "Plan status toggled successfully.");
};

exports.calculatePrice = async (req, res) => {
    const { planId, quantity } = req.body;
    const basePrice = planId === "1" ? 49 : planId === "2" ? 149 : 499;
    const total = basePrice * (quantity || 1);
    return successResponse(res, 200, "Price calculated successfully.", {
        basePrice,
        quantity: quantity || 1,
        total
    });
};
