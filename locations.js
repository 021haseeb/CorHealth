document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });

    // Close Menu On Link Click
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("open");
      });
    });
  }

  // =============================
  // Locations search + suggestions
  // =============================
  const searchInput = document.getElementById("search");
  const autocomplete = document.getElementById("autocomplete");
  const grid = document.getElementById("grid");
  const matchCount = document.getElementById("matchCount");
  const filterSelect = document.getElementById("filter");

  const isLocationsPage = Boolean(searchInput && grid);

  if (!isLocationsPage) return;

  const data = window.LOCATION_DATA || [];

  const normalize = (s) => String(s || "").toLowerCase().trim();

  const getSuggestions = (query) => {
    const q = normalize(query);
    if (!q) return [];

    const scored = data
      .map((home) => {
        const haystack = [home.name, home.city, home.address, ...(home.tags || [])]
          .join(" ")
          .toLowerCase();
        const idx = haystack.indexOf(q);
        if (idx === -1) return null;
        // simple score: earlier match gets higher score
        return { home, score: 1000 - idx };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.home);

    return scored;
  };

  const applyFilter = (homes) => {
    if (!filterSelect) return homes;
    const v = normalize(filterSelect.value);
    if (!v || v === "all") return homes;

    // minimal filtering using tags
    return homes.filter((h) => (h.tags || []).some((t) => normalize(t).includes(v)));
  };

  const buildHomeCard = (home) => {
    const tags = (home.tags || []).slice(0, 3);
    const tagHtml = tags
      .map((t) => `<span class="chip">${t}</span>`)
      .join("");

    return `
      <div class="card" data-home-id="${home.id}">
        <a class="card-link" href="location-detail.html?home=${encodeURIComponent(home.id)}">
          <div class="card-media">
            <img src="${home.image}" alt="${home.name}" />
            <div class="card-overlay">
              <div class="badge">${home.city}</div>
            </div>
          </div>
          <div class="card-body">
            <h3>${home.name}</h3>
            <div class="card-subtitle">${home.address}</div>
            <div class="card-highlights">${tagHtml}</div>
            <div class="card-cta">
              <span class="details">View Details</span>
              <span class="arrow">→</span>
            </div>
          </div>
        </a>
      </div>
    `;
  };

  const renderHomes = (homes) => {
    if (!grid) return;
    const list = applyFilter(homes);

    if (matchCount) matchCount.innerHTML = ` ${list.length}+ homes`;

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-title">No homes found</div>
          <div class="empty-sub">Try a different keyword or city.</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(buildHomeCard).join("");
  };

  const closeAutocomplete = () => {
    if (!autocomplete) return;
    autocomplete.hidden = true;
    autocomplete.innerHTML = "";
  };

  const openAutocomplete = (homes, query) => {
    if (!autocomplete) return;
    const items = homes
      .map(
        (home) => `
          <div class="auto-item" role="option" tabindex="0" data-home-id="${home.id}">
            <div class="auto-title">${home.name}</div>
            <div class="auto-sub">${home.city} • ${home.address}</div>
          </div>
        `
      )
      .join("");

    autocomplete.innerHTML = items;
    autocomplete.hidden = false;

    const clickHandler = (id) => {
      const href = `location-detail.html?home=${encodeURIComponent(id)}`;
      window.location.href = href;
    };

    autocomplete.querySelectorAll(".auto-item").forEach((el) => {
      el.addEventListener("click", () => clickHandler(el.getAttribute("data-home-id")));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") clickHandler(el.getAttribute("data-home-id"));
      });
    });
  };

  // initial render (show all)
  renderHomes(data);

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const suggestions = getSuggestions(searchInput.value);
      openAutocomplete(suggestions, searchInput.value);
      renderHomes(suggestions.length ? suggestions : data);
    });

    searchInput.addEventListener("focus", () => {
      const suggestions = getSuggestions(searchInput.value);
      if (suggestions.length) openAutocomplete(suggestions, searchInput.value);
    });

    document.addEventListener("click", (e) => {
      if (!autocomplete || autocomplete.hidden) return;
      const clickedInside = autocomplete.contains(e.target) || e.target === searchInput;
      if (!clickedInside) closeAutocomplete();
    });

    // escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAutocomplete();
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const suggestions = searchInput && searchInput.value ? getSuggestions(searchInput.value) : data;
      renderHomes(suggestions.length ? suggestions : data);
    });
  }
});

// =============================
// Location detail renderer
// (used by location-detail.html)
// =============================
window.__renderLocationDetail = function __renderLocationDetail(homeId) {
  const data = window.LOCATION_DATA || [];
  const home = data.find((h) => h.id === homeId) || null;
  if (!home) return;

  const detailTag = document.getElementById("detailTag");
  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailImage = document.getElementById("detailImage");
  const detailList = document.getElementById("detailList");
  const detailMapLink = document.getElementById("detailMapLink");
  const mapFrame = document.getElementById("detailMapFrame");

  if (detailTag) detailTag.textContent = "Location";
  if (detailTitle) detailTitle.textContent = home.name;
  if (detailSubtitle) detailSubtitle.textContent = `${home.city} • ${home.address}`;
  if (detailImage) detailImage.src = home.image;

  if (detailList) {
    detailList.innerHTML = (home.highlights || []).map((x) => `<li>${x}</li>`).join("");
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(home.mapQuery)}&output=embed`;
  if (mapFrame) mapFrame.src = mapUrl;

  if (detailMapLink) {
    detailMapLink.href = `https://www.google.com/maps?q=${encodeURIComponent(home.mapQuery)}`;
  }
};
