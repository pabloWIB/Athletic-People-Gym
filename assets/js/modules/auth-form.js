/**
 * auth-form.js — client-side validation for the sign-in form.
 *
 * The project has no authentication backend. This module validates input and
 * reports the result honestly; it never simulates a successful sign-in.
 *
 * Registered on a single namespace rather than exported as an ES module so the
 * page keeps working when index.html is opened straight from the file system,
 * where `type="module"` requests are blocked by the browser.
 */
(function (namespace) {
  "use strict";

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var MIN_PASSWORD_LENGTH = 8;
  var PENDING_MS = 600;

  var RULES = {
    email: function (value) {
      if (value === "") {
        return "Escribe tu correo electrónico.";
      }
      if (!EMAIL_PATTERN.test(value)) {
        return "Ese correo no tiene un formato válido. Ejemplo: nombre@dominio.com";
      }
      return "";
    },
    password: function (value) {
      if (value === "") {
        return "Escribe tu contraseña.";
      }
      if (value.length < MIN_PASSWORD_LENGTH) {
        return (
          "La contraseña debe tener al menos " +
          MIN_PASSWORD_LENGTH +
          " caracteres."
        );
      }
      return "";
    }
  };

  /**
   * Shows or clears the error message tied to one input.
   * @returns {boolean} true when the field is valid
   */
  function applyFieldState(input, message) {
    var errorNode = document.getElementById(input.getAttribute("aria-describedby"));
    var isValid = message === "";

    input.setAttribute("aria-invalid", isValid ? "false" : "true");

    if (errorNode) {
      errorNode.textContent = message;
      errorNode.hidden = isValid;
    }

    return isValid;
  }

  function validateField(input) {
    var rule = RULES[input.name];
    if (!rule) {
      return true;
    }
    return applyFieldState(input, rule(input.value.trim()));
  }

  function setStatus(node, message, variant) {
    if (!node) {
      return;
    }
    node.textContent = message;
    node.className = "status status--" + variant;
    node.hidden = message === "";
  }

  /**
   * Wires up the sign-in form if it is present on the page.
   */
  function initAuthForm() {
    var form = document.querySelector("[data-auth-form]");
    if (!form) {
      return;
    }

    var submitButton = form.querySelector("[data-auth-submit]");
    var statusNode = form.querySelector("[data-auth-status]");
    var inputs = Array.prototype.slice.call(
      form.querySelectorAll("[data-auth-field]")
    );

    if (!submitButton || inputs.length === 0) {
      return;
    }

    var submitLabel = submitButton.textContent;
    var pendingTimer = null;

    // Delegated: one listener covers every current and future field.
    form.addEventListener("input", function (event) {
      var input = event.target;
      if (!input.hasAttribute("data-auth-field")) {
        return;
      }
      // Only clear an error already on screen — don't flag a field mid-typing.
      if (input.getAttribute("aria-invalid") === "true") {
        validateField(input);
      }
    });

    form.addEventListener(
      "blur",
      function (event) {
        var input = event.target;
        if (input.hasAttribute("data-auth-field") && input.value !== "") {
          validateField(input);
        }
      },
      true
    );

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (pendingTimer !== null) {
        window.clearTimeout(pendingTimer);
        pendingTimer = null;
      }

      var invalid = inputs.filter(function (input) {
        return !validateField(input);
      });

      if (invalid.length > 0) {
        setStatus(
          statusNode,
          "Revisa los campos marcados antes de continuar.",
          "error"
        );
        invalid[0].focus();
        return;
      }

      setStatus(statusNode, "", "info");
      submitButton.disabled = true;
      submitButton.textContent = "Comprobando…";

      pendingTimer = window.setTimeout(function () {
        pendingTimer = null;
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
        setStatus(
          statusNode,
          "Datos validados correctamente. Esta demo no tiene servidor de " +
            "autenticación, así que la sesión no llega a iniciarse.",
          "info"
        );
      }, PENDING_MS);
    });
  }

  namespace.initAuthForm = initAuthForm;
})((window.AthleticPeople = window.AthleticPeople || {}));
