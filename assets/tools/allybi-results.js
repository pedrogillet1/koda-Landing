/**
 * allybi-results.js
 *
 * Controller for /tempo-resultado.html and /diagnostico-resultado.html.
 *
 * Responsibilities (spec §13, §14, §34-40, §51-58, §76):
 *   - Validate localStorage result + query params; show §58 empty state when missing.
 *   - Render dynamic hero (monthly/annual/days/range/band for time; score/band for flow).
 *   - Render breakdown rows with bottleneck highlight.
 *   - Render Allybi-bridge bottleneck section.
 *   - Wire share (navigator.share + clipboard + WhatsApp fallback).
 *   - Wire optional lead form (spec §14): preserve endpoint if present, otherwise hide.
 *   - Wire "refazer" links.
 *
 * Mount points it expects on the page:
 *   [data-result-hero]            (hero block)
 *   [data-result-breakdown]       (breakdown rows host)
 *   [data-result-bottleneck]      (bottleneck section)
 *   [data-result-share]           (share section)
 *   [data-result-share-preview]   (share preview card)
 *   [data-result-share-actions]   (share buttons host)
 *   [data-result-share-feedback]  (share feedback line)
 *   [data-result-lead]            (lead section root)
 *   [data-empty-state]            (the §58 empty-state markup)
 *
 * The lead endpoint is read from <form data-lead-endpoint="…"> if present.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-tools-result]');
    if (!root) return;

    var Data = window.AllybiToolsData;
    if (!Data) {
      console.error('allybi-results: AllybiToolsData missing.');
      return;
    }

    var kind = root.getAttribute('data-tools-result'); // "time" | "flow"
    var RESULT_KEY = kind === 'time' ? Data.STORAGE_KEYS.timeResult : Data.STORAGE_KEYS.flowResult;
    var summary = readStored();

    // Query params can rehydrate a shared link
    if (!summary) {
      summary = hydrateFromQuery();
    }

    var empty = root.querySelector('[data-empty-state]');
    var resultBody = root.querySelector('[data-result-body]');

    if (!summary || !summary.result) {
      if (resultBody) resultBody.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    if (resultBody) resultBody.hidden = false;

    if (kind === 'time') renderTime(root, summary.result);
    else renderFlow(root, summary.result);

    wireShare(root, summary.result);
    wireLead(root, summary.result);
    wireRefazerLinks(root);

    // ─── Helpers ────────────────────────────────────────────────────
    function readStored() {
      try {
        var raw = localStorage.getItem(RESULT_KEY);
        if (!raw) return null;
        var s = JSON.parse(raw);
        if (!s || s.version !== 2) return null;
        if (Date.now() - (s.savedAt || 0) > Data.RESULT_EXPIRY_MS) {
          localStorage.removeItem(RESULT_KEY);
          return null;
        }
        return s;
      } catch (e) { return null; }
    }

    function hydrateFromQuery() {
      var p = new URLSearchParams(location.search);
      if (p.get('v') !== '2') return null;
      if (kind === 'time') {
        var m = num(p.get('m')), y = num(p.get('y')), d = num(p.get('d'));
        var lo = num(p.get('lo')), hi = num(p.get('hi'));
        var b = p.get('b');
        if (m == null || y == null || d == null || b == null) return null;
        var st = parseStagePairs(p.get('st'));
        return {
          version: 2,
          kind: 'time',
          savedAt: Date.now(),
          result: {
            monthlyDisplay: m,
            monthlyLow: lo,
            monthlyHigh: hi,
            annualHoursDisplay: y,
            annualDaysDisplay: d,
            stageMonthlyHours: st || {},
            bottleneck: b,
            band: pickCalculatorBand(m)
          }
        };
      } else {
        var score = num(p.get('score'));
        var bk = p.get('b');
        if (score == null || bk == null) return null;
        var stp = parseStagePairs(p.get('st'));
        var label = (Data.DIAGNOSTIC_BOTTLENECK_LABELS[bk] || '');
        return {
          version: 2,
          kind: 'flow',
          savedAt: Date.now(),
          result: {
            score: score,
            stagePercents: stp || {},
            bottleneck: bk,
            bottleneckLabel: label,
            band: pickDiagnosticBand(score)
          }
        };
      }
    }

    function pickCalculatorBand(monthly) {
      return Data.CALCULATOR_BANDS.find(function (b) { return monthly < b.max; })
        || Data.CALCULATOR_BANDS[Data.CALCULATOR_BANDS.length - 1];
    }
    function pickDiagnosticBand(score) {
      return Data.DIAGNOSTIC_BANDS.find(function (b) { return score <= b.max; })
        || Data.DIAGNOSTIC_BANDS[Data.DIAGNOSTIC_BANDS.length - 1];
    }

    function num(v) { var n = parseFloat(v); return isNaN(n) ? null : n; }
    function parseStagePairs(raw) {
      if (!raw) return null;
      var out = {};
      raw.split(',').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) {
          var n = parseFloat(p[1]);
          if (!isNaN(n)) out[p[0]] = n;
        }
      });
      return out;
    }
  });

  // ─── TIME render ──────────────────────────────────────────────────
  function renderTime(root, r) {
    var Data = window.AllybiToolsData;
    var monthlyText = Data.formatHoursDisplay(r.monthlyDisplay);
    var bridge = Data.ALLYBI_BRIDGE_CALCULATOR[r.bottleneck] || { title: 'Maior gargalo', bridge: '' };

    setText(root, '[data-result-monthly]', monthlyText);
    setText(root, '[data-result-annual]',
      Data.formatHoursDisplay(r.annualHoursDisplay) + ', ou ' +
      Math.round(r.annualDaysDisplay) + ' dias úteis por ano');
    setText(root, '[data-result-range]',
      Data.formatHoursDisplay(r.monthlyLow) + ' a ' + Data.formatHoursDisplay(r.monthlyHigh) + ' por mês');
    setText(root, '[data-result-band-copy]', (r.band && r.band.copy) || '');
    setText(root, '[data-result-bottleneck-label]', 'Maior gargalo: ' + bridge.title);
    setText(root, '[data-result-bottleneck-title]', bridge.title);
    setText(root, '[data-result-bottleneck-bridge]', bridge.bridge);

    // Breakdown rows (Procurar / Confirmar versão / Achar fonte / Pedir confirmação / Preparar envio)
    var labels = [
      { key: 'search',       label: 'Procurar' },
      { key: 'version',      label: 'Confirmar versão' },
      { key: 'source',       label: 'Achar fonte e contexto' },
      { key: 'confirmation', label: 'Pedir confirmação' },
      { key: 'send',         label: 'Preparar envio' }
    ];
    var stages = r.stageMonthlyHours || {};
    var maxHours = Math.max.apply(null, labels.map(function (l) { return stages[l.key] || 0; }));
    if (!isFinite(maxHours) || maxHours <= 0) maxHours = 1;
    var totalHours = labels.reduce(function (a, l) { return a + (stages[l.key] || 0); }, 0) || 1;

    var host = root.querySelector('[data-result-breakdown]');
    if (host) {
      host.innerHTML = labels.map(function (l) {
        var v = stages[l.key] || 0;
        var pct = Math.round(v / totalHours * 100);
        var width = Math.max(2, Math.min(100, Math.round(v / maxHours * 100)));
        var isB = r.bottleneck === l.key;
        return '' +
          '<div class="tools-breakdown-row' + (isB ? ' is-bottleneck' : '') + '">' +
            '<div class="tools-breakdown-row-label">' + esc(l.label) + '</div>' +
            '<div class="tools-breakdown-row-track"><div class="tools-breakdown-row-fill" style="width:' + width + '%"></div></div>' +
            '<div class="tools-breakdown-row-value">' + Data.formatHoursDisplay(v) + '</div>' +
            '<div class="tools-breakdown-row-percent">' + pct + '%</div>' +
          '</div>';
      }).join('');
    }

    // Hero visual rows (compact)
    var heroVisual = root.querySelector('[data-result-visual]');
    if (heroVisual) {
      heroVisual.innerHTML =
        '<div class="tools-result-visual-title">Distribuição mensal</div>' +
        labels.map(function (l) {
          var v = stages[l.key] || 0;
          var width = Math.max(3, Math.min(100, Math.round(v / maxHours * 100)));
          var isB = r.bottleneck === l.key;
          return '<div class="tools-result-visual-row' + (isB ? ' is-bottleneck' : '') + '">' +
                   '<div class="tools-result-visual-label">' + esc(l.label) + '</div>' +
                   '<div class="tools-result-visual-track"><div class="tools-result-visual-fill" style="width:' + width + '%; opacity:' + (isB ? 1 : (0.85 - 0.12 * labels.indexOf(l))) + '"></div></div>' +
                   '<div class="tools-result-visual-hours">' + Data.formatHoursDisplay(v) + '</div>' +
                 '</div>';
        }).join('');
    }

    // Share preview (defaults; share-handler will pick correct copy)
    var preview = root.querySelector('[data-result-share-preview]');
    if (preview) {
      preview.innerHTML =
        '<div class="tools-share-preview-brand">Allybi · Calculadora do Tempo Perdido</div>' +
        '<div class="tools-share-preview-line">' + monthlyText + ' por mês</div>' +
        '<div class="tools-share-preview-line" style="color:#55534E">Maior gargalo: ' + esc(bridge.title) + '</div>';
    }
  }

  // ─── FLOW render ──────────────────────────────────────────────────
  function renderFlow(root, r) {
    var Data = window.AllybiToolsData;
    setText(root, '[data-result-score]', r.score);
    setText(root, '[data-result-band-label]', (r.band && r.band.label) || '');
    setText(root, '[data-result-bottleneck-label]', 'Maior gargalo: ' + (r.bottleneckLabel || ''));

    var BRIDGE = Data.ALLYBI_BRIDGE_DIAGNOSTIC[r.bottleneck] || { label: r.bottleneckLabel, bridge: '' };
    var INTERP = {
      request: 'O pedido chega sem contexto suficiente e precisa ser reconstruído.',
      search: 'A busca se espalha antes de aparecer um arquivo plausível.',
      version: 'Arquivos parecidos exigem comparação ou memória para confirmar.',
      source: 'A informação aparece, mas a origem não acompanha a resposta.',
      confirmation: 'A certeza depende de várias passagens ou de uma pessoa específica.',
      send: 'O envio precisa ser montado e revisado em ferramentas separadas.'
    };
    setText(root, '[data-result-bottleneck-title]', BRIDGE.label || r.bottleneckLabel);
    setText(root, '[data-result-bottleneck-where]', INTERP[r.bottleneck] || '');
    setText(root, '[data-result-bottleneck-bridge]', BRIDGE.bridge || '');

    var rows = [
      { key: 'request',      label: 'Pedido' },
      { key: 'search',       label: 'Busca' },
      { key: 'version',      label: 'Versão' },
      { key: 'source',       label: 'Fonte' },
      { key: 'confirmation', label: 'Confirmação' },
      { key: 'send',         label: 'Envio' }
    ];

    var host = root.querySelector('[data-result-breakdown]');
    if (host) {
      host.innerHTML = rows.map(function (l) {
        var v = (r.stagePercents && r.stagePercents[l.key] != null) ? r.stagePercents[l.key] : 0;
        var isB = r.bottleneck === l.key;
        return '' +
          '<div class="tools-breakdown-row' + (isB ? ' is-bottleneck' : '') + '">' +
            '<div class="tools-breakdown-row-label">' + esc(l.label) + '</div>' +
            '<div class="tools-breakdown-row-track"><div class="tools-breakdown-row-fill" style="width:' + Math.max(2, v) + '%"></div></div>' +
            '<div class="tools-breakdown-row-value">' + v + '/100</div>' +
          '</div>';
      }).join('');
    }

    // Hero scale visual
    var heroVisual = root.querySelector('[data-result-visual]');
    if (heroVisual) {
      var pct = Math.max(0, Math.min(100, r.score));
      heroVisual.innerHTML =
        '<div class="tools-result-visual-title">Sua pontuação</div>' +
        '<div style="font-size:42px;font-weight:800;letter-spacing:-.04em;line-height:1;margin:6px 0 14px;color:#181818">' + r.score + '<span style="font-size:18px;color:#6C6B6E;font-weight:600">/100</span></div>' +
        '<div class="tools-diag-scale-bar">' +
          '<div class="tools-diag-scale-marker" style="left:' + pct + '%">' +
            '<span class="tools-diag-scale-marker-label">' + r.score + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="tools-diag-scale-ticks"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div>';
    }

    var preview = root.querySelector('[data-result-share-preview]');
    if (preview) {
      preview.innerHTML =
        '<div class="tools-share-preview-brand">Allybi · Diagnóstico do Fluxo</div>' +
        '<div class="tools-share-preview-line">' + r.score + '/100 de atrito</div>' +
        '<div class="tools-share-preview-line" style="color:#55534E">Maior gargalo: ' + esc(r.bottleneckLabel || '') + '</div>' +
        '<div class="tools-share-preview-line" style="font-size:13px;color:#6C6B6E">Faz também para a gente comparar?</div>';
    }
  }

  // ─── Share wiring (§13) ───────────────────────────────────────────
  function wireShare(root, result) {
    var Data = window.AllybiToolsData;
    var kind = root.getAttribute('data-tools-result');
    var shareText = kind === 'time'
      ? Data.buildCalculatorShareText({ monthlyDisplay: result.monthlyDisplay, bottleneck: result.bottleneck })
      : Data.buildDiagnosticShareText({ score: result.score, bottleneckLabel: result.bottleneckLabel });

    var feedback = root.querySelector('[data-result-share-feedback]');
    var btnShare = root.querySelector('[data-share-primary]');
    var btnCopy = root.querySelector('[data-share-copy]');
    var btnWA = root.querySelector('[data-share-whatsapp]');

    if (btnShare) {
      btnShare.addEventListener('click', function () {
        if (navigator.share) {
          navigator.share({ text: shareText, url: location.href }).catch(function () { /* dismissed */ });
        } else if (btnWA) {
          btnWA.click();
        } else {
          copy(shareText);
        }
      });
    }
    if (btnCopy) {
      btnCopy.addEventListener('click', function () { copy(shareText); });
    }
    if (btnWA) {
      btnWA.addEventListener('click', function () {
        var url = 'https://wa.me/?text=' + encodeURIComponent(shareText + '\n' + location.href);
        window.open(url, '_blank', 'noopener');
      });
    }
    function copy(text) {
      var done = function () { if (feedback) feedback.textContent = 'Resumo copiado'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
      }
    }
  }

  // ─── Lead form (§14) ──────────────────────────────────────────────
  function wireLead(root, result) {
    var form = root.querySelector('[data-lead-form]');
    if (!form) return;
    var endpoint = form.getAttribute('data-lead-endpoint');
    var missingNote = root.querySelector('[data-lead-missing]');
    var status = root.querySelector('[data-lead-status]');

    if (!endpoint) {
      // §14: when no real endpoint, hide form and surface internal note. Do NOT fake success.
      form.setAttribute('hidden', '');
      if (missingNote) missingNote.hidden = false;
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.classList.remove('is-success', 'is-error'); }

      var phoneInput = form.querySelector('input[name="phone"]');
      var phoneDigits = (phoneInput.value || '').replace(/\D+/g, '');
      // Accept +55 prefix (13 digits) or 10/11 digits BR
      var ok = /^(\d{10,11})$/.test(phoneDigits) || /^55\d{10,11}$/.test(phoneDigits);
      if (!ok) {
        showStatus('Revise o número e tente novamente.', 'error');
        return;
      }

      var area = (form.querySelector('select[name="area"]') || {}).value || '';
      var teamSize = (form.querySelector('select[name="teamSize"]') || {}).value || '';

      var payload = {
        kind: root.getAttribute('data-tools-result'),
        phone: phoneDigits,
        area: area || undefined,
        teamSize: teamSize || undefined,
        result: stripLeadResult(result),
        url: location.href.split('?')[0]
      };

      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('lead-failed');
        showStatus(root.getAttribute('data-tools-result') === 'time'
          ? 'Pronto. A leitura foi solicitada.'
          : 'Pronto. O mapa foi solicitado.', 'success');
        // Spec §14: telefone não fica em localStorage. We don't store anything client-side either.
        if (btn) btn.disabled = true;
      }).catch(function () {
        showStatus('Não foi possível enviar agora. Revise o número e tente novamente.', 'error');
        if (btn) btn.disabled = false;
      });
    });

    function showStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.classList.toggle('is-success', kind === 'success');
      status.classList.toggle('is-error', kind === 'error');
    }
  }

  function stripLeadResult(r) {
    // Only derived values; never raw answers.
    var out = {};
    Object.keys(r).forEach(function (k) {
      if (k === 'monthlyDisplay' || k === 'monthlyLow' || k === 'monthlyHigh' ||
          k === 'annualHoursDisplay' || k === 'annualDaysDisplay' ||
          k === 'bottleneck' || k === 'score' || k === 'bottleneckLabel') {
        out[k] = r[k];
      }
      if (k === 'band' && r[k]) {
        out.band = { label: r[k].label, copy: r[k].copy };
      }
    });
    return out;
  }

  function wireRefazerLinks(root) {
    // Any link with [data-refazer] gets the ?restart=1 query.
    var links = root.querySelectorAll('[data-refazer]');
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('restart=1') === -1) {
        a.setAttribute('href', href + (href.indexOf('?') !== -1 ? '&' : '?') + 'restart=1');
      }
    });
  }

  function setText(root, sel, val) {
    var els = root.querySelectorAll(sel);
    els.forEach(function (el) { el.textContent = val; });
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
