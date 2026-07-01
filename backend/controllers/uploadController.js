/*==================================================
  CodeNova Technologies
  backend/controllers/uploadController.js
  File Upload Controller (Mock Implementation)
==================================================*/

"use strict";

function successResponse(res, status, message, data = {}) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

exports.uploadSingleFile = async (req, res) => {
    return successResponse(res, 201, "File uploaded successfully.", {
        file: req.file ? {
            filename: req.file.filename,
            path: `/uploads/${req.file.filename}`,
            size: req.file.size
        } : { filename: "mock-file.jpg", path: "/uploads/mock-file.jpg", size: 1024 }
    });
};

exports.uploadMultipleFiles = async (req, res) => {
    const files = req.files ? req.files.map(f => ({
        filename: f.filename,
        path: `/uploads/${f.filename}`,
        size: f.size
    })) : [{ filename: "mock-file1.jpg", path: "/uploads/mock-file1.jpg" }];
    
    return successResponse(res, 201, "Files uploaded successfully.", { files });
};

exports.uploadImage = async (req, res) => {
    return successResponse(res, 201, "Image uploaded successfully.", {
        url: "/uploads/mock-image.png"
    });
};

exports.uploadDocument = async (req, res) => {
    return successResponse(res, 201, "Document uploaded successfully.", {
        url: "/uploads/mock-doc.pdf"
    });
};

exports.getUploadedFiles = async (req, res) => {
    return successResponse(res, 200, "Uploaded files list fetched successfully.", { files: [] });
};

exports.getFileById = async (req, res) => {
    return successResponse(res, 200, "File details fetched successfully.", { file: {} });
};

exports.downloadFile = async (req, res) => {
    // Send a mock file download
    return res.status(200).send("Mock file download content.");
};

exports.updateFile = async (req, res) => {
    return successResponse(res, 200, "File updated successfully.");
};

exports.deleteFile = async (req, res) => {
    return successResponse(res, 200, "File deleted successfully.");
};

exports.fileStatistics = async (req, res) => {
    return successResponse(res, 200, "File storage statistics fetched successfully.", {
        totalFiles: 140,
        totalStorageUsed: "1.2 GB"
    });
};
