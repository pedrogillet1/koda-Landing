/**
 * /security-overview.html - controllers
 *
 *  - Permissions accordion (mobile): one item at a time may be open.
 *    Outlook is open by default.
 *  - FAQ accordion: 8 questions, single-open. All closed by default.
 *  - No autoplay. No setInterval. No timer. No carousel.
 *  - Honors prefers-reduced-motion (CSS handles transition collapse).
 */
(function () {
  'use strict';

  var root = document.getElementById('security-page');
  if (!root) return;

  // Permissions accordion (mobile)
  var accItems = root.querySelectorAll('.security-access-acc-trigger');
  if (accItems.length) {
    accItems.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true';
        accItems.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
        });
        if (!open) t.setAttribute('aria-expanded', 'true');
      });
    });
  }

  // FAQ accordion (single-open)
  var faqTriggers = root.querySelectorAll('.security-faq-trigger');
  if (faqTriggers.length) {
    faqTriggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true';
        faqTriggers.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
        });
        if (!open) t.setAttribute('aria-expanded', 'true');
      });
    });
  }
})();
