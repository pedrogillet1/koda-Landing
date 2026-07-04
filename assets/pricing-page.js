/**
 * /pricing.html - controllers
 *
 *  ▸ Path stepper (desktop): 5 user-controlled steps. Click + Enter/Space +
 *    ArrowUp/Down + Home/End. Initial active = index 2 ("Confirme"). No
 *    autoplay. No setInterval. No timer. No carousel. No swipe.
 *
 *  ▸ Included accordion (mobile): one item at a time may be open. First item
 *    is open by default.
 *
 *  ▸ FAQ accordion: 8 questions, single-open. All closed by default.
 *
 *  ▸ Page reveal: IntersectionObserver one-shot on the #pricing-page root.
 *
 *  Honors prefers-reduced-motion.
 */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.getElementById('pricing-page');
  if (!root) return;

  // ─────────────── Reveal ───────────────
  if (prefersReduced || !('IntersectionObserver' in window)) {
    root.classList.add('is-revealed');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          root.classList.add('is-revealed');
          io.disconnect();
        }
      });
    }, { threshold: 0.05 });
    io.observe(root);
  }

  // ─────────────── Path stepper ───────────────
  initStepper();
  function initStepper() {
    var stepper = root.querySelector('.pricing-path-desktop');
    if (!stepper) return;
    var steps = stepper.querySelectorAll('.pricing-path-step');
    var stage = stepper.querySelector('.pricing-path-stage');
    var current = parseInt(stepper.getAttribute('data-active-step') || '0', 10);

    function setStep(idx) {
      if (idx === current || idx < 0 || idx >= steps.length) return;
      steps.forEach(function (s, i) {
        s.classList.toggle('is-active', i === idx);
        s.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        s.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
        s.setAttribute('tabindex', i === idx ? '0' : '-1');
      });
      if (stage) stage.setAttribute('aria-labelledby', 'pricing-step-' + idx);

      // Stage swap is driven by CSS via stepper[data-active-step]; the JS
      // just flips the attribute. CSS owns the 110ms / 220ms timings per spec §17.
      stepper.setAttribute('data-active-step', String(idx));
      current = idx;
    }

    steps.forEach(function (s, i) {
      s.addEventListener('click', function () { setStep(i); s.focus(); });
    });

    var tablist = stepper.querySelector('.pricing-path-stepper');
    if (tablist) {
      tablist.addEventListener('keydown', function (e) {
        var idx = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') idx = (current + 1) % steps.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') idx = (current - 1 + steps.length) % steps.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = steps.length - 1;
        else if (e.key === 'Enter' || e.key === ' ') {
          // Already focused step - let click handler take it
          return;
        } else return;
        e.preventDefault();
        setStep(idx);
        if (steps[idx]) steps[idx].focus();
      });
    }

    // ─────────────── Scroll-pinned "release & exit" (desktop) ───────────────
    // Same mechanism as the homepage flow: scrolling DOWN pins the card and maps
    // scroll progress → step; scrolling UP releases the pin immediately by
    // skipping the remaining pin distance (jump to the top of the track) so the
    // section scrolls away instead of stepping backwards. The card is visually
    // identical across the jump (pinned in both positions), so there's no flicker.
    var scrolltrack = stepper.closest('[data-plan-scrolltrack]');
    if (scrolltrack) {
      var desktopMql = window.matchMedia('(min-width: 1100px)');
      var reducedMql = window.matchMedia('(prefers-reduced-motion: reduce)');
      var scrollytellingActive = function () {
        return desktopMql.matches && !reducedMql.matches;
      };
      var rafId = null;
      var lastScrollY = window.pageYOffset;
      var released = false;
      var onScroll = function () {
        if (rafId) return;
        rafId = window.requestAnimationFrame(function () {
          rafId = null;
          if (!scrollytellingActive()) { released = false; lastScrollY = window.pageYOffset; return; }
          var y = window.pageYOffset;
          var goingUp = y < lastScrollY - 0.5;
          var goingDown = y > lastScrollY + 0.5;
          var rect = scrolltrack.getBoundingClientRect();
          var vh = window.innerHeight;
          var headerH = parseFloat(getComputedStyle(stepper).top) || 64;
          var trackTopAbs = y + rect.top;
          var pinned = rect.top <= headerH + 2 && rect.bottom > vh + 2;

          if (goingDown && released) released = false;

          if (goingUp && !released && pinned) {
            released = true;
            if (y > trackTopAbs + 4) {
              window.scrollTo(0, trackTopAbs);
              lastScrollY = trackTopAbs;
              return;
            }
          }

          if (!released) {
            var scrollable = scrolltrack.offsetHeight - vh;
            if (scrollable > 0) {
              var progress = Math.max(0, Math.min(1, -rect.top / scrollable));
              var stepIdx = Math.min(steps.length - 1, Math.floor(progress * steps.length));
              if (stepIdx !== current) setStep(stepIdx);
            }
          }
          lastScrollY = y;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    }
  }

  // ─────────────── Included accordion (mobile only) ───────────────
  var includedAcc = root.querySelector('.pricing-included-accordion');
  if (includedAcc) {
    var triggers = includedAcc.querySelectorAll('.pricing-included-acc-trigger');
    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        var open = t.getAttribute('aria-expanded') === 'true';
        triggers.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
        });
        if (!open) t.setAttribute('aria-expanded', 'true');
      });
    });
  }

  // ─────────────── FAQ accordion (single-open) ───────────────
  var faqList = root.querySelector('.pricing-faq-list');
  if (faqList) {
    var faqTriggers = faqList.querySelectorAll('.pricing-faq-trigger');
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

  // ─────────────── Proximity preloader for the 5 plan-flow shots ───────────────
  // When #plano-caminho-inteiro is within 700px of the viewport, preload the
  // five images for the active breakpoint only (matchMedia decides which).
  // Per spec §25 / §30: no global preload, only one breakpoint set is fetched.
  var planFlowSection = document.getElementById('plano-caminho-inteiro');
  if (planFlowSection && 'IntersectionObserver' in window) {
    var preloaded = false;
    var preloader = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !preloaded) {
          preloaded = true;
          var isMobile = window.matchMedia('(max-width: 767px)').matches;
          var suffix = isMobile ? 'mobile' : 'desktop';
          var names = ['01-connect', '02-question', '03-confirm', '04-review', '05-send'];
          names.forEach(function (n) {
            var img = new Image();
            img.src = '/assets/landing-shots/plan-flow/' + n + '-' + suffix + '.png?v=plan-flow-1';
          });
          preloader.unobserve(planFlowSection);
        }
      });
    }, { rootMargin: '700px 0px' });
    preloader.observe(planFlowSection);
  }
})();
