// hero-sequence.js — causal animation engine for the hero scene mockup.
// 5 acts: source pills → question → 3 versions appear (cinza, amber, green) → review panel → send.
// Plays once when the scene enters viewport, then loops with a long pause.
// Respects prefers-reduced-motion (shows final state immediately, no animation).
//
// Targets every .hero-scene[data-state] in the page — supports multiple hero
// mockups (e.g., one per page) without coupling to a specific id.
(function () {
  'use strict';

  var scenes = document.querySelectorAll('.hero-scene[data-state]');
  if (!scenes.length) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    scenes.forEach(function (s) { s.setAttribute('data-state', 's5'); });
    return;
  }

  scenes.forEach(function (scene) { initScene(scene); });

  function initScene(scene) {

  // Storyboard: each entry sets a state then waits N ms before the next.
  var STORYBOARD = [
    { state: 'idle',  wait: 200  },
    { state: 's1',    wait: 600  },  // source pills in
    { state: 's2',    wait: 900  },  // question in
    { state: 's3-v1', wait: 350  },  // v1 visible
    { state: 's3-v2', wait: 350  },  // v1+v2 visible
    { state: 's3',    wait: 900  },  // v3 confirmed + source-line
    { state: 's4',    wait: 800  },  // review panel
    { state: 's5',    wait: 6000  } // send button + pause before loop
  ];

  var timer = null;
  var stopped = false;

  function wait(ms) {
    return new Promise(function (resolve) {
      timer = setTimeout(resolve, ms);
    });
  }

  function runOnce() {
    var i = 0;
    function step() {
      if (stopped) return Promise.resolve();
      if (i >= STORYBOARD.length) return Promise.resolve();
      var s = STORYBOARD[i++];
      scene.setAttribute('data-state', s.state);
      return wait(s.wait).then(step);
    }
    return step();
  }

  // Start only when scene enters viewport once. Plays the storyboard a single
  // time and freezes on s5 — brief explicitly forbids loops competing with
  // the rest of the page.
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        observer.disconnect();
        scene.setAttribute('data-state', 'idle');
        runOnce();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(scene);

  // If the page is hidden mid-sequence, stop the pending timer; the user
  // gets the final state instantly when they come back.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && timer) {
      clearTimeout(timer);
      timer = null;
      stopped = true;
      scene.setAttribute('data-state', 's5');
    }
  });
  }
})();
