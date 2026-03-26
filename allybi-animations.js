// allybi-animations.js — Scroll-reveal animations for new Allybi pages
(function () {
  'use strict';

  // Respect reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('.allybi-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver for .allybi-reveal elements
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.allybi-reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
})();
