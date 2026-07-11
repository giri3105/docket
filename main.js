/* ══════════════════════════════════════════════
   main.js — home page interactions
══════════════════════════════════════════════ */

/* ─── 1. CURSOR SPOTLIGHT ─── */
const spotlight = document.createElement('div');
spotlight.style.cssText = `
  position:fixed;inset:0;pointer-events:none;
  z-index:0;transition:opacity 600ms ease;opacity:0;`;
document.body.appendChild(spotlight);

let mx = window.innerWidth / 2, my = window.innerHeight / 2, raf;
function updateSpotlight() {
  spotlight.style.background =
    `radial-gradient(620px circle at ${mx}px ${my}px,rgba(255,255,255,0.025) 0%,transparent 70%)`;
}
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  spotlight.style.opacity = '1';
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateSpotlight);
}, { passive: true });
document.addEventListener('mouseleave', () => { spotlight.style.opacity = '0'; });


/* ─── 2. CARD TILT + INNER SHIMMER ─── */
document.querySelectorAll('.card').forEach(card => {
  const shimmer = document.createElement('div');
  shimmer.style.cssText =
    'position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 300ms ease;z-index:1;';
  card.appendChild(shimmer);

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 120ms ease,background 220ms ease,border-color 220ms ease';
    shimmer.style.opacity = '1';
  });
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    const nx = (cx / r.width  - 0.5) * 2;
    const ny = (cy / r.height - 0.5) * 2;
    card.style.transform =
      `perspective(800px) rotateX(${ny * -3.5}deg) rotateY(${nx * 3.5}deg) translateZ(4px)`;
    shimmer.style.background =
      `radial-gradient(260px circle at ${cx}px ${cy}px,rgba(255,255,255,0.05) 0%,transparent 70%)`;
  }, { passive: true });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 400ms ease,background 220ms ease,border-color 220ms ease';
    card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    shimmer.style.opacity = '0';
  });
});


/* ─── 3. OVERLAY SYSTEM ─── */
const overlay      = document.getElementById('overlay');
const overlayFrame = document.getElementById('overlay-frame');
const overlayClose = document.getElementById('overlay-close');

function openOverlay(href) {
  // Pass ?embed to hide nav inside iframe
  overlayFrame.src = href + (href.includes('?') ? '&' : '?') + 'embed=1';
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeOverlay() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Clear iframe after animation
  setTimeout(() => { overlayFrame.src = ''; }, 320);
}

// Intercept all card and card-link clicks → open overlay instead of navigating
document.querySelectorAll('a.card, .card-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    openOverlay(link.getAttribute('href') || link.href);
  });
});

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });


/* ─── 4. PROJECT CAROUSEL ─── */
(function () {
  const carousel = document.getElementById('proj-carousel');
  if (!carousel) return;

  const slides   = Array.from(carousel.querySelectorAll('.proj-slide'));
  const dots     = Array.from(carousel.querySelectorAll('.proj-dot'));
  const DURATION = 320; // ms — sharp and fast
  const EASE     = `${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  const INTERVAL = 4000;

  let current   = 0;
  let animating = false;
  let timer     = null;

  // Init: first slide visible, rest off-screen right (no transition)
  slides.forEach((s, i) => {
    s.style.transition = 'none';
    s.style.transform  = i === 0 ? 'translateX(0)' : 'translateX(100%)';
  });
  dots[0]?.classList.add('is-active');

  function goTo(nextIdx) {
    if (animating || nextIdx === current) return;
    animating = true;

    const prev = slides[current];
    const next = slides[nextIdx];

    // Place next off-screen right without transition
    next.style.transition = 'none';
    next.style.transform  = 'translateX(100%)';
    next.offsetHeight; // force reflow

    // Fire both simultaneously
    prev.style.transition = `transform ${EASE}`;
    next.style.transition = `transform ${EASE}`;
    prev.style.transform  = 'translateX(-100%)';
    next.style.transform  = 'translateX(0)';

    current = nextIdx;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));

    setTimeout(() => {
      // Reset exited slide back to right (no transition) so it's ready to enter again
      prev.style.transition = 'none';
      prev.style.transform  = 'translateX(100%)';
      animating = false;
    }, DURATION + 16);
  }

  function advance() { goTo((current + 1) % slides.length); }

  function startTimer() {
    stopTimer();
    timer = setInterval(advance, INTERVAL);
  }
  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Dot clicks: manual nav, restart auto after 5s
  dots.forEach((dot, i) => {
    dot.addEventListener('click', e => {
      e.stopPropagation();
      goTo(i);
      stopTimer();
      setTimeout(startTimer, 5000);
    });
  });

  // Slide click & keypress → navigate directly to project page
  slides.forEach(slide => {
    const handleSlideOpen = e => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = slide.dataset.href;
    };
    slide.addEventListener('click', handleSlideOpen);
    slide.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleSlideOpen(e);
      }
    });
  });

  // Pause on hover / touch
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', startTimer);
  carousel.addEventListener('touchstart', stopTimer, { passive: true });
  carousel.addEventListener('touchend', () => setTimeout(startTimer, 2000), { passive: true });

  if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) startTimer();
})();


/* ─── 5. REDUCED MOTION ─── */
if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.querySelectorAll('.card').forEach(c => {
    c.onmouseenter = c.onmousemove = c.onmouseleave = null;
  });
  spotlight.remove();
}
