/**
 * find-gap.js
 *
 * Controller for the homepage "Achar não basta" section (#home-find-gap).
 *
 * Responsibilities (spec §§18-21, §34):
 *   - Scene state (0/1/2) driven exclusively by click / Enter / Space / Arrow / Home / End.
 *   - No autoplay, no setInterval, no scroll-jacking, no observer that changes scene.
 *   - Update aria-selected, tabindex, H2 text, body text, sr-only scene description,
 *     active SVG group on each scene change.
 *   - Animate copy out (110ms) then in (220ms) without layout shift.
 *   - Reveal section entrance once via IntersectionObserver at 25% (§21).
 *
 * Honors prefers-reduced-motion.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    var section = document.getElementById('home-find-gap');
    if (!section) return;

    // Header height for desktop min-height calc (§9 references --site-header-height)
    var header = document.querySelector('#allybi-header, .allybi-header, header');
    if (header) {
      document.documentElement.style.setProperty('--site-header-height', header.offsetHeight + 'px');
    }

    var SCENES = [
      {
        title: ['A resposta está em', 'mais de um lugar.'],
        body: 'O pedido chega. A busca passa por e-mail, anexo, pasta, OneDrive, SharePoint e upload.',
        description: 'A busca parte de seis lugares diferentes e converge para a dúvida sobre qual versão pode ser enviada.'
      },
      {
        title: ['Três arquivos', 'parecem certos.'],
        body: 'Nome parecido não confirma versão, fonte nem o que mudou.',
        description: 'Três arquivos de nomes parecidos seguem caminhos paralelos, mas nenhum está confirmado para envio.'
      },
      {
        title: ['O arquivo apareceu.', 'A certeza ainda não.'],
        body: 'Antes de enviar, ainda falta confirmar fonte, contexto, destinatário e canal.',
        description: 'O arquivo foi encontrado, mas o caminho para envio para em quatro confirmações ainda pendentes.'
      }
    ];

    var tablist = section.querySelector('[role="tablist"]');
    var tabs = section.querySelectorAll('[role="tab"]');
    var liveCopy = section.querySelector('.find-gap-live-copy');
    var h2 = document.getElementById('find-gap-title');
    var body = section.querySelector('.find-gap-body');
    var description = section.querySelector('[data-scene-description]');
    var panel = section.querySelector('.find-gap-panel');
    var sceneGroups = section.querySelectorAll('.find-gap-scene');

    var state = 0;
    var pendingTimer = null;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Autoplay state — scenes advance on a timer once the section enters the viewport.
    // User clicks/keys stop autoplay for the rest of the session; scrolling away pauses it.
    var SCENE_DURATION_MS = 2000;
    var CYCLE_MS = SCENE_DURATION_MS * SCENES.length;
    var autoplayEnabled = !prefersReduced;
    var userInteracted = false;
    var inView = false;
    var sceneTimers = [];
    var autoplayBar = section.querySelector('.find-gap-autoplay-bar');
    section.style.setProperty('--find-gap-cycle-ms', CYCLE_MS + 'ms');

    // Initialize path drawing lengths so stroke-dashoffset animation works
    initDashPaths();

    // Reveal entrance §21
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.classList.add('is-revealed');
            revealObserver.unobserve(section);
          }
        });
      }, { threshold: 0.05 });
      revealObserver.observe(section);

      // Autoplay observer — start when section is on screen, pause when it scrolls away.
      var autoplayObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = entry.isIntersecting;
          if (inView) startAutoplay();
          else pauseAutoplay();
        });
      }, { threshold: 0.05 });
      autoplayObserver.observe(section);
    } else {
      section.classList.add('is-revealed');
      inView = true;
      startAutoplay();
    }

    // Pause autoplay when the tab is hidden so the cycle stays in sync with what's seen.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pauseAutoplay();
      else if (inView) startAutoplay();
    });

    // Wire events
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        stopAutoplay();
        var idx = parseInt(tab.getAttribute('data-scene'), 10);
        if (!isNaN(idx)) selectScene(idx);
      });
      tab.addEventListener('keydown', onKeydown);
    });

    function onKeydown(e) {
      var key = e.key;
      var handled = true;
      if (key === 'ArrowRight') { selectScene(Math.min(state + 1, SCENES.length - 1)); }
      else if (key === 'ArrowLeft') { selectScene(Math.max(state - 1, 0)); }
      else if (key === 'Home') { selectScene(0); }
      else if (key === 'End') { selectScene(SCENES.length - 1); }
      else if (key === 'Enter' || key === ' ') {
        var idx = parseInt(e.currentTarget.getAttribute('data-scene'), 10);
        if (!isNaN(idx)) selectScene(idx);
      } else {
        handled = false;
      }
      if (handled) { e.preventDefault(); stopAutoplay(); }
    }

    function startAutoplay() {
      if (!autoplayEnabled || userInteracted) return;
      if (sceneTimers.length) return; // already running
      section.setAttribute('data-autoplay', 'active');
      restartProgressAnimation();
      scheduleCycle();
    }

    function pauseAutoplay() {
      clearSceneTimers();
      section.removeAttribute('data-autoplay');
    }

    function stopAutoplay() {
      userInteracted = true;
      autoplayEnabled = false;
      pauseAutoplay();
    }

    function clearSceneTimers() {
      sceneTimers.forEach(clearTimeout);
      sceneTimers = [];
    }

    function scheduleCycle() {
      // Snap to scene 0 so the bar and copy stay in sync on resume.
      if (state !== 0) applySceneImmediate(0);
      for (var i = 1; i < SCENES.length; i++) {
        sceneTimers.push(setTimeout(advanceTo.bind(null, i), SCENE_DURATION_MS * i));
      }
      sceneTimers.push(setTimeout(function () {
        if (!autoplayEnabled || userInteracted) return;
        sceneTimers = [];
        restartProgressAnimation();
        scheduleCycle();
      }, CYCLE_MS));
    }

    function advanceTo(idx) {
      if (!autoplayEnabled || userInteracted) return;
      selectScene(idx, true);
    }

    function restartProgressAnimation() {
      if (!autoplayBar) return;
      autoplayBar.style.animation = 'none';
      // Force reflow so the animation restarts cleanly each cycle.
      void autoplayBar.offsetWidth;
      autoplayBar.style.animation = '';
    }

    function applySceneImmediate(idx) {
      state = idx;
      tabs.forEach(function (t, i) {
        var active = i === idx;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      if (panel) panel.setAttribute('aria-labelledby', 'find-gap-tab-' + idx);
      sceneGroups.forEach(function (g) {
        var sceneIdx = parseInt(g.getAttribute('data-scene'), 10);
        if (sceneIdx === idx) g.setAttribute('data-active', 'true');
        else g.removeAttribute('data-active');
      });
      applyCopy(idx);
    }

    function selectScene(idx, fromAutoplay) {
      if (idx === state) {
        if (!fromAutoplay) focusTab(idx);
        return;
      }
      state = idx;

      // ARIA + tabindex
      tabs.forEach(function (t, i) {
        var active = i === idx;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      if (panel) panel.setAttribute('aria-labelledby', 'find-gap-tab-' + idx);

      // SVG scene visibility (data-active triggers CSS opacity + animation)
      sceneGroups.forEach(function (g) {
        var sceneIdx = parseInt(g.getAttribute('data-scene'), 10);
        if (sceneIdx === idx) {
          g.setAttribute('data-active', 'true');
        } else {
          g.removeAttribute('data-active');
        }
      });

      // Copy exit → swap → enter
      if (pendingTimer) {
        clearTimeout(pendingTimer);
        pendingTimer = null;
        liveCopy.classList.remove('is-out', 'is-in');
      }

      if (prefersReduced) {
        // Instant swap, no animation
        applyCopy(idx);
      } else {
        liveCopy.classList.remove('is-in');
        // Force reflow so transition takes effect when re-adding
        // eslint-disable-next-line no-unused-expressions
        liveCopy.offsetWidth;
        liveCopy.classList.add('is-out');
        pendingTimer = setTimeout(function () {
          applyCopy(idx);
          liveCopy.classList.remove('is-out');
          liveCopy.classList.add('is-in');
          pendingTimer = setTimeout(function () {
            liveCopy.classList.remove('is-in');
            pendingTimer = null;
          }, 230);
        }, 110);
      }

      if (!fromAutoplay) focusTab(idx);
    }

    function applyCopy(idx) {
      var scene = SCENES[idx];
      // Update H2 spans
      var spans = h2.querySelectorAll('span');
      if (spans.length === 2) {
        spans[0].textContent = scene.title[0];
        spans[1].textContent = scene.title[1];
      }
      body.textContent = scene.body;
      if (description) description.textContent = scene.description;
    }

    function focusTab(idx) {
      try { tabs[idx].focus({ preventScroll: true }); } catch (_e) {}
    }

    function initDashPaths() {
      // For each path that has the draw animation, compute path length, set
      // stroke-dasharray + initial dashoffset via CSS variable.
      var animatedPaths = section.querySelectorAll(
        '.fg-primary-path, .fg-context-path, .fg-warning-path, .fg-warning-arc, .fg-stop-line'
      );
      animatedPaths.forEach(function (p) {
        try {
          var len = (typeof p.getTotalLength === 'function') ? p.getTotalLength() : 0;
          if (len > 0) {
            p.style.strokeDasharray = len;
            p.style.setProperty('--find-gap-len', len);
          }
        } catch (e) { /* ignore */ }
      });
    }
  });
})();
