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

    // Get all of the elements for showing different field errors
    const emailErrorEl = document.getElementById("email-error");
    const zipCodeErrorEl = document.getElementById("zipcode-error");
    const passwordErrorEl = document.getElementById("password-error");
    const retypePasswordErrorEl = document.getElementById(
        "retype-password-error"
    );
    // Create an array that contains all error elements for operations that require all of them to be used
    const fieldErrorsList = [
        emailErrorEl,
        zipCodeErrorEl,
        passwordErrorEl,
        retypePasswordErrorEl,
    ];

    /*
	+ For each of the form fields. We create an event listener for each of our text fields
	so that every time the input changes, we check and validate it. This allows real-time validation
	and immediate feedback to the user as they're interacting with the fomrm.
	*/
    inputEmailEl.addEventListener("input", (event) => {
        if (inputEmailEl.validity.valid) {
            // Then you want to hide the error message for email
            hideEmailErrors();
        } else {
            // Have function to show email errors
            showEmailErrors();
        }
    });

    /*
	- NOTE: Probably need to create an event listener for countrySelectEl on change. Because if we 
	had "Africa" and "47403", it's going to be an error. But if we change it to "America" it won't 
	update correctly. By having the check on the countrySelectEl, our error message will update correctly
	- Remember we don't to have a compound conditional with countrySelectEl.validity.valid since 
	it's always going to have a choice for a country. So we only need to check the zipcode compatibility.
	*/
    countrySelectEl.addEventListener("change", (event) => {
        if (validateZipCode()) {
            hideZipCodeErrors();
        } else {
            showZipCodeErrors();
        }
    });

    inputZipCodeEl.addEventListener("input", (event) => {
        // Check zipcode field if it's filled and the zipcode is valid
        if (inputZipCodeEl.validity.valid && validateZipCode()) {
            hideZipCodeErrors();
        } else {
            showZipCodeErrors();
        }
    });

    inputPasswordEl.addEventListener("input", (event) => {
        // Check if password field is valid and show errors if necessary
        if (inputPasswordEl.validity.valid) {
            hidePasswordErrors();
        } else {
            showPasswordErrors();
        }
        /*
		- If we have the same matching passwords. And then we change the 'password' field, 
		our retypePasswordErrorEl won't update and warn the user that their passwords don't
		match anymore. To prevent this, we need to check when either of the input fields are
		changing. So that's why we're putting the isMatchingPasswords() check in both our 
		inputPasswordEl and our inputRetypePasswordEl 
		*/
        if (isMatchingPasswords()) {
            hideRetypePasswordErrors();
        } else {
            showRetypePasswordErrors();
        }
    });

    inputRetypePasswordEl.addEventListener("input", (event) => {
        /*
		- Special case: This is special since it will only be valid 
		when the retyped password matches the beginning password. Only when the beginning password 
		is valid and then the retyped password matches it, will both of the password fields be valid. 
		*/
        if (isMatchingPasswords()) {
            hideRetypePasswordErrors();
        } else {
            showRetypePasswordErrors();
        }
    });

    // Get span containing date for the footer
    const dateEl = document.getElementById("date-el");

    // Create appropriate event listener for form
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // If form is valid
        if (validateRegistrationForm(e)) {
            console.log("Valid form submission");
        } else {
            // Else form isn't valid so we show the errors that the form has
            console.log("Invalid form submission");
            showRegistrationFormErrors();
        }

        // Pretend we submit the form to some data base for processing at the end
    });

    return {
        registrationForm,
        inputEmailEl,
        countrySelectEl,
        inputZipCodeEl,
        inputPasswordEl,
        inputRetypePasswordEl,
        emailErrorEl,
        zipCodeErrorEl,
        passwordErrorEl,
        retypePasswordErrorEl,
        fieldErrorsList,
        dateEl,
    };
})();

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
    const country = DomElements.countrySelectEl.value;
    const zipCode = DomElements.inputZipCodeEl.value;

    // Create regex object with that pattern and the appropriate error message if the input zip code is invalid
    const zipCodePattern = new RegExp(constraints[country]);

    // Test inputted zip code against the pattern to see if it matches and send result
    return zipCodePattern.test(zipCode);
}

// Function to see if passwords match in the 'enter password' and 'retype' password' fields
function isMatchingPasswords() {
    const inputPassword = DomElements.inputPasswordEl.value;
    const retypePassword = DomElements.inputRetypePasswordEl.value;
    return inputPassword == retypePassword;
}

/*
+ NOTE: Our "showError" functions like "showEmailError", etc. assume that a check has already been done
to see that the relevant error has already happened. So these fucntions just edit the text and make the 
errors visible on the page.
*/

// Shows the email errors on the form
function showEmailErrors() {
    if (DomElements.inputEmailEl.validity.valueMissing) {
        DomElements.emailErrorEl.textContent = "Email can't be blank!";
    } else if (DomElements.inputEmailEl.validity.typeMismatch) {
        DomElements.emailErrorEl.textContent =
            "Email needs to be in valid form!";
    }
    // Add class to make sure email error element is visible
    DomElements.emailErrorEl.classList.remove("content-hidden");
}

// Hide the email error on the form
function hideEmailErrors() {
    // Add class to make emailErrorEl not bisible
    DomElements.emailErrorEl.classList.add("content-hidden");
}

// Shows zipcode errors on the form
function showZipCodeErrors() {
    if (DomElements.inputZipCodeEl.validity.valueMissing) {
        DomElements.zipCodeErrorEl.textContent = "Why is zipcode blank?!";
    } else if (!validateZipCode()) {
        DomElements.zipCodeErrorEl.textContent = `Zipcode invalid for ${DomElements.countrySelectEl.value}`;
    }
    // Add class to make the zipcode error visible
    DomElements.zipCodeErrorEl.classList.remove("content-hidden");
}

// Hides zipcode errors on the form
function hideZipCodeErrors() {
    DomElements.zipCodeErrorEl.classList.add("content-hidden");
}

// Shows an 'password' field errors on the form.
// NOTE: There are different functions for handling the retype password field
function showPasswordErrors() {
    // Get the min and max character lengths for the password field
    const minLength = DomElements.inputPasswordEl.minLength;
    const maxLength = DomElements.inputPasswordEl.maxLength;
    if (DomElements.inputPasswordEl.validity.valueMissing) {
        DomElements.passwordErrorEl.textContent =
            "Password can't just be blank dude!";
    } else if (DomElements.inputPasswordEl.validity.tooShort) {
        DomElements.passwordErrorEl.textContent = `Password has to be atleast ${minLength} long!`;
    } else if (DomElements.inputPasswordEl.validity.patternMismatch) {
        DomElements.passwordErrorEl.textContent = `Must have ${minLength} to ${maxLength} characters, and alphanumeric`;
    }
    DomElements.passwordErrorEl.classList.remove("content-hidden");
}

// Hides 'password' field errors on the form
function hidePasswordErrors() {
    DomElements.passwordErrorEl.classList.add("content-hidden");
}

// Shows the errors for 'retype' password field; tells user that passwords don't match
// NOTE: Only one reason this error occurs, which is why there are no conditions, unlike other errors
// which have conditions since there could be different reasons on why they occurred
function showRetypePasswordErrors() {
    DomElements.retypePasswordErrorEl.textContent =
        "Your passwords don't match!";
    DomElements.retypePasswordErrorEl.classList.remove("content-hidden");
}

// Hides errors for the 'retype' password field
function hideRetypePasswordErrors() {
    DomElements.retypePasswordErrorEl.classList.add("content-hidden");
}

// Displays all of the current errors with the form; useful for when the user submits the form
// NOTE: Could be used in an implementation where we didn't have event listeners to validate input
// as the user progressed through the form.
function showRegistrationFormErrors() {
    // Checks for and handles errors with email input
    if (DomElements.inputEmailEl.validity.valid) {
        hideEmailErrors();
    } else {
        showEmailErrors();
    }
    // Checks for and handles errors with country and zip code
    if (DomElements.inputZipCodeEl.validity.valid && validateZipCode()) {
        hideZipCodeErrors();
    } else {
        showZipCodeErrors();
    }
    // Checks for and handles errors with password
    if (DomElements.inputPasswordEl.validity.valid) {
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
    DomElements.fieldErrorsList.forEach((errorEl) => {
        errorEl.classList.add("content-hidden");
    });
}

// Updates the date of the footer
function updateFooterDate() {
    const currentYear = new Date().getFullYear();
    DomElements.dateEl.textContent = currentYear;
}

// When the window loads we update the footer and hide the errors for the registration form
window.addEventListener("DOMContentLoaded", () => {
    updateFooterDate();
    hideRegistrationFormErrors();
});
