document.addEventListener("DOMContentLoaded", () => {
// SAMPLE FACILITIES DATA - Tum apna data yahan add karo
const facilities = [
  {
    id: 1,
    name: "COR Manor Baltimore",
    address: "2833 Smith Ave, Baltimore, MD 21209",
    city: "Baltimore",
    type: "assisted",
    lat: 39.3638,
    lng: -76.6658,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    beds: "120 Beds",
    rating: "4.8/5",
    phone: "443-208-1826",
    desc: "Premier assisted living facility with 24/7 nursing care, memory care unit, and beautiful garden spaces. Specialized in post-surgery recovery and long-term care."
  },
  {
    id: 2,
    name: "COR Care Center Rockville",
    address: "1015 Rockville Pike, Rockville, MD 20852",
    city: "Rockville",
    type: "nursing",
    lat: 39.0840,
    lng: -77.1528,
    image: "https://images.unsplash.com/photo-1576765607924-3b9dcc1c1d81?w=800",
    beds: "85 Beds",
    rating: "4.9/5",
    phone: "301-555-0123",
    desc: "State-of-the-art nursing facility with physical therapy, occupational therapy, and specialized dementia care. Award-winning staff with 20+ years experience."
  },
  {
    id: 3,
    name: "COR Memory Gardens Towson",
    address: "800 Dulaney Valley Rd, Towson, MD 21204",
    city: "Towson",
    type: "memory",
    lat: 39.4014,
    lng: -76.6036,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    beds: "60 Beds",
    rating: "4.7/5",
    phone: "410-555-0456",
    desc: "Dedicated memory care community with secure environment, cognitive therapy programs, and family support services. Designed specifically for Alzheimer's patients."
  },
  {
    id: 4,
    name: "COR Assisted Living Annapolis",
    address: "50 West St, Annapolis, MD 21401",
    city: "Annapolis",
    type: "assisted",
    lat: 38.9784,
    lng: -76.4922,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    beds: "95 Beds",
    rating: "4.8/5",
    phone: "410-555-0789",
    desc: "Waterfront assisted living with stunning views, personalized care plans, and recreational activities. Independent living with support when needed."
  },
  {
    id: 5,
    name: "COR Rehab Center Columbia",
    address: "10900 Red Run Blvd, Columbia, MD 21044",
    city: "Columbia",
    type: "nursing",
    lat: 39.2047,
    lng: -76.8603,
    image: "https://images.unsplash.com/photo-1532938911074-1b06ac5ceccb?w=800",
    beds: "110 Beds",
    rating: "4.9/5",
    phone: "410-555-0321",
    desc: "Specialized rehabilitation center with post-hospital care, wound care, and respiratory therapy. Modern equipment and dedicated therapy gym."
  }
];

let map;
let markers = [];

// INIT MAP
function initMap() {
  map = L.map('map').setView([39.0458, -76.6413], 9);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  addMarkers(facilities);
}

// ADD MARKERS TO MAP
function addMarkers(data) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  
  data.forEach(fac => {
    const marker = L.marker([fac.lat, fac.lng]).addTo(map);
    marker.bindPopup(`<b>${fac.name}</b><br>${fac.address}<br><button onclick="openModal(${fac.id})" style="margin-top:8px;padding:6px 12px;background:#facc15;border:none;border-radius:8px;cursor:pointer;color:#000;font-weight:600;">View Details</button>`);
    markers.push(marker);
  });
}

// RENDER FACILITY CARDS
function renderFacilities(data) {
  const list = document.getElementById('facilitiesList');
  list.innerHTML = '';
  
  data.forEach(fac => {
    const card = document.createElement('div');
    card.className = 'facility-card';
    card.innerHTML = `
      <img src="${fac.image}" class="facility-img" alt="${fac.name}">
      <div class="facility-info">
        <h3>${fac.name}</h3>
        <p>${fac.address}</p>
        <span class="facility-type">${fac.type.replace('assisted','Assisted Living').replace('nursing','Nursing Care').replace('memory','Memory Care')}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(fac.id));
    list.appendChild(card);
  });
}

// OPEN MODAL WITH DETAILS
function openModal(id) {
  const fac = facilities.find(f => f.id === id);
  const modal = document.getElementById('locationModal');
  const body = document.getElementById('modalBody');
  
  body.innerHTML = `
    <img src="${fac.image}" class="modal-img" alt="${fac.name}">
    <div class="modal-info">
      <h2>${fac.name}</h2>
      <p class="address">📍 ${fac.address}</p>
      
      <div class="details">
        <div class="detail-box">
          <h4>Total Capacity</h4>
          <p>${fac.beds}</p>
        </div>
        <div class="detail-box">
          <h4>Family Rating</h4>
          <p>${fac.rating}</p>
        </div>
        <div class="detail-box">
          <h4>Care Type</h4>
          <p>${fac.type.replace('assisted','Assisted Living').replace('nursing','Nursing Care').replace('memory','Memory Care')}</p>
        </div>
        <div class="detail-box">
          <h4>Contact</h4>
          <p>${fac.phone}</p>
        </div>
      </div>
      
      <p class="desc">${fac.desc}</p>
      
      <button class="nav-btn" style="width:100%;margin-top:20px;" onclick="window.location.href='contact.html'">Schedule Visit</button>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// CLOSE MODAL
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('locationModal').classList.remove('active');
  document.body.style.overflow = 'auto';
});

document.getElementById('locationModal').addEventListener('click', (e) => {
  if (e.target.id === 'locationModal') {
    document.getElementById('locationModal').classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// SEARCH FUNCTION
document.getElementById('searchInput').addEventListener('input', (e) => {
  const search = e.target.value.toLowerCase();
  const filtered = facilities.filter(f => 
    f.name.toLowerCase().includes(search) || 
    f.address.toLowerCase().includes(search) ||
    f.city.toLowerCase().includes(search)
  );
  renderFacilities(filtered);
  addMarkers(filtered);
});

// FILTER TAGS
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    const filtered = filter === 'all' ? facilities : facilities.filter(f => f.type === filter);
    renderFacilities(filtered);
    addMarkers(filtered);
  });
});

// NAVBAR SCROLL + MENU
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navbar.classList.toggle('active');
});

// REVEAL ON SCROLL
const revealOnScroll = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  initMap();
  renderFacilities(facilities);
  revealOnScroll();
});
const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});