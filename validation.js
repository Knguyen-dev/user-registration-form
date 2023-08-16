import { DomModule } from "./modules.js";

// Custom function to validate the registration form and see if it passes our basic checks
function validateRegistrationForm(e) {
    // Check if it passes basic checks and rules for fields.
    if (!e.currentTarget.checkValidity()) {
        return false;
    }
    // Now see if the zipcode is valid for the country they entered
    if (!validateZipCode()) {
        return false;
    }
    // Now we test if the passwords match, assuming they follow our regex pattern in the html file
    if (!isMatchingPasswords()) {
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
    const country = DomModule.countrySelectEl.value;
    const zipCode = DomModule.inputZipCodeEl.value;
    // Create regex object with that pattern and the appropriate error message if the input zip code is invalid
    const zipCodePattern = new RegExp(constraints[country]);
    // Test inputted zip code against the pattern to see if it matches and send result
    return zipCodePattern.test(zipCode);
}

// Function to see if passwords match in the 'enter password' and 'retype' password' fields
function isMatchingPasswords() {
    const inputPassword = DomModule.inputPasswordEl.value;
    const retypePassword = DomModule.inputRetypePasswordEl.value;
    return inputPassword == retypePassword;
}

export { validateRegistrationForm, validateZipCode, isMatchingPasswords };
