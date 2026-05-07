// pages/sermons.js - Entry point for sermons page

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';
import { initSermons } from '../modules/sermons.js';

// Initialize all modules when DOM is ready
async function initSermonsPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initPageTransition();
    initScrollTop();
    initSermons();
  } catch (error) {
    console.error('Error initializing sermons page:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSermonsPage);
} else {
  initSermonsPage();
}
