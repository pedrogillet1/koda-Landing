/**
 * security-sections.js
 *
 * Reveal controller for the 3 rebuilt sections on /security-overview.html:
 *  - #security-encryption
 *  - #security-ai-data-use
 *  - #security-outbound-boundaries
 *
 * Responsibilities (spec §§48-51):
 *  - Measure header height into --site-header-height so anchor scroll-margin works.
 *  - Add .is-revealed when each section reaches 25% in viewport (one-shot).
 *  - Honors prefers-reduced-motion (CSS handles instant render).
 *  - No autoplay, no setInterval, no carousel, no scroll-jacking.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('#allybi-header, .allybi-header, header');
    function measure() {
      if (header) document.documentElement.style.setProperty('--site-header-height', header.offsetHeight + 'px');
    }
    measure();
    window.addEventListener('resize', measure, { passive: true });

    var ids = ['security-encryption', 'security-ai-data-use', 'security-outbound-boundaries'];
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if (!sections.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      sections.forEach(function (s) { io.observe(s); });
    } else {
      sections.forEach(function (s) { s.classList.add('is-revealed'); });
    }
  });
})();
