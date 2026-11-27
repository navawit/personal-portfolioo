const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const roleElement = document.querySelector("[data-role]");
const yearElement = document.querySelector("[data-year]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("js-enabled");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (menuButton && navigation) {
  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}

if (roleElement && !reducedMotion) {
  const roles = [
    "Graphic Designer",
    "Video Editor",
    "Cinematographer",
    "UI/UX Designer",
    "Front-End Developer",
  ];
  let roleIndex = 0;

  window.setInterval(() => {
    roleElement.classList.add("is-changing");
    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.textContent = roles[roleIndex];
      roleElement.classList.remove("is-changing");
    }, 180);
  }, 2600);
}

const revealItems = document.querySelectorAll("[data-reveal]");

if (!reducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
