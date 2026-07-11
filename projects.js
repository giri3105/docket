/* ══════════════════════════════════════════════
   projects.js — scroll reveal for projects + detail pages
══════════════════════════════════════════════ */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  const targets = document.querySelectorAll(
    '.project-card, .detail-section, .detail-sidebar-card, ' +
    '.projects-ideas-header, .idea-row'
  );

  if (reduced) {
    targets.forEach(el => {
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
  }, { threshold: 0.1 });

  targets.forEach(el => io.observe(el));
})();
