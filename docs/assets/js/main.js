/* Shared, optional UI enhancement. Navigation and content work without JS. */
(() => {
  "use strict";
  const button = document.querySelector(".theme-toggle");
  if (!button) return;
  const root = document.documentElement;
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  let saved = null;
  try { saved = localStorage.getItem("bs0013-theme"); } catch { /* Storage may be disabled. */ }
  if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : preference.matches;
  const update = () => button.setAttribute("aria-pressed", String(isDark()));
  button.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("bs0013-theme", next); } catch { /* Optional persistence. */ }
    update();
  });
  preference.addEventListener?.("change", update);
  update();
  button.hidden = false;
})();
