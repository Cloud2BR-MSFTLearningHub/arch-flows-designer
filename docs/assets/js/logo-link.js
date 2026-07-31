const logoScriptUrl = document.currentScript?.src;

document.addEventListener("DOMContentLoaded", () => {
	const logo = document.querySelector("header a.md-logo");
	const title = document.querySelector(".md-header__title");
	const startUrl = logoScriptUrl ? new URL("../../", logoScriptUrl).href : new URL("./", location.href).href;

	if (logo) {
		logo.href = startUrl;
		logo.removeAttribute("target");
		logo.removeAttribute("rel");
	}

	if (title) {
		title.classList.add("site-title-link");
		title.setAttribute("role", "link");
		title.setAttribute("tabindex", "0");
		title.setAttribute("title", "Go to Start");
		title.addEventListener("click", () => { location.href = startUrl; });
		title.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				location.href = startUrl;
			}
		});
	}
});
