// pages/bible-studies.js - Entry point for bible-studies page

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';
import { initBibleStudies } from '../modules/bible-studies.js';

setTimeout(() => { document.body.classList.add('pt-ready'); }, 3000);

// Initialize all modules when DOM is ready
async function initBibleStudiesPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initScrollTop();
    initBibleStudies();
  } catch (error) {
    console.error('Error initializing bible studies page:', error);
  } finally {
    initPageTransition();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBibleStudiesPage);
} else {
  initBibleStudiesPage();
}
