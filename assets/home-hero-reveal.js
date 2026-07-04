/**
 * Home hero — one-shot reveal.
 *
 * Adds `.is-revealed` to `.home-hero` once 30% of the section is in view.
 * The CSS then cascades the staged transitions (copy → demo frame → chips
 * → question → answer → review → send button color swap).
 *
 * No autoplay. No setInterval. No timer. No loop.
 */
(function() {
  'use strict';
  var hero = document.querySelector('.home-hero');
  if (!hero) return;

  // Measure header height into --site-header-height so the hero min-height
  // math (calc(100svh - var(--site-header-height))) stays accurate.
  function measureHeader() {
    var header = document.querySelector('#allybi-header, .allybi-header, header');
    var h = header ? header.offsetHeight : 64;
    document.documentElement.style.setProperty('--site-header-height', h + 'px');
  }
  measureHeader();
  window.addEventListener('resize', measureHeader);

  if (!('IntersectionObserver' in window)) {
    hero.classList.add('is-revealed');
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        hero.classList.add('is-revealed');
        io.unobserve(hero);
      }
    });
  }, { threshold: 0.05 });
  io.observe(hero);
})();
