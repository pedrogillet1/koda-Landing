// Mobile Menu Toggle Functionality + Header Scroll Behavior
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mainNav = document.getElementById('main-nav');
        const body = document.body;

        // ============================================
        // HEADER SCROLL BEHAVIOR
        // ============================================
        if (mainNav) {
            let lastScrollY = window.scrollY;
            let ticking = false;

            function updateHeader() {
                const scrollY = window.scrollY;

                // Add/remove scrolled class based on scroll position
                if (scrollY > 50) {
                    mainNav.classList.add('is-scrolled');
                } else {
                    mainNav.classList.remove('is-scrolled');
                }

                lastScrollY = scrollY;
                ticking = false;
            }

            // Use requestAnimationFrame for smooth performance
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        updateHeader();
                    });
                    ticking = true;
                }
            }, { passive: true });

            // Initial check
            updateHeader();
        }

        if (!mobileMenuBtn || !mobileMenu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('Hamburger clicked!');
            e.preventDefault();
            e.stopPropagation();
            console.log('About to toggle menu');
            toggleMenu();
            console.log('Menu toggled, active class:', mobileMenu.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active')) {
                // Only close if clicking outside the menu
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    closeMenu();
                }
                // Don't close if clicking inside menu - let links work naturally
            }
        });

        // No special handling needed for menu links - they work naturally

        // Language dropdown toggle
        const langToggle = document.getElementById('mobile-lang-toggle');
        const langOptions = document.getElementById('mobile-lang-options');

        if (langToggle && langOptions) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                langOptions.classList.toggle('show');
            });
        }

        // Language switcher functionality in mobile menu
        const langButtons = document.querySelectorAll('.mobile-lang-btn');
        const currentLangSpan = document.getElementById('current-language');
        const currentLangMobile = document.getElementById('current-language-mobile');

        langButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');

                // Update active state
                langButtons.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');

                const langMap = {
                    'en': '🇬🇧 EN',
                    'pt': '🇧🇷 PT',
                    'es': '🇪🇸 ES'
                };

                const flagMap = {
                    'en': '🇬🇧',
                    'pt': '🇧🇷',
                    'es': '🇪🇸'
                };

                // Update current language display
                if (currentLangSpan) {
                    currentLangSpan.textContent = langMap[lang] || '🇬🇧 EN';
                }
                if (currentLangMobile) {
                    currentLangMobile.textContent = flagMap[lang] || '🇬🇧';
                }

                // Hide language options
                if (langOptions) {
                    langOptions.classList.remove('show');
                }

                // Trigger language change event for existing language switcher
                const existingLangLinks = document.querySelectorAll('[data-lang="' + lang + '"]');
                if (existingLangLinks.length > 0) {
                    existingLangLinks[0].click();
                }
            });
        });

        // Prevent scrolling when menu is open
        function toggleMenu() {
            const isActive = mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);

            if (isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close mobile menu if resizing to desktop
                if (window.innerWidth > 767 && mobileMenu.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });
    });
})();
