// pages/spiritual-detox.js - Entry point for spiritual-detox page

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';

setTimeout(() => { document.body.classList.add('pt-ready'); }, 3000);

// Initialize all modules when DOM is ready
async function initSpiritualDetoxPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initScrollTop();
  } catch (error) {
    console.error('Error initializing spiritual-detox page:', error);
  } finally {
    initPageTransition();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpiritualDetoxPage);
} else {
  initSpiritualDetoxPage();
}
