// ===========================
// GSAP + ScrollTrigger
// ===========================
gsap.registerPlugin(ScrollTrigger);

// ===========================
// SCROLL PROGRESS BAR
// ===========================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (h > 0) scrollProgress.style.height = (window.scrollY / h * 100) + '%';
}, { passive: true });

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.085;
    followerY += (mouseY - followerY) * 0.085;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  // Expand on interactive hover
  document.querySelectorAll('a, button, .gallery-card, .service-card, .dot').forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovered'));
  });

  // Hide/show on window leave
  document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursorFollower.classList.add('hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursor.classList.remove('hidden');
    cursorFollower.classList.remove('hidden');
  });
}

// ===========================
// NAV — scroll effect
// ===========================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===========================
// MOBILE MENU
// ===========================
const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ===========================
// HERO — entrance animation
// ===========================
window.addEventListener('load', () => {
  // Stagger hero reveals
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 500 + i * 250);
  });

  // Clip-path reveals inside hero
  const heroClips = document.querySelectorAll('.hero .reveal-clip');
  heroClips.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 500 + i * 280);
  });
});

// ===========================
// SCROLL REVEAL — generic
// ===========================
document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    onEnter: () => el.classList.add('visible'),
  });
});

// Clip-path text reveals
document.querySelectorAll('.reveal-clip:not(.hero .reveal-clip)').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => el.classList.add('visible'),
  });
});

// ===========================
// SERVICE CARDS — tilt entrance
// ===========================
gsap.from('.service-card', {
  opacity: 0,
  y: 60,
  rotateX: 8,
  stagger: 0.12,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.services__grid',
    start: 'top 84%',
  }
});

// ===========================
// STEPS — staggered slide-in + line draw
// ===========================
const steps = document.querySelectorAll('.step[data-step]');
steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top 85%',
    onEnter: () => {
      setTimeout(() => step.classList.add('visible'), i * 120);
    }
  });
});

// Draw the connecting line as you scroll through the steps section
const stepsLine = document.getElementById('stepsLine');
if (stepsLine) {
  gsap.to(stepsLine, {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.steps',
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: 0.8,
    }
  });
}

// ===========================
// GALLERY — drag scroll
// ===========================
const galleryScroll = document.getElementById('galleryScroll');
if (galleryScroll) {
  let isDown = false, startX, scrollLeft;
  galleryScroll.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - galleryScroll.offsetLeft;
    scrollLeft = galleryScroll.scrollLeft;
  });
  galleryScroll.addEventListener('mouseleave', () => { isDown = false; });
  galleryScroll.addEventListener('mouseup', () => { isDown = false; });
  galleryScroll.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryScroll.offsetLeft;
    galleryScroll.scrollLeft = scrollLeft - (x - startX);
  });
}

// ===========================
// STATS — count-up
// ===========================
document.querySelectorAll('.stat__num[data-count]').forEach(el => {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let started = false;

  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => {
      if (started) return;
      started = true;
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const p = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  });
});

// ===========================
// PRICING BAR
// ===========================
ScrollTrigger.create({
  trigger: '#pricingFill',
  start: 'top 88%',
  onEnter: () => document.getElementById('pricingFill').classList.add('animate'),
});

// ===========================
// TESTIMONIAL SLIDER
// ===========================
const slides = document.querySelectorAll('.testimonial-slide');
const dots   = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideTimer;

function goToSlide(idx) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = idx;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function startTimer() { slideTimer = setInterval(nextSlide, 5500); }
function resetTimer() { clearInterval(slideTimer); startTimer(); }

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.index));
    resetTimer();
  });
});
startTimer();

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Thank you — we\'ll be in touch within 24 hours.';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    btn.style.borderColor = 'var(--gold)';
    btn.disabled = true;
  });
}

// ===========================
// SMOOTH ANCHOR SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// FOOTER YEAR
// ===========================
const yearEl = document.querySelector('.footer__bottom p');
if (yearEl) yearEl.textContent = yearEl.textContent.replace('2024', new Date().getFullYear());
