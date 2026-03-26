// allybi-header.js — Header scroll behavior, dropdown management, mobile menu

(function() {
  'use strict';

  const header = document.getElementById('allybi-header');
  const mobileToggle = document.getElementById('allybi-mobile-toggle');
  const mobileMenu = document.getElementById('allybi-mobile-menu');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  // --- Scroll behavior ---
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (header) {
          header.classList.toggle('is-scrolled', scrollY > 40);
        }
        lastScroll = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Dropdown management ---
  function closeAllDropdowns() {
    dropdowns.forEach(d => d.classList.remove('is-open'));
  }

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');
      closeAllDropdowns();
      if (!isOpen) dropdown.classList.add('is-open');
    });

    // Keyboard: Escape closes
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        trigger.focus();
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
  });

  // --- Mobile menu ---
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active');
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Mobile dropdown toggles
    mobileMenu.querySelectorAll('.mobile-dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const parent = trigger.closest('.mobile-dropdown');
        if (parent) parent.classList.toggle('is-open');
      });
    });
  }
})();
