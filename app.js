// IIFE that returns important dom elements that are going to be used
const DomElements = (() => {
    // Get our form and its html control elements
    const registrationForm = document.getElementById("user-registration-form");
    const inputEmailEl = document.getElementById("email-input-el");
    const countrySelectEl = document.getElementById("country-input-el");
    const inputZipCodeEl = document.getElementById("zipcode-input-el");
    const inputPasswordEl = document.getElementById("password-input-el");
    const inputRetypePasswordEl = document.getElementById(
        "password-retype-input-el"
    );

    // Get a list of the field error elements
    const fieldErrorsList = document.querySelectorAll(".field-error-message");

    // Get span containing date for the footer
    const dateEl = document.getElementById("date-el");

    // retype password element just needs to keep checking if the passwords match, no need for
    // checking the patterns, which is done my the former

    // Create appropriate event listener for form
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Form attempted to submit");

        // If form is valid
        if (validateRegistrationForm(e)) {
            console.log("Valid form submission");
        } else {
            // Else form isn't valid so we show the errors that the form has
            console.log("Invalid form submission");
        }

        // Pretend we submit the form to some data base for processing
    });

    return {
        registrationForm,
        inputEmailEl,
        countrySelectEl,
        inputZipCodeEl,
        inputPasswordEl,
        inputRetypePasswordEl,
        fieldErrorsList,
        dateEl,
    };
})();

// Custom function to validate the registration form and see if it passes our basic checks
function validateRegistrationForm(e) {
    // Check if it passes basic checks and rules for fields.
    if (!e.currentTarget.checkValidity()) {
        console.log("General ivalidity error!");
        return false;
    }
    // Now see if the zipcode is valid for the country they entered
    if (!validateZipCode()) {
        console.log("Invalid zipcode error!");
        return false;
    }
    // Now we test if the passwords match, assuming they follow our regex pattern in the html file
    if (!isMatchingPasswords()) {
        console.log("Passwords don't match");
        return false;
    }
    // Else if all of those tests were passed then the form should have valid input, so return true
    return true;
}

// Checks if user input for zipcode is valid for the country they chose; returns true if valid, else false
function validateZipCode() {
    const constraints = {
        // United States zip codes have 5 digits, optionally followed by a group with hyphen and 4 digits"
        "united states": /^\d{5}(-\d{4})?$/,
        // Canada zip code is 5 digits, optionally followed by a group with hypen and 4 digits
        canada: /^\d{5}(-\d{4})?$/,
        // UK zip codes is generally 1 or 2 uppercase letters, one or 2 digits, an optional space, a digit, then 2 uppercase letters.
        uk: /^[A-Z]{1,2}\d{1,2} ?\d[A-Z]{2}$/,
        // Germany zip codes generally are a sequence of five digits
        germany: /^\d{5}$/,
        // France zip codes generally are a sequence of five digits
        france: /^\d{5}$/,
    };

    // Get the values of the country and then the zip code we have to validate
    const country = DomElements.countrySelectEl.value;
    const zipCode = DomElements.inputZipCodeEl.value;

    // Create regex object with that pattern and the appropriate error message if the input zip code is invalid
    const zipCodePattern = new RegExp(constraints[country]);

    // Test inputted zip code against the pattern to see if it matches and send result
    return zipCodePattern.test(zipCode);
}

// Function to see if passwords match in the 'enter password' and 'retype password' fields
function isMatchingPasswords() {
    const inputPassword = DomElements.inputPasswordEl.value;
    const retypedPassword = DomElements.inputRetypePasswordEl.value;
    return inputPassword == retypedPassword;
}

// Visually shows form errors or updates errors made
function showRegistrationFormErrors(e) {
    console.log("Errors in form detected");
}

function hideRegistrationFormErrors() {
    DomElements.fieldErrorsList.forEach((fieldErrorEl) => {
        fieldErrorEl.classList.add("content-hidden");
    });
}

function updateFooterDate() {
    const currentYear = new Date().getFullYear();
    DomElements.dateEl.textContent = currentYear;
}

window.addEventListener("DOMContentLoaded", () => {
    updateFooterDate();
    hideRegistrationFormErrors();
    console.log("Page loaded");
});
