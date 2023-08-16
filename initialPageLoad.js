function createBlurOverlay() {
    const overlayDiv = document.createElement("div");
    overlayDiv.id = "blur-overlay";
    return overlayDiv;
}

function createModal() {
    const modalDiv = document.createElement("div");
    modalDiv.id = "modal";

    const h2Tag = document.createElement("h2");
    h2Tag.textContent = "Successful Submission!";

    const pTag = document.createElement("p");
    pTag.textContent =
        "Good job you submitted a valid form and it successfully 'submitted!";

    const exitModalBtn = document.createElement("button");
    exitModalBtn.id = "exit-modal-btn";
    exitModalBtn.textContent = "Exit";
    modalDiv.appendChild(h2Tag);
    modalDiv.appendChild(pTag);
    modalDiv.appendChild(exitModalBtn);
    return modalDiv;
}

function createPageHeader() {
    const header = document.createElement("header");
    header.id = "page-header";

    const pageTitleEl = document.createElement("h2");
    pageTitleEl.id = "page-title";
    pageTitleEl.textContent = "User Registration!";

    const pageDescEl = document.createElement("p");
    pageDescEl.id = "page-desc";
    pageDescEl.textContent =
        "Brought to you by the same people who made cold pencils!";

    header.appendChild(pageTitleEl);
    header.appendChild(pageDescEl);
    return header;
}

function createFormField(fieldObj) {
    // Create fieldset and label elements
    const fieldset = document.createElement("fieldset");
    const label = document.createElement("label");
    label.htmlFor = fieldObj.inputID;
    label.textContent = fieldObj.labelText;

    // If we're creating a select drop down
    if (fieldObj.inputType == "select") {
        const selectEl = document.createElement("select");
        selectEl.id = fieldObj.inputID;
        selectEl.name = fieldObj.inputName;
        fieldObj.options.forEach((option) => {
            const optionEl = document.createElement("option");
            optionEl.value = option.value;
            optionEl.textContent = option.text;
            selectEl.appendChild(optionEl);
        });
        fieldset.appendChild(label);
        fieldset.appendChild(selectEl);
    } else {
        // Else we are creating a input text field
        const inputEl = document.createElement("input");
        inputEl.type = fieldObj.inputType;
        inputEl.id = fieldObj.inputID;
        inputEl.name = fieldObj.inputName;
        if (fieldObj.pattern) {
            inputEl.pattern = fieldObj.pattern;
        }
        if (fieldObj.minlength) {
            inputEl.minLength = fieldObj.minlength;
        }
        if (fieldObj.maxlength) {
            inputEl.maxLength = fieldObj.maxlength;
        }
        if (fieldObj.isRequired) {
            inputEl.required = fieldObj.isRequired;
        }
        const errorEl = document.createElement("span");
        errorEl.id = fieldObj.errorID;
        errorEl.className = "field-error-message";

        fieldset.appendChild(label);
        fieldset.appendChild(inputEl);
        fieldset.appendChild(errorEl);
    }
    return fieldset;
}

function createRegistrationForm() {
    const form = document.createElement("form");
    form.id = "user-registration-form";
    form.setAttribute("novalidate", "");
    /*
	- Each object in fields array contains information to build 
	a field set for one of the form fields
	*/
    const fields = [
        {
            labelText: "Email:",
            inputType: "email",
            inputID: "email-input-el",
            inputName: "email",
            isRequired: true,
            errorID: "email-error",
        },
        {
            labelText: "Country:",
            inputType: "select",
            inputID: "country-input-el",
            inputName: "country",
            options: [
                { value: "united states", text: "United States" },
                { value: "canada", text: "Canada" },
                { value: "uk", text: "United Kingdom" },
                { value: "germany", text: "Germany" },
                { value: "france", text: "France" },
            ],
        },
        {
            labelText: "Zip Code:",
            inputType: "text",
            inputID: "zipcode-input-el",
            inputName: "zipcode",
            isRequired: true,
            errorID: "zipcode-error",
        },
        {
            labelText: "Password:",
            inputType: "password",
            inputID: "password-input-el",
            inputName: "password",
            pattern: "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,12}$",
            minlength: "8",
            maxlength: "12",
            isRequired: true,
            errorID: "password-error",
        },
        {
            labelText: "Retype Password:",
            inputType: "password",
            inputID: "password-retype-input-el",
            inputName: "retyped-password",
            isRequired: true,
            errorID: "retype-password-error",
        },
    ];
    // Add fields to the form
    for (const fieldObj of fields) {
        const formField = createFormField(fieldObj);
        form.appendChild(formField);
    }
    // Add submit button to form
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Register";
    form.appendChild(submitBtn);
    return form;
}

function createMainContent() {
    const mainContentDiv = document.createElement("section");
    mainContentDiv.className = "main-content";

    const formContainerDiv = document.createElement("div");
    formContainerDiv.className = "form-container";

    const platformTitleEl = document.createElement("h1");
    platformTitleEl.id = "platform-title";
    platformTitleEl.textContent = "Libraire";

    const registrationForm = createRegistrationForm();

    const solidDivider = document.createElement("hr");
    solidDivider.className = "solid-divider";

    const accountRedirectSection = document.createElement("section");
    accountRedirectSection.id = "account-redirect-section";
    accountRedirectSection.innerHTML = `
	<span id="redirect-message"
		>Already have an account?
		<a class="login-page-link" href="#">Login</a></span
	>`;

    formContainerDiv.appendChild(platformTitleEl);
    formContainerDiv.appendChild(registrationForm);
    formContainerDiv.appendChild(solidDivider);
    formContainerDiv.appendChild(accountRedirectSection);
    mainContentDiv.appendChild(formContainerDiv);
    return mainContentDiv;
}

function createPageFooter() {
    const footer = document.createElement("footer");
    footer.id = "page-footer";
    const footerNav = document.createElement("nav");
    footerNav.id = "footer-nav";
    /*
	- Keys are the text of the links and values are the urls they redirect the 
	user to. Note, since this is not a real website with an about section,
	blog, etc. we leave it an empty string to make it doesn't redirect to anything.
	- Then iteratively add list tags with links into the linksList element
	*/
    const linksObj = {
        About: "",
        Blog: "",
        Jobs: "",
        Privacy: "",
        Terms: "",
        Metaverse: "",
    };
    const linksList = document.createElement("ul");
    linksList.id = "footer-nav-list";
    for (const key in linksObj) {
        const listEl = document.createElement("li");
        listEl.className = "footer-nav-list-item";
        const linkEl = document.createElement("a");
        linkEl.href = linksObj[key];
        linkEl.textContent = key;
        listEl.appendChild(linkEl);
        linksList.appendChild(listEl);
    }

    const footerSubContent = document.createElement("section");
    footerSubContent.id = "footer-sub-content";
    footerSubContent.innerHTML = `<p id="footer-info">
		<span id="date-el">${new Date().getFullYear()}</span> Knguyen and Co.
	</p>`;

    footerNav.appendChild(linksList);
    footer.appendChild(footerNav);
    footer.appendChild(footerSubContent);
    return footer;
}

// Creates and returns mark up for the initial page
function createPage() {
    const contentDiv = document.createElement("div");
    contentDiv.className = "content";
    const blurOverlay = createBlurOverlay();
    const modal = createModal();
    const header = createPageHeader();
    const mainContentDiv = createMainContent();
    const footer = createPageFooter();
    contentDiv.appendChild(blurOverlay);
    contentDiv.appendChild(modal);
    contentDiv.appendChild(header);
    contentDiv.appendChild(mainContentDiv);
    contentDiv.appendChild(footer);
    return contentDiv;
}

export { createPage };
