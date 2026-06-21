document.addEventListener("DOMContentLoaded",()=>{

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU TOGGLE
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navbar.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Menu link click = menu close
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navbar.classList.remove('active');
  });
});

// REVEAL ON SCROLL
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 100) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// STATS COUNTER ANIMATION
const stats = document.querySelectorAll('.stat h2');
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) return;
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection.getBoundingClientRect().top < window.innerHeight - 100) {
    statsAnimated = true;
    
    stats.forEach(stat => {
      const target = parseInt(stat.innerText);
      const suffix = stat.innerText.replace(/[0-9]/g, '');
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.innerText = target + suffix;
          clearInterval(timer);
        } else {
          stat.innerText = Math.ceil(current) + suffix;
        }
      }, 30);
    });
  }
};

window.addEventListener('scroll', animateStats);

// CTA BUTTON SCROLL
const ctaBtn = document.querySelector('.cta-box .nav-btn');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
}

// TEAM CARD 3D TILT EFFECT
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

});
