/*==================================================
  CodeNova Technologies
  backend/utils/email.js
  Email Transporter Utility (Mock / Logging)
==================================================*/

"use strict";

module.exports = async (options) => {
    console.log("==========================================");
    console.log("           MOCK EMAIL DISPATCH            ");
    console.log("==========================================");
    console.log(`To      : ${options.email}`);
    console.log(`Subject : ${options.subject}`);
    console.log("Message :");
    console.log(options.message || options.html);
    console.log("==========================================");
    return true;
};
