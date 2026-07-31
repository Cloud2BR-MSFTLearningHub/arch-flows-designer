/*
 * Arch Flows Designer - top header navigation buttons.
 * Injects a compact set of section buttons into the existing navy header bar
 * (between the site title and the search box), replacing the need for a left
 * navigation sidebar. Highlights the button that matches the current page.
 */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".md-header__inner");
  const title = document.querySelector(".md-header__title");
  if (!header || !title) return;

  const base = (document.querySelector('link[rel="canonical"]')?.href || location.href).replace(/[^/]*$/, "");
  const links = [
    { label: "Start", href: "" },
    { label: "Architecture Designer", href: "architecture/" },
    { label: "Flow Designer", href: "flow-designer/" },
    { label: "About", href: "overview/" }
  ];

  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Designer sections");
  links.forEach(({ label, href }) => {
    const url = base + href;
    const link = document.createElement("a");
    link.className = "site-nav__link";
    link.href = url;
    link.textContent = label;
    const current = location.href.split("#")[0].replace(/\/?$/, "/");
    if (current === url.replace(/\/?$/, "/")) link.setAttribute("aria-current", "page");
    nav.append(link);
  });

  header.insertBefore(nav, title.nextSibling);
});
