const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => {
  observer.observe(item);
});

// Mobile navbar toggle + close on nav click (matches index.js behavior)
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

// Locations page: dataset + search/filter + grid rendering + map preview
(function bootLocationsList() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  if (!searchInput || !filterSelect) return;

  const autocompleteEl = document.getElementById("autocomplete");
  const selectedAddressEl = document.getElementById("selectedAddress");
  const mapFrame = document.getElementById("mapFrame");
  const matchCountEl = document.getElementById("matchCount");

  const locations = [
    {
      id: "baltimore",
      title: "Baltimore Residence",
      subtitle: "2833 Smith Ave, Baltimore, MD",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=900",
      highlights: ["24/7 care staff", "Medication management", "Family communication"],
      mapUrl: "https://www.google.com/maps?q=2833%20Smith%20Ave,%20Baltimore,%20MD&output=embed"
    },
    {
      id: "northwood",
      title: "Northwood Home",
      subtitle: "Residential Care Facility",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900",
      highlights: ["Daily living support", "Health monitoring", "Comfort routines"],
      mapUrl: "https://www.google.com/maps?q=Northwood%20Care%20Facility&output=embed"
    },
    {
      id: "community",
      title: "Community Living Home",
      subtitle: "Healthcare Support Residence",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900",
      highlights: ["Compassionate support", "Meal preparation", "Transportation assistance"],
      mapUrl: "https://www.google.com/maps?q=Community%20Living%20Home&output=embed"
    },
    {
      id: "oakridge",
      title: "Oakridge Care Residence",
      subtitle: "Care & Assisted Living",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900",
      highlights: ["Comfort-focused care", "Private rooms", "Medication reminders"],
      mapUrl: "https://www.google.com/maps?q=Oakridge%20Care%20Residence&output=embed"
    },
    {
      id: "willowbrook",
      title: "Willowbrook Wellness Home",
      subtitle: "Supportive residential living",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1562194858-7f8d9a0c6f1a?w=900",
      highlights: ["Health monitoring", "Nutritious meal plans", "Daily companionship"],
      mapUrl: "https://www.google.com/maps?q=Willowbrook%20Wellness%20Home&output=embed"
    },
    {
      id: "maplecrest",
      title: "MapleCrest Residence",
      subtitle: "Elder care & daily support",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1580281658628-8c1e7adf54c0?w=900",
      highlights: ["Medication management", "Safe routines", "Family updates"],
      mapUrl: "https://www.google.com/maps?q=MapleCrest%20Residence&output=embed"
    },
    {
      id: "sunriseheights",
      title: "Sunrise Heights Home",
      subtitle: "Guided residential assistance",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900",
      highlights: ["24/7 support", "Mobility assistance", "Care coordination"],
      mapUrl: "https://www.google.com/maps?q=Sunrise%20Heights%20Home&output=embed"
    },
    {
      id: "harborview",
      title: "Harborview Residence",
      subtitle: "Comfort-first living",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900",
      highlights: ["Compassionate staff", "Meal planning", "Transportation"],
      mapUrl: "https://www.google.com/maps?q=Harborview%20Residence&output=embed"
    },
    {
      id: "stonebridge",
      title: "Stonebridge Care Home",
      subtitle: "Assisted living support",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900",
      highlights: ["Daily living support", "Health monitoring", "Respect & dignity"],
      mapUrl: "https://www.google.com/maps?q=Stonebridge%20Care%20Home&output=embed"
    },
    {
      id: "copperfield",
      title: "Copperfield Residence",
      subtitle: "Personalized healthcare living",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=900",
      highlights: ["Medication reminders", "Routine-based care", "Family-first communication"],
      mapUrl: "https://www.google.com/maps?q=Copperfield%20Residence&output=embed"
    },
    {
      id: "evergreen",
      title: "Evergreen Wellness Home",
      subtitle: "Residential support & care",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900",
      highlights: ["24/7 supervision", "Comfort routines", "Care coordination"],
      mapUrl: "https://www.google.com/maps?q=Evergreen%20Wellness%20Home&output=embed"
    },
    {
      id: "cedarpoint",
      title: "CedarPoint Residence",
      subtitle: "Healthcare support home",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=900",
      highlights: ["Supportive staff presence", "Meal preparation", "Transportation assistance"],
      mapUrl: "https://www.google.com/maps?q=CedarPoint%20Residence&output=embed"
    },
    {
      id: "glenhaven",
      title: "GlenHaven Care Home",
      subtitle: "Assisted living & support",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900",
      highlights: ["Daily care routines", "Health monitoring", "Medication management"],
      mapUrl: "https://www.google.com/maps?q=GlenHaven%20Care%20Home&output=embed"
    },
    {
      id: "palmridge",
      title: "PalmRidge Residence",
      subtitle: "Premium residential assistance",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1520282927118-9e2a0a9f2a2a?w=900",
      highlights: ["Compassionate support", "Nutritious meals", "Comfort-focused care"],
      mapUrl: "https://www.google.com/maps?q=PalmRidge%20Residence&output=embed"
    },
    {
      id: "regency",
      title: "Regency Care Residence",
      subtitle: "Healthcare support community",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e2bd0b6?w=900",
      highlights: ["24/7 care staff", "Private rooms", "Family updates"],
      mapUrl: "https://www.google.com/maps?q=Regency%20Care%20Residence&output=embed"
    },
    {
      id: "silverline",
      title: "SilverLine Home",
      subtitle: "Residential healthcare living",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e2bd0b6?w=900",
      highlights: ["Health monitoring", "Medication reminders", "Transportation assistance"],
      mapUrl: "https://www.google.com/maps?q=SilverLine%20Home&output=embed"
    },
    {
      id: "riverside",
      title: "Riverside Care Residence",
      subtitle: "Comfort & care for every day",
      type: "care",
      tag: "Premium Care",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900",
      highlights: ["Comfort routines", "Daily living support", "Care coordination"],
      mapUrl: "https://www.google.com/maps?q=Riverside%20Care%20Residence&output=embed"
    },
    {
      id: "lakeshore",
      title: "Lakeshore Wellness Home",
      subtitle: "Premium residential support",
      type: "care",
      tag: "Residential Care",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900",
      highlights: ["Compassionate staff", "Meal planning", "Family communication"],
      mapUrl: "https://www.google.com/maps?q=Lakeshore%20Wellness%20Home&output=embed"
    }
  ];

  const normalize = (s) => String(s || "").trim().toLowerCase();

  const setMapTo = (loc) => {
    if (!loc) return;
    if (selectedAddressEl) selectedAddressEl.textContent = loc.subtitle;
    if (mapFrame && loc.mapUrl) {
      mapFrame.src = loc.mapUrl;
    }
  };

  const emptyState = () => {
    grid.innerHTML = `
      <div class="empty-state reveal">
        <div class="empty-title">No locations found</div>
        <div class="empty-sub">Try a different city, home name, or keyword.</div>
      </div>
    `;
    const els = grid.querySelectorAll(".reveal");
    els.forEach((el) => {
      if (typeof observer !== "undefined") observer.observe(el);
    });
  };

  const buildCard = (loc) => {
    const href = `location-detail.html?home=${encodeURIComponent(loc.id)}`;
    const topHighlight = (loc.highlights || []).slice(0, 3);

    return `
      <article class="card reveal" data-id="${loc.id}" data-type="${loc.type}">
        <a class="card-link" href="${href}" aria-label="View details for ${loc.title}">
          <div class="card-media">
            <img src="${loc.image}" alt="" loading="lazy" />
            <div class="card-overlay">
              <span class="badge">${loc.tag}</span>
            </div>
          </div>

          <div class="card-body">
            <h3>${loc.title}</h3>
            <p class="card-subtitle">${loc.subtitle}</p>

            <div class="card-highlights">
              ${topHighlight.map((h) => `<span class="chip">${h}</span>`).join("")}
            </div>

            <div class="card-cta">
              <span class="details">View details</span>
              <span class="arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </a>
      </article>
    `;
  };

  const getFiltered = () => {
    const q = normalize(searchInput.value);
    const f = normalize(filterSelect.value);

    return locations.filter((loc) => {
      const matchesType = f === "all" ? true : normalize(loc.type) === f;
      if (!q) return matchesType;

      const haystack = [loc.title, loc.subtitle, loc.tag, (loc.highlights || []).join(" ")]
        .map(normalize)
        .join(" ");

      return matchesType && haystack.includes(q);
    });
  };

  const getTopMatch = (list) => {
    if (!list.length) return null;
    const q = normalize(searchInput.value);
    if (!q) return list[0];

    const scored = list.map((loc) => {
      const hay = normalize([loc.title, loc.subtitle, loc.tag, (loc.highlights || []).join(" ")].join(" "));
      let score = 0;
      if (normalize(loc.title).includes(q)) score += 50;
      if (normalize(loc.subtitle).includes(q)) score += 30;
      if (normalize(loc.tag).includes(q)) score += 15;
      if (hay.includes(q)) score += 10;
      return { loc, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.loc || null;
  };

  const clearAutocomplete = () => {
    if (!autocompleteEl) return;
    autocompleteEl.innerHTML = "";
    autocompleteEl.hidden = true;
  };

  const renderAutocomplete = (list) => {
    if (!autocompleteEl) return;

    const q = normalize(searchInput.value);
    if (!q) {
      clearAutocomplete();
      return;
    }

    const top = list.slice(0, 6);
    if (!top.length) {
      clearAutocomplete();
      return;
    }

    autocompleteEl.innerHTML = top
      .map(
        (loc, idx) => `
          <div class="auto-item" role="option" data-index="${idx}" tabindex="0">
            <div class="auto-title">${loc.title}</div>
            <div class="auto-sub">${loc.subtitle}</div>
          </div>
        `
      )
      .join("");

    autocompleteEl.hidden = false;
  };

  const updateUI = (list, { alsoAutocomplete = true } = {}) => {
    if (matchCountEl) matchCountEl.textContent = `${list.length} match${list.length === 1 ? "" : "es"}`;

    if (!list.length) {
      emptyState();
      clearAutocomplete();
      return;
    }

    grid.innerHTML = list.map(buildCard).join("");

    const cards = grid.querySelectorAll(".reveal");
    cards.forEach((el) => {
      if (typeof observer !== "undefined") observer.observe(el);
    });

    const top = getTopMatch(list);
    setMapTo(top);

    if (alsoAutocomplete) renderAutocomplete(list);
  };

  let debounce = null;
  const apply = () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      const list = getFiltered();
      updateUI(list);
    }, 120);
  };

  // Instant navigation on first keystroke requirement:
  // We navigate to the top match on the first non-empty input.
  let navigatedOnce = false;

  searchInput.addEventListener("input", () => {
    apply();
    if (!navigatedOnce) {
      const q = normalize(searchInput.value);
      if (q && q.length >= 1) {
        const list = getFiltered();
        const top = getTopMatch(list);
        if (top) {
          navigatedOnce = true;
          window.location.href = `location-detail.html?home=${encodeURIComponent(top.id)}`;
        }
      }
    }
  });

  filterSelect.addEventListener("change", () => {
    navigatedOnce = false; // let it navigate again for new filter
    apply();
  });

  if (autocompleteEl) {
    autocompleteEl.addEventListener("click", (e) => {
      const item = e.target.closest(".auto-item");
      if (!item) return;
      const idx = Number(item.getAttribute("data-index"));
      const list = getFiltered();
      const loc = list[idx];
      if (!loc) return;
      window.location.href = `location-detail.html?home=${encodeURIComponent(loc.id)}`;
    });
  }

  // Initial render
  updateUI(locations, { alsoAutocomplete: false });
})();

// Location detail render
window.__renderLocationDetail = (home) => {
  const data = {
    baltimore: {
      title: "Baltimore Residence",
      subtitle: "2833 Smith Ave, Baltimore, MD",
      tag: "Baltimore Home",
      image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200",
      list: [
        "24/7 care staff",
        "Private & shared rooms",
        "Medication management",
        "Transportation assistance",
        "Meal planning"
      ],
      map: "https://maps.google.com/?q=2833%20Smith%20Ave%2C%20Baltimore%2C%20MD"
    },
    northwood: {
      title: "Northwood Home",
      subtitle: "Residential Care Facility",
      tag: "Northwood Home",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      list: [
        "Daily living support",
        "Health monitoring",
        "Medication reminders",
        "Comfort-focused routines",
        "Family communication"
      ],
      map: "https://maps.google.com/?q=Northwood%20Care%20Facility"
    },
    community: {
      title: "Community Living Home",
      subtitle: "Healthcare Support Residence",
      tag: "Community Living",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      list: [
        "Compassionate residential support",
        "Meal preparation",
        "Transportation assistance",
        "Supportive staff presence",
        "Community & family updates"
      ],
      map: "https://maps.google.com/?q=Community%20Living%20Home"
    }
  };

  const item = data[home] || data.baltimore;

  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailTag = document.getElementById("detailTag");
  const detailImage = document.getElementById("detailImage");
  const detailList = document.getElementById("detailList");
  const detailMapLink = document.getElementById("detailMapLink");
  const detailMapFrame = document.getElementById("detailMapFrame");

  if (!detailTitle || !detailList) return;

  detailTitle.textContent = item.title;
  detailSubtitle.textContent = item.subtitle;
  detailTag.textContent = item.tag;
  detailImage.src = item.image;

  detailList.innerHTML = "";
  item.list.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    detailList.appendChild(li);
  });

  // Map: sync the iframe to the selected home (no API key; embed link)
  if (detailMapFrame) {
    // Normalize google maps link to an embed-able URL
    const embedSrc = String(item.map || "");
    // If stored as /?q=... use embed output=embed for better iframe rendering
    // Also accept already-embedded URLs.
    let finalSrc = embedSrc;
    if (finalSrc && finalSrc.includes("output=embed")) {
      // already good
    } else if (finalSrc) {
      finalSrc = finalSrc.includes("maps.google.com/?q=") || finalSrc.includes("google.com/maps?q=")
        ? finalSrc.replace(/\&?output=embed/i, "") + (finalSrc.includes("output=embed") ? "" : "&output=embed")
        : finalSrc;
    }

    // Fallback to a default embed if conversion fails
    if (!finalSrc) {
      finalSrc = "https://www.google.com/maps?q=2833%20Smith%20Ave%2C%20Baltimore%2C%20MD&output=embed";
    }

    // If maps.google.com link didn't include embed, rebuild from subtitle/address-ish text
    if (finalSrc && finalSrc.includes("maps.google.com/?q=")) {
      finalSrc = finalSrc.replace("maps.google.com/?q=", "www.google.com/maps?q=");
      if (!finalSrc.includes("output=embed")) finalSrc += "&output=embed";
    }

    detailMapFrame.src = finalSrc;
  }

  if (detailMapLink) detailMapLink.href = item.map;
};


// Auto-run detail render if on location-detail page
(function bootDetail() {
  const hasDetail = document.getElementById("detailTitle");
  if (!hasDetail) return;

  const params = new URLSearchParams(window.location.search);
  const home = params.get("home");
  window.__renderLocationDetail(home);
})();


