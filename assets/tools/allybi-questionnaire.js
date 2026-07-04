/**
 * allybi-questionnaire.js
 *
 * Quiz controller for /tempo-questionario.html and /diagnostico-questionario.html.
 *
 * Reads questions, validation rules and bands from window.AllybiToolsData
 * (the §10/§11/§33/§50 single source of truth).
 *
 * Renders one question per screen inside the .questionnaire-shell skeleton
 * defined in allybi-tools.css. Persists progress in localStorage per spec §9.
 * On the final question, computes the result via the data module, persists the
 * derived result, and navigates to the corresponding result page.
 *
 * Init contract:
 *   <div id="allybi-questionnaire"
 *        data-quiz="time"                  // "time" or "flow"
 *        data-result-href="/tempo-resultado.html"></div>
 *
 * Spec sections honored: §8, §9, §13, §15, §17-23, §32-33, §49-50, §74, §76, §84.
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.getElementById('allybi-questionnaire');
    if (!mount) return;

    var Data = window.AllybiToolsData;
    if (!Data) {
      console.error('allybi-questionnaire: AllybiToolsData missing.');
      return;
    }

    var kind = mount.getAttribute('data-quiz'); // "time" | "flow"
    var resultHref = mount.getAttribute('data-result-href') || '/';
    var landingHref = mount.getAttribute('data-landing-href') || '/';

    var QUESTIONS = kind === 'time' ? Data.CALCULATOR_QUESTIONS : Data.DIAGNOSTIC_QUESTIONS;
    var QUIZ_KEY = kind === 'time' ? Data.STORAGE_KEYS.timeQuiz : Data.STORAGE_KEYS.flowQuiz;
    var RESULT_KEY = kind === 'time' ? Data.STORAGE_KEYS.timeResult : Data.STORAGE_KEYS.flowResult;
    var calculate = kind === 'time' ? Data.calculateTime : Data.calculateDiagnostic;
    var ctaFinalLabel = kind === 'time' ? 'Ver meu resultado' : 'Ver meu diagnóstico';
    var ctaIntermediateLabel = 'Continuar';
    var brandLabel = kind === 'time' ? 'Calculadora do Tempo Perdido' : 'Diagnóstico do Fluxo';

    var TOTAL = QUESTIONS.length;

    // ─── State ─────────────────────────────────────────────────────────
    var state = readState();
    if (location.search.indexOf('restart=1') !== -1) {
      try { localStorage.removeItem(QUIZ_KEY); } catch (e) {}
      state = freshState();
      history.replaceState({}, '', location.pathname);
    }

    // ─── Build DOM ────────────────────────────────────────────────────
    var shell = document.createElement('div');
    shell.className = 'questionnaire-shell';
    shell.innerHTML =
      '<header class="questionnaire-header">' +
        '<a class="questionnaire-brand" href="' + landingHref + '">' +
          '<img src="assets/images/allybi-logo.svg" alt="Allybi">' +
          '<h1 style="font-size:13px;font-weight:700;letter-spacing:-.005em;margin:0;color:#181818">' + brandLabel + '</h1>' +
        '</a>' +
        '<a class="questionnaire-exit" href="' + landingHref + '">Sair</a>' +
      '</header>' +
      '<div class="questionnaire-progress">' +
        '<div class="questionnaire-progress-top">' +
          '<span class="questionnaire-progress-step"></span>' +
          '<span class="questionnaire-progress-remaining"></span>' +
        '</div>' +
        '<div class="questionnaire-progress-bar"><div class="questionnaire-progress-fill"></div></div>' +
      '</div>' +
      '<main class="questionnaire-main">' +
        '<div class="questionnaire-frame" tabindex="-1"></div>' +
      '</main>' +
      '<footer class="questionnaire-footer">' +
        '<div class="questionnaire-footer-inner">' +
          '<button type="button" class="questionnaire-back">Voltar</button>' +
          '<span class="questionnaire-footer-hint">Use Tab para navegar e Enter para continuar.</span>' +
          '<button type="button" class="questionnaire-continue" disabled>Continuar</button>' +
        '</div>' +
      '</footer>';

    mount.replaceWith(shell);
    document.documentElement.classList.add('questionnaire-html');
    document.body.classList.add('questionnaire-body');

    var elStep = shell.querySelector('.questionnaire-progress-step');
    var elRemaining = shell.querySelector('.questionnaire-progress-remaining');
    var elFill = shell.querySelector('.questionnaire-progress-fill');
    var elFrame = shell.querySelector('.questionnaire-frame');
    var elBack = shell.querySelector('.questionnaire-back');
    var elContinue = shell.querySelector('.questionnaire-continue');
    var elExit = shell.querySelector('.questionnaire-exit');

    // History sync
    history.replaceState({ step: state.currentStep }, '');

    // ─── Event listeners ───────────────────────────────────────────────
    elBack.addEventListener('click', function () { go(state.currentStep - 1, true); });
    elContinue.addEventListener('click', onContinue);
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('popstate', function (e) {
      var s = (e.state && typeof e.state.step === 'number') ? e.state.step : 0;
      if (s !== state.currentStep) {
        state.currentStep = clamp(s, 0, TOTAL - 1);
        render(state.currentStep > s ? 'back' : 'forward', /*pushHistory*/ false);
      }
    });

    // Initial render
    render('forward', false);

    // ─── Functions ─────────────────────────────────────────────────────
    function freshState() {
      var now = Date.now();
      return {
        version: 2,
        calculationVersion: Data.VERSION,
        startedAt: now,
        updatedAt: now,
        currentStep: 0,
        answers: {}
      };
    }

    function readState() {
      try {
        var raw = localStorage.getItem(QUIZ_KEY);
        if (!raw) return freshState();
        var s = JSON.parse(raw);
        if (!s || s.version !== 2) return freshState();
        if (Date.now() - (s.updatedAt || 0) > Data.QUIZ_EXPIRY_MS) {
          localStorage.removeItem(QUIZ_KEY);
          return freshState();
        }
        if (typeof s.currentStep !== 'number' || s.currentStep < 0 || s.currentStep > TOTAL - 1) {
          s.currentStep = 0;
        }
        if (!s.answers || typeof s.answers !== 'object') s.answers = {};
        return s;
      } catch (e) { return freshState(); }
    }

    function writeState() {
      state.updatedAt = Date.now();
      try { localStorage.setItem(QUIZ_KEY, JSON.stringify(state)); } catch (e) {}
    }

    function render(direction, pushHistory) {
      var step = state.currentStep;
      var q = QUESTIONS[step];
      if (!q) return;

      // Progress
      elStep.textContent = (step + 1) + ' de ' + TOTAL;
      elRemaining.textContent = step === 0
        ? 'menos de 1 minuto'
        : (TOTAL - step) + (TOTAL - step === 1 ? ' pergunta restante' : ' perguntas restantes');
      elFill.style.width = ((step + 1) / TOTAL * 100) + '%';

      // Back visibility (first question: hidden, keep space desktop)
      if (step === 0) elBack.setAttribute('hidden', '');
      else elBack.removeAttribute('hidden');

      // Continue label
      elContinue.textContent = step === TOTAL - 1 ? ctaFinalLabel : ctaIntermediateLabel;

      // Build question
      var current = state.answers[q.id];
      var html =
        '<fieldset class="questionnaire-fieldset">' +
          '<legend class="questionnaire-legend" tabindex="-1">' + esc(q.question) + '</legend>' +
          (q.helper ? '<p class="questionnaire-helper">' + esc(q.helper) + '</p>' : '') +
          buildOptionsHtml(q, current) +
          '<p class="questionnaire-error" role="alert" aria-live="polite"></p>' +
        '</fieldset>';

      elFrame.innerHTML = html;
      elFrame.classList.remove('is-exit', 'is-enter', 'is-enter-back');
      // Trigger enter animation
      requestAnimationFrame(function () {
        elFrame.classList.add(direction === 'back' ? 'is-enter-back' : 'is-enter');
      });

      // Focus legend (§76)
      var legend = elFrame.querySelector('.questionnaire-legend');
      if (legend) try { legend.focus(); } catch (e) {}

      // Bind option events
      bindOptions(q);

      updateContinueState();

      if (pushHistory) history.pushState({ step: step }, '');
    }

    function buildOptionsHtml(q, current) {
      var isMulti = q.type === 'multi';
      var selectedSet = isMulti ? new Set(current || []) : new Set();
      var cls = 'questionnaire-options ' + (isMulti ? 'questionnaire-options--multi' : 'questionnaire-options--single');
      var out = '<div class="' + cls + '" role="' + (isMulti ? 'group' : 'radiogroup') + '">';

      q.options.forEach(function (opt, idx) {
        var isSelected = isMulti ? selectedSet.has(opt.value) : current === opt.value;
        var inputType = isMulti ? 'checkbox' : 'radio';
        var optClass = 'q-option ' + (isMulti ? 'q-option--multi' : 'q-option--single') +
          (isSelected ? ' is-selected' : '');
        out += '<label class="' + optClass + '" data-value="' + esc(opt.value) + '" data-exclusive="' + (opt.exclusive ? '1' : '0') + '" data-index="' + (idx + 1) + '">' +
                 '<input type="' + inputType + '" name="' + q.id + '" value="' + esc(opt.value) + '"' + (isSelected ? ' checked' : '') + '>' +
                 '<span class="q-option-mark"></span>' +
                 '<span class="q-option-text">' + esc(opt.label) + '</span>' +
               '</label>';
      });
      out += '</div>';
      return out;
    }

    function bindOptions(q) {
      var labels = elFrame.querySelectorAll('.q-option');
      labels.forEach(function (label) {
        label.addEventListener('click', function (e) {
          // Prevent the default label/input double-fire that would toggle twice
          if (e.target.tagName === 'INPUT') return;
          e.preventDefault();
          toggleOption(q, label);
        });
        var input = label.querySelector('input');
        input.addEventListener('change', function () {
          toggleOption(q, label, /*fromInput*/ true);
        });
      });
    }

    function toggleOption(q, label, fromInput) {
      var value = label.getAttribute('data-value');
      var exclusive = label.getAttribute('data-exclusive') === '1';

      if (q.type === 'multi') {
        var current = Array.isArray(state.answers[q.id]) ? state.answers[q.id].slice() : [];
        var has = current.indexOf(value) !== -1;

        if (exclusive) {
          state.answers[q.id] = has ? [] : [value];
        } else {
          if (has) {
            current.splice(current.indexOf(value), 1);
          } else {
            current.push(value);
            // Remove any exclusive option already selected
            q.options.forEach(function (opt) {
              if (opt.exclusive) {
                var i = current.indexOf(opt.value);
                if (i !== -1) current.splice(i, 1);
              }
            });
          }
          state.answers[q.id] = current;
        }
      } else {
        state.answers[q.id] = value;
      }

      writeState();
      reflectSelection(q);
      updateContinueState();
      clearError();
    }

    function reflectSelection(q) {
      var current = state.answers[q.id];
      var labels = elFrame.querySelectorAll('.q-option');
      labels.forEach(function (label) {
        var input = label.querySelector('input');
        var value = label.getAttribute('data-value');
        var sel = q.type === 'multi'
          ? Array.isArray(current) && current.indexOf(value) !== -1
          : current === value;
        label.classList.toggle('is-selected', !!sel);
        input.checked = !!sel;
      });
    }

    function isAnswered(q) {
      var a = state.answers[q.id];
      if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
      return typeof a === 'string' && a.length > 0;
    }

    function updateContinueState() {
      var ok = isAnswered(QUESTIONS[state.currentStep]);
      elContinue.disabled = !ok;
    }

    function onContinue() {
      var q = QUESTIONS[state.currentStep];
      if (!isAnswered(q)) {
        showError(q.type === 'multi'
          ? 'Escolha pelo menos uma opção para continuar.'
          : 'Escolha uma opção para continuar.');
        return;
      }
      if (state.currentStep < TOTAL - 1) {
        go(state.currentStep + 1, false);
      } else {
        finish();
      }
    }

    function go(targetStep, isBack) {
      var step = clamp(targetStep, 0, TOTAL - 1);
      // Animation: exit, then re-render
      elFrame.classList.remove('is-enter', 'is-enter-back');
      elFrame.classList.add('is-exit');
      var dir = isBack ? 'back' : 'forward';
      setTimeout(function () {
        state.currentStep = step;
        writeState();
        render(dir, /*pushHistory*/ true);
      }, 130);
    }

    function finish() {
      var result;
      try {
        result = calculate(state.answers);
      } catch (e) {
        showError('Não foi possível calcular agora. Verifique as respostas e tente novamente.');
        return;
      }
      // Persist derived result (no raw answers)
      var summary = {
        version: 2,
        calculationVersion: Data.VERSION,
        savedAt: Date.now(),
        kind: kind,
        result: stripResultForStorage(result)
      };
      try { localStorage.setItem(RESULT_KEY, JSON.stringify(summary)); } catch (e) {}
      // Remove raw quiz answers (§9)
      try { localStorage.removeItem(QUIZ_KEY); } catch (e) {}
      // Build query string with derived values only (§13)
      var qs = buildResultQuery(result);
      location.href = resultHref + (qs ? ('?' + qs) : '');
    }

    function stripResultForStorage(r) {
      if (kind === 'time') {
        return {
          monthlyDisplay: r.monthlyDisplay,
          monthlyLow: r.monthlyLow,
          monthlyHigh: r.monthlyHigh,
          annualHoursDisplay: r.annualHoursDisplay,
          annualDaysDisplay: r.annualDaysDisplay,
          stageMonthlyHours: r.stageMonthlyHours,
          bottleneck: r.bottleneck,
          band: r.band
        };
      }
      return {
        score: r.score,
        stagePercents: r.stagePercents,
        bottleneck: r.bottleneck,
        bottleneckLabel: r.bottleneckLabel,
        band: r.band
      };
    }

    function buildResultQuery(r) {
      var p = new URLSearchParams();
      p.set('v', '2');
      if (kind === 'time') {
        p.set('m', r.monthlyDisplay);
        p.set('y', r.annualHoursDisplay);
        p.set('d', r.annualDaysDisplay);
        p.set('lo', r.monthlyLow);
        p.set('hi', r.monthlyHigh);
        p.set('b', r.bottleneck);
        var st = Object.keys(r.stageMonthlyHours).map(function (k) {
          return k + ':' + Math.round(r.stageMonthlyHours[k] * 100) / 100;
        }).join(',');
        p.set('st', st);
      } else {
        p.set('score', r.score);
        p.set('band', r.band.label.replace(/\s+/g, '_'));
        p.set('b', r.bottleneck);
        var st2 = Object.keys(r.stagePercents).map(function (k) {
          return k + ':' + r.stagePercents[k];
        }).join(',');
        p.set('st', st2);
      }
      return p.toString();
    }

    function showError(msg) {
      var el = elFrame.querySelector('.questionnaire-error');
      if (el) el.textContent = msg;
    }
    function clearError() {
      var el = elFrame.querySelector('.questionnaire-error');
      if (el) el.textContent = '';
    }

    function onKeydown(e) {
      var q = QUESTIONS[state.currentStep];
      if (!q) return;
      if (e.key === 'Escape') {
        try { elExit.focus(); } catch (_e) {}
        return;
      }
      // Single-select: 1..9 keys
      if (q.type === 'single' && /^[1-9]$/.test(e.key)) {
        var idx = parseInt(e.key, 10) - 1;
        var label = elFrame.querySelectorAll('.q-option')[idx];
        if (label) toggleOption(q, label);
        return;
      }
      if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // Only fire when focus is inside the frame or footer
        var t = e.target;
        var inOption = t && t.closest && t.closest('.q-option');
        if (inOption || t === elContinue) {
          if (!elContinue.disabled) {
            e.preventDefault();
            onContinue();
          }
        }
      }
    }

    function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  });
})();
