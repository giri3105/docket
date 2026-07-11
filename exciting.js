/* =====================================================
   exciting.js — scroll reveal trigger for ex-items
   ===================================================== */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  if (reduced) {
    document.querySelectorAll('.ex-item').forEach(el => {
      el.classList.add('revealed');
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

  document.querySelectorAll('.ex-item').forEach(el => {
    io.observe(el);
  });
})();
