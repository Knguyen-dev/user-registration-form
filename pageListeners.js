import {
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
} from "./rendering.js";
import {
    validateRegistrationForm,
    validateZipCode,
    isMatchingPasswords,
} from "./validation.js";

import { DomModule } from "./modules.js";

function loadPageListeners() {
    /*
	+ For each of the form fields. We create an event listener for each of our text fields
	so that every time the input changes, we check and validate it. This allows real-time validation
	and immediate feedback to the user as they're interacting with the fomrm.
	*/
    DomModule.inputEmailEl.addEventListener("input", (event) => {
        if (DomModule.inputEmailEl.validity.valid) {
            // Then you want to hide the error message for email
            hideEmailErrors();
        } else {
            // Have function to show email errors
            showEmailErrors();
        }
    });

    /*
	- Remember we don't to have a compound conditional with countrySelectEl.validity.valid since 
	it's always going to have a choice for a country. So we only need to check the zipcode compatibility.
	*/
    DomModule.countrySelectEl.addEventListener("change", (event) => {
        if (validateZipCode()) {
            hideZipCodeErrors();
        } else {
            showZipCodeErrors();
        }
    });

    // Listener for zipcode field
    DomModule.inputZipCodeEl.addEventListener("input", (event) => {
        // Check zipcode field if it's filled and the zipcode is valid
        if (DomModule.inputZipCodeEl.validity.valid && validateZipCode()) {
            hideZipCodeErrors();
        } else {
            showZipCodeErrors();
        }
    });

    // Set up listener for password field
    DomModule.inputPasswordEl.addEventListener("input", (event) => {
        // Check if password field is valid and show errors if necessary
        if (DomModule.inputPasswordEl.validity.valid) {
            hidePasswordErrors();
        } else {
            showPasswordErrors();
        }

        if (isMatchingPasswords()) {
            hideRetypePasswordErrors();
        } else {
            showRetypePasswordErrors();
        }
    });

    DomModule.inputRetypePasswordEl.addEventListener("input", (event) => {
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

    // Create appropriate event listener for form
    DomModule.registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // If form is valid, show them the success screen and also reset the state of the form
        if (validateRegistrationForm(e)) {
            showSuccessScreen();
            resetRegistrationForm();
        } else {
            // Else form isn't valid so we show the errors that the form has
            showRegistrationFormErrors();
        }
    });

    // Create listener for exiting the modal
    DomModule.exitModalBtn.addEventListener("click", hideSuccessScreen);
}

export { loadPageListeners };
