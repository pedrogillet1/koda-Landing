/**
 * allybi-methodology.js
 *
 * Controller for /metodologia.html.
 *
 * Responsibilities (spec §59-72):
 *   - Mobile accordions (§63, §65, §71)
 *   - FAQ accordion: closed by default, only one open at a time (§71)
 *   - Anchor nav: smooth-scroll respecting reduced motion (§16/§76)
 *
 * Does NOT compute formulas - the on-page tables and exemplo use static spec
 * values directly authored in the HTML. The math source of truth remains
 * window.AllybiToolsData; this controller verifies at init that the data
 * module is loaded and exposes window.__allybiToolsData for QA hooks.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.AllybiToolsData) {
      console.warn('allybi-methodology: AllybiToolsData not present.');
    }

    // FAQ accordion (§71): all closed by default, single-open behavior
    var faqRoot = document.querySelector('[data-tools-faq]');
    if (faqRoot) {
      var triggers = faqRoot.querySelectorAll('.tools-faq-trigger');
      triggers.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        t.addEventListener('click', function () {
          var expanded = t.getAttribute('aria-expanded') === 'true';
          triggers.forEach(function (other) { other.setAttribute('aria-expanded', 'false'); });
          t.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        });
      });
    }

    // Generic mobile accordions for tables (§63 escopo / §65 calc tables)
    var accordions = document.querySelectorAll('[data-tools-accordion]');
    accordions.forEach(function (root) {
      var firstOpen = root.hasAttribute('data-first-open');
      var triggers = root.querySelectorAll('[data-acc-trigger]');
      triggers.forEach(function (t, idx) {
        var panel = t.parentElement.querySelector('[data-acc-panel]');
        var open = firstOpen && idx === 0;
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.hidden = !open;
        t.addEventListener('click', function () {
          var expanded = t.getAttribute('aria-expanded') === 'true';
          t.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          if (panel) panel.hidden = expanded;
        });
      });
    });

    // Anchor smooth scroll
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        if (prefersReduced) {
          target.scrollIntoView();
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  });
})();
