/**
 * Allybi Tools — Result rendering + scoring
 * Used by /tempo-resultado.html and /diagnostico-resultado.html
 *
 * Each result page sets `window.RESULT_CONFIG = { kind: 'tempo' | 'diag' }`
 * and embeds the question structure (matching the questionario page) so
 * scoring can reference labels for share text.
 */
(function() {
  'use strict';

  var cfg = window.RESULT_CONFIG;
  if (!cfg) return;

  // ──────────────── Storage ────────────────
  function loadAnswers(storageKey) {
    try {
      var raw = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;
      return parsed;
    } catch (e) { return null; }
  }

  // ──────────────── Formatters ────────────────
  function fmtHours(h) {
    if (h < 10) {
      return h.toFixed(1).replace('.', ',') + ' h/mês';
    }
    return Math.round(h) + ' h/mês';
  }
  function fmtAnnualDays(h) {
    var hYear = h * 12;
    var days = Math.round(hYear / 8);
    var hYearText = h * 12 < 100 ? (h * 12).toFixed(0) : Math.round(hYear);
    return hYearText + ' h por ano · ~' + days + ' dias úteis';
  }

  // ──────────────── Calculadora scoring ────────────────
  var CALC = {
    freqVals: [1.5, 4, 8, 15, 24],
    // Q2 labels (index matches options)
    placesQ2: ['E-mail', 'OneDrive', 'SharePoint', 'Google Drive', 'Pasta local', 'Desktop', 'WhatsApp', 'Alguém do time'],
    avgSearchMin: [4, 8, 15, 30, 50],
    // Q4 (index matches options)
    postFindMin: [4, 4, 5, 5, 3, 7],
    postFindLabels: ['Confirmar versão', 'Achar fonte', 'Entender contexto', 'Montar mensagem', 'Conferir destinatário/canal', 'Pedir confirmação'],
    // Q5 (single)
    riskMin: [4, 4, 2, 3, 2, 5],
    riskLabels: ['Versão errada', 'Sem fonte clara', 'Cliente esperando', 'Anexo errado', 'Canal errado', 'Depender de alguém']
  };

  function scoreTempo(ans) {
    // ans format: [q1Index(int), q2Indices(arr), q3Index(int), q4Indices(arr), q5Index(int)]
    var q1 = ans[0] != null ? ans[0] : 0;
    var q2 = Array.isArray(ans[1]) ? ans[1] : [];
    var q3 = ans[2] != null ? ans[2] : 0;
    var q4 = Array.isArray(ans[3]) ? ans[3] : [];
    var q5 = ans[4] != null ? ans[4] : 0;

    var frequency = CALC.freqVals[q1];

    // Dispersion: 1.0 + 0.08 per place AFTER FIRST + 0.10 if WhatsApp + 0.10 if "Alguém do time", cap 1.6
    var dispersion = 1.0;
    if (q2.length > 1) dispersion += 0.08 * (q2.length - 1);
    if (q2.indexOf(6) > -1) dispersion += 0.10; // WhatsApp at index 6
    if (q2.indexOf(7) > -1) dispersion += 0.10; // Alguém do time at index 7
    if (dispersion > 1.6) dispersion = 1.6;

    var avgSearch = CALC.avgSearchMin[q3];
    var postFind = 0;
    var postFindBreakdown = { 'Confirmar versão': 0, 'Achar fonte': 0, 'Entender contexto': 0, 'Montar mensagem': 0, 'Conferir destinatário/canal': 0, 'Pedir confirmação': 0 };
    q4.forEach(function(i) {
      var min = CALC.postFindMin[i];
      postFind += min;
      postFindBreakdown[CALC.postFindLabels[i]] = min;
    });
    var riskMin = CALC.riskMin[q5];
    var searchPerItem = avgSearch * dispersion;
    var weeklyMin = frequency * (searchPerItem + postFind + riskMin);
    var monthlyHours = weeklyMin * 4.33 / 60;

    // Breakdown by step
    var procurarH = (frequency * searchPerItem) * 4.33 / 60;
    var confirmarVersaoH = (frequency * (postFindBreakdown['Confirmar versão'] + (CALC.riskLabels[q5] === 'Versão errada' ? riskMin : 0))) * 4.33 / 60;
    var acharFonteH = (frequency * (postFindBreakdown['Achar fonte'] + (CALC.riskLabels[q5] === 'Sem fonte clara' ? riskMin : 0))) * 4.33 / 60;
    var prepararEnvioH = (frequency * (
      postFindBreakdown['Entender contexto'] +
      postFindBreakdown['Montar mensagem'] +
      postFindBreakdown['Conferir destinatário/canal'] +
      postFindBreakdown['Pedir confirmação'] +
      (['Cliente esperando', 'Anexo errado', 'Canal errado', 'Depender de alguém'].indexOf(CALC.riskLabels[q5]) > -1 ? riskMin : 0)
    )) * 4.33 / 60;

    var stepHours = {
      'Procurar': procurarH,
      'Confirmar versão': confirmarVersaoH,
      'Achar fonte': acharFonteH,
      'Preparar envio': prepararEnvioH
    };

    var maxLabel = 'Procurar', maxVal = procurarH;
    Object.keys(stepHours).forEach(function(k) {
      if (stepHours[k] > maxVal) { maxVal = stepHours[k]; maxLabel = k; }
    });

    var allybiBridge = {
      'Procurar': 'Perguntar uma vez no chat',
      'Confirmar versão': 'Comparar e ver fonte',
      'Achar fonte': 'Resposta com fonte',
      'Preparar envio': 'Revisão antes do envio'
    }[maxLabel];

    return {
      monthlyHours: monthlyHours,
      stepHours: stepHours,
      bottleneck: maxLabel,
      allybiBridge: allybiBridge
    };
  }

  // ──────────────── Diagnostico scoring ────────────────
  var DIAG = {
    // dimensions and their max contributions
    dims: ['Fontes espalhadas', 'Versão frágil', 'Fonte invisível', 'Envio manual', 'Dependência de confirmação'],
    // Q3 options
    q3Labels: ['Anexos antigos', 'Pastas diferentes', 'Conversas', 'Versões parecidas', 'Arquivos baixados', 'Memória de alguém'],
    // Q4 options
    q4Labels: ['Pelo nome do arquivo', 'Pela data', 'Pela pasta onde está', 'Perguntando para alguém', 'Pelo histórico do e-mail', 'Nem sempre confirma'],
    // Q5 options
    q5Labels: ['Achar fonte', 'Confirmar versão', 'Montar mensagem', 'Conferir destinatário', 'Saber quem aprovou', 'Escolher canal'],
    // Q6 options
    q6Labels: ['Enviar versão errada', 'Responder sem fonte', 'Mandar anexo errado', 'Perder contexto do cliente', 'Atrasar resposta', 'Depender de uma pessoa só']
  };

  function scoreDiag(ans) {
    // ans format: [q1Index(int), q2Index(int), q3Indices(arr), q4Index(int), q5Indices(arr), q6Index(int)]
    var q1 = ans[0] != null ? ans[0] : 0;
    var q2 = ans[1] != null ? ans[1] : 0;
    var q3 = Array.isArray(ans[2]) ? ans[2] : [];
    var q4 = ans[3] != null ? ans[3] : 0;
    var q5 = Array.isArray(ans[4]) ? ans[4] : [];
    var q6 = ans[5] != null ? ans[5] : 0;

    var dims = {
      'Fontes espalhadas': 0,
      'Versão frágil': 0,
      'Fonte invisível': 0,
      'Envio manual': 0,
      'Dependência de confirmação': 0
    };

    // D1 Fontes espalhadas — Q2 + Q3
    // Q2 single: any answer contributes a base; "WhatsApp" or "Vários" inflates
    dims['Fontes espalhadas'] += 8; // base for having a primary place
    // Q3 multi: each item adds 2, cap at 12
    var q3Inc = Math.min(12, q3.length * 2);
    dims['Fontes espalhadas'] += q3Inc;
    if (q3.indexOf(5) > -1) dims['Fontes espalhadas'] += 2; // "Memória de alguém"

    // D2 Versão frágil — Q4
    // weights by mechanism: name=4, date=4, folder=4, asking=5, email-history=4, never=12
    var q4Weights = [4, 4, 4, 5, 4, 12];
    dims['Versão frágil'] += q4Weights[q4] != null ? q4Weights[q4] : 6;
    if (q5.indexOf(1) > -1) dims['Versão frágil'] += 4; // Q5 "Confirmar versão"

    // D3 Fonte invisível — Q5 "Achar fonte" + Q6 "Responder sem fonte"
    if (q5.indexOf(0) > -1) dims['Fonte invisível'] += 10;
    if (q6 === 1) dims['Fonte invisível'] += 8;
    if (dims['Fonte invisível'] === 0) dims['Fonte invisível'] = 2;

    // D4 Envio manual — Q5: Montar mensagem, Conferir destinatário, Escolher canal + Q6 Mandar anexo errado
    if (q5.indexOf(2) > -1) dims['Envio manual'] += 5;
    if (q5.indexOf(3) > -1) dims['Envio manual'] += 5;
    if (q5.indexOf(5) > -1) dims['Envio manual'] += 4;
    if (q6 === 2) dims['Envio manual'] += 6;
    if (dims['Envio manual'] === 0) dims['Envio manual'] = 2;

    // D5 Dependência de confirmação — Q4 asking + Q3 Memória + Q6 Depender de uma pessoa + Q5 Saber quem aprovou
    if (q4 === 3) dims['Dependência de confirmação'] += 6;
    if (q3.indexOf(5) > -1) dims['Dependência de confirmação'] += 4;
    if (q6 === 5) dims['Dependência de confirmação'] += 8;
    if (q5.indexOf(4) > -1) dims['Dependência de confirmação'] += 4;
    if (dims['Dependência de confirmação'] === 0) dims['Dependência de confirmação'] = 2;

    // Cap each at 20
    Object.keys(dims).forEach(function(k) {
      if (dims[k] > 20) dims[k] = 20;
    });

    var total = 0;
    Object.keys(dims).forEach(function(k) { total += dims[k]; });

    var range = 'Fluxo claro';
    if (total > 25) range = 'Atrito moderado';
    if (total > 50) range = 'Alto atrito';
    if (total > 75) range = 'Dependente demais';

    var maxLabel = 'Fontes espalhadas', maxVal = 0;
    Object.keys(dims).forEach(function(k) {
      if (dims[k] > maxVal) { maxVal = dims[k]; maxLabel = k; }
    });

    var bridges = {
      'Fontes espalhadas': 'Fontes conectadas no chat',
      'Versão frágil': 'Comparação e fonte visível',
      'Fonte invisível': 'Resposta com fonte',
      'Envio manual': 'Revisão antes do envio',
      'Dependência de confirmação': 'Contexto visível no fluxo'
    };
    var symptoms = {
      'Fontes espalhadas': 'Cada pedido vira uma busca em mais de um lugar.',
      'Versão frágil': 'O time confirma versão pelo nome, pasta ou memória.',
      'Fonte invisível': 'A resposta sai sem mostrar de onde veio.',
      'Envio manual': 'Mensagem, anexo e canal viram trabalho cada vez.',
      'Dependência de confirmação': 'O fluxo depende de alguém confirmar.'
    };
    var risks = {
      'Fontes espalhadas': 'Versão errada sai junto com o pedido.',
      'Versão frágil': 'O arquivo que sai pode não ser o aprovado.',
      'Fonte invisível': 'Cliente, sócio ou auditor pede a origem e ninguém acha.',
      'Envio manual': 'Anexo trocado, canal errado, destinatário errado.',
      'Dependência de confirmação': 'A pessoa que confirma se torna gargalo do time.'
    };
    var flowNodes = ['Pedido', 'Busca', 'Versão', 'Fonte', 'Confirmação', 'Envio'];
    var nodeMap = {
      'Fontes espalhadas': 1,
      'Versão frágil': 2,
      'Fonte invisível': 3,
      'Envio manual': 5,
      'Dependência de confirmação': 4
    };
    var dimDescs = {
      'Fontes espalhadas': 'Quantos lugares o time precisa visitar para chegar no arquivo certo.',
      'Versão frágil': 'Como o time confirma que pode usar aquela versão.',
      'Fonte invisível': 'Se a resposta mostra de onde veio antes de ser usada.',
      'Envio manual': 'Quanto trabalho a resposta ainda precisa para virar envio.',
      'Dependência de confirmação': 'Quanto o fluxo depende de uma pessoa específica.'
    };

    return {
      dims: dims,
      total: total,
      range: range,
      bottleneck: maxLabel,
      bottleneckNode: flowNodes[nodeMap[maxLabel]],
      bottleneckNodeIndex: nodeMap[maxLabel],
      symptom: symptoms[maxLabel],
      risk: risks[maxLabel],
      bridge: bridges[maxLabel],
      bridges: bridges,
      descs: dimDescs,
      flowNodes: flowNodes
    };
  }

  // ──────────────── Render: tempo ────────────────
  function renderTempo() {
    var ans = loadAnswers('allybi_tempo_answers');
    if (!ans || ans.length < 5) return showEmpty('tempo');
    var R = scoreTempo(ans);

    var hoursText = fmtHours(R.monthlyHours);
    var annualText = fmtAnnualDays(R.monthlyHours);

    setText('r-h1', hoursText + ' somem antes do arquivo sair certo.');
    setText('r-time', hoursText);
    setText('r-annual', annualText);
    setText('r-bottleneck', R.bottleneck);
    setText('r-bridge', R.allybiBridge);

    // Share text
    var shareText = 'Fiz a calculadora da Allybi e deu que perco cerca de ' + hoursText + ' entre achar, conferir e preparar arquivo. Maior gargalo: ' + R.bottleneck + '.';
    setText('r-share-text', shareText);
    bindShare(shareText);

    // Breakdown bars
    var total = R.stepHours['Procurar'] + R.stepHours['Confirmar versão'] + R.stepHours['Achar fonte'] + R.stepHours['Preparar envio'];
    var pct = function(v) { return total > 0 ? (v / total * 100) : 0; };
    var maxLabel = R.bottleneck;
    var segs = ['Procurar', 'Confirmar versão', 'Achar fonte', 'Preparar envio'];
    var bar = document.getElementById('r-bar');
    if (bar) {
      bar.innerHTML = segs.map(function(label) {
        var p = pct(R.stepHours[label]);
        var max = label === maxLabel ? ' result-breakdown__seg--max' : '';
        return '<div class="result-breakdown__seg' + max + '" style="width:' + p.toFixed(1) + '%;" title="' + label + ' ' + R.stepHours[label].toFixed(1) + 'h">' + (p > 12 ? label : '') + '</div>';
      }).join('');
    }
    var legend = document.getElementById('r-bar-legend');
    if (legend) {
      legend.innerHTML = segs.map(function(label) {
        return '<span class="result-breakdown__legend-item"><span class="result-breakdown__legend-dot" style="background:' + (label === maxLabel ? 'var(--c-warning)' : 'var(--c-primary)') + ';"></span>' + label + ' · ' + R.stepHours[label].toFixed(1).replace('.', ',') + ' h</span>';
      }).join('');
    }
    setText('r-bar-bridge-step', maxLabel);
    var bridgePhrase = {
      'Procurar': 'perguntar uma vez no chat.',
      'Confirmar versão': 'resposta com fonte e comparação visível.',
      'Achar fonte': 'resposta mostra de onde veio.',
      'Preparar envio': 'revisão antes do envio.'
    }[maxLabel];
    setText('r-bar-bridge-phrase', bridgePhrase);

    bindLead('tempo');
  }

  // ──────────────── Render: diag ────────────────
  function renderDiag() {
    var ans = loadAnswers('allybi_diag_answers');
    if (!ans || ans.length < 6) return showEmpty('diag');
    var R = scoreDiag(ans);

    setText('r-h1', 'O fluxo do seu time mostrou ' + R.total + '/100 de atrito.');
    setText('r-score', R.total + '/100');
    setText('r-band', R.range);
    setText('r-bottleneck', R.bottleneck);
    setText('r-bridge', R.bridge);

    // Share text
    var shareText = 'Fiz o Diagnóstico do Fluxo e nosso maior gargalo apareceu em ' + R.bottleneck + '. Score: ' + R.total + '/100. Não é sobre pessoas. É sobre o caminho entre pedir, confirmar e enviar.';
    setText('r-share-text', shareText);
    bindShare(shareText);

    // Flow map
    var nodesEl = document.getElementById('r-flow-nodes');
    if (nodesEl) {
      var html = '';
      R.flowNodes.forEach(function(n, i) {
        var cls = i === R.bottleneckNodeIndex ? ' flow-node--gargalo' : '';
        html += '<span class="flow-node' + cls + '">' + n + '</span>';
        if (i < R.flowNodes.length - 1) html += '<span class="flow-arrow" aria-hidden="true">→</span>';
      });
      nodesEl.innerHTML = html;
    }
    setText('r-flow-symptom', R.symptom);
    setText('r-flow-risk', R.risk);
    setText('r-flow-allybi', R.bridge);

    // Dimension cards
    var dimsEl = document.getElementById('r-dims');
    if (dimsEl) {
      var dimHtml = '';
      Object.keys(R.dims).forEach(function(dim) {
        var score = R.dims[dim];
        dimHtml += '<div class="result-dim">';
        dimHtml += '<div class="result-dim__head"><span class="result-dim__title">' + dim + '</span><span class="result-dim__score">' + score + ' / 20</span></div>';
        dimHtml += '<p class="result-dim__desc">' + R.descs[dim] + '</p>';
        dimHtml += '<p class="result-dim__bridge">Allybi reduz: ' + R.bridges[dim] + '</p>';
        dimHtml += '</div>';
      });
      dimsEl.innerHTML = dimHtml;
    }

    bindLead('diag');
  }

  // ──────────────── Share + Lead helpers ────────────────
  function bindShare(text) {
    var encoded = encodeURIComponent(text);
    var wa = document.getElementById('r-share-wa');
    if (wa) wa.href = 'https://wa.me/?text=' + encoded;
    var li = document.getElementById('r-share-li');
    if (li) {
      var pageUrl = encodeURIComponent(window.location.href);
      li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
    }
    var copy = document.getElementById('r-share-copy');
    var toast = document.getElementById('r-share-toast');
    if (copy && toast) {
      copy.addEventListener('click', function() {
        var done = function() {
          toast.classList.add('result-share__toast--show');
          setTimeout(function() { toast.classList.remove('result-share__toast--show'); }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function() {
            fallbackCopy(text); done();
          });
        } else {
          fallbackCopy(text); done();
        }
      });
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function bindLead(kind) {
    var form = document.getElementById('r-lead-form');
    var success = document.getElementById('r-lead-success');
    if (!form || !success) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var data = {};
      var els = form.querySelectorAll('input, select');
      els.forEach(function(el) { if (el.name) data[el.name] = el.value; });
      try {
        var stored = localStorage.getItem('allybi_leads') || '[]';
        var arr = JSON.parse(stored);
        arr.push({ kind: kind, ts: Date.now(), data: data });
        localStorage.setItem('allybi_leads', JSON.stringify(arr));
      } catch (err) { /* ignore */ }
      // Client-side success — no backend integration (intentional, documented in delivery report)
      form.style.display = 'none';
      success.style.display = 'block';
    });
  }

  function setText(id, txt) {
    var el = document.getElementById(id);
    if (el) el.textContent = txt;
  }

  function showEmpty(kind) {
    var quizUrl = kind === 'tempo' ? 'tempo.html' : 'diagnostico.html';
    // Contract §3 / §6: if no answers, redirect to the landing
    if (window.location.replace) {
      window.location.replace(quizUrl);
    } else {
      window.location.href = quizUrl;
    }
  }

  if (cfg.kind === 'tempo') renderTempo();
  else if (cfg.kind === 'diag') renderDiag();
})();
