import { DomModule } from "./modules.js";
import { validateZipCode } from "./validation.js";

// Show the modal for when user successfully submits a form
function showSuccessScreen() {
    DomModule.blurOverlayEl.classList.remove("content-hidden");
    DomModule.modalEl.classList.remove("content-hidden");
}

// Hides modal when user exits the 'success' screen
function hideSuccessScreen() {
    DomModule.blurOverlayEl.classList.add("content-hidden");
    DomModule.modalEl.classList.add("content-hidden");
}

/*
+ NOTE: Our "showError" functions like "showEmailError", etc. assume that a check has already been done
to see that the relevant error has already happened. 
	1. Decide which error is responsible
	2. Edit text to indicate the type of error
	3. Make the error message visible 
	4. Change the visual style of the field!
*/

// Shows the email errors on the form
function showEmailErrors() {
    if (DomModule.inputEmailEl.validity.valueMissing) {
        DomModule.emailErrorEl.textContent = "Email can't be blank!";
    } else if (DomModule.inputEmailEl.validity.typeMismatch) {
        DomModule.emailErrorEl.textContent = "Email needs to be in valid form!";
    }
    // Add class to make sure email error element is visible
    DomModule.emailErrorEl.classList.remove("content-hidden");
    // Add styling to show the inputEmailEl element has invalid input
    addInvalidInputStyle(DomModule.inputEmailEl);
}

// Hide the email error on the form
function hideEmailErrors() {
    // Add class to make emailErrorEl not visible; then add styling to show that
    DomModule.emailErrorEl.classList.add("content-hidden");
    addValidInputStyle(DomModule.inputEmailEl);
}

// Shows zipcode errors on the form
function showZipCodeErrors() {
    if (DomModule.inputZipCodeEl.validity.valueMissing) {
        DomModule.zipCodeErrorEl.textContent = "Why is zipcode blank?!";
    } else if (!validateZipCode()) {
        DomModule.zipCodeErrorEl.textContent = `Zipcode invalid for ${DomModule.countrySelectEl.value}`;
    }
    // Make error visible and visually indicate the input field is invalid
    DomModule.zipCodeErrorEl.classList.remove("content-hidden");
    addInvalidInputStyle(DomModule.inputZipCodeEl);
}

// Hides zipcode errors on the form
function hideZipCodeErrors() {
    DomModule.zipCodeErrorEl.classList.add("content-hidden");
    addValidInputStyle(DomModule.inputZipCodeEl);
}

// Shows an 'password' field errors on the form.
// NOTE: There are different functions for handling the retype password field
function showPasswordErrors() {
    // Get the min and max character lengths for the password field
    const minLength = DomModule.inputPasswordEl.minLength;
    const maxLength = DomModule.inputPasswordEl.maxLength;
    if (DomModule.inputPasswordEl.validity.valueMissing) {
        DomModule.passwordErrorEl.textContent =
            "Password can't just be blank dude!";
    } else if (DomModule.inputPasswordEl.validity.tooShort) {
        DomModule.passwordErrorEl.textContent = `Password has to be atleast ${minLength} long!`;
    } else if (DomModule.inputPasswordEl.validity.patternMismatch) {
        DomModule.passwordErrorEl.textContent = `Must have ${minLength} to ${maxLength} characters, and alphanumeric`;
    }
    DomModule.passwordErrorEl.classList.remove("content-hidden");
    addInvalidInputStyle(DomModule.inputPasswordEl);
}

// Hides 'password' field errors on the form
function hidePasswordErrors() {
    DomModule.passwordErrorEl.classList.add("content-hidden");
    addValidInputStyle(DomModule.inputPasswordEl);
}

// Shows the errors for 'retype' password field; tells user that passwords don't match
// NOTE: Only one reason this error occurs, which is why there are no conditions, unlike other errors
// which have conditions since there could be different reasons on why they occurred
function showRetypePasswordErrors() {
    DomModule.retypePasswordErrorEl.textContent = "Your passwords don't match!";
    DomModule.retypePasswordErrorEl.classList.remove("content-hidden");
    addInvalidInputStyle(DomModule.inputRetypePasswordEl);
}

// Hides errors for the 'retype' password field
function hideRetypePasswordErrors() {
    DomModule.retypePasswordErrorEl.classList.add("content-hidden");
    addValidInputStyle(DomModule.inputRetypePasswordEl);
}

// Displays all of the current errors with the form; useful for when the user submits the form
// NOTE: Could be used in an implementation where we didn't have event listeners to validate input
// as the user progressed through the form.
function showRegistrationFormErrors() {
    // Checks for and handles errors with email input
    if (DomModule.inputEmailEl.validity.valid) {
        hideEmailErrors();
    } else {
        showEmailErrors();
    }
    // Checks for and handles errors with country and zip code
    if (DomModule.inputZipCodeEl.validity.valid && validateZipCode()) {
        hideZipCodeErrors();
    } else {
        showZipCodeErrors();
    }
    // Checks for and handles errors with password
    if (DomModule.inputPasswordEl.validity.valid) {
        hidePasswordErrors();
    } else {
        showPasswordErrors();
    }
    // Checks for and handles errors with the retype password
    if (isMatchingPasswords()) {
        hideRetypePasswordErrors();
    } else {
        showRetypePasswordErrors();
    }
}

// Hides all error elements for the registration form; useful for when page loads or maybe in functionality
// where you want to reset a form if that's going to be created.
function hideRegistrationFormErrors() {
    DomModule.errorElements.forEach((errorEl) => {
        errorEl.classList.add("content-hidden");
    });
}

// Resets form back to its original state by resetting all fields
function resetRegistrationForm() {
    DomModule.registrationForm.reset(); // Reset the form and clear all fields
    DomModule.inputElements.forEach((inputEl) => {
        inputEl.classList.remove("invalid-input");
        inputEl.classList.remove("valid-input");
    });
    hideRegistrationFormErrors(); // Hide error elements in the registration form
}

// Adds style to a given input field to indicate it has valid input; also removes invalid style
function addValidInputStyle(inputEl) {
    inputEl.classList.remove("invalid-input");
    inputEl.classList.add("valid-input");
}

// Adds style to a given input field to indicate it has invalid input; also removes valid style
function addInvalidInputStyle(inputEl) {
    inputEl.classList.remove("valid-input");
    inputEl.classList.add("invalid-input");
}

function renderInitialPage() {
    hideSuccessScreen();
    resetRegistrationForm();
}

export {
    showSuccessScreen,
    hideSuccessScreen,
    hideEmailErrors,
    showEmailErrors,
    hideZipCodeErrors,
    showZipCodeErrors,
    hidePasswordErrors,
    showPasswordErrors,
    hideRetypePasswordErrors,
    showRetypePasswordErrors,
    showRegistrationFormErrors,
    resetRegistrationForm,
    renderInitialPage,
};
