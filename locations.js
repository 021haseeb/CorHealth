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

