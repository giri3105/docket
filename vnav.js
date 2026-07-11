/**
 * vnav.js · Minimalist Vertical Navigation Rail
 * Ultra-clean, quiet monospaced tab rail across all pages.
 */
(function() {
  function initVNav() {
    let rail = document.querySelector('.v-tabs-rail');
    if (!rail) {
      rail = document.createElement('aside');
      rail.className = 'v-tabs-rail';
      document.body.insertBefore(rail, document.body.firstChild);
    }

    // Ensure the rail uses our ultra-minimalist monospaced numbered structure
    if (rail.getAttribute('data-upgraded') !== 'minimal-v1') {
      rail.setAttribute('data-upgraded', 'minimal-v1');
      rail.setAttribute('aria-label', 'Quick Navigation');
      rail.innerHTML = `
        <div class="v-tabs-top">
          <a href="index.html" class="v-tab-logo" aria-label="Overview" title="Overview">G.</a>
        </div>
        <nav class="v-tabs-list">
          <a href="index.html" class="v-tab" data-page="index.html" data-tooltip="01 / HOME">
            <span class="v-tab-num">01</span>
          </a>
          <a href="projects.html" class="v-tab" data-page="projects.html" data-tooltip="02 / BUILDS">
            <span class="v-tab-num">02</span>
          </a>
          <a href="about.html" class="v-tab" data-page="about.html" data-tooltip="03 / ABOUT">
            <span class="v-tab-num">03</span>
          </a>
          <a href="workex.html" class="v-tab" data-page="workex.html" data-tooltip="04 / WORK">
            <span class="v-tab-num">04</span>
          </a>
          <a href="reads.html" class="v-tab" data-page="reads.html" data-tooltip="05 / READS">
            <span class="v-tab-num">05</span>
          </a>
          <a href="contact.html" class="v-tab" data-page="contact.html" data-tooltip="06 / CONTACT">
            <span class="v-tab-num">06</span>
          </a>
        </nav>
        <div class="v-tabs-bottom">
          <a href="contact.html" class="v-tab-bottom-link" aria-label="Outreach" title="Outreach">↗</a>
        </div>
      `;
    }

    // Determine active tab based on current URL path
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const tabs = rail.querySelectorAll('.v-tab');
    tabs.forEach(tab => {
      tab.classList.remove('is-active');
      const target = tab.getAttribute('data-page') || tab.getAttribute('href');
      if (path === target || (target === 'projects.html' && path.startsWith('project-'))) {
        tab.classList.add('is-active');
      } else if ((path === '' || path === '/') && target === 'index.html') {
        tab.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVNav);
  } else {
    initVNav();
  }
})();
