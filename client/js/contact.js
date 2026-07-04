/*==================================================
  CodeNova Technologies
  contact.js
  Contact Form Validation and Submission
==================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    // Create alert display element if not already present
    let alertBox = document.querySelector(".form-status");
    if (!alertBox) {
        alertBox = document.createElement("div");
        alertBox.className = "alert d-none mt-3";
        contactForm.appendChild(alertBox);
    }

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Collect inputs
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const company = document.getElementById("company").value.trim();
        const service = document.getElementById("service").value;
        const budget = document.getElementById("budget").value;
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!fullName || !email || !service || !message) {
            showAlert("Please fill in all required fields.", "danger");
            return;
        }

        // Email regex verification
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert("Please enter a valid email address.", "danger");
            return;
        }

        // Phone regex verification (if provided)
        if (phone && !/^\+?[0-9\s-]{7,15}$/.test(phone)) {
            showAlert("Please enter a valid phone number.", "danger");
            return;
        }

        // Build request payload
        const payload = {
            name: fullName,
            email: email,
            phone: phone || "",
            subject: `Service Required: ${service} (Budget: ${budget || 'Not specified'}, Company: ${company || 'None'})`,
            message: message
        };

        const apiBase = window.location.origin.startsWith('file') ? 'http://localhost:5000' : '';
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn.innerHTML;

        try {
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending Message...';

            const response = await fetch(apiBase + '/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;

            if (result.success) {
                showAlert("Thank you! Your message has been sent successfully. We will get back to you shortly.", "success");
                contactForm.reset();
            } else {
                showAlert(result.message || "Failed to submit message. Please try again.", "danger");
            }
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            showAlert("Failed to connect to the server. Please check your network connection.", "danger");
        }
    });

    function showAlert(msg, type) {
        alertBox.className = `alert alert-${type} mt-3 d-block`;
        alertBox.textContent = msg;
        
        // Auto scroll to alert
        alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        
        if (type === "success") {
            setTimeout(() => {
                alertBox.className = "alert d-none";
            }, 6000);
        }
    }
});
