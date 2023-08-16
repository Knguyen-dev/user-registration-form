import { createPage } from "./initialPageLoad.js";

const DomModule = (() => {
    // load the contents of the page onto the DOM
    const page = createPage();
    document.body.appendChild(page);

    // Get overlay and modal
    const blurOverlayEl = document.getElementById("blur-overlay");
    const modalEl = document.getElementById("modal");

    // Get important dom elements for the site
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

    // Get all input elements
    const inputElements = document.querySelectorAll("input");
    // Get all error elements
    const errorElements = document.querySelectorAll(".field-error-message");

    // Get the modal exit button and link it to the hide modal function
    const exitModalBtn = document.getElementById("exit-modal-btn");

    return {
        blurOverlayEl,
        modalEl,
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
        inputElements,
        errorElements,
        exitModalBtn,
    };
})();

export { DomModule };
