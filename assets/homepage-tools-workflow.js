/**
 * homepage-tools-workflow.js
 *
 * Controllers for the new homepage product-images integration:
 *  - Flow showcase (5 states, user-controlled, no autoplay) - §§12, 13
 *  - Use-case showcase (3 tabs, user-controlled, no autoplay) - §18
 *  - Proximity preload (§26): when a flow / use-cases section is within ~700px
 *    of the viewport, preload the assets for the active breakpoint.
 *  - Reveal of system blocks (§30).
 *  - Also reveals the legacy .measure-section once it intersects (preserves
 *    the prior tools-paths reveal behavior).
 *
 * No autoplay, no setInterval, no carousel. Honors prefers-reduced-motion.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    initShowcase({
      root: document.querySelector('[data-flow-showcase]'),
      controls: '.flow-control',
      shots: '.flow-stage__shot',
      stage: '#flow-stage',
      assetsDesktop: [
        '/assets/landing-shots/flow/flow-01-pedido-desktop.png',
        '/assets/landing-shots/flow/flow-02-pergunta-desktop.png',
        '/assets/landing-shots/flow/flow-03-resposta-desktop.png',
        '/assets/landing-shots/flow/flow-04-revisao-desktop.png',
        '/assets/landing-shots/flow/flow-05-envio-desktop.png'
      ],
      assetsMobile: [
        '/assets/landing-shots/flow/flow-01-pedido-mobile.png',
        '/assets/landing-shots/flow/flow-02-pergunta-mobile.png',
        '/assets/landing-shots/flow/flow-03-resposta-mobile.png',
        '/assets/landing-shots/flow/flow-04-revisao-mobile.png',
        '/assets/landing-shots/flow/flow-05-envio-mobile.png'
      ]
    });

    initShowcase({
      root: document.querySelector('[data-usecase-showcase]'),
      controls: '.usecase-control',
      shots: '.usecase-stage__shot',
      copies: '.usecase-copy',
      stage: '#usecase-stage',
      assetsDesktop: [
        '/assets/landing-shots/use-cases/usecase-legal-desktop.png',
        '/assets/landing-shots/use-cases/usecase-finance-desktop.png',
        '/assets/landing-shots/use-cases/usecase-operations-desktop.png'
      ],
      assetsMobile: [
        '/assets/landing-shots/use-cases/usecase-legal-mobile.png',
        '/assets/landing-shots/use-cases/usecase-finance-mobile.png',
        '/assets/landing-shots/use-cases/usecase-operations-mobile.png'
      ]
    });

    // Reveal system blocks (Outlook + WhatsApp editorial pair) §30
    var systemBlocks = document.querySelectorAll('.integration-system-block');
    if (systemBlocks.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });
      systemBlocks.forEach(function (b) { io.observe(b); });
    } else {
      systemBlocks.forEach(function (b) { b.classList.add('is-revealed'); });
    }

    // Legacy: reveal .measure-section once intersecting (preserves prior animation)
    var measure = document.querySelector('.measure-section');
    if (measure && 'IntersectionObserver' in window) {
      var mo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            mo.unobserve(e.target);
          }
        });
      }, { threshold: 0.05 });
      mo.observe(measure);
    } else if (measure) {
      measure.classList.add('is-revealed');
    }
  });

  function initShowcase(cfg) {
    if (!cfg.root) return;
    var controls = cfg.root.querySelectorAll(cfg.controls);
    if (!controls.length) return;
    var shots = cfg.root.querySelectorAll(cfg.shots);
    var copies = cfg.copies ? cfg.root.querySelectorAll(cfg.copies) : null;
    var stage = cfg.stage ? document.querySelector(cfg.stage) : null;
    var current = 0;

    // Scrollytelling: if the showcase is wrapped in a [data-flow-scrolltrack],
    // scroll position inside that track drives the active step on desktop.
    var scrolltrack = cfg.root.closest('[data-flow-scrolltrack]');
    var desktopMql = window.matchMedia('(min-width: 1100px)');
    var reducedMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    function scrollytellingActive() {
      return !!scrolltrack && desktopMql.matches && !reducedMql.matches;
    }

    controls.forEach(function (c, idx) {
      c.addEventListener('click', function () {
        if (!scrollToStep(idx)) select(idx);
      });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!scrollToStep(idx)) select(idx); return; }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          var next = Math.min(current + 1, controls.length - 1);
          if (!scrollToStep(next)) select(next);
          return;
        }
        if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  {
          e.preventDefault();
          var prev = Math.max(current - 1, 0);
          if (!scrollToStep(prev)) select(prev);
          return;
        }
        if (e.key === 'Home') { e.preventDefault(); if (!scrollToStep(0)) select(0); return; }
        if (e.key === 'End')  { e.preventDefault(); var last = controls.length - 1; if (!scrollToStep(last)) select(last); return; }
      });
    });

    if (scrolltrack) {
      var rafId = null;
      // Release-and-exit pin: scrolling DOWN pins the card and steps through the
      // phases (track progress → step). Scrolling UP releases the pin immediately
      // — instead of re-stepping backwards through every phase, we skip the
      // remaining pin distance by jumping to the top of the track, so the card
      // scrolls up and out within one screen. The card stays visually identical
      // across the jump (it's pinned in both positions), so there is no flicker.
      var lastScrollY = window.pageYOffset;
      var released = false;
      function onScroll() {
        if (rafId) return;
        rafId = window.requestAnimationFrame(function () {
          rafId = null;
          if (!scrollytellingActive()) { released = false; lastScrollY = window.pageYOffset; return; }
          var y = window.pageYOffset;
          var goingUp = y < lastScrollY - 0.5;
          var goingDown = y > lastScrollY + 0.5;
          var rect = scrolltrack.getBoundingClientRect();
          var vh = window.innerHeight;
          var headerH = parseFloat(getComputedStyle(cfg.root).top) || 64;
          var trackTopAbs = y + rect.top;
          var pinned = rect.top <= headerH + 2 && rect.bottom > vh + 2;

          // Re-arm the down-pin as soon as the user scrolls down again.
          if (goingDown && released) released = false;

          // On upward scroll while pinned: release and skip the remaining pin
          // distance so the section scrolls away instead of stepping backwards.
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
              var n = controls.length;
              var stepIdx = Math.min(n - 1, Math.floor(progress * n));
              if (stepIdx !== current) select(stepIdx, true);
            }
          }
          lastScrollY = y;
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      // Sync once on init in case the page loads scrolled into the section.
      onScroll();
    }

    function scrollToStep(idx) {
      if (!scrollytellingActive()) return false;
      var rect = scrolltrack.getBoundingClientRect();
      var trackTopAbs = window.pageYOffset + rect.top;
      var vh = window.innerHeight;
      var scrollable = scrolltrack.offsetHeight - vh;
      if (scrollable <= 0) return false;
      var targetProgress = (idx + 0.5) / controls.length;
      var targetY = trackTopAbs + targetProgress * scrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return true;
    }

    function select(idx, fromScroll) {
      if (idx === current) { if (!fromScroll) focusControl(idx); return; }
      current = idx;
      controls.forEach(function (c, i) {
        var on = i === idx;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', on ? 'true' : 'false');
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
        c.setAttribute('tabindex', on ? '0' : '-1');
      });
      shots.forEach(function (s, i) {
        if (i === idx) s.setAttribute('data-active', 'true');
        else s.removeAttribute('data-active');
      });
      if (copies) {
        copies.forEach(function (cp, i) { cp.classList.toggle('is-active', i === idx); });
      }
      if (stage) stage.setAttribute('aria-labelledby', controls[idx].id);
      if (!fromScroll) focusControl(idx);
    }
    function focusControl(idx) {
      try { controls[idx].focus({ preventScroll: true }); } catch (_e) {}
    }

    if ('IntersectionObserver' in window && cfg.assetsDesktop) {
      var preloaded = false;
      var preloadObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !preloaded) {
            preloaded = true;
            var isMobile = window.matchMedia('(max-width: 767px)').matches;
            var urls = isMobile ? cfg.assetsMobile : cfg.assetsDesktop;
            urls.forEach(function (u) { var img = new Image(); img.src = u; });
            preloadObserver.unobserve(cfg.root);
          }
        });
      }, { rootMargin: '700px 0px' });
      preloadObserver.observe(cfg.root);
    }
  }
})();
