document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255,255,255,.95)";
    } else {
      navbar.style.background = "white";
    }
  });

  // Reveal animations (for About page)
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

});



