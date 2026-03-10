/* ============================================================
   PORTFOLIO SCRIPT – Karthick Kalaivanan K
   ============================================================ */

/* ── LOADING SCREEN ──────────────────────────────────────── */
(function () {
  const loader   = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  let progress = 0;

  // Animate the loader bar smoothly from 0 → 90% then jump to 100 on load
  const tick = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 90) { progress = 90; clearInterval(tick); }
    loaderBar.style.width = progress + '%';
  }, 80);

  function hideLoader() {
    clearInterval(tick);
    loaderBar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 350);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // Safety fallback — never block more than 2.5 seconds
    setTimeout(hideLoader, 2500);
  }
})();


/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
const scrollBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });


/* ── DARK / LIGHT THEME TOGGLE ───────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

function applyTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.className = 'fas fa-sun';
  }
}

// Restore saved preference
const savedTheme = localStorage.getItem('kk-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('light-mode');
  const next   = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('kk-theme', next);
  // Brief spin animation on the button
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 400);
});



/* ── TYPEWRITER ──────────────────────────────────────────── */
const roles = [
  'Developer',
  'Software Engineer',
  'Data Analyst',
  'Prompt Engineer',
  'API Architect',
  'Cloud Enthusiast',
  'Problem Solver',
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typewrite() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typewrite, 500); return; }
  } else {
    typeEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { isDeleting = true; setTimeout(typewrite, 1800); return; }
  }
  setTimeout(typewrite, isDeleting ? 60 : 100);
}
typewrite();


/* ── NAVBAR ──────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
  toggleBackToTop();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}));

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}


/* ── BACK TO TOP ─────────────────────────────────────────── */
const backTop = document.getElementById('back-to-top');
function toggleBackToTop() { backTop.classList.toggle('visible', window.scrollY > 400); }
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .cert-card, .contact-card, .contact-form-wrapper, .about-text, .about-details, .stat-item'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));


/* ── COUNTER ANIMATION ───────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.about-stats').forEach(el => counterObserver.observe(el));


/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── SKILL PROGRESS BARS ─────────────────────────────────── */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        // Small delay so CSS transition is visible
        requestAnimationFrame(() => { bar.style.width = w + '%'; });
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bars-section').forEach(el => skillBarObserver.observe(el));


/* ── CONTACT FORM (Formspree) ────────────────────────────── */
async function handleFormSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  // If form action still has placeholder, show demo success
  const action = form.getAttribute('action') || '';
  if (action.includes('YOUR_FORMSPREE_ID')) {
    await new Promise(r => setTimeout(r, 1200));
    showFormSuccess(btn, status, form);
    return;
  }

  try {
    const data = new FormData(form);
    const res  = await fetch(action, {
      method: 'POST', body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      showFormSuccess(btn, status, form);
    } else {
      throw new Error('Server error');
    }
  } catch {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    status.style.display = 'block';
    status.className = 'form-status error';
    status.textContent = '❌ Something went wrong. Please email me directly!';
    setTimeout(() => { status.style.display = 'none'; }, 5000);
  }
}

function showFormSuccess(btn, status, form) {
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  status.style.display = 'block';
  status.className = 'form-status success';
  status.textContent = '✅ Thank you! Your message has been received. I\'ll get back to you soon.';
  form.reset();
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    status.style.display = 'none';
  }, 5000);
}


/* ── CURSOR GLOW (desktop only) ──────────────────────────── */
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(124,58,237,0.06) 0%,transparent 70%);
    pointer-events:none;transform:translate(-50%,-50%);z-index:0;
    transition:left 0.15s ease,top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}


/* ── SKILL CARD TILT (subtle 3D) ─────────────────────────── */
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── INIT ────────────────────────────────────────────────── */
updateActiveNav();
toggleBackToTop();
