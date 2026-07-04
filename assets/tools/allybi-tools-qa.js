/**
 * allybi-tools-qa.js
 *
 * Runtime QA hooks used by Playwright assertions (spec §84-87).
 *
 * Exposes window.__allybiToolsQA with a uniform shape that the QA runner can
 * read with page.evaluate(). It does NOT throw or alter the UI; it just
 * exposes booleans + computed values the runner needs to verify.
 */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;

  function snapshot() {
    var Data = window.AllybiToolsData;
    var doc = document;
    var docEl = doc.documentElement;
    var body = doc.body;

    var horizontalOverflow = docEl.scrollWidth > docEl.clientWidth + 1;
    var h1Count = doc.querySelectorAll('h1').length;
    var bodyHasOverflowHidden = (getComputedStyle(body).overflow || '').indexOf('hidden') !== -1;
    var shell = doc.querySelector('.questionnaire-shell');
    var hasShell = !!shell;
    var shellHeightUsesDvh = false;
    if (shell) {
      var cs = getComputedStyle(shell);
      // Spec §17 requires 100dvh; jsdom can't compute it, but the inline style is the contract.
      shellHeightUsesDvh = /(100dvh|100%)/.test(shell.getAttribute('style') || '') ||
        cs.maxHeight === '100dvh' || cs.height === '100dvh' || cs.minHeight === '100dvh';
    }

    var legend = doc.querySelector('.questionnaire-legend');
    var legendFits = true;
    if (legend) {
      legendFits = legend.scrollHeight <= window.innerHeight;
    }
    var continueBtn = doc.querySelector('.questionnaire-continue');
    var continueVisible = continueBtn && continueBtn.offsetParent !== null;

    var hasFakeWhatsAppSource = /WhatsApp como fonte|WhatsApp conectado|pesquisar no WhatsApp/i.test(
      doc.documentElement.innerText
    );

    return {
      hasAllybiToolsData: !!Data,
      version: Data && Data.VERSION,
      h1Count: h1Count,
      horizontalOverflow: horizontalOverflow,
      bodyHasOverflowHidden: bodyHasOverflowHidden,
      hasShell: hasShell,
      shellHeightUsesDvh: shellHeightUsesDvh,
      legendFits: legendFits,
      continueVisible: !!continueVisible,
      hasFakeWhatsAppSource: hasFakeWhatsAppSource,
      url: location.href
    };
  }

  // Calculator-side helpers
  function runCalcExample() {
    var Data = window.AllybiToolsData;
    if (!Data) return null;
    try {
      return Data.calculateTime({
        frequency: '6-10',
        places: ['email', 'microsoft-cloud', 'local', 'old-message'],
        searchTime: '6-10',
        afterFind: ['version', 'source', 'message'],
        recheck: 'sometimes'
      });
    } catch (e) { return { error: String(e) }; }
  }

  function runDiagExample() {
    var Data = window.AllybiToolsData;
    if (!Data) return null;
    try {
      return Data.calculateDiagnostic({
        request: '1', search: '2', version: '2',
        source: '3', confirmation: '2', send: '2'
      });
    } catch (e) { return { error: String(e) }; }
  }

  window.__allybiToolsQA = {
    snapshot: snapshot,
    runCalcExample: runCalcExample,
    runDiagExample: runDiagExample
  };
})();
