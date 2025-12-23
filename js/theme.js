// js/theme.js
(() => {
  const root = document.documentElement;

  function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    // Optional: update toggle button UI if present
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const icon = btn.querySelector(".theme-icon");
    const text = btn.querySelector(".theme-text");

    if (icon) icon.textContent = theme === "dark" ? "☾" : "☀";
    if (text) text.textContent = theme === "dark" ? "Dark" : "Light";

    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  // 1) apply initial theme as early as possible
  applyTheme(getInitialTheme());

  // 2) bind click handler (if button exists)
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  });
})();
