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
  const locations = [
  {
    name: "Lahore Care Home",
    desc: "Premium assisted living with 24/7 medical support.",
    map: "https://www.google.com/maps?q=Lahore&output=embed"
  },
  {
    name: "Islamabad Residence",
    desc: "Peaceful environment with elderly care specialists.",
    map: "https://www.google.com/maps?q=Islamabad&output=embed"
  },
  {
    name: "Karachi Care Center",
    desc: "Advanced rehabilitation & modern facilities.",
    map: "https://www.google.com/maps?q=Karachi&output=embed"
  },
  {
    name: "Faisalabad Home",
    desc: "Comfortable and safe medical support housing.",
    map: "https://www.google.com/maps?q=Faisalabad&output=embed"
  },
  {
    name: "Multan Care Unit",
    desc: "Dedicated elderly care with trained staff.",
    map: "https://www.google.com/maps?q=Multan&output=embed"
  },
  {
    name: "Rawalpindi Center",
    desc: "Modern healthcare with emergency support.",
    map: "https://www.google.com/maps?q=Rawalpindi&output=embed"
  },
  {
    name: "Sialkot Residence",
    desc: "Peaceful assisted living environment.",
    map: "https://www.google.com/maps?q=Sialkot&output=embed"
  }
];

const suggestionsBox = document.getElementById("suggestions");
const input = document.getElementById("searchInput");
const details = document.getElementById("locationDetails");
const mapFrame = document.getElementById("mapFrame");

function renderSuggestions(data){
  suggestionsBox.innerHTML = "";

  data.forEach(loc => {
    const btn = document.createElement("button");
    btn.innerText = loc.name;

    btn.addEventListener("click", () => {
      showLocation(loc);
    });

    suggestionsBox.appendChild(btn);
  });
}

// show details
function showLocation(loc){
  details.innerHTML = `
    <h3>${loc.name}</h3>
    <p>${loc.desc}</p>
  `;

  mapFrame.src = loc.map;
}

// search filter
input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(value)
  );

  renderSuggestions(filtered);
});

// initial load
renderSuggestions(locations);
});