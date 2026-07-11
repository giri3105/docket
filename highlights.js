/* ══════════════════════════════════════════════
   highlights.js — animated inline highlights + popups
   Shared across about.html and other sub-pages.
══════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    // Still wire up popups, just skip animations
    initPopups();
    return;
  }

  const FILL = {
    yellow: 'rgba(255,229,102,0.20)',
    orange: 'rgba(255,179,71,0.18)',
    green:  'rgba(62,207,178,0.16)',
    blue:   'rgba(126,200,255,0.16)',
    pink:   'rgba(249,168,212,0.22)',
    white:  'rgba(239,239,239,0.12)',
  };
  const STROKE = {
    yellow: '#FFE566',
    orange: '#FFB347',
    green:  '#3ECFB2',
    blue:   '#7EC8FF',
    pink:   '#F9A8D4',
    white:  '#EFEFEF',
  };

  /* ─── 1. Inject visual elements into each .hl span ─── */
  document.querySelectorAll('.hl').forEach(el => {
    const type  = el.dataset.hlType  || 'highlighter';
    const color = el.dataset.hlColor || 'yellow';

    if (type === 'highlighter') {
      const fill = document.createElement('span');
      fill.className = 'hl-fill';
      fill.style.background = FILL[color] || FILL.yellow;
      el.insertBefore(fill, el.firstChild);

    } else if (type === 'box') {
      const svg  = makeSVG('hl-svg');
      const path = makePath(STROKE[color] || '#fff', 1.5, 0.65);
      svg.appendChild(path);
      el.appendChild(svg);
      el._hl = { type, path, svg };

    } else if (type === 'circle') {
      const svg     = makeSVG('hl-svg');
      const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      ellipse.setAttribute('stroke', STROKE[color] || '#fff');
      ellipse.setAttribute('stroke-width', '1.5');
      ellipse.setAttribute('opacity', '0.65');
      ellipse.setAttribute('fill', 'none');
      svg.appendChild(ellipse);
      el.appendChild(svg);
      el._hl = { type, ellipse, svg };

    } else if (type === 'underline') {
      const svg  = makeSVG('hl-underline-svg');
      const path = makePath(STROKE[color] || '#fff', 2.2, 0.85);
      svg.appendChild(path);
      el.appendChild(svg);
      el._hl = { type, path, svg };
    }
  });

  /* ─── 2. Measure SVG shapes after layout ─── */
  function measureAll() {
    document.querySelectorAll('.hl').forEach(el => {
      if (!el._hl) return;
      const { type } = el._hl;
      const r = el.getBoundingClientRect();

      if (type === 'box') {
        const w = r.width + 16, h = r.height + 12;
        const d = `M5,4 Q${w*0.5},2 ${w-5},5 Q${w-2},${h*0.5} ${w-5},${h-4} Q${w*0.5},${h-2} 5,${h-5} Q2,${h*0.5} 5,4 Z`;
        setDash(el, el._hl.path, d);

      } else if (type === 'circle') {
        const w = r.width + 16, h = r.height + 12;
        const rx = w / 2 - 2, ry = h / 2 + 3;
        const e = el._hl.ellipse;
        e.setAttribute('cx', w / 2);
        e.setAttribute('cy', h / 2);
        e.setAttribute('rx', rx);
        e.setAttribute('ry', ry);
        const perim = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2);
        e.style.strokeDasharray  = perim;
        e.style.strokeDashoffset = perim;
        e.style.transition = 'none';
        el._hl.len    = perim;
        el._hl.target = e;

      } else if (type === 'underline') {
        const w = r.width;
        const d = `M0,4 Q${w*0.25},1 ${w*0.5},4 Q${w*0.75},7 ${w},4`;
        setDash(el, el._hl.path, d);
      }
    });
  }

  function setDash(el, path, d) {
    path.setAttribute('d', d);
    const len = path.getTotalLength ? path.getTotalLength() : 300;
    path.style.strokeDasharray  = len;
    path.style.strokeDashoffset = len;
    path.style.transition = 'none';
    el._hl.len    = len;
    el._hl.target = path;
  }

  /* ─── 3. Animate in ─── */
  function animateIn(el) {
    if (el._hlDone) return;
    el._hlDone = true;
    const type = el.dataset.hlType || 'highlighter';

    if (type === 'highlighter') {
      const fill = el.querySelector('.hl-fill');
      if (fill) fill.style.transform = 'scaleX(1)';
    } else if (el._hl?.target) {
      const t = el._hl.target;
      requestAnimationFrame(() => {
        t.style.transition = 'stroke-dashoffset 640ms cubic-bezier(0.4,0,0.2,1)';
        t.style.strokeDashoffset = '0';
      });
    }
  }

  /* ─── 4. IntersectionObserver triggers animations ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateIn(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.8 });

  // Two rAF to let layout settle before measuring
  requestAnimationFrame(() => requestAnimationFrame(() => {
    measureAll();
    document.querySelectorAll('.hl').forEach(el => io.observe(el));
  }));

  initPopups();

  /* ─── Helpers ─── */
  function makeSVG(cls) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', cls);
    s.setAttribute('aria-hidden', 'true');
    return s;
  }
  function makePath(stroke, width, opacity) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('stroke', stroke);
    p.setAttribute('stroke-width', width);
    p.setAttribute('opacity', opacity);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    return p;
  }

  /* ─── 5. Popup system ─── */
  function initPopups() {
    const backdrop = document.querySelector('.popup-backdrop');

    function closeAll() {
      document.querySelectorAll('.popup.active').forEach(p => p.classList.remove('active'));
      if (backdrop) backdrop.classList.remove('active');
    }

    document.querySelectorAll('.hl[data-popup]').forEach(el => {
      const popup = document.getElementById(el.dataset.popup);
      if (!popup) return;

      el.addEventListener('click', e => {
        e.stopPropagation();
        const wasActive = popup.classList.contains('active');
        closeAll();
        if (wasActive) return;

        // Position: below the span by default, flip above if too low
        const r   = el.getBoundingClientRect();
        const pw  = Math.min(320, window.innerWidth - 24);
        let left  = r.left;
        let top   = r.bottom + 12;

        if (top + 180 > window.innerHeight - 12) {
          top = r.top - 12;
          popup.style.setProperty('--popup-origin', 'translateY(-100%) translateY(-8px)');
        } else {
          popup.style.setProperty('--popup-origin', '');
        }

        left = Math.max(12, Math.min(left, window.innerWidth - pw - 12));
        popup.style.left  = left + 'px';
        popup.style.top   = top  + 'px';
        popup.style.width = pw   + 'px';

        popup.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
      });
    });

    document.querySelectorAll('.popup-close').forEach(b => b.addEventListener('click', closeAll));
    if (backdrop) backdrop.addEventListener('click', closeAll);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  }
})();
