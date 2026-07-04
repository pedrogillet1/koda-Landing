/**
 * Integration flow + pricing — one-shot reveal on viewport entry.
 *
 *  ▸ #home-integrations-flow: sources, mockup, review checks, actions
 *    fade/translate in sequence when 30% of the section is in view.
 *
 *  ▸ #home-pricing: copy, timeline, panel, badge, groups reveal in
 *    sequence when 30% of the section is in view.
 *
 *  Honors prefers-reduced-motion: full state applied instantly.
 *  No autoplay. No setInterval. No loop. No carousel.
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Security uses a lower threshold (15% of product frame per spec §15);
  // the other two reveal at 30% of the section.
  var targets = [
    { id: 'home-integrations-flow', threshold: 0.05 },
    { id: 'home-pricing',           threshold: 0.05 },
    { id: 'security',               threshold: 0.05 }
  ];

  targets.forEach(function (t) {
    var el = document.getElementById(t.id);
    if (!el) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: t.threshold });

    io.observe(el);
  });
})();
