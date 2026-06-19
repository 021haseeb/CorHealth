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

  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    const setExpanded = (expanded) => {
      menuBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
      navLinks.classList.toggle("active", expanded);
    };

    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") !== "true";
      setExpanded(expanded);
    });

    // Close menu after clicking a link (mobile)
    navLinks.querySelectorAll(".nav-link").forEach((a) => {
      a.addEventListener("click", () => setExpanded(false));
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }


  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");

  // Reveal animations for all elements using .reveal
  const revealEls = document.querySelectorAll(".reveal");
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


  if (!statsSection || counters.length === 0) return;

  const animateCounter = (el, target, durationMs = 900) => {
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.innerText = value + "+";

      if (progress < 1) requestAnimationFrame(tick);
    };

    el.innerText = "0";
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            const target = Number(counter.getAttribute("data-target"));
            if (Number.isFinite(target)) {
              animateCounter(counter, target);
            }
          });
          observer.disconnect();
          break;
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  observer.observe(statsSection);

  // Feedback form submission (demo toast)
  const form = document.getElementById("feedbackForm");
  const toast = document.getElementById("toast");

  if (form && toast) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (form.elements["name"] && form.elements["name"].value) ? form.elements["name"].value : "there";

      toast.textContent = `Thanks, ${name}! Your message has been sent.`;
      toast.classList.add("show");

      form.reset();

      setTimeout(() => {
        toast.classList.remove("show");
      }, 4200);
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

