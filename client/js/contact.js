/*==================================================
  CodeNova Technologies
  contact.js
  Contact Form Validation + Input Validation
==================================================*/

"use strict";

/*=========================================
  Contact Form Validation
=========================================*/

const contactForm =
    document.querySelector("#contactForm");

const nameField =
    document.querySelector("#name");

const emailField =
    document.querySelector("#email");

const phoneField =
    document.querySelector("#phone");

const subjectField =
    document.querySelector("#subject");

const messageField =
    document.querySelector("#message");

const statusBox =
    document.querySelector(".form-status");

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern =
    /^[0-9]{10}$/;

/*=========================================
  Validation Functions
=========================================*/

function showError(field, message) {

    if (!field) return;

    field.classList.remove("is-valid");

    field.classList.add("is-invalid");

    const error =
        field.parentElement.querySelector(".error-text");

    if (error) {

        error.textContent = message;

    }

}

function showSuccess(field) {

    if (!field) return;

    field.classList.remove("is-invalid");

    field.classList.add("is-valid");

    const error =
        field.parentElement.querySelector(".error-text");

    if (error) {

        error.textContent = "";

    }

}

function validateRequired(field, message) {

    if (!field.value.trim()) {

        showError(field, message);

        return false;

    }

    showSuccess(field);

    return true;

}

/*=========================================
  Form Validation
=========================================*/

function validateContactForm() {

    let valid = true;

    if (!validateRequired(nameField, "Name is required.")) {

        valid = false;

    }

    if (!validateRequired(emailField, "Email is required.")) {

        valid = false;

    } else if (!emailPattern.test(emailField.value.trim())) {

        showError(emailField, "Invalid email address.");

        valid = false;

    }

    if (phoneField.value.trim() !== "") {

        if (!phonePattern.test(phoneField.value.trim())) {

            showError(phoneField, "Phone must contain 10 digits.");

            valid = false;

        } else {

            showSuccess(phoneField);

        }

    }

    if (!validateRequired(subjectField, "Subject is required.")) {

        valid = false;

    }

    if (!validateRequired(messageField, "Message is required.")) {

        valid = false;

    }

    return valid;

}

/*=========================================
  Submit Event
=========================================*/

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (validateContactForm()) {

            if (statusBox) {

                statusBox.textContent =
                    "Validation completed successfully.";

                statusBox.className =
                    "form-status success";

            }

            console.log("Form validation passed.");

        } else {

            if (statusBox) {

                statusBox.textContent =
                    "Please correct the highlighted fields.";

                statusBox.className =
                    "form-status error";

            }

        }

    });

}
/*==================================================
  Real-time Validation + Error Messages
==================================================*/

"use strict";

/*=========================================
  Real-time Validation
=========================================*/

const formFields =
    document.querySelectorAll(
        "#contactForm input, #contactForm textarea"
    );

formFields.forEach(function(field){

    field.addEventListener("input",function(){

        validateField(this);

    });

    field.addEventListener("blur",function(){

        validateField(this);

    });

});

/*=========================================
  Individual Field Validation
=========================================*/

function validateField(field){

    const value =
        field.value.trim();

    switch(field.id){

        case "name":

            if(value.length < 3){

                displayError(

                    field,

                    "Name must contain at least 3 characters."

                );

            }else{

                clearError(field);

            }

            break;

        case "email":

            if(!emailPattern.test(value)){

                displayError(

                    field,

                    "Please enter a valid email address."

                );

            }else{

                clearError(field);

            }

            break;

        case "phone":

            if(

                value !== "" &&

                !phonePattern.test(value)

            ){

                displayError(

                    field,

                    "Phone number must contain exactly 10 digits."

                );

            }else{

                clearError(field);

            }

            break;

        case "subject":

            if(value.length < 5){

                displayError(

                    field,

                    "Subject should be at least 5 characters."

                );

            }else{

                clearError(field);

            }

            break;

        case "message":

            if(value.length < 20){

                displayError(

                    field,

                    "Message should contain at least 20 characters."

                );

            }else{

                clearError(field);

            }

            break;

    }

}

/*=========================================
  Error Messages
=========================================*/

function displayError(field,message){

    field.classList.add("is-invalid");

    field.classList.remove("is-valid");

    let errorBox =
        field.parentElement.querySelector(
            ".error-message"
        );

    if(!errorBox){

        errorBox =
            document.createElement("small");

        errorBox.className =
            "error-message";

        field.parentElement.appendChild(errorBox);

    }

    errorBox.textContent =
        message;

}

function clearError(field){

    field.classList.remove("is-invalid");

    field.classList.add("is-valid");

    const errorBox =
        field.parentElement.querySelector(
            ".error-message"
        );

    if(errorBox){

        errorBox.textContent = "";

    }

}

/*=========================================
  Clear Errors Button
=========================================*/

const clearErrors =
    document.querySelector("#clearErrors");

if(clearErrors){

    clearErrors.addEventListener("click",function(){

        formFields.forEach(function(field){

            clearError(field);

        });

    });

}

/*==================================================
  CodeNova Technologies
  contact.js
  Part 1A.3
  Success Messages + Form Reset
==================================================*/

"use strict";

/*=========================================
  Success Message
=========================================*/

const contactForm =
    document.querySelector("#contactForm");

const successBox =
    document.querySelector(".success-message");

function showSuccessMessage(message){

    if(!successBox) return;

    successBox.textContent =
        message;

    successBox.classList.remove("hidden");

    successBox.classList.add("show");

    setTimeout(function(){

        successBox.classList.remove("show");

        successBox.classList.add("hidden");

    },4000);

}

/*=========================================
  Success Animation
=========================================*/

function animateSuccess(){

    if(!successBox) return;

    successBox.classList.add("success-animation");

    setTimeout(function(){

        successBox.classList.remove(
            "success-animation"
        );

    },1000);

}

/*=========================================
  Form Submission
=========================================*/

if(contactForm){

    contactForm.addEventListener("submit",function(event){

        event.preventDefault();

        if(typeof validateContactForm === "function"){

            if(validateContactForm()){

                showSuccessMessage(

                    "Your message has been sent successfully!"

                );

                animateSuccess();

                resetContactForm();

            }

        }

    });

}

/*=========================================
  Form Reset
=========================================*/

function resetContactForm(){

    if(!contactForm) return;

    setTimeout(function(){

        contactForm.reset();

        clearValidation();

    },1000);

}

/*=========================================
  Clear Validation
=========================================*/

function clearValidation(){

    document
    .querySelectorAll(

        "#contactForm input, #contactForm textarea"

    )
    .forEach(function(field){

        field.classList.remove(

            "is-valid",

            "is-invalid"

        );

        const errorMessage =
            field.parentElement.querySelector(
                ".error-message"
            );

        if(errorMessage){

            errorMessage.textContent = "";

        }

    });

}

/*=========================================
  Reset Button
=========================================*/

const resetButton =
    document.querySelector("#resetForm");

if(resetButton){

    resetButton.addEventListener("click",function(){

        resetContactForm();

        showSuccessMessage(

            "Form has been reset."

        );

    });

}

/*=========================================
  Auto Focus
=========================================*/

window.addEventListener("load",function(){

    const firstInput =
        document.querySelector("#name");

    if(firstInput){

        firstInput.focus();

    }

});

/*=========================================
  Helper Functions
=========================================*/

function hideSuccessMessage(){

    if(successBox){

        successBox.classList.remove("show");

        successBox.classList.add("hidden");

    }

}

function formCompleted(){

    console.log(

        "Contact form completed successfully."

    );

}

/*=========================================
  Complete Event
=========================================*/

document.addEventListener(

    "contactFormSuccess",

    function(){

        formCompleted();

    }

);
/*==================================================
  AJAX Form Submission + Loading Button
==================================================*/

"use strict";

/*=========================================
  Contact Form Elements
=========================================*/

const contactForm =
    document.querySelector("#contactForm");

const submitButton =
    document.querySelector("#submitButton");

const submitText =
    document.querySelector(".submit-text");

const submitLoader =
    document.querySelector(".submit-loader");

const responseMessage =
    document.querySelector(".form-response");

/*=========================================
  Loading Button
=========================================*/

function startLoading() {

    if (!submitButton) return;

    submitButton.disabled = true;

    submitButton.classList.add("loading");

    if (submitText) {

        submitText.textContent = "Sending...";

    }

    if (submitLoader) {

        submitLoader.classList.remove("d-none");

    }

}

function stopLoading() {

    if (!submitButton) return;

    submitButton.disabled = false;

    submitButton.classList.remove("loading");

    if (submitText) {

        submitText.textContent = "Send Message";

    }

    if (submitLoader) {

        submitLoader.classList.add("d-none");

    }

}

/*=========================================
  Response Message
=========================================*/

function showResponse(message, type) {

    if (!responseMessage) return;

    responseMessage.textContent = message;

    responseMessage.className =
        "form-response " + type;

}

/*=========================================
  AJAX Form Submission
=========================================*/

async function submitContactForm(form) {

    startLoading();

    const formData =
        new FormData(form);

    try {

        const response =
            await fetch(

                form.action || "/contact",

                {

                    method: "POST",

                    body: formData

                }

            );

        if (!response.ok) {

            throw new Error(

                "Submission failed."

            );

        }

        const result =
            await response.json();

        showResponse(

            result.message ||

            "Message sent successfully.",

            "success"

        );

        form.reset();

    } catch (error) {

        console.error(error);

        showResponse(

            "Unable to send your message. Please try again.",

            "error"

        );

    } finally {

        stopLoading();

    }

}

/*=========================================
  Submit Event
=========================================*/

if (contactForm) {

    contactForm.addEventListener(

        "submit",

        function (event) {

            event.preventDefault();

            if (

                typeof validateContactForm ===

                "function"

            ) {

                if (

                    validateContactForm()

                ) {

                    submitContactForm(

                        contactForm

                    );

                }

            }

        }

    );

}

/*=========================================
  Loading Animation
=========================================*/

if (submitButton) {

    submitButton.addEventListener(

        "mouseenter",

        function () {

            this.classList.add(

                "btn-hover"

            );

        }

    );

    submitButton.addEventListener(

        "mouseleave",

        function () {

            this.classList.remove(

                "btn-hover"

            );

        }

    );

}
/*==================================================
  Email Validation + Phone Validation
==================================================*/

"use strict";

/*=========================================
  Email & Phone Fields
=========================================*/

const emailInput =
    document.querySelector("#email");

const phoneInput =
    document.querySelector("#phone");

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
    /^[6-9]\d{9}$/;

/*=========================================
  Email Validation
=========================================*/

function validateEmail() {

    if (!emailInput) return false;

    const value =
        emailInput.value.trim();

    if (value === "") {

        showEmailError(
            "Email address is required."
        );

        return false;

    }

    if (!emailRegex.test(value)) {

        showEmailError(
            "Please enter a valid email address."
        );

        return false;

    }

    clearEmailError();

    return true;

}

function showEmailError(message) {

    emailInput.classList.add("is-invalid");

    emailInput.classList.remove("is-valid");

    const error =
        document.querySelector("#emailError");

    if (error) {

        error.textContent = message;

    }

}

function clearEmailError() {

    emailInput.classList.remove("is-invalid");

    emailInput.classList.add("is-valid");

    const error =
        document.querySelector("#emailError");

    if (error) {

        error.textContent = "";

    }

}

if (emailInput) {

    emailInput.addEventListener(
        "input",
        validateEmail
    );

    emailInput.addEventListener(
        "blur",
        validateEmail
    );

}

/*=========================================
  Phone Validation
=========================================*/

function validatePhone() {

    if (!phoneInput) return false;

    const value =
        phoneInput.value.trim();

    if (value === "") {

        showPhoneError(
            "Phone number is required."
        );

        return false;

    }

    if (!phoneRegex.test(value)) {

        showPhoneError(
            "Enter a valid 10-digit mobile number."
        );

        return false;

    }

    clearPhoneError();

    return true;

}

function showPhoneError(message) {

    phoneInput.classList.add("is-invalid");

    phoneInput.classList.remove("is-valid");

    const error =
        document.querySelector("#phoneError");

    if (error) {

        error.textContent = message;

    }

}

function clearPhoneError() {

    phoneInput.classList.remove("is-invalid");

    phoneInput.classList.add("is-valid");

    const error =
        document.querySelector("#phoneError");

    if (error) {

        error.textContent = "";

    }

}

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "");

            if (this.value.length > 10) {

                this.value =
                    this.value.substring(0, 10);

            }

            validatePhone();

        }
    );

    phoneInput.addEventListener(
        "blur",
        validatePhone
    );

}

/*=========================================
  Validation Summary
=========================================*/

function validateContactDetails() {

    const emailValid =
        validateEmail();

    const phoneValid =
        validatePhone();

    return emailValid && phoneValid;

}
/*==================================================
  Character Counter + File Upload Validation
==================================================*/

"use strict";

/*=========================================
  Character Counter
=========================================*/

const messageInput =
    document.querySelector("#message");

const characterCounter =
    document.querySelector("#characterCounter");

const maxCharacters = 500;

function updateCharacterCounter() {

    if (!messageInput || !characterCounter) return;

    const currentLength =
        messageInput.value.length;

    characterCounter.textContent =
        currentLength + " / " + maxCharacters;

    if (currentLength >= maxCharacters) {

        characterCounter.classList.add("text-danger");

        messageInput.value =
            messageInput.value.substring(
                0,
                maxCharacters
            );

    } else if (currentLength >= 450) {

        characterCounter.classList.remove("text-danger");

        characterCounter.classList.add("text-warning");

    } else {

        characterCounter.classList.remove(
            "text-danger",
            "text-warning"
        );

        characterCounter.classList.add("text-success");

    }

}

if (messageInput) {

    updateCharacterCounter();

    messageInput.addEventListener(

        "input",

        updateCharacterCounter

    );

}

/*=========================================
  File Upload Validation
=========================================*/

const fileInput =
    document.querySelector("#attachment");

const fileName =
    document.querySelector("#selectedFile");

const fileError =
    document.querySelector("#fileError");

const allowedTypes = [

    "application/pdf",

    "image/png",

    "image/jpeg",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

];

const maxFileSize =
    5 * 1024 * 1024;

/*=========================================
  Validate Uploaded File
=========================================*/

function validateFile(file) {

    if (!file) {

        clearFileValidation();

        return true;

    }

    if (!allowedTypes.includes(file.type)) {

        showFileError(

            "Only PDF, DOC, DOCX, JPG and PNG files are allowed."

        );

        return false;

    }

    if (file.size > maxFileSize) {

        showFileError(

            "Maximum file size is 5 MB."

        );

        return false;

    }

    clearFileValidation();

    return true;

}

/*=========================================
  File Error
=========================================*/

function showFileError(message) {

    if (fileError) {

        fileError.textContent = message;

    }

    if (fileInput) {

        fileInput.classList.add("is-invalid");

        fileInput.classList.remove("is-valid");

    }

}

/*=========================================
  Clear File Validation
=========================================*/

function clearFileValidation() {

    if (fileError) {

        fileError.textContent = "";

    }

    if (fileInput) {

        fileInput.classList.remove("is-invalid");

        fileInput.classList.add("is-valid");

    }

}

/*=========================================
  File Change Event
=========================================*/

if (fileInput) {

    fileInput.addEventListener(

        "change",

        function () {

            const file =
                this.files[0];

            if (validateFile(file)) {

                if (fileName) {

                    fileName.textContent =
                        file
                            ? file.name
                            : "No file selected";

                }

            } else {

                this.value = "";

                if (fileName) {

                    fileName.textContent =
                        "No file selected";

                }

            }

        }

    );

}

/*=========================================
  Remove Selected File
=========================================*/

const removeFileButton =
    document.querySelector("#removeFile");

if (removeFileButton) {

    removeFileButton.addEventListener(

        "click",

        function () {

            if (fileInput) {

                fileInput.value = "";

            }

            if (fileName) {

                fileName.textContent =
                    "No file selected";

            }

            clearFileValidation();

        }

    );

}
/*==================================================
  Google Map + Office Locations
==================================================*/

"use strict";

/*=========================================
  Google Map
=========================================*/

const officeMap =
    document.querySelector("#officeMap");

const defaultLocation = {

    lat: 13.0827,

    lng: 80.2707

};

let map;
let marker;

function initializeMap() {

    if (!officeMap) return;

    if (typeof google === "undefined") {

        console.warn(
            "Google Maps API not loaded."
        );

        return;

    }

    map = new google.maps.Map(

        officeMap,

        {

            center: defaultLocation,

            zoom: 14,

            mapTypeControl: false,

            streetViewControl: false,

            fullscreenControl: true

        }

    );

    marker = new google.maps.Marker({

        position: defaultLocation,

        map: map,

        animation: google.maps.Animation.DROP,

        title: "CodeNova Technologies"

    });

}

/*=========================================
  Office Locations
=========================================*/

const officeButtons =
    document.querySelectorAll(".office-location");

officeButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const latitude =
            parseFloat(this.dataset.lat);

        const longitude =
            parseFloat(this.dataset.lng);

        const officeName =
            this.dataset.office ||
            "Office";

        changeOfficeLocation(

            latitude,

            longitude,

            officeName

        );

    });

});

/*=========================================
  Change Office Location
=========================================*/

function changeOfficeLocation(

    lat,

    lng,

    officeName

){

    if(!map || !marker) return;

    const location = {

        lat: lat,

        lng: lng

    };

    map.setCenter(location);

    map.setZoom(15);

    marker.setPosition(location);

    marker.setTitle(officeName);

}

/*=========================================
  Locate User
=========================================*/

const locateButton =
    document.querySelector("#locateMe");

if(locateButton){

    locateButton.addEventListener("click",function(){

        if(!navigator.geolocation){

            alert("Geolocation not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            function(position){

                const location = {

                    lat: position.coords.latitude,

                    lng: position.coords.longitude

                };

                if(map){

                    map.setCenter(location);

                    map.setZoom(14);

                }

            },

            function(){

                alert("Unable to access your location.");

            }

        );

    });

}

/*=========================================
  Initialize Map
=========================================*/

window.addEventListener(

    "load",

    initializeMap

);
/*==================================================
  Office Cards + Business Hours
==================================================*/

"use strict";

/*=========================================
  Office Cards
=========================================*/

const officeCards =
    document.querySelectorAll(".office-card");

officeCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("active");

        this.style.transform =
            "translateY(-10px)";

        this.style.boxShadow =
            "0 15px 35px rgba(0,0,0,.15)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("active");

        this.style.transform =
            "translateY(0)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Office Card Selection
=========================================*/

officeCards.forEach(function(card){

    card.addEventListener("click",function(){

        officeCards.forEach(function(item){

            item.classList.remove("selected");

        });

        this.classList.add("selected");

        const officeName =
            this.dataset.office ||
            "Head Office";

        console.log(
            "Selected Office:",
            officeName
        );

    });

});

/*=========================================
  Office Contact Buttons
=========================================*/

document
.querySelectorAll(".office-call")
.forEach(function(button){

    button.addEventListener("click",function(){

        const phone =
            this.dataset.phone;

        if(phone){

            window.location.href =
                "tel:" + phone;

        }

    });

});

document
.querySelectorAll(".office-email")
.forEach(function(button){

    button.addEventListener("click",function(){

        const email =
            this.dataset.email;

        if(email){

            window.location.href =
                "mailto:" + email;

        }

    });

});

/*=========================================
  Business Hours
=========================================*/

const businessStatus =
    document.querySelector("#businessStatus");

const businessTime =
    document.querySelector("#businessTime");

function updateBusinessHours(){

    const now =
        new Date();

    const day =
        now.getDay();

    const hour =
        now.getHours();

    const isWeekday =
        day >= 1 && day <= 5;

    const isSaturday =
        day === 6;

    let open = false;

    if(isWeekday){

        open =
            hour >= 9 && hour < 18;

    }else if(isSaturday){

        open =
            hour >= 10 && hour < 15;

    }

    if(businessStatus){

        businessStatus.textContent =
            open
            ? "Open Now"
            : "Closed";

        businessStatus.className =
            open
            ? "status-open"
            : "status-closed";

    }

    if(businessTime){

        businessTime.textContent =
            isWeekday
            ? "Mon - Fri : 9:00 AM - 6:00 PM"
            : "Sat : 10:00 AM - 3:00 PM";

    }

}

/*=========================================
  Refresh Every Minute
=========================================*/

updateBusinessHours();

setInterval(

    updateBusinessHours,

    60000

);

/*=========================================
  Office Counter
=========================================*/

const officeCount =
    document.querySelector("#officeCount");

if(officeCount){

    officeCount.textContent =
        officeCards.length;

}
/*==================================================
  Contact Information + Directions Button
==================================================*/

"use strict";

/*=========================================
  Contact Information
=========================================*/

const phoneLinks =
    document.querySelectorAll(".contact-phone");

const emailLinks =
    document.querySelectorAll(".contact-email");

const addressLinks =
    document.querySelectorAll(".contact-address");

/*=========================================
  Phone Call
=========================================*/

phoneLinks.forEach(function(link){

    link.addEventListener("click",function(event){

        event.preventDefault();

        const phone =
            this.dataset.phone ||
            this.textContent.trim();

        window.location.href =
            "tel:" + phone;

    });

});

/*=========================================
  Email
=========================================*/

emailLinks.forEach(function(link){

    link.addEventListener("click",function(event){

        event.preventDefault();

        const email =
            this.dataset.email ||
            this.textContent.trim();

        window.location.href =
            "mailto:" + email;

    });

});

/*=========================================
  Copy Contact Information
=========================================*/

document
.querySelectorAll(".copy-contact")
.forEach(function(button){

    button.addEventListener("click",async function(){

        const text =
            this.dataset.copy;

        if(!text) return;

        try{

            await navigator.clipboard.writeText(text);

            alert("Copied to clipboard!");

        }catch(error){

            console.error(error);

        }

    });

});

/*=========================================
  Address Click
=========================================*/

addressLinks.forEach(function(link){

    link.addEventListener("click",function(){

        this.classList.add("active-address");

        setTimeout(()=>{

            this.classList.remove("active-address");

        },800);

    });

});

/*=========================================
  Directions Button
=========================================*/

const directionButtons =
    document.querySelectorAll(".direction-btn");

directionButtons.forEach(function(button){

    button.addEventListener("click",function(){

        const latitude =
            this.dataset.lat;

        const longitude =
            this.dataset.lng;

        if(latitude && longitude){

            const url =
                `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

            window.open(

                url,

                "_blank"

            );

        }

    });

});

/*=========================================
  Open Head Office
=========================================*/

const headOfficeButton =
    document.querySelector("#headOffice");

if(headOfficeButton){

    headOfficeButton.addEventListener("click",function(){

        window.open(

            "https://maps.google.com",

            "_blank"

        );

    });

}

/*=========================================
  Contact Details
=========================================*/

const companyInfo = {

    company:
        "CodeNova Technologies",

    phone:
        "+91 98765 43210",

    email:
        "info@codenova.com",

    support:
        "support@codenova.com"

};

console.table(companyInfo);

/*=========================================
  Contact Helper Functions
=========================================*/

function callOffice(number){

    window.location.href =
        "tel:" + number;

}

function sendEmail(email){

    window.location.href =
        "mailto:" + email;

}

function openDirections(lat,lng){

    window.open(

        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,

        "_blank"

    );

}

/*=========================================
  Initialize Contact Information
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Contact Information Ready"

    );

});
/*==================================================
  FAQ Search + Live Chat Button
==================================================*/

"use strict";

/*=========================================
  FAQ Search
=========================================*/

const faqSearch =
    document.querySelector("#faqSearch");

const faqItems =
    document.querySelectorAll(".faq-item");

const noResults =
    document.querySelector(".faq-no-results");

/*=========================================
  Search FAQs
=========================================*/

function searchFAQs(keyword){

    let visibleCount = 0;

    faqItems.forEach(function(item){

        const text =
            item.textContent.toLowerCase();

        if(text.includes(keyword.toLowerCase())){

            item.style.display = "block";

            visibleCount++;

        }else{

            item.style.display = "none";

        }

    });

    if(noResults){

        noResults.style.display =

            visibleCount === 0

            ? "block"

            : "none";

    }

}

/*=========================================
  Search Event
=========================================*/

if(faqSearch){

    faqSearch.addEventListener("keyup",function(){

        searchFAQs(this.value.trim());

    });

}

/*=========================================
  Clear FAQ Search
=========================================*/

const clearFAQ =
    document.querySelector("#clearFAQ");

if(clearFAQ){

    clearFAQ.addEventListener("click",function(){

        if(faqSearch){

            faqSearch.value = "";

        }

        searchFAQs("");

    });

}

/*=========================================
  FAQ Counter
=========================================*/

const faqCounter =
    document.querySelector("#faqCounter");

if(faqCounter){

    faqCounter.textContent =
        faqItems.length;

}

/*=========================================
  Live Chat Button
=========================================*/

const liveChatButton =
    document.querySelector("#liveChat");

const chatWidget =
    document.querySelector(".live-chat-widget");

if(liveChatButton){

    liveChatButton.addEventListener("click",function(){

        if(chatWidget){

            chatWidget.classList.toggle("show");

        }

    });

}

/*=========================================
  Close Live Chat
=========================================*/

const closeChat =
    document.querySelector("#closeChat");

if(closeChat){

    closeChat.addEventListener("click",function(){

        if(chatWidget){

            chatWidget.classList.remove("show");

        }

    });

}

/*=========================================
  Chat Notification
=========================================*/

const chatBadge =
    document.querySelector(".chat-badge");

function showChatNotification(){

    if(chatBadge){

        chatBadge.classList.add("active");

    }

}

setTimeout(function(){

    showChatNotification();

},5000);

/*=========================================
  Chat Status
=========================================*/

const chatStatus =
    document.querySelector(".chat-status");

if(chatStatus){

    chatStatus.textContent =
        "Online";

}

/*=========================================
  Helper Functions
=========================================*/

function openLiveChat(){

    if(chatWidget){

        chatWidget.classList.add("show");

    }

}

function closeLiveChat(){

    if(chatWidget){

        chatWidget.classList.remove("show");

    }

}
/*==================================================
  WhatsApp Integration + Social Contact Links
==================================================*/

"use strict";

/*=========================================
  WhatsApp Integration
=========================================*/

const whatsappButton =
    document.querySelector("#whatsappButton");

const whatsappNumber =
    "919876543210";

const defaultMessage =
    "Hello CodeNova Technologies, I would like to know more about your services.";

function openWhatsApp() {

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

    window.open(url, "_blank");

}

if (whatsappButton) {

    whatsappButton.addEventListener("click", function () {

        openWhatsApp();

    });

}

/*=========================================
  Floating WhatsApp Widget
=========================================*/

const floatingWhatsApp =
    document.querySelector(".floating-whatsapp");

if (floatingWhatsApp) {

    floatingWhatsApp.addEventListener("mouseenter", function () {

        this.classList.add("pulse");

    });

    floatingWhatsApp.addEventListener("mouseleave", function () {

        this.classList.remove("pulse");

    });

}

/*=========================================
  Social Contact Links
=========================================*/

const socialLinks =
    document.querySelectorAll(".social-contact a");

socialLinks.forEach(function(link){

    link.addEventListener("mouseenter",function(){

        this.classList.add("active");

        this.style.transform =
            "translateY(-5px) scale(1.1)";

    });

    link.addEventListener("mouseleave",function(){

        this.classList.remove("active");

        this.style.transform =
            "translateY(0) scale(1)";

    });

});

/*=========================================
  Open Social Links
=========================================*/

socialLinks.forEach(function(link){

    link.addEventListener("click",function(){

        console.log(

            "Opening:",

            this.href

        );

    });

});

/*=========================================
  Copy Social Profile
=========================================*/

document
.querySelectorAll(".copy-social")
.forEach(function(button){

    button.addEventListener("click",async function(){

        const profile =
            this.dataset.url;

        if(!profile) return;

        try{

            await navigator.clipboard.writeText(profile);

            alert("Profile link copied.");

        }

        catch(error){

            console.error(error);

        }

    });

});

/*=========================================
  Contact Icons Animation
=========================================*/

document
.querySelectorAll(".contact-icon")
.forEach(function(icon){

    icon.addEventListener("mouseenter",function(){

        this.classList.add("rotate");

    });

    icon.addEventListener("mouseleave",function(){

        this.classList.remove("rotate");

    });

});

/*=========================================
  Helper Functions
=========================================*/

function callWhatsApp(){

    openWhatsApp();

}

function openSocial(url){

    window.open(

        url,

        "_blank"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "WhatsApp & Social Links Ready"

    );

});
/*==================================================
  Newsletter Contact + Contact Cards Animation
==================================================*/

"use strict";

/*=========================================
  Newsletter Contact
=========================================*/

const newsletterForm =
    document.querySelector("#newsletterForm");

const newsletterEmail =
    document.querySelector("#newsletterEmail");

const newsletterMessage =
    document.querySelector("#newsletterMessage");

const newsletterPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*=========================================
  Newsletter Validation
=========================================*/

function validateNewsletter() {

    if (!newsletterEmail) return false;

    const email =
        newsletterEmail.value.trim();

    if (email === "") {

        showNewsletterMessage(

            "Please enter your email address.",

            "error"

        );

        return false;

    }

    if (!newsletterPattern.test(email)) {

        showNewsletterMessage(

            "Please enter a valid email address.",

            "error"

        );

        return false;

    }

    return true;

}

/*=========================================
  Newsletter Message
=========================================*/

function showNewsletterMessage(message, type) {

    if (!newsletterMessage) return;

    newsletterMessage.textContent =
        message;

    newsletterMessage.className =
        "newsletter-message " + type;

    newsletterMessage.classList.add("show");

    setTimeout(function () {

        newsletterMessage.classList.remove("show");

    }, 3000);

}

/*=========================================
  Newsletter Submit
=========================================*/

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (validateNewsletter()) {

            showNewsletterMessage(

                "Thank you for subscribing!",

                "success"

            );

            newsletterForm.reset();

        }

    });

}

/*=========================================
  Contact Cards Animation
=========================================*/

const contactCards =
    document.querySelectorAll(".contact-card");

contactCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        this.classList.add("active");

        this.style.transform =
            "translateY(-10px) scale(1.02)";

        this.style.boxShadow =
            "0 15px 35px rgba(0,0,0,.15)";

    });

    card.addEventListener("mouseleave",function(){

        this.classList.remove("active");

        this.style.transform =
            "translateY(0) scale(1)";

        this.style.boxShadow = "";

    });

});

/*=========================================
  Contact Card Click
=========================================*/

contactCards.forEach(function(card){

    card.addEventListener("click",function(){

        contactCards.forEach(function(item){

            item.classList.remove("selected");

        });

        this.classList.add("selected");

    });

});

/*=========================================
  Card Reveal Animation
=========================================*/

const contactObserver =
new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("fade-in");

            contactObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.20
});

contactCards.forEach(function(card){

    contactObserver.observe(card);

});

/*=========================================
  Animation Helpers
=========================================*/

function activateCard(card){

    if(card){

        card.classList.add("active");

    }

}

function deactivateCard(card){

    if(card){

        card.classList.remove("active");

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Newsletter & Contact Cards Ready"

    );

});
/*==================================================
  Notifications + Modal Contact Form
==================================================*/

"use strict";

/*=========================================
  Notifications
=========================================*/

const notificationBox =
    document.querySelector("#notification");

const notificationTitle =
    document.querySelector("#notificationTitle");

const notificationMessage =
    document.querySelector("#notificationMessage");

const notificationClose =
    document.querySelector("#notificationClose");

let notificationTimer = null;

/*=========================================
  Show Notification
=========================================*/

function showNotification(

    title,

    message,

    type = "success"

){

    if(!notificationBox) return;

    notificationBox.className =
        "notification " + type;

    if(notificationTitle){

        notificationTitle.textContent = title;

    }

    if(notificationMessage){

        notificationMessage.textContent = message;

    }

    notificationBox.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(function(){

        hideNotification();

    },4000);

}

/*=========================================
  Hide Notification
=========================================*/

function hideNotification(){

    if(!notificationBox) return;

    notificationBox.classList.remove("show");

}

/*=========================================
  Close Notification
=========================================*/

if(notificationClose){

    notificationClose.addEventListener("click",function(){

        hideNotification();

    });

}

/*=========================================
  Notification Hover
=========================================*/

if(notificationBox){

    notificationBox.addEventListener("mouseenter",function(){

        clearTimeout(notificationTimer);

    });

    notificationBox.addEventListener("mouseleave",function(){

        notificationTimer = setTimeout(function(){

            hideNotification();

        },2000);

    });

}

/*=========================================
  Modal Contact Form
=========================================*/

const contactModal =
    document.querySelector("#contactModal");

const openModalButtons =
    document.querySelectorAll("[data-open-contact]");

const closeModalButtons =
    document.querySelectorAll("[data-close-contact]");

/*=========================================
  Open Modal
=========================================*/

function openContactModal(){

    if(!contactModal) return;

    contactModal.classList.add("show");

    document.body.classList.add("modal-open");

}

/*=========================================
  Close Modal
=========================================*/

function closeContactModal(){

    if(!contactModal) return;

    contactModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}

/*=========================================
  Open Events
=========================================*/

openModalButtons.forEach(function(button){

    button.addEventListener("click",function(){

        openContactModal();

    });

});

/*=========================================
  Close Events
=========================================*/

closeModalButtons.forEach(function(button){

    button.addEventListener("click",function(){

        closeContactModal();

    });

});

/*=========================================
  Outside Click
=========================================*/

window.addEventListener("click",function(event){

    if(event.target === contactModal){

        closeContactModal();

    }

});

/*=========================================
  Escape Key
=========================================*/

document.addEventListener("keydown",function(event){

    if(event.key === "Escape"){

        closeContactModal();

    }

});

/*=========================================
  Success Notification
=========================================*/

function contactSuccess(){

    showNotification(

        "Success",

        "Your message has been sent successfully.",

        "success"

    );

}

/*=========================================
  Error Notification
=========================================*/

function contactError(){

    showNotification(

        "Error",

        "Unable to send your message.",

        "error"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Notifications & Contact Modal Initialized"

    );

});
/*==================================================
  Auto Save Draft + Local Storage
==================================================*/

"use strict";

/*=========================================
  Auto Save Draft
=========================================*/

const contactForm =
    document.querySelector("#contactForm");

const draftFields =
    document.querySelectorAll(
        "#contactForm input, #contactForm textarea"
    );

const DRAFT_KEY =
    "codenova_contact_draft";

/*=========================================
  Save Draft
=========================================*/

function saveDraft() {

    if (!contactForm) return;

    const draft = {

        name:
            document.querySelector("#name")?.value || "",

        email:
            document.querySelector("#email")?.value || "",

        phone:
            document.querySelector("#phone")?.value || "",

        subject:
            document.querySelector("#subject")?.value || "",

        message:
            document.querySelector("#message")?.value || ""

    };

    localStorage.setItem(

        DRAFT_KEY,

        JSON.stringify(draft)

    );

}

/*=========================================
  Restore Draft
=========================================*/

function restoreDraft() {

    const draft =
        localStorage.getItem(DRAFT_KEY);

    if (!draft) return;

    const data =
        JSON.parse(draft);

    if(document.querySelector("#name"))
        document.querySelector("#name").value =
            data.name || "";

    if(document.querySelector("#email"))
        document.querySelector("#email").value =
            data.email || "";

    if(document.querySelector("#phone"))
        document.querySelector("#phone").value =
            data.phone || "";

    if(document.querySelector("#subject"))
        document.querySelector("#subject").value =
            data.subject || "";

    if(document.querySelector("#message"))
        document.querySelector("#message").value =
            data.message || "";

}

/*=========================================
  Auto Save Events
=========================================*/

draftFields.forEach(function(field){

    field.addEventListener("input",function(){

        saveDraft();

    });

});

/*=========================================
  Local Storage
=========================================*/

function clearDraft() {

    localStorage.removeItem(DRAFT_KEY);

}

function hasDraft() {

    return localStorage.getItem(DRAFT_KEY) !== null;

}

function exportDraft() {

    const draft =
        localStorage.getItem(DRAFT_KEY);

    console.log(draft);

}

/*=========================================
  Save User Preference
=========================================*/

function saveContactPreference(type){

    localStorage.setItem(

        "preferredContact",

        type

    );

}

function getContactPreference(){

    return localStorage.getItem(

        "preferredContact"

    );

}

/*=========================================
  Form Submit
=========================================*/

if(contactForm){

    contactForm.addEventListener("submit",function(){

        clearDraft();

    });

}

/*=========================================
  Clear Draft Button
=========================================*/

const clearDraftButton =
    document.querySelector("#clearDraft");

if(clearDraftButton){

    clearDraftButton.addEventListener("click",function(){

        clearDraft();

        contactForm.reset();

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    if(hasDraft()){

        restoreDraft();

        console.log(

            "Draft restored successfully."

        );

    }

});

/*=========================================
  Helper Functions
=========================================*/

function updateDraft(){

    saveDraft();

}

function removeDraft(){

    clearDraft();

}
/*==================================================
  Accessibility + Keyboard Shortcuts
==================================================*/

"use strict";

/*=========================================
  Accessibility
=========================================*/

const contactPage =
    document.querySelector(".contact-page");

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

function applyAccessibilitySettings() {

    if (prefersReducedMotion.matches) {

        document.body.classList.add(
            "reduce-motion"
        );

        document
            .querySelectorAll(".animated")
            .forEach(function (element) {

                element.style.animation = "none";

                element.style.transition = "none";

            });

    }

}

applyAccessibilitySettings();

prefersReducedMotion.addEventListener(

    "change",

    applyAccessibilitySettings

);

/*=========================================
  High Contrast Mode
=========================================*/

const contrastButton =
    document.querySelector("#toggleContrast");

if (contrastButton) {

    contrastButton.addEventListener("click", function () {

        document.body.classList.toggle(

            "high-contrast"

        );

    });

}

/*=========================================
  Focus Outline
=========================================*/

document
.querySelectorAll(

    "input, textarea, button, select, a"

)
.forEach(function (element) {

    element.addEventListener("focus", function () {

        this.classList.add("keyboard-focus");

    });

    element.addEventListener("blur", function () {

        this.classList.remove("keyboard-focus");

    });

});

/*=========================================
  Skip To Contact Form
=========================================*/

const skipLink =
    document.querySelector("#skipContact");

if (skipLink) {

    skipLink.addEventListener("click", function (event) {

        event.preventDefault();

        const form =
            document.querySelector("#contactForm");

        if (form) {

            form.scrollIntoView({

                behavior: "smooth"

            });

            const firstField =
                form.querySelector("input");

            if (firstField) {

                firstField.focus();

            }

        }

    });

}

/*=========================================
  Keyboard Shortcuts
=========================================*/

document.addEventListener("keydown", function (event) {

    /* Alt + C → Contact Form */

    if (event.altKey && event.key.toLowerCase() === "c") {

        event.preventDefault();

        const form =
            document.querySelector("#contactForm");

        if (form) {

            form.scrollIntoView({

                behavior: "smooth"

            });

        }

    }

    /* Alt + S → Submit */

    if (event.altKey && event.key.toLowerCase() === "s") {

        event.preventDefault();

        const submitButton =
            document.querySelector(

                "#submitButton"

            );

        if (submitButton) {

            submitButton.click();

        }

    }

    /* Alt + R → Reset */

    if (event.altKey && event.key.toLowerCase() === "r") {

        event.preventDefault();

        const resetButton =
            document.querySelector(

                "#resetForm"

            );

        if (resetButton) {

            resetButton.click();

        }

    }

    /* Esc → Close Modal */

    if (event.key === "Escape") {

        const modal =
            document.querySelector("#contactModal");

        if (modal) {

            modal.classList.remove("show");

            document.body.classList.remove(

                "modal-open"

            );

        }

    }

});

/*=========================================
  Accessibility Helpers
=========================================*/

function enableAccessibility() {

    document.body.classList.add(

        "accessibility-enabled"

    );

}

function disableAccessibility() {

    document.body.classList.remove(

        "accessibility-enabled"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load", function () {

    enableAccessibility();

    console.log(

        "Accessibility & Keyboard Shortcuts Ready"

    );

});

/*==================================================
  Utility Functions + Browser Compatibility
==================================================*/

"use strict";

/*=========================================
  Utility Functions
=========================================*/

const ContactUtils = {

    qs(selector){

        return document.querySelector(selector);

    },

    qsa(selector){

        return document.querySelectorAll(selector);

    },

    addClass(element,className){

        if(element){

            element.classList.add(className);

        }

    },

    removeClass(element,className){

        if(element){

            element.classList.remove(className);

        }

    },

    toggleClass(element,className){

        if(element){

            element.classList.toggle(className);

        }

    },

    hasClass(element,className){

        return element
            ? element.classList.contains(className)
            : false;

    },

    show(element){

        if(element){

            element.style.display = "block";

        }

    },

    hide(element){

        if(element){

            element.style.display = "none";

        }

    },

    enable(element){

        if(element){

            element.disabled = false;

        }

    },

    disable(element){

        if(element){

            element.disabled = true;

        }

    },

    scrollToElement(element){

        if(element){

            element.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }

    },

    debounce(callback,delay){

        let timer;

        return function(){

            clearTimeout(timer);

            timer = setTimeout(

                callback,

                delay

            );

        };

    }

};

/*=========================================
  Browser Compatibility
=========================================*/

const Browser = {

    chrome:

        /Chrome/.test(navigator.userAgent) &&

        !/Edg/.test(navigator.userAgent),

    firefox:

        /Firefox/.test(navigator.userAgent),

    safari:

        /^((?!chrome|android).)*safari/i.test(

            navigator.userAgent

        ),

    edge:

        /Edg/.test(navigator.userAgent)

};

if(Browser.chrome){

    document.body.classList.add(

        "chrome-browser"

    );

}

if(Browser.firefox){

    document.body.classList.add(

        "firefox-browser"

    );

}

if(Browser.safari){

    document.body.classList.add(

        "safari-browser"

    );

}

if(Browser.edge){

    document.body.classList.add(

        "edge-browser"

    );

}

/*=========================================
  Feature Detection
=========================================*/

if("localStorage" in window){

    console.log(

        "Local Storage Supported"

    );

}

if("fetch" in window){

    console.log(

        "Fetch API Supported"

    );

}

if("IntersectionObserver" in window){

    console.log(

        "Intersection Observer Supported"

    );

}

/*=========================================
  Touch Device Detection
=========================================*/

if(

    "ontouchstart" in window ||

    navigator.maxTouchPoints > 0

){

    document.body.classList.add(

        "touch-device"

    );

}

/*=========================================
  Utility Ready
=========================================*/

window.addEventListener("load",function(){

    console.log(

        "Utility Functions Ready"

    );

    console.log(

        "Browser Compatibility Checked"

    );

});
/*==================================================
  Initialization + Event Listeners
==================================================*/

"use strict";

/*=========================================
  Initialization
=========================================*/

const ContactApp = {

    initialized: false,

    init() {

        if (this.initialized) {

            return;

        }

        this.initialized = true;

        this.initializeComponents();

        this.bindEvents();

        this.loadPreferences();

        console.log(
            "Contact Application Initialized."
        );

    },

    initializeComponents() {

        document.body.classList.add(
            "contact-ready"
        );

        const contactSection =
            document.querySelector(".contact-section");

        if (contactSection) {

            contactSection.classList.add("loaded");

        }

    },

    loadPreferences() {

        const theme =
            localStorage.getItem("contactTheme");

        if (theme) {

            document.body.setAttribute(

                "data-contact-theme",

                theme

            );

        }

    }

};

/*=========================================
  Event Listeners
=========================================*/

ContactApp.bindEvents = function () {

    /* Window Resize */

    window.addEventListener("resize", function () {

        console.log(

            "Window Width:",

            window.innerWidth

        );

    });

    /* Window Scroll */

    window.addEventListener("scroll", function () {

        document.body.dataset.scrollY =

            window.scrollY;

    });

    /* Online Status */

    window.addEventListener("online", function () {

        console.log(

            "Internet Connected"

        );

    });

    /* Offline Status */

    window.addEventListener("offline", function () {

        console.warn(

            "Internet Disconnected"

        );

    });

    /* Page Visibility */

    document.addEventListener(

        "visibilitychange",

        function () {

            if (document.hidden) {

                console.log(

                    "Page Hidden"

                );

            } else {

                console.log(

                    "Page Visible"

                );

            }

        }

    );

    /* Form Change */

    const contactForm =

        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(

            "change",

            function () {

                console.log(

                    "Contact Form Updated"

                );

            }

        );

    }

};

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function () {

        ContactApp.init();

    }

);

/*=========================================
  Window Load
=========================================*/

window.addEventListener(

    "load",

    function () {

        console.log(

            "All Contact Modules Loaded"

        );

    }

);

/*=========================================
  Before Unload
=========================================*/

window.addEventListener(

    "beforeunload",

    function () {

        console.log(

            "Closing Contact Page..."

        );

    }

);

/*=========================================
  Contact Ready Event
=========================================*/

document.dispatchEvent(

    new CustomEvent(

        "contactReady",

        {

            detail: {

                status: "success",

                module: "contact.js"

            }

        }

    )

);
/*==================================================
  Performance Optimization + End of contact.js
==================================================*/

"use strict";

/*=========================================
  Performance Optimization
=========================================*/

const Performance = {

    initialized: false,

    init() {

        if (this.initialized) {

            return;

        }

        this.initialized = true;

        this.optimizeImages();

        this.lazyLoadSections();

        this.monitorPerformance();

        console.log(
            "Performance Optimization Enabled."
        );

    },

    optimizeImages() {

        document
            .querySelectorAll("img[data-src]")
            .forEach(function (image) {

                image.src =
                    image.dataset.src;

                image.removeAttribute("data-src");

            });

    },

    lazyLoadSections() {

        const sections =
            document.querySelectorAll(".lazy-section");

        if (!("IntersectionObserver" in window)) {

            sections.forEach(function(section){

                section.classList.add("loaded");

            });

            return;

        }

        const observer =
            new IntersectionObserver(function(entries){

                entries.forEach(function(entry){

                    if(entry.isIntersecting){

                        entry.target.classList.add("loaded");

                        observer.unobserve(entry.target);

                    }

                });

            },{
                threshold:0.2
            });

        sections.forEach(function(section){

            observer.observe(section);

        });

    },

    monitorPerformance() {

        if ("performance" in window) {

            console.log(

                "Page Load:",

                Math.round(

                    performance.now()

                ) + " ms"

            );

        }

    }

};

/*=========================================
  Memory Cleanup
=========================================*/

window.addEventListener("beforeunload",function(){

    console.log(

        "Cleaning resources..."

    );

});

/*=========================================
  Initialize
=========================================*/

window.addEventListener("load",function(){

    Performance.init();

});

/*=========================================
  Contact Information
=========================================*/

const ContactConfig = {

    version: "1.0.0",

    company: "CodeNova Technologies",

    framework: "Vanilla JavaScript",

    supportEmail:

        "support@codenova.com",

    supportPhone:

        "+91 98765 43210"

};

console.table(ContactConfig);

/*=========================================
  Custom Ready Event
=========================================*/

document.dispatchEvent(

    new CustomEvent(

        "contactModuleReady",

        {

            detail: {

                version:

                    ContactConfig.version,

                company:

                    ContactConfig.company

            }

        }

    )

);

/*=========================================
  Final Console Messages
=========================================*/

console.log(
"========================================"
);

console.log(
" CodeNova Technologies - contact.js "
);

console.log(
" Version : " + ContactConfig.version
);

console.log(
" Contact Module Loaded Successfully "
);

console.log(
"========================================"
);
