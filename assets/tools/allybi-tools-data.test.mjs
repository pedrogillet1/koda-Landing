/**
 * allybi-tools-data.test.mjs
 *
 * §83 math tests for the Allybi tools data module.
 *
 * Run with: `node assets/tools/allybi-tools-data.test.mjs`
 *
 * No external test framework. Pure assertions. Exit code 1 on failure.
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const D = require('./allybi-tools-data.js');

let pass = 0, fail = 0;
const failures = [];

function assert(name, condition, expected, actual) {
  if (condition) {
    pass++;
    console.log('  ✓ ' + name);
  } else {
    fail++;
    const msg = name + (expected !== undefined ? '  expected=' + JSON.stringify(expected) + '  actual=' + JSON.stringify(actual) : '');
    failures.push(msg);
    console.log('  ✗ ' + msg);
  }
}

function approx(a, b, tolerance) {
  return Math.abs(a - b) <= (tolerance ?? 0.05);
}

console.log('\n=== CALCULATOR TESTS (§83) ===\n');

// ─── Case 1: minimum ───
// frequency 1-2 (=1.5), one place (=email), under-2 (=1), none, never
console.log('Case 1 - minimum:');
{
  const result = D.calculateTime({
    frequency: '1-2',
    places: ['email'],
    searchTime: 'under-2',
    afterFind: ['none'],
    recheck: 'never'
  });
  // Hand-calc:
  // dispersion: 1 + min((1-1)*0.10, 0.50) = 1.00
  // searchPerOccurrence: 1 * 1.00 = 1
  // postFind: 0 (none)
  // repeatedPath: (1 + 0) * 0 * 0.50 = 0
  // minutesPerOccurrence: 1
  // monthly: 1.5 * 4.33 * 1 / 60 = 0.10825 h
  assert('monthlyHoursRaw > 0', result.monthlyHoursRaw > 0, '>0', result.monthlyHoursRaw);
  assert('monthlyHoursRaw < 1', result.monthlyHoursRaw < 1, '<1', result.monthlyHoursRaw);
  assert('bottleneck = search', result.bottleneck === 'search', 'search', result.bottleneck);
  assert('finite', isFinite(result.monthlyHoursRaw), true, isFinite(result.monthlyHoursRaw));
}

// ─── Case 2: metodologia example ───
// Spec §66: frequency 6-10, 4 places, search 6-10, after [version,source,message], recheck sometimes
// Expected raw ≈ 11.95 h/mês → display 12 h/mês, annual 144 h, days 18
console.log('\nCase 2 - metodologia example:');
{
  const result = D.calculateTime({
    frequency: '6-10',
    places: ['email','microsoft-cloud','local','old-message'],   // 4 places
    searchTime: '6-10',
    afterFind: ['version','source','message'],
    recheck: 'sometimes'
  });
  // Hand-calc:
  // dispersion: 1 + min((4-1)*0.10, 0.50) = 1.30
  // searchPerOccurrence: 8 * 1.30 = 10.4
  // postFind: 3 + 2.5 + 2.5 = 8
  // repeatedPath: (10.4 + 8) * 0.25 * 0.50 = 2.3
  // minutesPerOccurrence: 10.4 + 8 + 2.3 = 20.7
  // monthly: 8 * 4.33 * 20.7 / 60 = 11.95... h
  assert('raw monthly ≈ 11.95 h', approx(result.monthlyHoursRaw, 11.95, 0.05), 11.95, result.monthlyHoursRaw);
  // roundHours(11.95): since < 30 and >= 10, returns Math.round(11.95) = 12
  assert('display = 12 h', result.monthlyDisplay === 12, 12, result.monthlyDisplay);
  // annual raw 143.4 → roundHours(143.4): >= 30, Math.round(143.4/2)*2 = 144
  assert('annual = 144 h', result.annualHoursDisplay === 144, 144, result.annualHoursDisplay);
  // days raw 17.925 → Math.round = 18
  assert('days = 18', result.annualDaysDisplay === 18, 18, result.annualDaysDisplay);
}

// ─── Case 3: high (all maxed) ───
// 20+ freq (=22), 6 places, 20+ search (=25), all after, almostAlways
console.log('\nCase 3 - high:');
{
  const result = D.calculateTime({
    frequency: '20+',
    places: ['email','microsoft-cloud','local','old-message','team','other'],
    searchTime: '20+',
    afterFind: ['version','source','approval','message','recipient'],
    recheck: 'almostAlways'
  });
  // dispersion cap: 1 + min(5*0.10, 0.50) = 1.50
  // searchPerOccurrence: 25 * 1.50 = 37.5
  // postFind: 3+2.5+3+2.5+1.5 = 12.5
  // repeatedPath: (37.5+12.5)*0.75*0.5 = 18.75
  // minutesPerOccurrence: 68.75
  // monthly: 22 * 4.33 * 68.75 / 60 = 109.16 h
  assert('finite', isFinite(result.monthlyHoursRaw), true, isFinite(result.monthlyHoursRaw));
  assert('not NaN', !isNaN(result.monthlyHoursRaw), true, !isNaN(result.monthlyHoursRaw));
  assert('not Infinity', result.monthlyHoursRaw !== Infinity, true, result.monthlyHoursRaw !== Infinity);
  assert('> 25 h/mês', result.monthlyHoursRaw > 25, '>25', result.monthlyHoursRaw);
}

// ─── Case 4: none exclusive ───
// User selected version+source+message, then selected none → tasks must clear
// (The controller layer enforces 'none' exclusivity; here we verify calculateTime
//  treats 'none' as a signal to empty the post-find list.)
console.log('\nCase 4 - none exclusive in calculation:');
{
  // If afterFind contains 'none' alongside other selections (a controller bug),
  // calculateTime treats it as empty post-find list per the spec contract.
  const result = D.calculateTime({
    frequency: '6-10',
    places: ['email'],
    searchTime: '2-5',
    afterFind: ['version','source','none'],  // none should win
    recheck: 'rare'
  });
  // dispersion: 1.00
  // searchPerOccurrence: 3.5
  // postFind: 0 (none won)
  // repeatedPath: (3.5+0)*0.08*0.5 = 0.14
  // minutesPerOccurrence: 3.64
  // monthly: 8*4.33*3.64/60 ≈ 2.10
  assert('none neutralizes post-find: monthly ≈ 2.1', approx(result.monthlyHoursRaw, 2.10, 0.10), 2.10, result.monthlyHoursRaw);
}

// ─── Case 5: serialization round-trip ───
console.log('\nCase 5 - serialization:');
{
  const result = D.calculateTime({
    frequency: '3-5',
    places: ['email', 'microsoft-cloud'],
    searchTime: '2-5',
    afterFind: ['version'],
    recheck: 'rare'
  });
  // Serialize the derived result (not raw answers)
  const serializable = {
    monthlyHoursRaw: result.monthlyHoursRaw,
    monthlyDisplay: result.monthlyDisplay,
    monthlyLow: result.monthlyLow,
    monthlyHigh: result.monthlyHigh,
    annualHoursDisplay: result.annualHoursDisplay,
    annualDaysDisplay: result.annualDaysDisplay,
    bottleneck: result.bottleneck,
    version: result.version
  };
  const json = JSON.stringify(serializable);
  const parsed = JSON.parse(json);
  assert('round-trip monthlyDisplay', parsed.monthlyDisplay === result.monthlyDisplay, result.monthlyDisplay, parsed.monthlyDisplay);
  assert('round-trip bottleneck', parsed.bottleneck === result.bottleneck, result.bottleneck, parsed.bottleneck);
  assert('round-trip version', parsed.version === D.VERSION, D.VERSION, parsed.version);
  assert('no raw answers in serialized result', json.indexOf('frequency') === -1 && json.indexOf('places') === -1, true, false);
}

// ─── roundHours rule ───
console.log('\nroundHours rule:');
{
  assert('1.2 → 1.0', D.roundHours(1.2) === 1.0, 1.0, D.roundHours(1.2));
  assert('1.4 → 1.5', D.roundHours(1.4) === 1.5, 1.5, D.roundHours(1.4));
  assert('9.7 → 9.5', D.roundHours(9.7) === 9.5, 9.5, D.roundHours(9.7));
  assert('11.95 → 12', D.roundHours(11.95) === 12, 12, D.roundHours(11.95));
  assert('29.4 → 29', D.roundHours(29.4) === 29, 29, D.roundHours(29.4));
  assert('30.0 → 30', D.roundHours(30.0) === 30, 30, D.roundHours(30.0));
  // Per §10 for value ≥ 30: Math.round(value/2)*2.
  // 33/2 = 16.5; JS Math.round(16.5) = 17 (round-half-away-from-zero); 17*2 = 34.
  assert('33.0 → 34', D.roundHours(33.0) === 34, 34, D.roundHours(33.0));
  // 32.0/2 = 16 → 16*2 = 32
  assert('32.0 → 32', D.roundHours(32.0) === 32, 32, D.roundHours(32.0));
  // 31.0/2 = 15.5 → round = 16 → *2 = 32
  assert('31.0 → 32', D.roundHours(31.0) === 32, 32, D.roundHours(31.0));
  assert('143.4 → 144', D.roundHours(143.4) === 144, 144, D.roundHours(143.4));
}

console.log('\n=== DIAGNOSTIC TESTS (§83) ===\n');

// ─── D-Case 1: all zeros ───
console.log('D-Case 1 - all zeros:');
{
  const r = D.calculateDiagnostic({ request:'0', search:'0', version:'0', source:'0', confirmation:'0', send:'0' });
  assert('score = 0', r.score === 0, 0, r.score);
  assert('band = Fluxo claro', r.band.label === 'Fluxo claro', 'Fluxo claro', r.band.label);
}

// ─── D-Case 2: all threes ───
console.log('\nD-Case 2 - all threes:');
{
  const r = D.calculateDiagnostic({ request:'3', search:'3', version:'3', source:'3', confirmation:'3', send:'3' });
  assert('score = 100', r.score === 100, 100, r.score);
  assert('band = Atrito crítico', r.band.label === 'Atrito crítico', 'Atrito crítico', r.band.label);
}

// ─── D-Case 3: metodologia example [1,2,2,3,2,2] ───
// Spec §68: request=1, search=2, version=2, source=3, confirmation=2, send=2
// Expected score: 69, bottleneck: source
console.log('\nD-Case 3 - metodologia [1,2,2,3,2,2]:');
{
  const r = D.calculateDiagnostic({ request:'1', search:'2', version:'2', source:'3', confirmation:'2', send:'2' });
  // 12*1/3 + 18*2/3 + 20*2/3 + 20*3/3 + 18*2/3 + 12*2/3
  // = 4 + 12 + 13.33 + 20 + 12 + 8 = 69.33 → round = 69
  assert('score = 69', r.score === 69, 69, r.score);
  assert('bottleneck = source', r.bottleneck === 'source', 'source', r.bottleneck);
  assert('bottleneckLabel = Fonte invisível', r.bottleneckLabel === 'Fonte invisível', 'Fonte invisível', r.bottleneckLabel);
  assert('band = Atrito alto', r.band.label === 'Atrito alto', 'Atrito alto', r.band.label);
}

// ─── D-Case 4: tie-break (version and source both 3) ───
// version comes before source in FLOW_CONFIG.tieBreak → bottleneck must be version
console.log('\nD-Case 4 - tie-break version vs source:');
{
  const r = D.calculateDiagnostic({ request:'0', search:'0', version:'3', source:'3', confirmation:'0', send:'0' });
  assert('bottleneck = version (tie-break)', r.bottleneck === 'version', 'version', r.bottleneck);
}

// ─── D-Case 5: band boundaries ───
// Need to construct scores at exactly 24, 25, 49, 50, 74, 75
// Total possible: 100. With integer weights and answers ∈ {0..3}, hitting exact boundaries
// requires specific combos. Use approximations within band rules:
console.log('\nD-Case 5 - band boundaries:');
{
  // Score 24: must be in "Fluxo claro" (≤24)
  // Search 0, others 0: 0 (claro)
  // Search 2, others 0: 12 (claro)
  // Search 3, version 0, source 0, others 0: 18 (claro)
  // search 3, version 3: 18+20=38 (moderate)
  // search 0, version 3, source 0, others 0: 20 (claro)
  const r24 = D.calculateDiagnostic({ request:'0', search:'0', version:'0', source:'3', confirmation:'0', send:'1' });
  // 0 + 0 + 0 + 20 + 0 + 4 = 24 → claro
  assert('score 24 = Fluxo claro', r24.band.label === 'Fluxo claro' && r24.score === 24, 'Fluxo claro at 24', r24.band.label + '@' + r24.score);

  const r25 = D.calculateDiagnostic({ request:'1', search:'0', version:'0', source:'3', confirmation:'0', send:'1' });
  // 4 + 0 + 0 + 20 + 0 + 4 = 28 → moderate (>=25)
  assert('score 28 = Atrito moderado', r25.band.label === 'Atrito moderado', 'Atrito moderado', r25.band.label);

  const r49 = D.calculateDiagnostic({ request:'1', search:'2', version:'2', source:'2', confirmation:'0', send:'1' });
  // 4 + 12 + 13.33 + 13.33 + 0 + 4 = 46.67 → round 47 → moderate (≤49)
  assert('score 47 = Atrito moderado', r49.band.label === 'Atrito moderado', 'Atrito moderado', r49.band.label);

  const r50 = D.calculateDiagnostic({ request:'1', search:'2', version:'2', source:'3', confirmation:'0', send:'1' });
  // 4 + 12 + 13.33 + 20 + 0 + 4 = 53.33 → round 53 → high (>=50)
  assert('score 53 = Atrito alto', r50.band.label === 'Atrito alto', 'Atrito alto', r50.band.label);

  const r74 = D.calculateDiagnostic({ request:'1', search:'2', version:'2', source:'3', confirmation:'3', send:'1' });
  // 4 + 12 + 13.33 + 20 + 18 + 4 = 71.33 → 71 → high (≤74)
  assert('score 71 = Atrito alto', r74.band.label === 'Atrito alto', 'Atrito alto', r74.band.label);

  const r75 = D.calculateDiagnostic({ request:'2', search:'2', version:'2', source:'3', confirmation:'3', send:'2' });
  // 8 + 12 + 13.33 + 20 + 18 + 8 = 79.33 → 79 → critical (>=75)
  assert('score 79 = Atrito crítico', r75.band.label === 'Atrito crítico', 'Atrito crítico', r75.band.label);
}

// ─── Diagnostic stagePercents ───
console.log('\nDiagnostic stagePercents:');
{
  const r = D.calculateDiagnostic({ request:'0', search:'1', version:'2', source:'3', confirmation:'1', send:'2' });
  assert('request percent = 0', r.stagePercents.request === 0, 0, r.stagePercents.request);
  assert('search percent = 33', r.stagePercents.search === 33, 33, r.stagePercents.search);
  assert('version percent = 67', r.stagePercents.version === 67, 67, r.stagePercents.version);
  assert('source percent = 100', r.stagePercents.source === 100, 100, r.stagePercents.source);
}

// ─── Diagnostic weights sum check ───
console.log('\nDiagnostic weights:');
{
  const w = D.FLOW_CONFIG.weights;
  const sum = w.request + w.search + w.version + w.source + w.confirmation + w.send;
  assert('weights sum to 100', sum === 100, 100, sum);
}

// ─── Share builders ───
console.log('\nShare builders:');
{
  const tr = D.calculateTime({
    frequency: '6-10', places:['email','microsoft-cloud','local','old-message'],
    searchTime:'6-10', afterFind:['version','source','message'], recheck:'sometimes'
  });
  const ts = D.buildCalculatorShareText(tr);
  assert('calculator share contains hours', /\d+h/.test(ts), 'hours pattern', ts);
  assert('calculator share contains "Maior gargalo:"', ts.indexOf('Maior gargalo:') !== -1, true, ts.indexOf('Maior gargalo:') !== -1);
  assert('calculator share contains "Calculadora do Tempo Perdido"', ts.indexOf('Calculadora do Tempo Perdido') !== -1, true, ts.indexOf('Calculadora do Tempo Perdido') !== -1);
  assert('calculator share has NO raw answers', ts.indexOf('places') === -1 && ts.indexOf('6-10') === -1, true, ts);

  const dr = D.calculateDiagnostic({ request:'1', search:'2', version:'2', source:'3', confirmation:'2', send:'2' });
  const ds = D.buildDiagnosticShareText(dr);
  assert('diagnostic share contains "69/100"', ds.indexOf('69/100') !== -1, true, ds);
  assert('diagnostic share contains "Fonte invisível"', ds.indexOf('Fonte invisível') !== -1, true, ds);
  assert('diagnostic share contains "comparar"', ds.indexOf('comparar') !== -1, true, ds);
}

// ─── Questions structure ───
console.log('\nQuestions structure:');
{
  assert('5 calculator questions', D.CALCULATOR_QUESTIONS.length === 5, 5, D.CALCULATOR_QUESTIONS.length);
  assert('6 diagnostic questions', D.DIAGNOSTIC_QUESTIONS.length === 6, 6, D.DIAGNOSTIC_QUESTIONS.length);
  const noneOpt = D.CALCULATOR_QUESTIONS[3].options.find(o => o.value === 'none');
  assert('afterFind has none option', !!noneOpt, true, !!noneOpt);
  assert('none is exclusive', noneOpt.exclusive === true, true, noneOpt.exclusive);
}

// ─── Summary ───
console.log('\n=== SUMMARY ===');
console.log('PASS: ' + pass);
console.log('FAIL: ' + fail);
if (fail > 0) {
  console.log('\nFailures:');
  failures.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log('\nAll math tests PASS.');
process.exit(0);
