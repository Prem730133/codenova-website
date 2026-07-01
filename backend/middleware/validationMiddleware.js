/*==================================================
  CodeNova Technologies
  backend/middleware/validationMiddleware.js
  Data Validation Middleware (Fallback)
==================================================*/

"use strict";

module.exports = (req, res, next) => {
    // If standard fields or express-validator results are needed in the future, they can be processed here.
    next();
};
