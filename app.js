import { loadPageListeners } from "./pageListeners.js";
import { renderInitialPage } from "./rendering.js";
window.addEventListener("DOMContentLoaded", () => {
    renderInitialPage();
    loadPageListeners();
});
