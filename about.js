/* ══════════════════════════════════════════════
   about.js — scroll-reveal for the about page
══════════════════════════════════════════════ */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  if (reduced) {
    // Show everything immediately
    document.querySelectorAll('.about-header, .about-para, .sidebar-card, .currently-wrap').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.about-para, .sidebar-card, .currently-wrap').forEach(el => {
    io.observe(el);
  });
})();
