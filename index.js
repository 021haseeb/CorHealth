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
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setExpanded(false));
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }


  /* =========================
     HERO SLIDER (Premium)
     Flex-Slider-inspired transitions
  ========================= */
  const heroSlider = document.getElementById("heroSlider");

  if (heroSlider) {
    const slides = [
      {
        theme: "#0F4C81",
        tag: "Compassionate Care",
        headline: "Compassionate Care. Exceptional Living.",
        description:
          "Delivering professional residential healthcare services, personalized support, and quality care for every individual.",
        bgWord: "CARE",
        image:
          "compassionatecare.png",
        stats: [
          { value: "20+", label: "Years Experience" },
          { value: "24/7", label: "Professional Care" },
        ],
      },
      {
        theme: "#2563EB",
        tag: "Assisted Living",
        headline: "Assistance that feels effortless.",
        description:
          "Support designed for comfort and independence—help with daily routines, medication guidance, and warm companionship.",
        bgWord: "HEALTH",
        image:
          "assistedliving.png",
        stats: [
          { value: "5000+", label: "Residents Supported" },
          { value: "15", label: "Care Teams" },
        ],
      },
      {
        theme: "#0891B2",
        tag: "Nursing Services",
        headline: "Skilled nursing, calm communication.",
        description:
          "Expert nursing care with consistent oversight—clear updates for families and safe, personalized wellness plans.",
        bgWord: "NURSING",
        image:
          "nursing.png",
        stats: [
          { value: "250+", label: "Certified Staff" },
          { value: "24/7", label: "Clinical Monitoring" },
        ],
      },
      {
        theme: "#0EA5A4",
        tag: "Specialized Care",
        headline: "Targeted support for every need.",
        description:
          "Specialized plans for complex care—built around dignity, safety, and long-term wellbeing.",
        bgWord: "SUPPORT",
        image:
          "spcare.png",
        stats: [
          { value: "15", label: "Service Areas" },
          { value: "1:1", label: "Care Coordination" },
        ],
      },
      {
        theme: "#14B8A6",
        tag: "Rehabilitation Support",
        headline: "Recovery with momentum.",
        description:
          "Rehabilitation that helps residents regain strength—guided therapy support with compassionate encouragement.",
        bgWord: "RECOVERY",
        image:
          "rehabilitation.png",
        stats: [
          { value: "30+", label: "Therapy Sessions/Week" },
          { value: "7", label: "Progress Tracks" },
        ],
      },
    ];

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = heroSlider;
    const themeVarSetter = (theme) => {
      root.style.setProperty("--hero-theme", theme);
    };

    const tagEl = heroSlider.querySelector("[data-tag]");
    const headlineEl = heroSlider.querySelector("[data-headline]");
    const descEl = heroSlider.querySelector("[data-description]");
    const bgWordEl = heroSlider.querySelector("[data-bg-word]");
    const imageEl = heroSlider.querySelector("[data-image]");

    const stat1 = heroSlider.querySelector("[data-stat-1]");
    const stat2 = heroSlider.querySelector("[data-stat-2]");

    const primaryCta = heroSlider.querySelector("[data-cta-primary]");
    const secondaryCta = heroSlider.querySelector("[data-cta-secondary]");

    // indicators (both desktop and mobile) share the same buttons by data-nav-index
    const navButtons = Array.from(heroSlider.querySelectorAll("[data-nav-index]"));

    const setActiveNav = (index) => {
      navButtons.forEach((btn) => {
        const i = Number(btn.getAttribute("data-nav-index"));
        const selected = i === index;
        btn.setAttribute("aria-selected", selected ? "true" : "false");
      });
    };

    let activeIndex = 0;
    let animating = false;
    let timer = null;
    let restartAfterManual = true;

    const renderSlide = (index) => {
      const s = slides[index];
      themeVarSetter(s.theme);

      if (tagEl) tagEl.textContent = s.tag;
      if (headlineEl) headlineEl.textContent = s.headline;
      if (descEl) descEl.textContent = s.description;
      if (bgWordEl) bgWordEl.textContent = s.bgWord;

      if (stat1) {
        const v = stat1.querySelector(".stat-pill__value");
        const l = stat1.querySelector(".stat-pill__label");
        if (v) v.textContent = s.stats[0].value;
        if (l) l.textContent = s.stats[0].label;
      }
      if (stat2) {
        const v = stat2.querySelector(".stat-pill__value");
        const l = stat2.querySelector(".stat-pill__label");
        if (v) v.textContent = s.stats[1].value;
        if (l) l.textContent = s.stats[1].label;
      }

      if (primaryCta) primaryCta.textContent = "Explore Locations";
      if (secondaryCta) secondaryCta.textContent = "Contact Us";

      if (imageEl) imageEl.src = s.image;
    };

    const swapWithAnimation = (nextIndex) => {
      if (nextIndex === activeIndex) return;
      if (animating) return;
      animating = true;

      setActiveNav(nextIndex);

      const exitDelay = prefersReducedMotion ? 0 : 140;
      const enterDelay = prefersReducedMotion ? 0 : 160;

      // Content exit
      root.classList.add("is-content-out");
      heroSlider.querySelectorAll(".hero-slider__content").forEach((c) => {
        c.setAttribute("data-content-state", "out");
      });

      // Background word fade/replace
      root.classList.remove("is-word-visible");

      // Image exit (independent)
      if (imageEl) {
        imageEl.classList.remove("is-img-in");
        imageEl.classList.add("is-img-out");
      }

      window.setTimeout(() => {
        // Render new slide content while old is faded out
        activeIndex = nextIndex;
        renderSlide(activeIndex);

        // Word enter
        root.classList.add("is-word-visible");

        // Content enter
        heroSlider.querySelectorAll(".hero-slider__content").forEach((c) => {
          c.setAttribute("data-content-state", "in");
        });
        root.classList.add("is-content-in");

        // Image enter
        if (imageEl) {
          imageEl.classList.remove("is-img-out");
          // wait for src change to apply smoother transition
          window.setTimeout(() => {
            imageEl.classList.add("is-img-in");
          }, 20);
        }

        window.setTimeout(() => {
          heroSlider.querySelectorAll(".hero-slider__content").forEach((c) => {
            c.setAttribute("data-content-state", "in");
          });
          animating = false;
          root.classList.remove("is-content-out");
        }, prefersReducedMotion ? 0 : 520);
      }, exitDelay + enterDelay);
    };

    const cards = document.querySelectorAll(".card");
const progress = document.querySelector(".progress");

let index = 0;

function update(){
  cards.forEach((c,i)=>{
    c.className = "card";

    if(i === index){
      c.classList.add("active");
    }
    else if(i === (index+1)%cards.length){
      c.classList.add("right");
    }
    else if(i === (index-1+cards.length)%cards.length){
      c.classList.add("left");
    }
    else{
      c.classList.add("back");
    }
  });

  progress.style.width = "0%";
  setTimeout(()=>{
    progress.style.transition = "width 4s linear";
    progress.style.width = "100%";
  },50);
}

function next(){
  index = (index + 1) % cards.length;
  update();
}

update();
setInterval(next,4000);

    const start = () => {
      renderSlide(activeIndex);
      setActiveNav(activeIndex);

      root.classList.add("is-word-visible");
      root.classList.add("is-content-in");
      const contentEl = heroSlider.querySelector(".hero-slider__content");
      if (contentEl) contentEl.setAttribute("data-content-state", "in");
      if (imageEl && !prefersReducedMotion) imageEl.classList.add("is-img-in");
      if (imageEl && prefersReducedMotion) imageEl.style.opacity = "1";
    };

    const clearTimer = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const resume = () => {
      clearTimer();
      timer = window.setInterval(() => {
        const next = (activeIndex + 1) % slides.length;
        swapWithAnimation(next);
      }, 5000);
    };

    // Hover pause
    root.addEventListener("mouseenter", () => clearTimer());
    root.addEventListener("mouseleave", () => resume());
    root.addEventListener("focusin", () => clearTimer());
    root.addEventListener("focusout", () => resume());

    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-nav-index"));
        if (!Number.isFinite(idx)) return;
        if (restartAfterManual) {
          clearTimer();
        }
        swapWithAnimation(idx);
        if (restartAfterManual) {
          // resume shortly after animation begins so autoplay feels responsive
          window.setTimeout(() => resume(), prefersReducedMotion ? 0 : 250);
        }
      });
    });

    start();
    resume();
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


