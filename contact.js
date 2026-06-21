document.addEventListener("DOMContentLoaded",()=>{

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navbar.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Menu link click karo to menu band ho jaye mobile pe
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navbar.classList.remove('active');
  });
});

// ========== REVEAL ON SCROLL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== SCHEDULE CONSULTATION BUTTON ==========
const scheduleBtn = document.querySelector('.cta-box .nav-btn');
const contactForm = document.querySelector('.contact-form');

if (scheduleBtn && contactForm) {
  scheduleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactForm.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    // Form ka first input focus kar do
    setTimeout(() => {
      contactForm.querySelector('input').focus();
    }, 600);
  });
}

// ========== FORM SUBMIT ==========
const contactFormEl = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactFormEl) {
  contactFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form data le lo
    const formData = new FormData(contactFormEl);
    const name = contactFormEl.querySelector('input[type="text"]').value;
    
    // Success message dikhao
    successMessage.innerHTML = `
      <div style="
        background: rgba(250,204,21,0.1);
        border: 1px solid rgba(250,204,21,0.3);
        color: #facc15;
        padding: 18px;
        border-radius: 14px;
        margin-top: 20px;
        text-align: center;
        font-weight: 600;
      ">
        ✅ Thank you ${name}! We received your message. 
        Our team will contact you within 1 business day.
      </div>
    `;
    
    // Form reset kar do
    contactFormEl.reset();
    
    // 5 sec baad message gayab
    setTimeout(() => {
      successMessage.innerHTML = '';
    }, 5000);
  });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
});
