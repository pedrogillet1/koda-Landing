// Language Switcher — Allybi
// Handles ALL language selectors (mobile menu, footer, legacy header)
// and applies translations from /translations/{lang}.json

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── Language names ──
  const LANG_NAMES = {
    en: 'English',
    pt: 'Português (BR)',
    es: 'Español'
  };

  // ── Collect every language-selector widget on the page ──
  // Each widget has: a .language-toggle button, a .language-menu list, and optionally a label span
  const selectors = [];

  document.querySelectorAll('.language-selector').forEach(container => {
    const toggle = container.querySelector('.language-toggle');
    const menu = container.querySelector('.language-menu');
    const label = container.querySelector('[id$="current-language"], .lang-label');
    if (toggle && menu) {
      selectors.push({ container, toggle, menu, label });
    }
  });

  // ── Dropdown open/close for every selector ──
  selectors.forEach(({ container, toggle, menu }) => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = !menu.classList.contains('hidden');
      closeAllMenus();
      if (!wasOpen) {
        menu.classList.remove('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  function closeAllMenus() {
    selectors.forEach(({ toggle, menu }) => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Close all on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
      closeAllMenus();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });

  // ── Language selection (click on any [data-lang] inside any menu) ──
  selectors.forEach(({ menu }) => {
    menu.addEventListener('click', (e) => {
      const item = e.target.closest('[data-lang]');
      if (item) {
        e.preventDefault();
        e.stopPropagation();
        const lang = item.getAttribute('data-lang');
        setLanguage(lang);
      }
    });
  });

  // ── Set language ──
  async function setLanguage(lang) {
    try {
      localStorage.setItem('language', lang);

      // Update all labels
      const displayName = LANG_NAMES[lang] || 'English';
      selectors.forEach(({ label }) => {
        if (label) label.textContent = displayName;
      });

      // Apply translations
      await applyTranslations(lang);

      // Close all menus
      closeAllMenus();
    } catch (err) {
      console.error('Language switch error:', err);
    }
  }

  // ── Apply translations ──
  async function applyTranslations(lang) {
    try {
      // Detect base path: if served under /homepage/, use that prefix
      const basePath = window.location.pathname.includes('/homepage/') ? '/homepage/' : '';
      const resp = await fetch(basePath + 'translations/' + lang + '.json');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const translations = await resp.json();

      document.documentElement.setAttribute('lang', lang);

      document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.getAttribute('data-i18n-key');
        const value = resolve(translations, key);
        if (value != null) {
          if (el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', value);
          } else {
            el.innerHTML = value;
          }
        }
      });
    } catch (err) {
      console.error('Translation error:', err);
    }
  }

  // ── Resolve dot-notated key from nested object ──
  function resolve(obj, key) {
    return key.split('.').reduce((o, k) => (o && typeof o === 'object' && k in o ? o[k] : null), obj);
  }

  // ── Browser language suggestion (first visit) ──
  function suggestLanguage() {
    const browserLang = navigator.language.split('-')[0];
    const supported = ['pt', 'es'];
    if (!localStorage.getItem('language') && supported.includes(browserLang)) {
      const names = { pt: 'Português', es: 'Español' };
      const bar = document.createElement('div');
      bar.className = 'language-suggestion-bar';
      bar.innerHTML =
        '<span>Detected ' + names[browserLang] + ' — Switch?</span>' +
        '<div>' +
        '<button id="lang-yes">Yes</button>' +
        '<button id="lang-no">No</button>' +
        '</div>';
      document.body.appendChild(bar);

      document.getElementById('lang-yes').addEventListener('click', () => {
        setLanguage(browserLang);
        bar.remove();
      });
      document.getElementById('lang-no').addEventListener('click', () => {
        localStorage.setItem('language', 'en');
        bar.remove();
      });
    }
  }

  // ── Init ──
  const saved = localStorage.getItem('language');
  if (saved && saved !== 'en') {
    setLanguage(saved);
  } else if (!saved) {
    suggestLanguage();
  }
});
