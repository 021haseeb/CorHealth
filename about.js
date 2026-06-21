document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile navbar toggle + close on nav click
  (function setupNav() {
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    if (!menuBtn || !navLinks) return;

    const setExpanded = (expanded) => {
      menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
      navLinks.classList.toggle("active", expanded);
    };

    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") !== "true";
      setExpanded(expanded);
    });

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setExpanded(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  })();

  // Reveal animations
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});



