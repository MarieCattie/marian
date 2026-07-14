const button = document.querySelector(".menu-button");
const menu = document.querySelector(".mobile-menu");

if (button && menu) {
  button.addEventListener("click", () => {
    const opened = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(opened));
    menu.setAttribute("aria-hidden", String(!opened));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}
