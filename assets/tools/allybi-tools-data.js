/**
 * allybi-tools-data.js
 *
 * Single source of truth for the Allybi tools system.
 *
 * Imported by:
 *   - allybi-questionnaire.js
 *   - allybi-results.js
 *   - allybi-methodology.js
 *   - allybi-tools-qa.js
 *
 * Contains:
 *   - TIME_CONFIG          (§10 - Calculator formula constants)
 *   - FLOW_CONFIG          (§11 - Diagnostic formula constants)
 *   - CALCULATOR_QUESTIONS (§33 - 5 questions, exact options)
 *   - DIAGNOSTIC_QUESTIONS (§50 - 6 questions, exact options)
 *   - CALCULATOR_BANDS     (§10 - 4 bands by monthly hours)
 *   - DIAGNOSTIC_BANDS     (§11 - 4 bands by 0..100 score)
 *   - BOTTLENECK_LABELS    (§11 - request/search/version/source/confirmation/send)
 *   - ALLYBI_BRIDGE        (§12 - bottleneck → title + bridge copy)
 *   - SHARE_TEMPLATES      (§13 - calculator + diagnostic share text)
 *   - VERSION              (calculationVersion stamp for localStorage)
 *
 * Pure functions exported:
 *   - calculateTime(answers)        → { monthlyRaw, monthlyHigh, monthlyLow, monthlyDisplay,
 *                                       annualHours, annualDays, stageAdjusted, bottleneck,
 *                                       band, version }
 *   - calculateDiagnostic(answers)  → { score, stagePercents, bottleneck, band, version }
 *   - roundHours(value)             → spec §10 rounding rule
 *   - formatHoursDisplay(value)     → "8h30" style
 *
 * No side effects. No DOM access. No network. No localStorage.
 * Works in both browser (via <script>) and Node.js (via `module.exports` shim).
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AllybiToolsData = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ───────────────────────────────────────────────────────────────────
  // §10 - TIME_CONFIG (Calculator constants)
  // ───────────────────────────────────────────────────────────────────
  var TIME_CONFIG = {
    weeksPerMonth: 4.33,
    frequency: {
      '1-2': 1.5,
      '3-5': 4,
      '6-10': 8,
      '11-20': 15.5,
      '20+': 22
    },
    searchMinutes: {
      'under-2': 1,
      '2-5': 3.5,
      '6-10': 8,
      '11-20': 15.5,
      '20+': 25
    },
    postFindMinutes: {
      version: 3,
      source: 2.5,
      approval: 3,
      message: 2.5,
      recipient: 1.5
    },
    recheckRate: {
      never: 0,
      rare: 0.08,
      sometimes: 0.25,
      often: 0.5,
      almostAlways: 0.75
    },
    dispersionPerExtraPlace: 0.10,
    dispersionCap: 0.50,
    repeatedPathFraction: 0.50,
    estimateLow: 0.80,
    estimateHigh: 1.20
  };

  // ───────────────────────────────────────────────────────────────────
  // §11 - FLOW_CONFIG (Diagnostic constants)
  // ───────────────────────────────────────────────────────────────────
  var FLOW_CONFIG = {
    weights: {
      request: 12,
      search: 18,
      version: 20,
      source: 20,
      confirmation: 18,
      send: 12
    },
    tieBreak: [
      'version',
      'source',
      'search',
      'confirmation',
      'request',
      'send'
    ]
  };

  // ───────────────────────────────────────────────────────────────────
  // §10 - Calculator bottleneck tie-break order (search/version/source/
  // confirmation/send mapped to stageAdjusted output)
  // §10 says order: 1.version 2.source 3.search 4.confirmation 5.send
  // ───────────────────────────────────────────────────────────────────
  var CALCULATOR_TIE_BREAK = ['version', 'source', 'search', 'confirmation', 'send'];

  // ───────────────────────────────────────────────────────────────────
  // §10 - Calculator bands (by monthly hours)
  // ───────────────────────────────────────────────────────────────────
  var CALCULATOR_BANDS = [
    { max: 3,        copy: 'Pequeno no mês. Caro no momento errado.' },
    { max: 10,       copy: 'Uma rotina invisível já ocupa parte do mês.' },
    { max: 25,       copy: 'Dias úteis estão indo para confirmação manual.' },
    { max: Infinity, copy: 'Esse fluxo está caro demais para depender de memória.' }
  ];

  // ───────────────────────────────────────────────────────────────────
  // §11 - Diagnostic bands (by 0..100 score)
  // ───────────────────────────────────────────────────────────────────
  var DIAGNOSTIC_BANDS = [
    { max: 24,  label: 'Fluxo claro' },
    { max: 49,  label: 'Atrito moderado' },
    { max: 74,  label: 'Atrito alto' },
    { max: 100, label: 'Atrito crítico' }
  ];

  // ───────────────────────────────────────────────────────────────────
  // §11 - Bottleneck labels (Diagnostic)
  // ───────────────────────────────────────────────────────────────────
  var DIAGNOSTIC_BOTTLENECK_LABELS = {
    request: 'Pedido incompleto',
    search: 'Busca espalhada',
    version: 'Versão frágil',
    source: 'Fonte invisível',
    confirmation: 'Confirmação dependente',
    send: 'Envio manual'
  };

  // ───────────────────────────────────────────────────────────────────
  // §12 - Allybi bridge per bottleneck
  // ───────────────────────────────────────────────────────────────────
  var ALLYBI_BRIDGE_CALCULATOR = {
    search: {
      title: 'Busca espalhada',
      bridge: 'Outlook, OneDrive, SharePoint e uploads entram no mesmo chat.'
    },
    version: {
      title: 'Confirmar versão',
      bridge: 'O Allybi compara versões e mantém a fonte visível.'
    },
    source: {
      title: 'Achar fonte e contexto',
      bridge: 'A resposta mostra arquivo, localização e data quando disponíveis.'
    },
    confirmation: {
      title: 'Pedir validação',
      bridge: 'Contexto, arquivo, fonte, destinatário e canal ficam juntos na revisão.'
    },
    send: {
      title: 'Preparar o envio',
      bridge: 'O Allybi organiza mensagem e arquivo. Outlook envia depois da confirmação. WhatsApp abre como handoff.'
    }
  };

  var ALLYBI_BRIDGE_DIAGNOSTIC = {
    request: {
      label: 'Pedido incompleto',
      bridge: 'O pedido entra em uma conversa com contexto reunido.'
    },
    search: {
      label: 'Busca espalhada',
      bridge: 'As fontes autorizadas e uploads ficam disponíveis no chat.'
    },
    version: {
      label: 'Versão frágil',
      bridge: 'Versões podem ser comparadas antes de escolher o arquivo.'
    },
    source: {
      label: 'Fonte invisível',
      bridge: 'Cada resposta mostra de onde veio.'
    },
    confirmation: {
      label: 'Confirmação dependente',
      bridge: 'A revisão reúne o que precisa ser confirmado antes de sair.'
    },
    send: {
      label: 'Envio manual',
      bridge: 'Outlook envia depois da confirmação. WhatsApp abre como handoff.'
    }
  };

  // ───────────────────────────────────────────────────────────────────
  // §33 - CALCULATOR_QUESTIONS (5 questions, exact options)
  // ───────────────────────────────────────────────────────────────────
  var CALCULATOR_QUESTIONS = [
    {
      id: 'frequency',
      type: 'single',
      question: 'Em uma semana normal, quantas vezes você precisa encontrar ou confirmar um documento?',
      helper: '',
      options: [
        { label: '1 a 2 vezes',       value: '1-2' },
        { label: '3 a 5 vezes',       value: '3-5' },
        { label: '6 a 10 vezes',      value: '6-10' },
        { label: '11 a 20 vezes',     value: '11-20' },
        { label: 'Mais de 20 vezes',  value: '20+' }
      ]
    },
    {
      id: 'places',
      type: 'multi',
      question: 'Quando isso acontece, onde você costuma procurar?',
      helper: 'Selecione todos que se aplicam.',
      options: [
        { label: 'E-mail ou Outlook',              value: 'email' },
        { label: 'OneDrive ou SharePoint',         value: 'microsoft-cloud' },
        { label: 'Pasta local ou desktop',         value: 'local' },
        { label: 'WhatsApp ou conversa antiga',    value: 'old-message' },
        { label: 'Alguém do time',                 value: 'team' },
        { label: 'Outro repositório',              value: 'other' }
      ]
    },
    {
      id: 'searchTime',
      type: 'single',
      question: 'Quanto tempo costuma levar até aparecer um arquivo plausível?',
      helper: '',
      options: [
        { label: 'Menos de 2 minutos',  value: 'under-2' },
        { label: '2 a 5 minutos',       value: '2-5' },
        { label: '6 a 10 minutos',      value: '6-10' },
        { label: '11 a 20 minutos',     value: '11-20' },
        { label: 'Mais de 20 minutos',  value: '20+' }
      ]
    },
    {
      id: 'afterFind',
      type: 'multi',
      question: 'Depois que o arquivo aparece, o que ainda costuma faltar?',
      helper: 'Selecione todos que se aplicam.',
      options: [
        { label: 'Confirmar se é a última versão',    value: 'version' },
        { label: 'Achar a fonte ou o contexto',       value: 'source' },
        { label: 'Pedir validação para alguém',       value: 'approval' },
        { label: 'Montar mensagem e anexar',          value: 'message' },
        { label: 'Revisar destinatário e canal',      value: 'recipient' },
        { label: 'Nada. Já está pronto para sair.',   value: 'none', exclusive: true }
      ]
    },
    {
      id: 'recheck',
      type: 'single',
      question: 'Com que frequência você precisa voltar e conferir o mesmo pedido de novo?',
      helper: '',
      options: [
        { label: 'Nunca',                                       value: 'never' },
        { label: 'Raramente, menos de 1 em 10',                 value: 'rare' },
        { label: 'Às vezes, cerca de 1 em 4',                   value: 'sometimes' },
        { label: 'Frequentemente, cerca da metade',             value: 'often' },
        { label: 'Quase sempre',                                value: 'almostAlways' }
      ]
    }
  ];

  // ───────────────────────────────────────────────────────────────────
  // §50 - DIAGNOSTIC_QUESTIONS (6 questions, exact options, values "0".."3")
  // ───────────────────────────────────────────────────────────────────
  var DIAGNOSTIC_QUESTIONS = [
    {
      id: 'request',
      type: 'single',
      question: 'Quando um pedido chega, o contexto necessário costuma vir junto?',
      options: [
        { label: 'Sempre. Objetivo, prazo e documento estão claros.', value: '0' },
        { label: 'Na maioria das vezes.',                              value: '1' },
        { label: 'Às vezes falta uma parte importante.',               value: '2' },
        { label: 'Quase sempre precisamos reconstruir o pedido.',      value: '3' }
      ]
    },
    {
      id: 'search',
      type: 'single',
      question: 'Até aparecer um arquivo plausível, quantos lugares o time costuma abrir?',
      options: [
        { label: 'Um lugar',                                                    value: '0' },
        { label: 'Dois lugares',                                                value: '1' },
        { label: 'Três ou quatro lugares',                                      value: '2' },
        { label: 'Cinco ou mais, ou precisamos perguntar para alguém',          value: '3' }
      ]
    },
    {
      id: 'version',
      type: 'single',
      question: 'Quando aparecem arquivos parecidos, como o time confirma qual pode ser usado?',
      options: [
        { label: 'Versão e aprovação ficam claras no próprio sistema.',  value: '0' },
        { label: 'Data e pasta normalmente bastam.',                     value: '1' },
        { label: 'Alguém precisa comparar ou perguntar.',                value: '2' },
        { label: 'Frequentemente ainda fica dúvida.',                    value: '3' }
      ]
    },
    {
      id: 'source',
      type: 'single',
      question: 'Ao usar uma informação, a origem fica visível para quem vai revisar?',
      options: [
        { label: 'Sempre, com arquivo, localização e data.',         value: '0' },
        { label: 'Na maioria das vezes.',                            value: '1' },
        { label: 'Às vezes precisamos achar a fonte depois.',        value: '2' },
        { label: 'Frequentemente a resposta fica sem origem clara.', value: '3' }
      ]
    },
    {
      id: 'confirmation',
      type: 'single',
      question: 'Antes de sair, quantas passagens o pedido costuma fazer para alguém confirmar?',
      options: [
        { label: 'Nenhuma ou uma',                                              value: '0' },
        { label: 'Duas',                                                        value: '1' },
        { label: 'Três',                                                        value: '2' },
        { label: 'Quatro ou mais, ou depende de uma pessoa específica',         value: '3' }
      ]
    },
    {
      id: 'send',
      type: 'single',
      question: 'Arquivo, mensagem, destinatário e canal são revisados no mesmo lugar?',
      options: [
        { label: 'Sempre',                                                value: '0' },
        { label: 'Na maioria das vezes, com uma checagem extra',          value: '1' },
        { label: 'Ficam separados em ferramentas diferentes',             value: '2' },
        { label: 'Cada envio precisa ser reconstruído manualmente',       value: '3' }
      ]
    }
  ];

  // ───────────────────────────────────────────────────────────────────
  // §10 - roundHours rule
  // ───────────────────────────────────────────────────────────────────
  function roundHours(value) {
    if (value < 10) return Math.round(value * 2) / 2;
    if (value < 30) return Math.round(value);
    return Math.round(value / 2) * 2;
  }

  // ───────────────────────────────────────────────────────────────────
  // §35 - formatHoursDisplay → "8h30" style (used by hero copy)
  // For values < 10: half-hour granularity → "0h30", "1h00", "8h30"
  // For 10..29: integer hours → "12h"
  // For ≥30: even integer → "30h", "32h"
  // ───────────────────────────────────────────────────────────────────
  function formatHoursDisplay(value) {
    if (value == null || isNaN(value) || !isFinite(value)) return '0h';
    var rounded = roundHours(value);
    if (rounded < 10) {
      var whole = Math.floor(rounded);
      var half = (rounded - whole) >= 0.5 ? 30 : 0;
      return whole + 'h' + (half === 30 ? '30' : '00');
    }
    return rounded + 'h';
  }

  // ───────────────────────────────────────────────────────────────────
  // §10 - calculateTime(answers)
  //   answers = {
  //     frequency: "6-10",
  //     places: ["email","microsoft-cloud","local","old-message"],   // array, may be empty
  //     searchTime: "6-10",
  //     afterFind: ["version","source","message"],                   // array, may be ["none"]
  //     recheck: "sometimes"
  //   }
  // ───────────────────────────────────────────────────────────────────
  function calculateTime(answers) {
    if (!answers) throw new Error('calculateTime: answers required');

    var freq = TIME_CONFIG.frequency[answers.frequency];
    var baseSearch = TIME_CONFIG.searchMinutes[answers.searchTime];
    if (freq == null || baseSearch == null) {
      throw new Error('calculateTime: invalid frequency or searchTime');
    }

    var places = Array.isArray(answers.places) ? answers.places : [];
    var placeCount = places.length;
    var dispersionMultiplier = 1 + Math.min(
      Math.max(placeCount - 1, 0) * TIME_CONFIG.dispersionPerExtraPlace,
      TIME_CONFIG.dispersionCap
    );

    var searchPerOccurrence = baseSearch * dispersionMultiplier;

    var rawAfter = Array.isArray(answers.afterFind) ? answers.afterFind : [];
    // 'none' is exclusive: if present, treat as empty post-find list
    var selectedPostFind = rawAfter.indexOf('none') !== -1
      ? []
      : rawAfter;

    var postFindPerOccurrence = selectedPostFind.reduce(function (sum, key) {
      return sum + (TIME_CONFIG.postFindMinutes[key] || 0);
    }, 0);

    var recheckRate = TIME_CONFIG.recheckRate[answers.recheck];
    if (recheckRate == null) {
      throw new Error('calculateTime: invalid recheck');
    }

    var repeatedPath = (searchPerOccurrence + postFindPerOccurrence)
      * recheckRate
      * TIME_CONFIG.repeatedPathFraction;

    var minutesPerOccurrence = searchPerOccurrence + postFindPerOccurrence + repeatedPath;
    var monthlyHoursRaw = freq * TIME_CONFIG.weeksPerMonth * minutesPerOccurrence / 60;
    var annualHoursRaw = monthlyHoursRaw * 12;
    var annualDaysRaw = annualHoursRaw / 8;

    var monthlyDisplay = roundHours(monthlyHoursRaw);
    var monthlyLow = roundHours(monthlyHoursRaw * TIME_CONFIG.estimateLow);
    var monthlyHigh = roundHours(monthlyHoursRaw * TIME_CONFIG.estimateHigh);

    // Stage breakdown (§10)
    var stageBase = {
      search: searchPerOccurrence,
      version: selectedPostFind.indexOf('version') !== -1 ? 3 : 0,
      source: selectedPostFind.indexOf('source') !== -1 ? 2.5 : 0,
      confirmation: selectedPostFind.indexOf('approval') !== -1 ? 3 : 0,
      send:
        (selectedPostFind.indexOf('message') !== -1 ? 2.5 : 0) +
        (selectedPostFind.indexOf('recipient') !== -1 ? 1.5 : 0)
    };
    var stageBaseTotal = Object.keys(stageBase).reduce(function (a, k) { return a + stageBase[k]; }, 0);
    var reworkFactor = stageBaseTotal > 0
      ? 1 + repeatedPath / stageBaseTotal
      : 1;
    var stageAdjustedMinutes = {};
    Object.keys(stageBase).forEach(function (k) {
      stageAdjustedMinutes[k] = stageBase[k] * reworkFactor;
    });

    // Convert per-occurrence minutes to monthly hours via freq × 4.33 / 60
    var stageMonthlyHours = {};
    Object.keys(stageAdjustedMinutes).forEach(function (k) {
      stageMonthlyHours[k] = freq * TIME_CONFIG.weeksPerMonth * stageAdjustedMinutes[k] / 60;
    });

    // Bottleneck: max value, with tie-break per §10
    var bottleneck = findBottleneckOrdered(stageAdjustedMinutes, CALCULATOR_TIE_BREAK);

    var band = CALCULATOR_BANDS.find(function (b) {
      return monthlyHoursRaw < b.max;
    }) || CALCULATOR_BANDS[CALCULATOR_BANDS.length - 1];

    return {
      monthlyHoursRaw: monthlyHoursRaw,
      monthlyDisplay: monthlyDisplay,
      monthlyLow: monthlyLow,
      monthlyHigh: monthlyHigh,
      annualHoursRaw: annualHoursRaw,
      annualHoursDisplay: roundHours(annualHoursRaw),
      annualDaysRaw: annualDaysRaw,
      annualDaysDisplay: Math.round(annualDaysRaw),
      stageAdjustedMinutes: stageAdjustedMinutes,
      stageMonthlyHours: stageMonthlyHours,
      bottleneck: bottleneck,
      band: band,
      version: VERSION
    };
  }

  // ───────────────────────────────────────────────────────────────────
  // §11 - calculateDiagnostic(answers)
  //   answers = { request:"1", search:"2", version:"2", source:"3",
  //               confirmation:"2", send:"2" }
  //   (values come in as strings from the questionnaire)
  // ───────────────────────────────────────────────────────────────────
  function calculateDiagnostic(answers) {
    if (!answers) throw new Error('calculateDiagnostic: answers required');

    var stages = Object.keys(FLOW_CONFIG.weights);
    var normalized = {};
    stages.forEach(function (s) {
      var v = parseInt(answers[s], 10);
      if (isNaN(v) || v < 0 || v > 3) {
        throw new Error('calculateDiagnostic: invalid value for ' + s + ': ' + answers[s]);
      }
      normalized[s] = v;
    });

    var totalScore = Math.round(
      stages.reduce(function (sum, stage) {
        return sum + FLOW_CONFIG.weights[stage] * (normalized[stage] / 3);
      }, 0)
    );

    var stagePercents = {};
    stages.forEach(function (stage) {
      stagePercents[stage] = Math.round(normalized[stage] / 3 * 100);
    });

    // Bottleneck: highest normalized answer; on tie use FLOW_CONFIG.tieBreak order
    var maxValue = Math.max.apply(null, stages.map(function (s) { return normalized[s]; }));
    var candidates = stages.filter(function (s) { return normalized[s] === maxValue; });
    var bottleneck = FLOW_CONFIG.tieBreak.find(function (key) {
      return candidates.indexOf(key) !== -1;
    });

    var band = DIAGNOSTIC_BANDS.find(function (b) {
      return totalScore <= b.max;
    }) || DIAGNOSTIC_BANDS[DIAGNOSTIC_BANDS.length - 1];

    return {
      score: totalScore,
      stagePercents: stagePercents,
      bottleneck: bottleneck,
      bottleneckLabel: DIAGNOSTIC_BOTTLENECK_LABELS[bottleneck],
      band: band,
      version: VERSION
    };
  }

  // ───────────────────────────────────────────────────────────────────
  // §10 - Calculator bottleneck helper with tie-break
  // ───────────────────────────────────────────────────────────────────
  function findBottleneckOrdered(stageMap, tieOrder) {
    var keys = Object.keys(stageMap);
    var maxVal = -Infinity;
    keys.forEach(function (k) {
      if (stageMap[k] > maxVal) maxVal = stageMap[k];
    });
    if (maxVal <= 0) {
      // All zeros - return tieOrder[2] (search) as default per spec implication
      // (when nothing is selected post-find, search is always > 0 in real cases)
      return tieOrder.find(function (k) { return stageMap[k] > 0; }) || tieOrder[2];
    }
    var winners = keys.filter(function (k) { return stageMap[k] === maxVal; });
    return tieOrder.find(function (k) { return winners.indexOf(k) !== -1; });
  }

  // ───────────────────────────────────────────────────────────────────
  // §13 - Share templates
  // ───────────────────────────────────────────────────────────────────
  function buildCalculatorShareText(result) {
    return 'Meu fluxo consome cerca de ' + formatHoursDisplay(result.monthlyDisplay) +
      ' por mês antes do arquivo sair certo. Maior gargalo: ' +
      (ALLYBI_BRIDGE_CALCULATOR[result.bottleneck] || {}).title +
      '. Fiz a Calculadora do Tempo Perdido da Allybi.';
  }

  function buildDiagnosticShareText(result) {
    return 'Nosso fluxo marcou ' + result.score + '/100 de atrito. Maior gargalo: ' +
      result.bottleneckLabel +
      '. Faz também para a gente comparar? Diagnóstico do Fluxo da Allybi.';
  }

  // ───────────────────────────────────────────────────────────────────
  // localStorage keys + schema version
  // ───────────────────────────────────────────────────────────────────
  var VERSION = '2026-06-v1';
  var STORAGE_KEYS = {
    timeQuiz: 'allybi.timeQuiz.v2',
    timeResult: 'allybi.timeResult.v2',
    flowQuiz: 'allybi.flowQuiz.v2',
    flowResult: 'allybi.flowResult.v2'
  };
  var QUIZ_EXPIRY_MS = 24 * 60 * 60 * 1000;     // 24h
  var RESULT_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30d

  return {
    VERSION: VERSION,
    TIME_CONFIG: TIME_CONFIG,
    FLOW_CONFIG: FLOW_CONFIG,
    CALCULATOR_QUESTIONS: CALCULATOR_QUESTIONS,
    DIAGNOSTIC_QUESTIONS: DIAGNOSTIC_QUESTIONS,
    CALCULATOR_BANDS: CALCULATOR_BANDS,
    DIAGNOSTIC_BANDS: DIAGNOSTIC_BANDS,
    DIAGNOSTIC_BOTTLENECK_LABELS: DIAGNOSTIC_BOTTLENECK_LABELS,
    ALLYBI_BRIDGE_CALCULATOR: ALLYBI_BRIDGE_CALCULATOR,
    ALLYBI_BRIDGE_DIAGNOSTIC: ALLYBI_BRIDGE_DIAGNOSTIC,
    STORAGE_KEYS: STORAGE_KEYS,
    QUIZ_EXPIRY_MS: QUIZ_EXPIRY_MS,
    RESULT_EXPIRY_MS: RESULT_EXPIRY_MS,
    roundHours: roundHours,
    formatHoursDisplay: formatHoursDisplay,
    calculateTime: calculateTime,
    calculateDiagnostic: calculateDiagnostic,
    buildCalculatorShareText: buildCalculatorShareText,
    buildDiagnosticShareText: buildDiagnosticShareText
  };
});
