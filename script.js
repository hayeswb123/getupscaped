// ===========================
// GSAP + ScrollTrigger Setup
// ===========================
gsap.registerPlugin(ScrollTrigger);

// ===========================
// NAV — scroll effect
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================
// MOBILE MENU
// ===========================
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ===========================
// HERO — fade in on load
// ===========================
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 200);
  });
});

// ===========================
// HERO PARALLAX
// ===========================
gsap.to('#heroParallax', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

// ===========================
// PARALLAX BLOCKS
// ===========================
gsap.to('#parallaxImg1', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: {
    trigger: '#parallax1',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});

gsap.to('#parallaxImg2', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: {
    trigger: '#parallax2',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal:not(.hero .reveal)');

revealEls.forEach((el, i) => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => {
      el.classList.add('visible');
    }
  });
});

// ===========================
// PRICING BAR ANIMATION
// ===========================
ScrollTrigger.create({
  trigger: '.pricing__bar',
  start: 'top 80%',
  onEnter: () => {
    document.querySelector('.pricing__fill').classList.add('animate');
  }
});

// ===========================
// STEP NUMBERS — stagger
// ===========================
gsap.from('.step__num', {
  opacity: 0,
  x: -30,
  stagger: 0.15,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.steps',
    start: 'top 75%',
  }
});

// ===========================
// SERVICE CARDS — stagger
// ===========================
gsap.from('.service-card', {
  opacity: 0,
  y: 50,
  stagger: 0.12,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.services__grid',
    start: 'top 80%',
  }
});

// ===========================
// GALLERY — stagger reveal
// ===========================
gsap.from('.gallery__item', {
  opacity: 0,
  scale: 0.95,
  stagger: 0.1,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.gallery__grid',
    start: 'top 80%',
  }
});

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Thank you! We\'ll be in touch.';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    btn.disabled = true;
  });
}

// ===========================
// SMOOTH ANCHOR SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
