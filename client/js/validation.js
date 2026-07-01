/*==================================================
  CodeNova Technologies
  validation.js
  Part 1A.1
  Form Validation + Required Fields
==================================================*/

"use strict";

/*=========================================
  Form Elements
=========================================*/

const validationForm =
    document.querySelector("#validationForm");

const requiredInputs =
    document.querySelectorAll(
        "[data-required]"
    );

const submitButton =
    document.querySelector("#submitButton");

/*=========================================
  Validation Configuration
=========================================*/

const ValidationConfig = {

    errorClass: "is-invalid",

    successClass: "is-valid",

    errorMessageClass: "error-message",

    successMessageClass: "success-message"

};

/*=========================================
  Required Field Check
=========================================*/

function isRequiredFieldValid(input){

    return input.value.trim() !== "";

}

/*=========================================
  Show Error
=========================================*/

function showFieldError(input,message){

    removeFieldMessage(input);

    input.classList.remove(

        ValidationConfig.successClass

    );

    input.classList.add(

        ValidationConfig.errorClass

    );

    const error =
        document.createElement("small");

    error.className =

        ValidationConfig.errorMessageClass;

    error.textContent = message;

    input.parentElement.appendChild(error);

}

/*=========================================
  Show Success
=========================================*/

function showFieldSuccess(input){

    removeFieldMessage(input);

    input.classList.remove(

        ValidationConfig.errorClass

    );

    input.classList.add(

        ValidationConfig.successClass

    );

}

/*=========================================
  Remove Messages
=========================================*/

function removeFieldMessage(input){

    const message =

        input.parentElement.querySelector(

            "." +

            ValidationConfig.errorMessageClass

        );

    if(message){

        message.remove();

    }

}

/*=========================================
  Validate Required Field
=========================================*/

function validateRequiredField(input){

    if(isRequiredFieldValid(input)){

        showFieldSuccess(input);

        return true;

    }

    showFieldError(

        input,

        input.dataset.message ||

        "This field is required."

    );

    return false;

}

/*=========================================
  Validate All Required Fields
=========================================*/

function validateRequiredFields(){

    let valid = true;

    requiredInputs.forEach(function(input){

        if(

            !validateRequiredField(input)

        ){

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Blur Validation
=========================================*/

requiredInputs.forEach(function(input){

    input.addEventListener("blur",function(){

        validateRequiredField(this);

    });

});

/*=========================================
  Input Validation
=========================================*/

requiredInputs.forEach(function(input){

    input.addEventListener("input",function(){

        if(

            this.classList.contains(

                ValidationConfig.errorClass

            )

        ){

            validateRequiredField(this);

        }

    });

});

/*=========================================
  Form Submit
=========================================*/

if(validationForm){

    validationForm.addEventListener(

        "submit",

        function(event){

            if(

                !validateRequiredFields()

            ){

                event.preventDefault();

            }

        }

    );

}

/*=========================================
  Focus First Invalid Field
=========================================*/

function focusFirstInvalidField(){

    const invalidField =

        validationForm.querySelector(

            "." +

            ValidationConfig.errorClass

        );

    if(invalidField){

        invalidField.focus();

    }

}

/*=========================================
  Enable / Disable Submit Button
=========================================*/

function updateSubmitButton(){

    if(!submitButton) return;

    submitButton.disabled =

        !validateRequiredFields();

}

/*=========================================
  Live Button Update
=========================================*/

requiredInputs.forEach(function(input){

    input.addEventListener(

        "input",

        updateSubmitButton

    );

});

/*=========================================
  Helper Functions
=========================================*/

function clearValidation(){

    requiredInputs.forEach(function(input){

        input.classList.remove(

            ValidationConfig.errorClass,

            ValidationConfig.successClass

        );

        removeFieldMessage(input);

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        updateSubmitButton();

        console.log(

            "Form Validation Ready"

        );

        console.log(

            "Required Fields Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 1A.2
  Input Validation + Error Messages
==================================================*/

"use strict";

/*=========================================
  Input Validation Rules
=========================================*/

const validationRules = {

    text: /^[A-Za-z\s]{2,50}$/,

    number: /^[0-9]+$/,

    username: /^[A-Za-z0-9_]{4,20}$/,

    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    phone: /^[6-9]\d{9}$/

};

/*=========================================
  Error Message Container
=========================================*/

function createErrorMessage(input,message){

    removeErrorMessage(input);

    const error =

        document.createElement("small");

    error.className =

        "error-message";

    error.textContent = message;

    input.parentNode.appendChild(error);

}

/*=========================================
  Remove Error Message
=========================================*/

function removeErrorMessage(input){

    const existing =

        input.parentNode.querySelector(

            ".error-message"

        );

    if(existing){

        existing.remove();

    }

}

/*=========================================
  Mark Input Invalid
=========================================*/

function markInvalid(input,message){

    input.classList.remove("is-valid");

    input.classList.add("is-invalid");

    createErrorMessage(

        input,

        message

    );

}

/*=========================================
  Mark Input Valid
=========================================*/

function markValid(input){

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

    removeErrorMessage(input);

}

/*=========================================
  Validate Text
=========================================*/

function validateText(input){

    if(

        validationRules.text.test(

            input.value.trim()

        )

    ){

        markValid(input);

        return true;

    }

    markInvalid(

        input,

        "Enter a valid name."

    );

    return false;

}

/*=========================================
  Validate Number
=========================================*/

function validateNumber(input){

    if(

        validationRules.number.test(

            input.value.trim()

        )

    ){

        markValid(input);

        return true;

    }

    markInvalid(

        input,

        "Only numeric values allowed."

    );

    return false;

}

/*=========================================
  Validate Input
=========================================*/

function validateInput(input){

    const type =

        input.dataset.validate;

    switch(type){

        case "text":

            return validateText(input);

        case "number":

            return validateNumber(input);

        default:

            return true;

    }

}

/*=========================================
  Live Input Validation
=========================================*/

const validatedInputs =

    document.querySelectorAll(

        "[data-validate]"

    );

validatedInputs.forEach(function(input){

    input.addEventListener(

        "input",

        function(){

            validateInput(this);

        }

    );

});

/*=========================================
  Blur Validation
=========================================*/

validatedInputs.forEach(function(input){

    input.addEventListener(

        "blur",

        function(){

            validateInput(this);

        }

    );

});

/*=========================================
  Error Summary
=========================================*/

function countErrors(){

    return document.querySelectorAll(

        ".is-invalid"

    ).length;

}

function hasErrors(){

    return countErrors() > 0;

}

/*=========================================
  Show Error Summary
=========================================*/

function displayErrorSummary(){

    const summary =

        document.querySelector(

            "#errorSummary"

        );

    if(!summary) return;

    const errors = countErrors();

    if(errors > 0){

        summary.textContent =

            errors +

            " validation error(s) found.";

    }

    else{

        summary.textContent =

            "";

    }

}

/*=========================================
  Update Summary
=========================================*/

validatedInputs.forEach(function(input){

    input.addEventListener(

        "input",

        displayErrorSummary

    );

});

/*=========================================
  Helper Functions
=========================================*/

function clearErrors(){

    validatedInputs.forEach(function(input){

        removeErrorMessage(input);

        input.classList.remove(

            "is-invalid",

            "is-valid"

        );

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        displayErrorSummary();

        console.log(

            "Input Validation Ready"

        );

        console.log(

            "Error Messages Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 1A.3
  Success Messages + Form Reset
==================================================*/

"use strict";

/*=========================================
  Success Message Elements
=========================================*/

const successContainer =
    document.querySelector("#successMessage");

const resetButton =
    document.querySelector("#resetButton");

const validationForm =
    document.querySelector("#validationForm");

/*=========================================
  Show Success Message
=========================================*/

function showSuccessMessage(message){

    if(!successContainer) return;

    successContainer.textContent = message;

    successContainer.classList.remove("hidden");

    successContainer.classList.remove("error");

    successContainer.classList.add("success");

    setTimeout(function(){

        hideSuccessMessage();

    },4000);

}

/*=========================================
  Hide Success Message
=========================================*/

function hideSuccessMessage(){

    if(!successContainer) return;

    successContainer.classList.add("hidden");

    successContainer.textContent = "";

}

/*=========================================
  Success Animation
=========================================*/

function animateSuccess(){

    if(!successContainer) return;

    successContainer.classList.add(

        "animate-success"

    );

    setTimeout(function(){

        successContainer.classList.remove(

            "animate-success"

        );

    },700);

}

/*=========================================
  Form Validation Status
=========================================*/

function formIsValid(){

    return document.querySelectorAll(

        ".is-invalid"

    ).length === 0;

}

/*=========================================
  Form Submit Success
=========================================*/

if(validationForm){

    validationForm.addEventListener(

        "submit",

        function(event){

            if(!formIsValid()){

                return;

            }

            event.preventDefault();

            showSuccessMessage(

                "Form submitted successfully!"

            );

            animateSuccess();

        }

    );

}

/*=========================================
  Clear Validation Classes
=========================================*/

function clearValidationClasses(){

    const fields =

        validationForm.querySelectorAll(

            "input, textarea, select"

        );

    fields.forEach(function(field){

        field.classList.remove(

            "is-valid",

            "is-invalid"

        );

    });

}

/*=========================================
  Remove Messages
=========================================*/

function removeValidationMessages(){

    document

        .querySelectorAll(

            ".error-message"

        )

        .forEach(function(message){

            message.remove();

        });

}

/*=========================================
  Form Reset
=========================================*/

function resetValidationForm(){

    if(!validationForm) return;

    validationForm.reset();

    clearValidationClasses();

    removeValidationMessages();

    hideSuccessMessage();

}

/*=========================================
  Reset Button
=========================================*/

if(resetButton){

    resetButton.addEventListener(

        "click",

        function(event){

            event.preventDefault();

            resetValidationForm();

        }

    );

}

/*=========================================
  Auto Reset
=========================================*/

function autoResetForm(delay = 5000){

    setTimeout(function(){

        resetValidationForm();

    },delay);

}

/*=========================================
  Success Counter
=========================================*/

let successfulSubmissions = 0;

function updateSubmissionCounter(){

    successfulSubmissions++;

    console.log(

        "Successful Submissions:",

        successfulSubmissions

    );

}

/*=========================================
  Success Event
=========================================*/

document.addEventListener(

    "formSuccess",

    function(){

        updateSubmissionCounter();

    }

);

/*=========================================
  Trigger Success Event
=========================================*/

function dispatchSuccessEvent(){

    document.dispatchEvent(

        new CustomEvent(

            "formSuccess"

        )

    );

}

/*=========================================
  Helper Functions
=========================================*/

function showTemporaryMessage(message){

    showSuccessMessage(message);

    animateSuccess();

}

function refreshForm(){

    resetValidationForm();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Success Messages Ready"

        );

        console.log(

            "Form Reset Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 1B.1
  Email Validation + Phone Validation
==================================================*/

"use strict";

/*=========================================
  Validation Patterns
=========================================*/

const ValidationPatterns = {

    email:
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

    phone:
        /^[6-9]\d{9}$/

};

const emailInput =
    document.querySelector("#email");

const phoneInput =
    document.querySelector("#phone");

/*=========================================
  Validation Helpers
=========================================*/

function showValidationError(input,message){

    removeValidationMessage(input);

    input.classList.remove("is-valid");

    input.classList.add("is-invalid");

    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent = message;

    input.parentElement.appendChild(error);

}

function showValidationSuccess(input){

    removeValidationMessage(input);

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

}

function removeValidationMessage(input){

    const message =
        input.parentElement.querySelector(

            ".error-message"

        );

    if(message){

        message.remove();

    }

}

/*=========================================
  Email Validation
=========================================*/

function validateEmail(email){

    return ValidationPatterns.email.test(

        email.trim()

    );

}

function checkEmail(input){

    if(input.value.trim() === ""){

        showValidationError(

            input,

            "Email is required."

        );

        return false;

    }

    if(

        !validateEmail(

            input.value

        )

    ){

        showValidationError(

            input,

            "Enter a valid email address."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Phone Validation
=========================================*/

function validatePhone(phone){

    return ValidationPatterns.phone.test(

        phone.trim()

    );

}

function checkPhone(input){

    if(input.value.trim() === ""){

        showValidationError(

            input,

            "Phone number is required."

        );

        return false;

    }

    if(

        !validatePhone(

            input.value

        )

    ){

        showValidationError(

            input,

            "Enter a valid 10-digit mobile number."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Live Email Validation
=========================================*/

if(emailInput){

    emailInput.addEventListener(

        "input",

        function(){

            checkEmail(this);

        }

    );

    emailInput.addEventListener(

        "blur",

        function(){

            checkEmail(this);

        }

    );

}

/*=========================================
  Live Phone Validation
=========================================*/

if(phoneInput){

    phoneInput.addEventListener(

        "input",

        function(){

            this.value =

                this.value.replace(

                    /\D/g,

                    ""

                );

            checkPhone(this);

        }

    );

    phoneInput.addEventListener(

        "blur",

        function(){

            checkPhone(this);

        }

    );

}

/*=========================================
  Form Validation
=========================================*/

function validateContactDetails(){

    let valid = true;

    if(emailInput){

        valid =

            checkEmail(emailInput)

            && valid;

    }

    if(phoneInput){

        valid =

            checkPhone(phoneInput)

            && valid;

    }

    return valid;

}

/*=========================================
  Helper Functions
=========================================*/

function clearContactValidation(){

    [emailInput,phoneInput]

    .forEach(function(input){

        if(!input) return;

        input.classList.remove(

            "is-valid",

            "is-invalid"

        );

        removeValidationMessage(input);

    });

}

function getContactValidationStatus(){

    return {

        email:

            emailInput

            ? validateEmail(

                emailInput.value

              )

            : false,

        phone:

            phoneInput

            ? validatePhone(

                phoneInput.value

              )

            : false

    };

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Email Validation Ready"

        );

        console.log(

            "Phone Validation Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 1B.2
  Password Validation + Confirm Password
==================================================*/

"use strict";

/*=========================================
  Password Elements
=========================================*/

const passwordInput =
    document.querySelector("#password");

const confirmPasswordInput =
    document.querySelector("#confirmPassword");

const passwordStrength =
    document.querySelector("#passwordStrength");

const passwordToggle =
    document.querySelector("#togglePassword");

const confirmToggle =
    document.querySelector("#toggleConfirmPassword");

/*=========================================
  Validation Patterns
=========================================*/

const PasswordRules = {

    lowercase: /[a-z]/,

    uppercase: /[A-Z]/,

    number: /\d/,

    special: /[@$!%*?&#]/,

    length: /.{8,}/

};

/*=========================================
  Error Message
=========================================*/

function passwordError(input,message){

    removePasswordMessage(input);

    input.classList.remove("is-valid");

    input.classList.add("is-invalid");

    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent = message;

    input.parentElement.appendChild(error);

}

function passwordSuccess(input){

    removePasswordMessage(input);

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

}

function removePasswordMessage(input){

    const message =
        input.parentElement.querySelector(
            ".error-message"
        );

    if(message){

        message.remove();

    }

}

/*=========================================
  Password Strength
=========================================*/

function calculateStrength(password){

    let score = 0;

    if(PasswordRules.lowercase.test(password))
        score++;

    if(PasswordRules.uppercase.test(password))
        score++;

    if(PasswordRules.number.test(password))
        score++;

    if(PasswordRules.special.test(password))
        score++;

    if(PasswordRules.length.test(password))
        score++;

    return score;

}

function updateStrengthIndicator(score){

    if(!passwordStrength) return;

    const levels = [

        "Very Weak",

        "Weak",

        "Medium",

        "Strong",

        "Very Strong",

        "Excellent"

    ];

    passwordStrength.textContent =
        levels[score];

}

/*=========================================
  Password Validation
=========================================*/

function validatePassword(input){

    const value =
        input.value.trim();

    if(value === ""){

        passwordError(

            input,

            "Password is required."

        );

        return false;

    }

    if(value.length < 8){

        passwordError(

            input,

            "Minimum 8 characters required."

        );

        return false;

    }

    if(!PasswordRules.uppercase.test(value)){

        passwordError(

            input,

            "Include one uppercase letter."

        );

        return false;

    }

    if(!PasswordRules.lowercase.test(value)){

        passwordError(

            input,

            "Include one lowercase letter."

        );

        return false;

    }

    if(!PasswordRules.number.test(value)){

        passwordError(

            input,

            "Include one number."

        );

        return false;

    }

    passwordSuccess(input);

    updateStrengthIndicator(

        calculateStrength(value)

    );

    return true;

}

/*=========================================
  Confirm Password
=========================================*/

function validateConfirmPassword(){

    if(

        confirmPasswordInput.value === ""

    ){

        passwordError(

            confirmPasswordInput,

            "Confirm your password."

        );

        return false;

    }

    if(

        passwordInput.value !==

        confirmPasswordInput.value

    ){

        passwordError(

            confirmPasswordInput,

            "Passwords do not match."

        );

        return false;

    }

    passwordSuccess(

        confirmPasswordInput

    );

    return true;

}

/*=========================================
  Live Validation
=========================================*/

if(passwordInput){

    passwordInput.addEventListener(

        "input",

        function(){

            validatePassword(this);

            validateConfirmPassword();

        }

    );

}

if(confirmPasswordInput){

    confirmPasswordInput.addEventListener(

        "input",

        validateConfirmPassword

    );

}

/*=========================================
  Show / Hide Password
=========================================*/

function toggleVisibility(input){

    input.type =

        input.type === "password"

        ? "text"

        : "password";

}

if(passwordToggle){

    passwordToggle.addEventListener(

        "click",

        function(){

            toggleVisibility(passwordInput);

        }

    );

}

if(confirmToggle){

    confirmToggle.addEventListener(

        "click",

        function(){

            toggleVisibility(

                confirmPasswordInput

            );

        }

    );

}

/*=========================================
  Helper Functions
=========================================*/

function passwordsMatch(){

    return passwordInput.value ===

        confirmPasswordInput.value;

}

function resetPasswords(){

    passwordInput.value = "";

    confirmPasswordInput.value = "";

    passwordStrength.textContent = "";

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Password Validation Ready"

        );

        console.log(

            "Confirm Password Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 1B.3
  Username Validation + Character Counter
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const usernameInput =
    document.querySelector("#username");

const usernameStatus =
    document.querySelector("#usernameStatus");

const bioInput =
    document.querySelector("#bio");

const characterCounter =
    document.querySelector("#characterCounter");

const MAX_USERNAME_LENGTH = 20;

const MAX_BIO_LENGTH = 250;

/*=========================================
  Username Pattern
=========================================*/

const usernamePattern =
    /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/;

/*=========================================
  Remove Status
=========================================*/

function removeUsernameStatus(){

    if(usernameStatus){

        usernameStatus.textContent = "";

        usernameStatus.className = "";

    }

}

/*=========================================
  Show Username Error
=========================================*/

function showUsernameError(message){

    if(!usernameStatus) return;

    usernameStatus.textContent = message;

    usernameStatus.className =

        "error-message";

    usernameInput.classList.remove(

        "is-valid"

    );

    usernameInput.classList.add(

        "is-invalid"

    );

}

/*=========================================
  Show Username Success
=========================================*/

function showUsernameSuccess(message){

    if(!usernameStatus) return;

    usernameStatus.textContent = message;

    usernameStatus.className =

        "success-message";

    usernameInput.classList.remove(

        "is-invalid"

    );

    usernameInput.classList.add(

        "is-valid"

    );

}

/*=========================================
  Validate Username
=========================================*/

function validateUsername(){

    if(!usernameInput) return false;

    const username =
        usernameInput.value.trim();

    if(username === ""){

        showUsernameError(

            "Username is required."

        );

        return false;

    }

    if(

        username.length >

        MAX_USERNAME_LENGTH

    ){

        showUsernameError(

            "Maximum 20 characters allowed."

        );

        return false;

    }

    if(

        !usernamePattern.test(username)

    ){

        showUsernameError(

            "Only letters, numbers and '_' allowed."

        );

        return false;

    }

    showUsernameSuccess(

        "Username looks good."

    );

    return true;

}

/*=========================================
  Live Username Validation
=========================================*/

if(usernameInput){

    usernameInput.addEventListener(

        "input",

        validateUsername

    );

    usernameInput.addEventListener(

        "blur",

        validateUsername

    );

}

/*=========================================
  Character Counter
=========================================*/

function updateCharacterCounter(){

    if(

        !bioInput ||

        !characterCounter

    ) return;

    const length =
        bioInput.value.length;

    characterCounter.textContent =

        length +

        " / " +

        MAX_BIO_LENGTH;

    if(length > MAX_BIO_LENGTH){

        characterCounter.classList.add(

            "text-danger"

        );

        bioInput.classList.add(

            "is-invalid"

        );

    }

    else{

        characterCounter.classList.remove(

            "text-danger"

        );

        bioInput.classList.remove(

            "is-invalid"

        );

    }

}

/*=========================================
  Limit Characters
=========================================*/

if(bioInput){

    bioInput.addEventListener(

        "input",

        function(){

            if(

                this.value.length >

                MAX_BIO_LENGTH

            ){

                this.value =

                    this.value.substring(

                        0,

                        MAX_BIO_LENGTH

                    );

            }

            updateCharacterCounter();

        }

    );

}

/*=========================================
  Remaining Characters
=========================================*/

function remainingCharacters(){

    if(!bioInput) return MAX_BIO_LENGTH;

    return MAX_BIO_LENGTH -

        bioInput.value.length;

}

/*=========================================
  Reset Username
=========================================*/

function resetUsernameValidation(){

    if(usernameInput){

        usernameInput.value = "";

        usernameInput.classList.remove(

            "is-valid",

            "is-invalid"

        );

    }

    removeUsernameStatus();

}

/*=========================================
  Reset Counter
=========================================*/

function resetCharacterCounter(){

    if(bioInput){

        bioInput.value = "";

    }

    updateCharacterCounter();

}

/*=========================================
  Helper Functions
=========================================*/

function usernameAvailable(){

    return validateUsername();

}

function currentCharacterCount(){

    return bioInput

        ? bioInput.value.length

        : 0;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        updateCharacterCounter();

        console.log(

            "Username Validation Ready"

        );

        console.log(

            "Character Counter Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 2A.1
  Number Validation + Date Validation
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const numberInputs =
    document.querySelectorAll(
        "[data-validate='number']"
    );

const dateInputs =
    document.querySelectorAll(
        "[data-validate='date']"
    );

/*=========================================
  Validation Patterns
=========================================*/

const ValidationPatterns = {

    number: /^\d+$/,

    decimal: /^\d+(\.\d{1,2})?$/,

    date:
        /^\d{4}-\d{2}-\d{2}$/

};

/*=========================================
  Error Message
=========================================*/

function showValidationMessage(
    input,
    message
){

    removeValidationMessage(input);

    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent =
        message;

    input.parentElement.appendChild(error);

    input.classList.add("is-invalid");

    input.classList.remove("is-valid");

}

function removeValidationMessage(
    input
){

    const message =
        input.parentElement.querySelector(
            ".error-message"
        );

    if(message){

        message.remove();

    }

}

/*=========================================
  Success
=========================================*/

function showValidationSuccess(
    input
){

    removeValidationMessage(input);

    input.classList.remove(
        "is-invalid"
    );

    input.classList.add(
        "is-valid"
    );

}

/*=========================================
  Number Validation
=========================================*/

function validateNumber(input){

    const value =
        input.value.trim();

    if(value === ""){

        showValidationMessage(

            input,

            "Number is required."

        );

        return false;

    }

    if(

        !ValidationPatterns.number.test(

            value

        )

    ){

        showValidationMessage(

            input,

            "Only numeric values are allowed."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Decimal Validation
=========================================*/

function validateDecimal(input){

    const value =
        input.value.trim();

    if(

        !ValidationPatterns.decimal.test(

            value

        )

    ){

        showValidationMessage(

            input,

            "Invalid decimal number."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Date Validation
=========================================*/

function validateDate(input){

    const value =
        input.value;

    if(value === ""){

        showValidationMessage(

            input,

            "Date is required."

        );

        return false;

    }

    if(

        !ValidationPatterns.date.test(

            value

        )

    ){

        showValidationMessage(

            input,

            "Invalid date format."

        );

        return false;

    }

    const selected =
        new Date(value);

    if(

        Number.isNaN(

            selected.getTime()

        )

    ){

        showValidationMessage(

            input,

            "Invalid calendar date."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Date Range
=========================================*/

function validateFutureDate(input){

    const selected =
        new Date(input.value);

    const today =
        new Date();

    today.setHours(
        0,0,0,0
    );

    if(selected < today){

        showValidationMessage(

            input,

            "Past dates are not allowed."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Number Events
=========================================*/

numberInputs.forEach(function(input){

    input.addEventListener(

        "input",

        function(){

            this.value =
                this.value.replace(

                    /[^0-9.]/g,

                    ""

                );

            if(

                this.dataset.type ===

                "decimal"

            ){

                validateDecimal(this);

            }

            else{

                validateNumber(this);

            }

        }

    );

    input.addEventListener(

        "blur",

        function(){

            if(

                this.dataset.type ===

                "decimal"

            ){

                validateDecimal(this);

            }

            else{

                validateNumber(this);

            }

        }

    );

});

/*=========================================
  Date Events
=========================================*/

dateInputs.forEach(function(input){

    input.addEventListener(

        "change",

        function(){

            validateDate(this);

        }

    );

    input.addEventListener(

        "blur",

        function(){

            validateFutureDate(this);

        }

    );

});

/*=========================================
  Helper Functions
=========================================*/

function validateAllNumbers(){

    let valid = true;

    numberInputs.forEach(function(input){

        if(!validateNumber(input)){

            valid = false;

        }

    });

    return valid;

}

function validateAllDates(){

    let valid = true;

    dateInputs.forEach(function(input){

        if(!validateDate(input)){

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Number Validation Ready"

        );

        console.log(

            "Date Validation Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 2A.2
  URL Validation + File Validation
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const urlInputs =
    document.querySelectorAll(
        "[data-validate='url']"
    );

const fileInputs =
    document.querySelectorAll(
        "[data-validate='file']"
    );

/*=========================================
  Validation Patterns
=========================================*/

const URL_PATTERN =
    /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

const ALLOWED_FILE_TYPES = [

    "image/jpeg",

    "image/png",

    "image/webp",

    "application/pdf"

];

const MAX_FILE_SIZE =
    5 * 1024 * 1024;

/*=========================================
  Message Helpers
=========================================*/

function removeMessage(input){

    const message =
        input.parentElement.querySelector(
            ".error-message"
        );

    if(message){

        message.remove();

    }

}

function showError(input,text){

    removeMessage(input);

    input.classList.remove("is-valid");

    input.classList.add("is-invalid");

    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent = text;

    input.parentElement.appendChild(error);

}

function showSuccess(input){

    removeMessage(input);

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

}

/*=========================================
  URL Validation
=========================================*/

function validateURL(input){

    const value =
        input.value.trim();

    if(value === ""){

        showError(

            input,

            "Website URL is required."

        );

        return false;

    }

    if(!URL_PATTERN.test(value)){

        showError(

            input,

            "Enter a valid URL."

        );

        return false;

    }

    showSuccess(input);

    return true;

}
/*==================================================
  CodeNova Technologies
  validation.js
  Part 2A.3
  Image Validation + Custom Validators
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const imageInputs =
    document.querySelectorAll(
        "[data-validate='image']"
    );

const customInputs =
    document.querySelectorAll(
        "[data-validator]"
    );

/*=========================================
  Image Configuration
=========================================*/

const IMAGE_TYPES = [

    "image/jpeg",

    "image/png",

    "image/webp",

    "image/gif"

];

const MAX_IMAGE_SIZE =
    5 * 1024 * 1024;

/*=========================================
  Message Helpers
=========================================*/

function removeValidationMessage(input){

    const message =
        input.parentElement.querySelector(
            ".error-message"
        );

    if(message){

        message.remove();

    }

}

function showValidationError(

    input,

    text

){

    removeValidationMessage(input);

    input.classList.remove("is-valid");

    input.classList.add("is-invalid");

    const error =
        document.createElement("small");

    error.className =
        "error-message";

    error.textContent = text;

    input.parentElement.appendChild(error);

}

function showValidationSuccess(input){

    removeValidationMessage(input);

    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

}

/*=========================================
  Image Validation
=========================================*/

function validateImage(input){

    const file =
        input.files[0];

    if(!file){

        showValidationError(

            input,

            "Please select an image."

        );

        return false;

    }

    if(

        !IMAGE_TYPES.includes(

            file.type

        )

    ){

        showValidationError(

            input,

            "Unsupported image format."

        );

        return false;

    }

    if(

        file.size >

        MAX_IMAGE_SIZE

    ){

        showValidationError(

            input,

            "Maximum image size is 5 MB."

        );

        return false;

    }

    showValidationSuccess(input);

    return true;

}

/*=========================================
  Image Preview
=========================================*/

function previewImage(input){

    const preview =
        input.parentElement.querySelector(
            ".image-preview"
        );

    if(

        !preview ||

        !input.files.length

    ){

        return;

    }

    const reader =
        new FileReader();

    reader.onload = function(event){

        preview.src =
            event.target.result;

        preview.style.display =
            "block";

    };

    reader.readAsDataURL(

        input.files[0]

    );

}

/*=========================================
  Image Events
=========================================*/

imageInputs.forEach(function(input){

    input.addEventListener(

        "change",

        function(){

            if(

                validateImage(this)

            ){

                previewImage(this);

            }

        }

    );

});

/*=========================================
  Custom Validators
=========================================*/

const Validators = {

    even(value){

        return Number(value) % 2 === 0;

    },

    odd(value){

        return Number(value) % 2 !== 0;

    },

    uppercase(value){

        return value ===

            value.toUpperCase();

    },

    lowercase(value){

        return value ===

            value.toLowerCase();

    },

    minlength(value,length){

        return value.length >=

            Number(length);

    }

};

/*=========================================
  Custom Validation
=========================================*/

function validateCustom(input){

    const validator =
        input.dataset.validator;

    const parameter =
        input.dataset.param;

    let valid = true;

    switch(validator){

        case "even":

            valid = Validators.even(

                input.value

            );

            break;

        case "odd":

            valid = Validators.odd(

                input.value

            );

            break;

        case "uppercase":

            valid = Validators.uppercase(

                input.value

            );

            break;

        case "lowercase":

            valid = Validators.lowercase(

                input.value

            );

            break;

        case "minlength":

            valid = Validators.minlength(

                input.value,

                parameter

            );

            break;

    }

    if(valid){

        showValidationSuccess(input);

    }

    else{

        showValidationError(

            input,

            "Custom validation failed."

        );

    }

    return valid;

}

/*=========================================
  Custom Events
=========================================*/

customInputs.forEach(function(input){

    input.addEventListener(

        "input",

        function(){

            validateCustom(this);

        }

    );

});

/*=========================================
  Helper Functions
=========================================*/

function validateAllImages(){

    let valid = true;

    imageInputs.forEach(function(input){

        if(

            !validateImage(input)

        ){

            valid = false;

        }

    });

    return valid;

}

function validateAllCustom(){

    let valid = true;

    customInputs.forEach(function(input){

        if(

            !validateCustom(input)

        ){

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Image Validation Ready"

        );

        console.log(

            "Custom Validators Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 2B.1
  Real-time Validation + AJAX Validation
==================================================*/

"use strict";

/*=========================================
  Form Elements
=========================================*/

const ajaxForm =
    document.querySelector("#validationForm");

const realtimeInputs =
    document.querySelectorAll(
        "[data-validate]"
    );

const submitBtn =
    document.querySelector("#submitButton");

const formLoader =
    document.querySelector("#formLoader");

/*=========================================
  Real-time Validation
=========================================*/

function validateRealtime(input){

    if(!input) return false;

    const value =
        input.value.trim();

    let valid = true;

    switch(input.dataset.validate){

        case "email":

            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                .test(value);

            break;

        case "phone":

            valid = /^[6-9]\d{9}$/

                .test(value);

            break;

        case "number":

            valid = /^\d+$/

                .test(value);

            break;

        case "username":

            valid =

                /^[A-Za-z][A-Za-z0-9_]{3,19}$/

                .test(value);

            break;

        default:

            valid = value !== "";

    }

    updateValidationUI(

        input,

        valid

    );

    return valid;

}

/*=========================================
  Update Validation UI
=========================================*/

function updateValidationUI(

    input,

    valid

){

    input.classList.remove(

        "is-valid",

        "is-invalid"

    );

    input.classList.add(

        valid

        ? "is-valid"

        : "is-invalid"

    );

}

/*=========================================
  Live Validation Events
=========================================*/

realtimeInputs.forEach(function(input){

    input.addEventListener(

        "input",

        function(){

            validateRealtime(this);

        }

    );

    input.addEventListener(

        "blur",

        function(){

            validateRealtime(this);

        }

    );

});

/*=========================================
  Validate Entire Form
=========================================*/

function validateForm(){

    let valid = true;

    realtimeInputs.forEach(function(input){

        if(

            !validateRealtime(input)

        ){

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Loading Button
=========================================*/

function startLoading(){

    if(formLoader){

        formLoader.style.display =

            "inline-block";

    }

    if(submitBtn){

        submitBtn.disabled = true;

        submitBtn.textContent =

            "Submitting...";

    }

}

function stopLoading(){

    if(formLoader){

        formLoader.style.display =

            "none";

    }

    if(submitBtn){

        submitBtn.disabled = false;

        submitBtn.textContent =

            "Submit";

    }

}

/*=========================================
  AJAX Validation
=========================================*/

async function submitWithAjax(){

    if(!validateForm()){

        return;

    }

    startLoading();

    const formData =

        new FormData(ajaxForm);

    try{

        const response =

            await fetch(

                "/api/contact",

                {

                    method:"POST",

                    body:formData

                }

            );

        if(!response.ok){

            throw new Error(

                "Submission failed."

            );

        }

        const result =

            await response.json();

        console.log(

            result

        );

        alert(

            "Form submitted successfully."

        );

        ajaxForm.reset();

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to submit form."

        );

    }

    finally{

        stopLoading();

    }

}

/*=========================================
  Submit Event
=========================================*/

if(ajaxForm){

    ajaxForm.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            submitWithAjax();

        }

    );

}

/*=========================================
  Helper Functions
=========================================*/

function enableSubmit(){

    if(submitBtn){

        submitBtn.disabled = false;

    }

}

function disableSubmit(){

    if(submitBtn){

        submitBtn.disabled = true;

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Real-time Validation Ready"

        );

        console.log(

            "AJAX Validation Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 2B.2
  Captcha Validation + Duplicate Check
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const captchaInput =
    document.querySelector("#captcha");

const captchaText =
    document.querySelector("#captchaText");

const refreshCaptchaBtn =
    document.querySelector("#refreshCaptcha");

const duplicateInputs =
    document.querySelectorAll(
        "[data-duplicate]"
    );

/*=========================================
  Captcha Configuration
=========================================*/

let generatedCaptcha = "";

const CAPTCHA_LENGTH = 6;

/*=========================================
  Generate Captcha
=========================================*/

function generateCaptcha(){

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    generatedCaptcha = "";

    for(let i = 0; i < CAPTCHA_LENGTH; i++){

        generatedCaptcha +=

            characters.charAt(

                Math.floor(

                    Math.random() *

                    characters.length

                )

            );

    }

    if(captchaText){

        captchaText.textContent =

            generatedCaptcha;

    }

}

/*=========================================
  Validate Captcha
=========================================*/

function validateCaptcha(){

    if(!captchaInput) return false;

    const value =
        captchaInput.value.trim().toUpperCase();

    if(value === ""){

        showCaptchaError(

            "Captcha is required."

        );

        return false;

    }

    if(value !== generatedCaptcha){

        showCaptchaError(

            "Incorrect captcha."

        );

        return false;

    }

    showCaptchaSuccess();

    return true;

}

/*=========================================
  Captcha Messages
=========================================*/

function showCaptchaError(message){

    captchaInput.classList.remove(

        "is-valid"

    );

    captchaInput.classList.add(

        "is-invalid"

    );

    console.error(message);

}

function showCaptchaSuccess(){

    captchaInput.classList.remove(

        "is-invalid"

    );

    captchaInput.classList.add(

        "is-valid"

    );

}

/*=========================================
  Refresh Captcha
=========================================*/

if(refreshCaptchaBtn){

    refreshCaptchaBtn.addEventListener(

        "click",

        function(){

            generateCaptcha();

            captchaInput.value = "";

            captchaInput.focus();

        }

    );

}

/*=========================================
  Live Captcha Validation
=========================================*/

if(captchaInput){

    captchaInput.addEventListener(

        "input",

        validateCaptcha

    );

}

/*=========================================
  Duplicate Check
=========================================*/

const duplicateDatabase = {

    usernames: [

        "admin",

        "administrator",

        "demo",

        "testuser",

        "guest"

    ],

    emails: [

        "admin@example.com",

        "demo@example.com",

        "support@example.com"

    ]

};

/*=========================================
  Duplicate Validation
=========================================*/

function checkDuplicate(input){

    const value =

        input.value

        .trim()

        .toLowerCase();

    const type =

        input.dataset.duplicate;

    let exists = false;

    if(type === "username"){

        exists =

            duplicateDatabase.usernames

            .includes(value);

    }

    if(type === "email"){

        exists =

            duplicateDatabase.emails

            .includes(value);

    }

    if(exists){

        input.classList.remove(

            "is-valid"

        );

        input.classList.add(

            "is-invalid"

        );

        console.warn(

            type +

            " already exists."

        );

        return false;

    }

    input.classList.remove(

        "is-invalid"

    );

    input.classList.add(

        "is-valid"

    );

    return true;

}

/*=========================================
  Duplicate Events
=========================================*/

duplicateInputs.forEach(function(input){

    input.addEventListener(

        "blur",

        function(){

            checkDuplicate(this);

        }

    );

});

/*=========================================
  Validate All
=========================================*/

function validateSecurity(){

    let valid =

        validateCaptcha();

    duplicateInputs.forEach(function(input){

        if(

            !checkDuplicate(input)

        ){

            valid = false;

        }

    });

    return valid;

}

/*=========================================
  Helper Functions
=========================================*/

function regenerateCaptcha(){

    generateCaptcha();

}

function clearCaptcha(){

    if(captchaInput){

        captchaInput.value = "";

        captchaInput.classList.remove(

            "is-valid",

            "is-invalid"

        );

    }

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        generateCaptcha();

        console.log(

            "Captcha Validation Ready"

        );

        console.log(

            "Duplicate Check Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 2B.3
  Submit Validation + Validation Notifications
==================================================*/

"use strict";

/*=========================================
  Elements
=========================================*/

const validationForm =
    document.querySelector("#validationForm");

const submitButton =
    document.querySelector("#submitButton");

const notificationBox =
    document.querySelector("#validationNotification");

const progressBar =
    document.querySelector("#submitProgress");

/*=========================================
  Notification
=========================================*/

function showNotification(

    message,

    type = "success"

){

    if(!notificationBox) return;

    notificationBox.textContent = message;

    notificationBox.className =

        "notification " + type;

    notificationBox.classList.add("show");

    setTimeout(function(){

        notificationBox.classList.remove(

            "show"

        );

    },4000);

}

/*=========================================
  Progress Bar
=========================================*/

function startProgress(){

    if(!progressBar) return;

    progressBar.style.width = "0%";

    let progress = 0;

    const timer = setInterval(function(){

        progress += 10;

        progressBar.style.width =

            progress + "%";

        if(progress >= 100){

            clearInterval(timer);

        }

    },80);

}

/*=========================================
  Validate Entire Form
=========================================*/

function validateBeforeSubmit(){

    const invalidFields =

        document.querySelectorAll(

            ".is-invalid"

        );

    if(invalidFields.length > 0){

        showNotification(

            "Please correct all highlighted fields.",

            "error"

        );

        invalidFields[0].focus();

        return false;

    }

    return true;

}

/*=========================================
  Submit Button State
=========================================*/

function setLoadingState(){

    if(!submitButton) return;

    submitButton.disabled = true;

    submitButton.innerHTML =

        '<i class="fas fa-spinner fa-spin"></i> Submitting...';

}

function resetButtonState(){

    if(!submitButton) return;

    submitButton.disabled = false;

    submitButton.innerHTML =

        "Submit";

}

/*=========================================
  Submit Handler
=========================================*/

async function submitValidation(){

    if(

        !validateBeforeSubmit()

    ){

        return;

    }

    setLoadingState();

    startProgress();

    try{

        await new Promise(function(resolve){

            setTimeout(resolve,2000);

        });

        showNotification(

            "Form submitted successfully.",

            "success"

        );

        document.dispatchEvent(

            new CustomEvent(

                "validationSuccess"

            )

        );

        validationForm.reset();

    }

    catch(error){

        console.error(error);

        showNotification(

            "Submission failed.",

            "error"

        );

    }

    finally{

        resetButtonState();

    }

}

/*=========================================
  Submit Event
=========================================*/

if(validationForm){

    validationForm.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            submitValidation();

        }

    );

}

/*=========================================
  Validation Events
=========================================*/

document.addEventListener(

    "validationSuccess",

    function(){

        console.log(

            "Validation Successful"

        );

    }

);

document.addEventListener(

    "validationFailed",

    function(){

        showNotification(

            "Validation failed.",

            "warning"

        );

    }

);

/*=========================================
  Notification Helpers
=========================================*/

function successNotification(text){

    showNotification(

        text,

        "success"

    );

}

function warningNotification(text){

    showNotification(

        text,

        "warning"

    );

}

function errorNotification(text){

    showNotification(

        text,

        "error"

    );

}

/*=========================================
  Auto Hide Notifications
=========================================*/

window.addEventListener(

    "click",

    function(){

        if(notificationBox){

            notificationBox.classList.remove(

                "show"

            );

        }

    }

);

/*=========================================
  Helper Functions
=========================================*/

function clearNotifications(){

    if(notificationBox){

        notificationBox.textContent = "";

        notificationBox.className =

            "notification";

    }

}

function resetValidationUI(){

    clearNotifications();

    resetButtonState();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        console.log(

            "Submit Validation Ready"

        );

        console.log(

            "Validation Notifications Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 3A.1
  Accessibility + Keyboard Support
==================================================*/

"use strict";

/*=========================================
  Accessibility Elements
=========================================*/

const validationForm =
    document.querySelector("#validationForm");

const accessibilityStatus =
    document.querySelector("#accessibilityStatus");

const focusableElements =
    document.querySelectorAll(
        "input, textarea, select, button"
    );

/*=========================================
  ARIA Support
=========================================*/

function initializeARIA(){

    focusableElements.forEach(function(element){

        if(!element.hasAttribute("aria-label")){

            element.setAttribute(

                "aria-label",

                element.name ||

                element.id ||

                "Form Field"

            );

        }

        element.setAttribute(

            "aria-required",

            element.required

        );

    });

}

/*=========================================
  Live Region
=========================================*/

function announce(message){

    if(!accessibilityStatus) return;

    accessibilityStatus.textContent = "";

    setTimeout(function(){

        accessibilityStatus.textContent =

            message;

    },100);

}

/*=========================================
  Validation Announcement
=========================================*/

function announceValidation(input,valid){

    if(valid){

        announce(

            input.name +

            " is valid."

        );

    }

    else{

        announce(

            input.name +

            " contains an error."

        );

    }

}

/*=========================================
  Focus Invalid Field
=========================================*/

function focusFirstInvalidField(){

    const invalidField =

        document.querySelector(

            ".is-invalid"

        );

    if(invalidField){

        invalidField.focus();

        invalidField.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}

/*=========================================
  Keyboard Support
=========================================*/

let currentIndex = 0;

/*=========================================
  Keyboard Navigation
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        if(event.key === "ArrowDown"){

            event.preventDefault();

            currentIndex++;

            if(

                currentIndex >=

                focusableElements.length

            ){

                currentIndex = 0;

            }

            focusableElements[

                currentIndex

            ].focus();

        }

        if(event.key === "ArrowUp"){

            event.preventDefault();

            currentIndex--;

            if(currentIndex < 0){

                currentIndex =

                    focusableElements.length - 1;

            }

            focusableElements[

                currentIndex

            ].focus();

        }

        if(

            event.ctrlKey &&

            event.key === "Enter"

        ){

            if(validationForm){

                validationForm.requestSubmit();

            }

        }

        if(event.key === "Escape"){

            document.activeElement.blur();

        }

    }

);

/*=========================================
  Focus Highlight
=========================================*/

focusableElements.forEach(function(element){

    element.addEventListener(

        "focus",

        function(){

            this.classList.add(

                "keyboard-focus"

            );

        }

    );

    element.addEventListener(

        "blur",

        function(){

            this.classList.remove(

                "keyboard-focus"

            );

        }

    );

});

/*=========================================
  Accessibility Validation
=========================================*/

function validateAccessibility(){

    document

        .querySelectorAll(

            ".is-valid, .is-invalid"

        )

        .forEach(function(input){

            input.setAttribute(

                "aria-invalid",

                input.classList.contains(

                    "is-invalid"

                )

            );

        });

}

/*=========================================
  Keyboard Shortcuts
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        if(

            event.altKey &&

            event.key.toLowerCase() === "r"

        ){

            validationForm.reset();

            announce(

                "Form has been reset."

            );

        }

        if(

            event.altKey &&

            event.key.toLowerCase() === "v"

        ){

            focusFirstInvalidField();

        }

    }

);

/*=========================================
  Helper Functions
=========================================*/

function resetKeyboardNavigation(){

    currentIndex = 0;

}

function refreshAccessibility(){

    initializeARIA();

    validateAccessibility();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        initializeARIA();

        validateAccessibility();

        console.log(

            "Accessibility Ready"

        );

        console.log(

            "Keyboard Support Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 3A.2
  Browser Compatibility + Validation Helpers
==================================================*/

"use strict";

/*=========================================
  Browser Compatibility
=========================================*/

const BrowserSupport = {

    localStorage:
        typeof(Storage) !== "undefined",

    fetch:
        "fetch" in window,

    promise:
        "Promise" in window,

    formData:
        "FormData" in window,

    fileReader:
        "FileReader" in window,

    customEvent:
        "CustomEvent" in window,

    intersectionObserver:
        "IntersectionObserver" in window,

    resizeObserver:
        "ResizeObserver" in window

};

/*=========================================
  Browser Support Check
=========================================*/

function checkBrowserCompatibility(){

    Object.entries(

        BrowserSupport

    ).forEach(function(item){

        const [

            feature,

            supported

        ] = item;

        if(supported){

            console.log(

                "✓",

                feature,

                "Supported"

            );

        }

        else{

            console.warn(

                "✗",

                feature,

                "Not Supported"

            );

        }

    });

}

/*=========================================
  Browser Information
=========================================*/

function browserInformation(){

    return {

        userAgent:

            navigator.userAgent,

        language:

            navigator.language,

        online:

            navigator.onLine,

        cookies:

            navigator.cookieEnabled,

        platform:

            navigator.platform

    };

}

/*=========================================
  Online / Offline
=========================================*/

window.addEventListener(

    "online",

    function(){

        console.log(

            "Internet Connected"

        );

    }

);

window.addEventListener(

    "offline",

    function(){

        console.warn(

            "Internet Disconnected"

        );

    }

);

/*=========================================
  Validation Helpers
=========================================*/

function isEmpty(value){

    return value.trim() === "";

}

function isNumeric(value){

    return /^\d+$/.test(

        value

    );

}

function isAlphabetic(value){

    return /^[A-Za-z ]+$/.test(

        value

    );

}

function minimumLength(

    value,

    length

){

    return value.length >= length;

}

function maximumLength(

    value,

    length

){

    return value.length <= length;

}

function trimValue(input){

    input.value =

        input.value.trim();

}

function sanitizeInput(input){

    input.value =

        input.value.replace(

            /<[^>]*>?/gm,

            ""

        );

}

/*=========================================
  Field Helpers
=========================================*/

function clearFieldState(input){

    input.classList.remove(

        "is-valid",

        "is-invalid"

    );

}

function markValid(input){

    clearFieldState(input);

    input.classList.add(

        "is-valid"

    );

}

function markInvalid(input){

    clearFieldState(input);

    input.classList.add(

        "is-invalid"

    );

}

/*=========================================
  Validation Result
=========================================*/

function validationResult(

    input,

    valid

){

    if(valid){

        markValid(input);

    }

    else{

        markInvalid(input);

    }

    return valid;

}

/*=========================================
  Helper Utilities
=========================================*/

function resetValidationFields(){

    document

        .querySelectorAll(

            ".is-valid,.is-invalid"

        )

        .forEach(function(input){

            clearFieldState(input);

        });

}

function getInvalidFields(){

    return document.querySelectorAll(

        ".is-invalid"

    );

}

function getValidFields(){

    return document.querySelectorAll(

        ".is-valid"

    );

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        checkBrowserCompatibility();

        console.table(

            browserInformation()

        );

        console.log(

            "Browser Compatibility Ready"

        );

        console.log(

            "Validation Helpers Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 3A.3
  Performance Optimization + Local Storage
==================================================*/

"use strict";

/*=========================================
  Local Storage Keys
=========================================*/

const VALIDATION_STORAGE = {

    FORM_DATA: "codenova-form-data",

    AUTO_SAVE: "codenova-auto-save",

    LAST_SUBMIT: "codenova-last-submit"

};

const validationForm =
    document.querySelector("#validationForm");

/*=========================================
  Performance Optimization
=========================================*/

const Performance = {

    startTime:

        performance.now(),

    endTime: 0,

    logExecution(){

        this.endTime =

            performance.now();

        console.log(

            "Validation Loaded:",

            (

                this.endTime -

                this.startTime

            ).toFixed(2),

            "ms"

        );

    }

};

/*=========================================
  Debounce
=========================================*/

function debounce(callback,delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(function(){

            callback.apply(

                this,

                args

            );

        },delay);

    };

}

/*=========================================
  Throttle
=========================================*/

function throttle(callback,delay){

    let waiting = false;

    return function(...args){

        if(waiting) return;

        callback.apply(

            this,

            args

        );

        waiting = true;

        setTimeout(function(){

            waiting = false;

        },delay);

    };

}

/*=========================================
  Save Form
=========================================*/

function saveFormData(){

    if(!validationForm) return;

    const data = {};

    const fields =

        validationForm.querySelectorAll(

            "input,textarea,select"

        );

    fields.forEach(function(field){

        data[field.name] =

            field.value;

    });

    localStorage.setItem(

        VALIDATION_STORAGE.FORM_DATA,

        JSON.stringify(data)

    );

}

/*=========================================
  Restore Form
=========================================*/

function restoreFormData(){

    if(!validationForm) return;

    const data =

        JSON.parse(

            localStorage.getItem(

                VALIDATION_STORAGE.FORM_DATA

            )

        );

    if(!data) return;

    Object.keys(data)

    .forEach(function(key){

        const field =

            validationForm.querySelector(

                `[name="${key}"]`

            );

        if(field){

            field.value = data[key];

        }

    });

}

/*=========================================
  Clear Saved Data
=========================================*/

function clearSavedData(){

    localStorage.removeItem(

        VALIDATION_STORAGE.FORM_DATA

    );

}

/*=========================================
  Auto Save
=========================================*/

if(validationForm){

    validationForm.addEventListener(

        "input",

        debounce(

            saveFormData,

            500

        )

    );

}

/*=========================================
  Last Submission
=========================================*/

function saveSubmissionTime(){

    localStorage.setItem(

        VALIDATION_STORAGE.LAST_SUBMIT,

        new Date().toISOString()

    );

}

function getSubmissionTime(){

    return localStorage.getItem(

        VALIDATION_STORAGE.LAST_SUBMIT

    );

}

/*=========================================
  Idle Callback
=========================================*/

function executeIdleTask(task){

    if(

        "requestIdleCallback"

        in window

    ){

        requestIdleCallback(task);

    }

    else{

        setTimeout(task,200);

    }

}

/*=========================================
  Optimize Validation
=========================================*/

const optimizedValidation =

    throttle(function(){

        console.log(

            "Optimized Validation"

        );

    },300);

/*=========================================
  Helper Functions
=========================================*/

function storageAvailable(){

    try{

        localStorage.setItem(

            "__test",

            "1"

        );

        localStorage.removeItem(

            "__test"

        );

        return true;

    }

    catch{

        return false;

    }

}

function clearValidationStorage(){

    Object.values(

        VALIDATION_STORAGE

    ).forEach(function(key){

        localStorage.removeItem(key);

    });

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        if(storageAvailable()){

            restoreFormData();

        }

        executeIdleTask(

            Performance.logExecution.bind(

                Performance

            )

        );

        console.log(

            "Performance Optimization Ready"

        );

        console.log(

            "Local Storage Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 3B.1
  Utility Functions + Initialization
==================================================*/

"use strict";

/*=========================================
  Utility Functions
=========================================*/

const ValidationUtils = {

    /* Select Single Element */
    $(selector){

        return document.querySelector(selector);

    },

    /* Select Multiple Elements */
    $$(selector){

        return document.querySelectorAll(selector);

    },

    /* Add CSS Class */
    addClass(element,className){

        if(element){

            element.classList.add(className);

        }

    },

    /* Remove CSS Class */
    removeClass(element,className){

        if(element){

            element.classList.remove(className);

        }

    },

    /* Toggle CSS Class */
    toggleClass(element,className){

        if(element){

            element.classList.toggle(className);

        }

    },

    /* Has CSS Class */
    hasClass(element,className){

        return element

            ? element.classList.contains(className)

            : false;

    },

    /* Create Element */
    create(tag,className=""){

        const element =

            document.createElement(tag);

        if(className){

            element.className = className;

        }

        return element;

    },

    /* Safe JSON Parse */
    parseJSON(value){

        try{

            return JSON.parse(value);

        }

        catch{

            return null;

        }

    },

    /* Save Local Storage */
    save(key,value){

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    /* Read Local Storage */
    read(key){

        return this.parseJSON(

            localStorage.getItem(key)

        );

    }

};

/*=========================================
  Common Helper Functions
=========================================*/

function debounce(callback,delay){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(

            () => callback.apply(this,args),

            delay

        );

    };

}

function throttle(callback,delay){

    let waiting = false;

    return function(...args){

        if(waiting) return;

        callback.apply(this,args);

        waiting = true;

        setTimeout(function(){

            waiting = false;

        },delay);

    };

}

function generateID(){

    return "VAL-" +

        Math.random()

        .toString(36)

        .substring(2,10)

        .toUpperCase();

}

function currentTime(){

    return new Date()

        .toLocaleTimeString();

}

function currentDate(){

    return new Date()

        .toLocaleDateString();

}

function log(message){

    console.log(

        "[Validation]",

        message

    );

}

function warn(message){

    console.warn(

        "[Validation]",

        message

    );

}

function error(message){

    console.error(

        "[Validation]",

        message

    );

}

/*=========================================
  Validation Application
=========================================*/

const ValidationApp = {

    name:

        "CodeNova Validation",

    version:

        "1.0.0",

    initialized:

        false

};

/*=========================================
  Cache Elements
=========================================*/

ValidationApp.cache = function(){

    this.form =

        document.querySelector(

            "#validationForm"

        );

    this.inputs =

        document.querySelectorAll(

            "input,textarea,select"

        );

    this.submit =

        document.querySelector(

            "#submitButton"

        );

};

/*=========================================
  Initialization
=========================================*/

ValidationApp.initialize = function(){

    if(this.initialized){

        return;

    }

    this.initialized = true;

    this.cache();

    log(

        "Validation Initialized"

    );

    log(

        "Version : " +

        this.version

    );

};

/*=========================================
  DOM Ready
=========================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        ValidationApp.initialize();

    }

);

/*=========================================
  Window Ready
=========================================*/

window.addEventListener(

    "load",

    function(){

        log(

            "Utility Functions Ready"

        );

        log(

            "Initialization Ready"

        );

    }

);
/*==================================================
  CodeNova Technologies
  validation.js
  Part 3B.2
  Event Listeners + Final Configuration
==================================================*/

"use strict";

/*=========================================
  Global Event Listeners
=========================================*/

function registerGlobalEvents(){

    /* Window Resize */

    window.addEventListener(

        "resize",

        debounce(function(){

            console.log(

                "Window Size:",

                window.innerWidth,

                "x",

                window.innerHeight

            );

        },200)

    );

    /* Window Scroll */

    window.addEventListener(

        "scroll",

        throttle(function(){

            document.body.dataset.scroll =

                window.scrollY;

        },100)

    );

    /* Window Focus */

    window.addEventListener(

        "focus",

        function(){

            console.log(

                "Window Focused"

            );

        }

    );

    /* Window Blur */

    window.addEventListener(

        "blur",

        function(){

            console.log(

                "Window Unfocused"

            );

        }

    );

    /* Online */

    window.addEventListener(

        "online",

        function(){

            console.log(

                "Internet Connected"

            );

        }

    );

    /* Offline */

    window.addEventListener(

        "offline",

        function(){

            console.warn(

                "Internet Disconnected"

            );

        }

    );

}

/*=========================================
  Form Event Listeners
=========================================*/

function registerFormEvents(){

    if(!ValidationApp.form) return;

    ValidationApp.form.addEventListener(

        "submit",

        function(event){

            console.log(

                "Form Submitted"

            );

        }

    );

    ValidationApp.form.addEventListener(

        "reset",

        function(){

            console.log(

                "Form Reset"

            );

        }

    );

    ValidationApp.inputs.forEach(function(input){

        input.addEventListener(

            "focus",

            function(){

                this.classList.add(

                    "input-focus"

                );

            }

        );

        input.addEventListener(

            "blur",

            function(){

                this.classList.remove(

                    "input-focus"

                );

            }

        );

    });

}

/*=========================================
  Keyboard Events
=========================================*/

document.addEventListener(

    "keydown",

    function(event){

        if(

            event.ctrlKey &&

            event.key === "s"

        ){

            event.preventDefault();

            console.log(

                "Validation Data Saved"

            );

        }

        if(

            event.ctrlKey &&

            event.key === "r"

        ){

            event.preventDefault();

            location.reload();

        }

    }

);

/*=========================================
  Visibility Events
=========================================*/

document.addEventListener(

    "visibilitychange",

    function(){

        console.log(

            document.hidden

            ? "Page Hidden"

            : "Page Visible"

        );

    }

);

/*=========================================
  Final Configuration
=========================================*/

const ValidationConfiguration = {

    application:

        "validation.js",

    version:

        "1.0.0",

    company:

        "CodeNova Technologies",

    author:

        "Development Team",

    environment:

        "Production",

    debug:

        false,

    autoSave:

        true,

    animations:

        true,

    accessibility:

        true,

    browserSupport:

        true

};

Object.freeze(

    ValidationConfiguration

);

/*=========================================
  Configuration Check
=========================================*/

function validateConfiguration(){

    const required = [

        "application",

        "version",

        "company"

    ];

    return required.every(function(key){

        return key in

            ValidationConfiguration;

    });

}

/*=========================================
  Register Everything
=========================================*/

function initializeEvents(){

    registerGlobalEvents();

    registerFormEvents();

}

/*=========================================
  Initialize
=========================================*/

window.addEventListener(

    "load",

    function(){

        initializeEvents();

        if(

            validateConfiguration()

        ){

            console.log(

                "Configuration Loaded"

            );

        }

        console.table(

            ValidationConfiguration

        );

        console.log(

            "Event Listeners Ready"

        );

        console.log(

            "Final Configuration Ready"

        );

    }

);

/*==================================================
  CodeNova Technologies
  validation.js
  Part 3B.3
  Debug Helpers + End of validation.js
==================================================*/

"use strict";

/*=========================================
  Debug Helpers
=========================================*/

const ValidationDebugger = {

    enabled: true,

    version: "1.0.0",

    logs: []

};

/*=========================================
  Debug Logger
=========================================*/

function debug(message){

    if(!ValidationDebugger.enabled){

        return;

    }

    const log = {

        time:

            new Date().toLocaleTimeString(),

        message

    };

    ValidationDebugger.logs.push(log);

    console.log(

        "[DEBUG]",

        log.time,

        message

    );

}

/*=========================================
  Warning Logger
=========================================*/

function debugWarning(message){

    console.warn(

        "[WARNING]",

        message

    );

}

/*=========================================
  Error Logger
=========================================*/

function debugError(message){

    console.error(

        "[ERROR]",

        message

    );

}

/*=========================================
  Performance Report
=========================================*/

function performanceReport(){

    console.table({

        Page:

            window.location.pathname,

        Browser:

            navigator.userAgent,

        Online:

            navigator.onLine,

        Language:

            navigator.language,

        Width:

            window.innerWidth,

        Height:

            window.innerHeight

    });

}

/*=========================================
  Validation Summary
=========================================*/

function validationSummary(){

    console.table({

        TotalFields:

            document.querySelectorAll(

                "input,textarea,select"

            ).length,

        ValidFields:

            document.querySelectorAll(

                ".is-valid"

            ).length,

        InvalidFields:

            document.querySelectorAll(

                ".is-invalid"

            ).length

    });

}

/*=========================================
  Clear Debug Logs
=========================================*/

function clearDebugLogs(){

    ValidationDebugger.logs = [];

    console.clear();

    console.log(

        "Debug Logs Cleared"

    );

}

/*=========================================
  Toggle Debug
=========================================*/

function enableDebug(){

    ValidationDebugger.enabled = true;

}

function disableDebug(){

    ValidationDebugger.enabled = false;

}

/*=========================================
  Export Logs
=========================================*/

function exportDebugLogs(){

    console.table(

        ValidationDebugger.logs

    );

}

/*=========================================
  Application Status
=========================================*/

function applicationStatus(){

    return {

        application:

            "validation.js",

        initialized:

            ValidationApp.initialized,

        version:

            ValidationApp.version,

        timestamp:

            new Date()

                .toLocaleString()

    };

}

/*=========================================
  Global Access
=========================================*/

window.ValidationApp =

    ValidationApp;

window.ValidationDebugger =

    ValidationDebugger;

window.enableValidationDebug =

    enableDebug;

window.disableValidationDebug =

    disableDebug;

window.exportValidationLogs =

    exportDebugLogs;

/*=========================================
  Final Startup
=========================================*/

window.addEventListener(

    "load",

    function(){

        debug(

            "Validation System Started"

        );

        performanceReport();

        validationSummary();

        console.table(

            applicationStatus()

        );

    }

);

/*=========================================
  Development Banner
=========================================*/

console.log(

"=========================================="

);

console.log(

" CodeNova Technologies "

);

console.log(

" Validation Management System "

);

console.log(

" Version :",

ValidationApp.version

);

console.log(

" Environment : Production "

);

console.log(

" Loaded Successfully "

);

console.log(

"=========================================="

);

