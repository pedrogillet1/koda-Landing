/**
 * Allybi Tools — Shared questionnaire engine
 * Used by /tempo-questionario.html and /diagnostico-questionario.html
 *
 * Each page provides a global `window.QUIZ_CONFIG` with:
 *   {
 *     storageKey: 'allybi_tempo_answers' | 'allybi_diag_answers',
 *     resultUrl: 'tempo-resultado.html' | 'diagnostico-resultado.html',
 *     totalLabel: '1 de 5' template,
 *     questions: [
 *       { id: 'q1', type: 'single'|'multi', q: '...', hint?, mobile2Col?: bool, microExtra?: '...',
 *         opts: [{label, mobileLabel?}, ...] },
 *       ...
 *     ],
 *     loading: {
 *       title: 'Calculando…',
 *       steps: ['Somando busca', 'Separando confirmação', 'Identificando gargalo'],
 *       // OR for diagnostic:
 *       nodes: ['Pedido', 'Busca', 'Versão', 'Fonte', 'Confirmação', 'Envio'],
 *       gargaloIndex: 3, // index to pulse at end
 *     }
 *   }
 */
(function() {
  'use strict';

  var cfg = window.QUIZ_CONFIG;
  if (!cfg) return;

  var Q = cfg.questions;
  var TOTAL = Q.length;
  var current = 0;
  var answers = new Array(TOTAL).fill(null);

  // Try to restore in-progress state from sessionStorage (same-session resume)
  try {
    var saved = sessionStorage.getItem(cfg.storageKey + '_progress');
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed.answers && Array.isArray(parsed.answers) && parsed.answers.length === TOTAL) {
        answers = parsed.answers;
        current = Math.min(parsed.current || 0, TOTAL - 1);
      }
    }
  } catch (e) { /* ignore */ }

  var elProgress = document.getElementById('quiz-progress-label');
  var elFill = document.getElementById('quiz-progress-fill');
  var elBody = document.getElementById('quiz-body');
  var elMain = document.getElementById('quiz-main');
  var elLoading = document.getElementById('quiz-loading');

  function isMobile() {
    return window.matchMedia('(max-width: 600px)').matches;
  }

  function persistProgress() {
    try {
      sessionStorage.setItem(cfg.storageKey + '_progress', JSON.stringify({ answers: answers, current: current }));
    } catch (e) {}
  }

  function persistFinal() {
    try {
      // Persist with both session (next-page handoff) AND localStorage (reload-safe)
      var payload = JSON.stringify(answers);
      sessionStorage.setItem(cfg.storageKey, payload);
      localStorage.setItem(cfg.storageKey, payload);
    } catch (e) {}
  }

  function hasAnswer() {
    var a = answers[current];
    return a !== null && (Array.isArray(a) ? a.length > 0 : true);
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function render() {
    window.scrollTo(0, 0);
    var q = Q[current];
    var isMulti = q.type === 'multi';
    var labelText = (current + 1) + ' de ' + TOTAL;
    if (elProgress) {
      elProgress.textContent = labelText;
      elProgress.setAttribute('aria-label', 'Pergunta ' + (current + 1) + ' de ' + TOTAL + '. Leva menos de 1 minuto.');
    }
    if (elFill) elFill.style.width = ((current + 1) / TOTAL * 100) + '%';

    var html = '';
    html += '<h2 class="quiz-question" id="quiz-question" aria-live="polite">' + escHtml(q.q) + '</h2>';
    if (q.hint) html += '<p class="quiz-hint">' + escHtml(q.hint) + '</p>';

    var optsClass = 'quiz-options';
    if (isMulti && q.mobile2Col && isMobile()) optsClass += ' quiz-options--multi-2col';
    if (isMulti && q.desktop2Col && !isMobile()) optsClass += ' quiz-options--multi-2col';
    html += '<div class="' + optsClass + '" id="quiz-opts" role="' + (isMulti ? 'group' : 'radiogroup') + '" aria-labelledby="quiz-question">';
    q.opts.forEach(function(opt, i) {
      var label = (isMobile() && opt.mobileLabel) ? opt.mobileLabel : opt.label;
      var sel = isMulti ? (answers[current] && answers[current].indexOf(i) > -1) : (answers[current] === i);
      var ariaAttr = isMulti
        ? 'role="checkbox" aria-pressed="' + (sel ? 'true' : 'false') + '"'
        : 'role="radio" aria-checked="' + (sel ? 'true' : 'false') + '"';
      var modifier = isMulti ? 'quiz-option--multi' : 'quiz-option--single';
      html += '<button type="button" class="quiz-option ' + modifier + '" ' + ariaAttr + ' data-i="' + i + '">';
      html += '<span class="quiz-option__indicator" aria-hidden="true"></span>';
      html += '<span class="quiz-option__label">' + escHtml(label) + '</span>';
      html += '</button>';
    });
    html += '</div>';

    if (q.microExtra) html += '<p class="quiz-micro-extra">' + escHtml(q.microExtra) + '</p>';

    html += '<p class="quiz-error" id="quiz-error" aria-live="polite"></p>';

    html += '<div class="quiz-footer">';
    if (current > 0) {
      html += '<button type="button" class="quiz-back" id="quiz-back">';
      html += '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false"><path d="M8.5 3L4.5 7L8.5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      html += ' Voltar</button>';
    } else {
      html += '<span class="quiz-back quiz-back--hidden">Voltar</span>';
    }
    var nextLabel = current === TOTAL - 1 ? (cfg.finalLabel || 'Ver resultado') : 'Próxima';
    // Show explicit Next on multi-select, on the final question (always), and as a fallback for single-select before auto-advance fires
    var showNext = isMulti || current === TOTAL - 1;
    if (showNext) {
      html += '<button type="button" class="quiz-next" id="quiz-next"' + (hasAnswer() ? '' : ' disabled') + '>' + escHtml(nextLabel) + '</button>';
    } else {
      html += '<button type="button" class="quiz-next" id="quiz-next" disabled style="visibility:hidden;">Próxima</button>';
    }
    html += '</div>';

    elBody.innerHTML = html;
    bind();
  }

  function showError(msg) {
    var err = document.getElementById('quiz-error');
    if (!err) return;
    err.textContent = msg;
    err.classList.add('quiz-error--show');
    clearTimeout(showError._t);
    showError._t = setTimeout(function() {
      err.classList.remove('quiz-error--show');
    }, 1800);
  }

  function bind() {
    var opts = document.getElementById('quiz-opts');
    if (!opts) return;
    var isMulti = Q[current].type === 'multi';

    opts.addEventListener('click', function(e) {
      var btn = e.target.closest('.quiz-option');
      if (!btn) return;
      var i = parseInt(btn.dataset.i, 10);
      if (isMulti) {
        if (!answers[current]) answers[current] = [];
        var idx = answers[current].indexOf(i);
        if (idx > -1) {
          answers[current].splice(idx, 1);
          btn.setAttribute('aria-pressed', 'false');
        } else {
          answers[current].push(i);
          btn.setAttribute('aria-pressed', 'true');
        }
        var nx = document.getElementById('quiz-next');
        if (nx) nx.disabled = !hasAnswer();
        persistProgress();
      } else {
        // single-select: visualize then auto-advance
        answers[current] = i;
        opts.querySelectorAll('.quiz-option').forEach(function(b) {
          b.setAttribute('aria-checked', 'false');
        });
        btn.setAttribute('aria-checked', 'true');
        persistProgress();
        // On the FINAL single question, don't auto-advance — let user click "Ver resultado"
        if (current === TOTAL - 1) {
          var nx = document.getElementById('quiz-next');
          if (nx) nx.disabled = false;
        } else {
          setTimeout(function() { advance(); }, 260);
        }
      }
    });

    // Keyboard support: arrow keys for radiogroup
    opts.addEventListener('keydown', function(e) {
      if (!isMulti && (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        var buttons = Array.prototype.slice.call(opts.querySelectorAll('.quiz-option'));
        var idx = buttons.indexOf(document.activeElement);
        if (idx === -1) idx = 0;
        var dir = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
        var next = (idx + dir + buttons.length) % buttons.length;
        buttons[next].focus();
      }
    });

    var back = document.getElementById('quiz-back');
    if (back) back.addEventListener('click', function() {
      if (current > 0) {
        current--;
        persistProgress();
        render();
      }
    });

    var next = document.getElementById('quiz-next');
    if (next) next.addEventListener('click', function() {
      if (!hasAnswer()) {
        showError('Escolha uma opção para continuar.');
        return;
      }
      advance();
    });
  }

  function advance() {
    if (current < TOTAL - 1) {
      current++;
      persistProgress();
      render();
    } else {
      finish();
    }
  }

  function finish() {
    persistFinal();
    // Clear in-progress sessionStorage so next time you start fresh
    try { sessionStorage.removeItem(cfg.storageKey + '_progress'); } catch (e) {}

    elMain.style.display = 'none';
    if (!elLoading) {
      window.location.href = cfg.resultUrl;
      return;
    }
    elLoading.style.display = 'flex';
    elLoading.removeAttribute('hidden');

    var loadingCfg = cfg.loading || {};
    // Steps mode (calculadora)
    if (loadingCfg.steps) {
      var stepsEl = document.getElementById('quiz-loading-steps');
      if (stepsEl) {
        var stepHtml = '';
        loadingCfg.steps.forEach(function(s, i) {
          stepHtml += '<div class="quiz-loading__step" data-i="' + i + '"><span class="quiz-loading__dot" aria-hidden="true"></span>' + escHtml(s) + '</div>';
        });
        stepsEl.innerHTML = stepHtml;
        // Activate sequentially
        var stepEls = stepsEl.querySelectorAll('.quiz-loading__step');
        var delay = 0;
        stepEls.forEach(function(s, i) {
          setTimeout(function() { s.classList.add('quiz-loading__step--active'); }, delay);
          delay += 280;
        });
      }
    }
    // Nodes mode (diagnostico)
    if (loadingCfg.nodes) {
      var nodesEl = document.getElementById('quiz-loading-nodes');
      if (nodesEl) {
        var nodesHtml = '';
        loadingCfg.nodes.forEach(function(n, i) {
          nodesHtml += '<div class="quiz-loading__node" data-i="' + i + '">' + escHtml(n) + '</div>';
        });
        nodesEl.innerHTML = nodesHtml;
        var nodeEls = nodesEl.querySelectorAll('.quiz-loading__node');
        var d2 = 0;
        nodeEls.forEach(function(n, i) {
          setTimeout(function() {
            n.classList.add('quiz-loading__node--active');
            if (i === nodeEls.length - 1 && loadingCfg.gargaloIndex != null) {
              setTimeout(function() {
                var g = nodeEls[loadingCfg.gargaloIndex];
                if (g) g.classList.add('quiz-loading__node--gargalo');
              }, 200);
            }
          }, d2);
          d2 += 130;
        });
      }
    }

    var total = (loadingCfg.duration != null) ? loadingCfg.duration : 1000;
    setTimeout(function() {
      window.location.href = cfg.resultUrl;
    }, total);
  }

  render();
})();
