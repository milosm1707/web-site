/* =============================================
   JA NEKRETNINE — main.js
   ============================================= */

'use strict';

// ── NAV SCROLL ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE BURGER ────────────────────────────
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  // Animate bars
  const bars = burger.querySelectorAll('span');
  if (open) {
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const bars = burger.querySelectorAll('span');
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});

// ── REVEAL ON SCROLL ─────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger items in the same parent grid
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right')]
        : [];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = idx > 0 ? `${idx * 0.1}s` : '0s';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── CONTACT FORM ─────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Šaljemo...';
    btn.disabled = true;

    // Simulate async — replace with real fetch/email service
    setTimeout(() => {
      btn.textContent = '✓ Poruka je poslana';
      btn.style.background = '#5c8a28';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

// ── SMOOTH SCROLL OFFSET (for fixed nav) ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── CURSOR GLOW (optional luxury effect) ─────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122,179,58,0.06) 0%, transparent 70%);
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.5s;
  top: -999px; left: -999px;
`;
document.body.appendChild(glow);
let glowVisible = false;
document.addEventListener('mousemove', (e) => {
  glow.style.top  = e.clientY + 'px';
  glow.style.left = e.clientX + 'px';
  if (!glowVisible) {
    glow.style.opacity = '1';
    glowVisible = true;
  }
});
document.addEventListener('mouseleave', () => {
  glow.style.opacity = '0';
  glowVisible = false;
});