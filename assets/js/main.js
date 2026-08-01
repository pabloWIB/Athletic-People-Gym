/**
 * main.js — single entry point.
 *
 * Loaded with `defer`, so the DOM is already parsed by the time this runs.
 * Every module is optional: a page that lacks the markup a module looks for
 * simply gets nothing wired up.
 */
(function (namespace) {
  "use strict";

  if (typeof namespace.initAuthForm === "function") {
    namespace.initAuthForm();
  }
})(window.AthleticPeople || {});
