import { DomModule } from "./modules.js";

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
