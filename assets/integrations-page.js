/**
 * /integrations.html - controllers
 *
 *  - Connection explorer: 4-tab stepper (Outlook/OneDrive/SharePoint/Uploads)
 *    user-controlled (click + Arrow + Home/End). Outlook initial.
 *  - Connection explorer mobile accordion: single-open, Outlook open by default.
 *  - Role ledger mobile accordion: single-open, Outlook open by default.
 *  - FAQ accordion: 8 questions, single-open, all closed by default.
 *  - No autoplay. No setInterval. No timer. No carousel.
 *  - Honors prefers-reduced-motion (CSS handles transition collapse).
 */
(function () {
  'use strict';

  var root = document.getElementById('integrations-page');
  if (!root) return;

  // Connection explorer tab controller (desktop)
  initTabs();
  function initTabs() {
    var stepper = root.querySelector('.connection-explorer-desktop');
    if (!stepper) return;
    var tabs = stepper.querySelectorAll('.connection-explorer-tab');
    var states = stepper.querySelectorAll('.connection-explorer-state');
    var panel = stepper.querySelector('.connection-explorer-panel');
    var current = parseInt(stepper.getAttribute('data-active-tab') || '0', 10);

    function setTab(idx) {
      if (idx === current || idx < 0 || idx >= tabs.length) return;
      tabs.forEach(function (t, i) {
        t.classList.toggle('is-active', i === idx);
        t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        t.setAttribute('tabindex', i === idx ? '0' : '-1');
      });
      states.forEach(function (s, i) {
        s.classList.toggle('is-active', i === idx);
      });
      if (panel) panel.setAttribute('aria-labelledby', 'connection-explorer-tab-' + idx);
      stepper.setAttribute('data-active-tab', String(idx));
      current = idx;
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { setTab(i); t.focus(); });
    });

    var tablist = stepper.querySelector('.connection-explorer-tabs');
    if (tablist) {
      tablist.addEventListener('keydown', function (e) {
        var idx = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') idx = (current + 1) % tabs.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') idx = (current - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        else return;
        e.preventDefault();
        setTab(idx);
        if (tabs[idx]) tabs[idx].focus();
      });
    }
  }

  // Single-open accordion helper
  function initAccordion(selector) {
    var triggers = root.querySelectorAll(selector);
    if (!triggers.length) return;
    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true';
        triggers.forEach(function (other) { other.setAttribute('aria-expanded', 'false'); });
        if (!open) t.setAttribute('aria-expanded', 'true');
      });
    });
  }

  initAccordion('.connection-explorer-acc-trigger');
  initAccordion('.role-ledger-acc-trigger');
  initAccordion('.integrations-faq-trigger');
})();
