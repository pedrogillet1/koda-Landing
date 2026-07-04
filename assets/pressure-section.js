/**
 * Pressure section — "Momentos em que ninguém quer adivinhar."
 *
 *  ▸ Desktop: 3-tab use-case selector. User-controlled (click +
 *    ArrowUp/Down/Left/Right + Home/End). On tab change the copy
 *    column + product proof update content with a brief exit/enter
 *    fade. No autoplay. No setInterval. No timer.
 *
 *  ▸ Mobile / tablet: 3 vertical stories. IntersectionObserver reveals
 *    each story when 20% in view — one-shot. No tabs, no carousel.
 *
 *  Honors prefers-reduced-motion.
 */
(function() {
  'use strict';

  var section = document.querySelector('.pressure-section');
  if (!section) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ──────────────── DATA ────────────────
  var CONTEXTS = [
    {
      role:    'JURÍDICO',
      moment:  'Antes da revisão do sócio',
      desc:    'Compare versões, encontre a cláusula exata e leve a fonte para a revisão.',
      cta:     'Ver para advogados',
      href:    '/use-case-legal.html',
      chips:   ['SharePoint', 'Outlook', 'Uploads'],
      question:'mostre as alterações da cláusula 12.4 entre v2 e v3',
      answer:  '3 alterações encontradas',
      answerSub: null,
      details: [
        'Prazo de notificação: 30 para 45 dias',
        'Limite de indenização: R$ 2 mi para R$ 2,5 mi',
        'Exceção de fraude adicionada'
      ],
      metrics: null,
      sourceMain: 'Contrato_Anderson_v4.pdf · p. 8',
      sourceMeta: 'Comparação: v2 e v3'
    },
    {
      role:    'FINANCEIRO',
      moment:  'Antes da reunião do conselho',
      desc:    'Encontre o deck certo, confirme o número e responda com a origem visível.',
      cta:     'Ver para financeiro',
      href:    '/use-case-finance.html',
      chips:   ['OneDrive', 'SharePoint', 'Outlook'],
      question:'qual foi a receita recorrente no último deck do conselho?',
      answer:  'R$ 18,4 mi',
      answerSub: 'Receita recorrente',
      details: null,
      metrics: [
        { label: 'Última versão', value: '14 mar' },
        { label: 'Local',         value: 'slide 7' }
      ],
      sourceMain: 'Deck_Conselho_Q4.pdf · slide 7',
      sourceMeta: 'Última versão · 14 mar'
    },
    {
      role:    'OPERAÇÕES',
      moment:  'Antes do retorno ao cliente',
      desc:    'Encontre o escopo aprovado, recupere o contexto e revise a resposta antes de enviar.',
      cta:     'Ver para operações',
      href:    '/use-case-business.html',
      chips:   ['SharePoint', 'OneDrive', 'Uploads'],
      question:'resuma as entregas do escopo aprovado',
      answer:  '3 entregas confirmadas',
      answerSub: null,
      details: [
        'Implantação do fluxo',
        'Treinamento da equipe',
        'Suporte inicial de 30 dias'
      ],
      metrics: null,
      sourceMain: 'Escopo_Cliente_Alfa_v2.docx · p. 3',
      sourceMeta: 'Escopo aprovado'
    }
  ];

  // ──────────────── DESKTOP TABS ────────────────
  var desktop = section.querySelector('.pressure-desktop');
  if (desktop) initDesktop(desktop);

  function initDesktop(root) {
    var tabs   = root.querySelectorAll('.pressure-tab');
    var stage  = root.querySelector('.pressure-stage');
    var role   = root.querySelector('#pressure-role');
    var moment = root.querySelector('#pressure-moment');
    var desc   = root.querySelector('#pressure-desc');
    var cta    = root.querySelector('#pressure-cta');
    var ctaTx  = root.querySelector('#pressure-cta-text');
    var chips  = root.querySelector('#pressure-chips');
    var question = root.querySelector('#pressure-question');
    var answer = root.querySelector('#pressure-answer');
    var answerSub = root.querySelector('#pressure-answer-sub');
    var details = root.querySelector('#pressure-details');
    var metrics = root.querySelector('#pressure-metrics');
    var sourceMain = root.querySelector('#pressure-source-main');
    var sourceMeta = root.querySelector('#pressure-source-meta');
    var panel = root.querySelector('#pressure-panel');
    var current = 0;

    function renderContext(idx) {
      var c = CONTEXTS[idx];
      role.textContent   = c.role;
      moment.textContent = c.moment;
      desc.textContent   = c.desc;
      ctaTx.textContent  = c.cta;
      cta.setAttribute('href', c.href);

      // Source chips
      chips.innerHTML = '';
      c.chips.forEach(function(name) {
        var s = document.createElement('span');
        s.className = 'pressure-chip';
        s.textContent = name;
        chips.appendChild(s);
      });

      question.textContent = c.question;
      answer.textContent   = c.answer;

      if (c.answerSub) {
        answerSub.textContent = c.answerSub;
        answerSub.hidden = false;
      } else {
        answerSub.hidden = true;
      }

      // Details vs metrics
      if (c.details) {
        details.innerHTML = '';
        c.details.forEach(function(t, i) {
          var row = document.createElement('div');
          row.className = 'pressure-detail';
          var num = document.createElement('span');
          num.className = 'pressure-detail__num';
          num.textContent = String(i + 1).padStart(2, '0');
          var tx = document.createElement('span');
          tx.className = 'pressure-detail__text';
          tx.textContent = t;
          row.appendChild(num);
          row.appendChild(tx);
          details.appendChild(row);
        });
        details.hidden = false;
        metrics.hidden = true;
      } else if (c.metrics) {
        metrics.innerHTML = '';
        c.metrics.forEach(function(m) {
          var box = document.createElement('div');
          box.className = 'pressure-metric';
          var lbl = document.createElement('span');
          lbl.className = 'pressure-metric__label';
          lbl.textContent = m.label;
          var val = document.createElement('span');
          val.className = 'pressure-metric__value';
          val.textContent = m.value;
          box.appendChild(lbl);
          box.appendChild(val);
          metrics.appendChild(box);
        });
        metrics.hidden = false;
        details.hidden = true;
      }

      sourceMain.textContent = c.sourceMain;
      sourceMeta.textContent = c.sourceMeta;
    }

    function setTab(idx) {
      if (idx === current) return;
      if (idx < 0 || idx > 2) return;

      // Update tab states
      tabs.forEach(function(t, i) {
        t.classList.toggle('is-active', i === idx);
        t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        t.setAttribute('tabindex', i === idx ? '0' : '-1');
      });

      // Update panel aria
      panel.setAttribute('aria-labelledby', 'pressure-tab-' + idx);
      desktop.setAttribute('data-active-tab', String(idx));

      if (prefersReduced) {
        renderContext(idx);
        current = idx;
        return;
      }

      // Exit, then enter
      stage.classList.add('is-transitioning');
      setTimeout(function() {
        renderContext(idx);
        current = idx;
        stage.classList.remove('is-transitioning');
      }, 120);
    }

    tabs.forEach(function(t, i) {
      t.addEventListener('click', function() { setTab(i); t.focus(); });
    });

    var tablist = root.querySelector('.pressure-tabs');
    if (tablist) {
      tablist.addEventListener('keydown', function(e) {
        var idx = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') idx = (current + 1) % 3;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') idx = (current - 1 + 3) % 3;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End')  idx = 2;
        else return;
        e.preventDefault();
        setTab(idx);
        if (tabs[idx]) tabs[idx].focus();
      });
    }
  }

  // ──────────────── MOBILE IO ────────────────
  var stories = section.querySelectorAll('.pressure-mobile-story');
  if (stories.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    stories.forEach(function(s) { io.observe(s); });
  } else {
    stories.forEach(function(s) { s.classList.add('is-revealed'); });
  }
})();
