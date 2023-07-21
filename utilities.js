/*
+ Utilities.js: A file that stores functions and code that don't directly relate to the main idea 
of this project which is form validation, constraint validation api, forms, etc. 
*/

// Updates the date of the footer
function updateFooterDate() {
    const dateEl = document.getElementById("date-el");
    const currentYear = new Date().getFullYear();
    dateEl.textContent = currentYear;
}

// Show the modal for when user successfully submits a form
function showModal() {
    const blurOverlayEl = document.getElementById("blur-overlay");
    const modalEl = document.getElementById("modal");
    blurOverlayEl.classList.remove("content-hidden");
    modalEl.classList.remove("content-hidden");
}

// Hides modal when user exits the 'success' screen
function hideModal() {
    const blurOverlayEl = document.getElementById("blur-overlay");
    const modalEl = document.getElementById("modal");
    blurOverlayEl.classList.add("content-hidden");
    modalEl.classList.add("content-hidden");
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

export {
    updateFooterDate,
    showModal,
    hideModal,
    addValidInputStyle,
    addInvalidInputStyle,
};
