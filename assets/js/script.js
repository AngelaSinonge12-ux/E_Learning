"use strict";

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navLinks, "click", closeNavbar);

/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeElem);

//contact form
// script.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form form");
  const firstNameInput = document.getElementById("first_name");
  const lastNameInput = document.getElementById("last_name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    let isValid = true;

    // Validate First Name
    if (firstNameInput.value.trim() === "") {
      displayError(firstNameInput, "First name is required.");
      isValid = false;
    } else {
      clearError(firstNameInput);
    }

    // Validate Last Name
    if (lastNameInput.value.trim() === "") {
      displayError(lastNameInput, "Last name is required.");
      isValid = false;
    } else {
      clearError(lastNameInput);
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
      displayError(emailInput, "Email address is required.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      displayError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      displayError(messageInput, "Please enter your message.");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });

  function displayError(inputElement, errorMessage) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    inputElement.classList.add("error");
  }

  function clearError(inputElement) {
    const errorDiv = inputElement.parentNode.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
    inputElement.classList.remove("error");
  }

  function isValidEmail(email) {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
