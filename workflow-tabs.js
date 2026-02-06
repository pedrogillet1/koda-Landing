// Workflow Tabs - Accessible Tab Switching with Cross-Fade Animation
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const tablist = document.querySelector('.workflow-tabs');

    if (!tablist) {
      return;
    }

    const tabs = tablist.querySelectorAll('.workflow-tab');
    const panels = document.querySelectorAll('.workflow-panel');
    const FADE_DURATION = 180; // matches CSS transition

    // Tab switching function with cross-fade
    function switchTab(newTab) {
      const currentPanel = document.querySelector('.workflow-panel.is-active');
      const newPanelId = newTab.getAttribute('aria-controls');
      const newPanel = document.getElementById(newPanelId);

      // Skip if clicking the already-active tab
      if (newTab.classList.contains('is-active')) {
        return;
      }

      // Deactivate all tabs immediately
      tabs.forEach(function(tab) {
        tab.classList.remove('is-active');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
      });

      // Activate the new tab
      newTab.classList.add('is-active');
      newTab.setAttribute('aria-selected', 'true');
      newTab.setAttribute('tabindex', '0');

      // Cross-fade panels (no layout shift)
      if (currentPanel && newPanel && currentPanel !== newPanel) {
        // Fade out current panel
        currentPanel.style.opacity = '0';

        // After fade out, switch panels
        setTimeout(function() {
          // Hide old panel
          currentPanel.classList.remove('is-active');
          currentPanel.setAttribute('hidden', '');
          currentPanel.style.opacity = '';

          // Show new panel (starts at opacity 0 from CSS)
          newPanel.removeAttribute('hidden');
          newPanel.classList.add('is-active');

          // Force reflow to ensure CSS transition triggers
          void newPanel.offsetWidth;

          // Fade in new panel
          newPanel.style.opacity = '1';
        }, FADE_DURATION);
      } else if (newPanel) {
        // Fallback: just show the new panel
        panels.forEach(function(panel) {
          if (panel !== newPanel) {
            panel.classList.remove('is-active');
            panel.setAttribute('hidden', '');
          }
        });
        newPanel.removeAttribute('hidden');
        newPanel.classList.add('is-active');
        newPanel.style.opacity = '1';
      }
    }

    // Click handler for tabs
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        switchTab(tab);
      });
    });

    // Keyboard navigation (ARIA best practices)
    tablist.addEventListener('keydown', function(e) {
      const currentTab = document.activeElement;

      if (!currentTab.classList.contains('workflow-tab')) {
        return;
      }

      const tabsArray = Array.from(tabs);
      const currentIndex = tabsArray.indexOf(currentTab);
      let newIndex;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = currentIndex === 0 ? tabsArray.length - 1 : currentIndex - 1;
          switchTab(tabsArray[newIndex]);
          tabsArray[newIndex].focus();
          break;

        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = currentIndex === tabsArray.length - 1 ? 0 : currentIndex + 1;
          switchTab(tabsArray[newIndex]);
          tabsArray[newIndex].focus();
          break;

        case 'Home':
          e.preventDefault();
          switchTab(tabsArray[0]);
          tabsArray[0].focus();
          break;

        case 'End':
          e.preventDefault();
          switchTab(tabsArray[tabsArray.length - 1]);
          tabsArray[tabsArray.length - 1].focus();
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          switchTab(currentTab);
          break;
      }
    });

    // Initialize: ensure first tab is active
    if (tabs.length > 0) {
      const activeTab = tablist.querySelector('.workflow-tab.is-active') || tabs[0];

      // Set initial ARIA states
      tabs.forEach(function(tab) {
        if (tab === activeTab) {
          tab.setAttribute('tabindex', '0');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('tabindex', '-1');
          tab.setAttribute('aria-selected', 'false');
        }
      });

      // Ensure correct panel is shown
      const activePanelId = activeTab.getAttribute('aria-controls');
      panels.forEach(function(panel) {
        if (panel.id === activePanelId) {
          panel.classList.add('is-active');
          panel.removeAttribute('hidden');
          panel.style.opacity = '1';
        } else {
          panel.classList.remove('is-active');
          panel.setAttribute('hidden', '');
        }
      });
    }
  });
})();
