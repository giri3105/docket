/* ══════════════════════════════════════════════
   workex.js — timeline expand + scroll reveal
══════════════════════════════════════════════ */

/* ─── Expand / collapse (LinkedIn-style) ─── */
document.querySelectorAll('.tl-entry').forEach(entry => {
  const head = entry.querySelector('.tl-head');
  if (!head) return;

  const toggle = () => {
    const open = entry.classList.toggle('is-open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  head.addEventListener('click', e => {
    // let nested links (e.g. company website) work without toggling
    if (e.target.closest('a')) return;
    toggle();
  });

  head.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.closest('a')) return;
      e.preventDefault();
      toggle();
    }
  });
});

/* ─── Scroll reveal ─── */
const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
if (reduce) {
  document.querySelectorAll('.tl-entry').forEach(e => e.classList.add('revealed'));
} else {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.tl-entry').forEach(e => io.observe(e));
}
