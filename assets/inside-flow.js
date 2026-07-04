/**
 * /how-it-works.html - Inside Flow stepper controller
 *
 *  - User-controlled 6-step stepper (click + Enter/Space + Arrow keys +
 *    Home/End). Initial active step = index 2 ("Receba com fonte"). Stage
 *    keeps fixed 580px height across all states.
 *  - No autoplay. No setInterval. No timer. No carousel. No swipe.
 *  - Honors prefers-reduced-motion (instant state changes).
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var root = document.getElementById('inside-allybi-flow');
  if (root) initStepper(root);

  function initStepper(rootEl) {
    var stepper = rootEl.querySelector('.inside-flow-desktop');
    if (!stepper) return;

    var steps = stepper.querySelectorAll('.inside-flow-step');
    var states = stepper.querySelectorAll('.inside-flow-state');
    var stage = stepper.querySelector('.inside-flow-stage');
    var current = parseInt(stepper.getAttribute('data-active-step') || '2', 10);

    function setStep(idx) {
      if (idx === current || idx < 0 || idx >= steps.length) return;
      steps.forEach(function (s, i) {
        s.classList.toggle('is-active', i === idx);
        s.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        s.setAttribute('tabindex', i === idx ? '0' : '-1');
      });
      states.forEach(function (st, i) {
        st.classList.toggle('is-active', i === idx);
        if (i === idx) st.removeAttribute('aria-hidden');
        else st.setAttribute('aria-hidden', 'true');
      });
      if (stage) stage.setAttribute('aria-labelledby', 'inside-flow-step-' + idx);
      stepper.setAttribute('data-active-step', String(idx));
      current = idx;
    }

    steps.forEach(function (s, i) {
      s.addEventListener('click', function () { setStep(i); s.focus(); });
    });

    var tablist = stepper.querySelector('.inside-flow-stepper');
    if (tablist) {
      tablist.addEventListener('keydown', function (e) {
        var idx = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') idx = (current + 1) % steps.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') idx = (current - 1 + steps.length) % steps.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = steps.length - 1;
        else return;
        e.preventDefault();
        setStep(idx);
        if (steps[idx]) steps[idx].focus();
      });
    }
  }
})();
