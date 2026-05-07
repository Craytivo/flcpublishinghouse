// pages/resources.js - Entry point for resources page

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initResourcesSermons } from '../modules/resources-sermons.js';
import { initResourcesDetox } from '../modules/resources-detox.js';
import { initResourcesDevotionals } from '../modules/resources-devotionals.js';
import { initResourcesModal } from '../modules/resources-modal.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';
import { initResourcesSearch } from '../modules/resources-search.js';

// Initialize all modules when DOM is ready
async function initResourcesPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
  } catch (e) {
    console.error('Layout init error:', e);
  }
  try {
    initResourcesSermons();
    initResourcesDetox();
    initResourcesDevotionals();
    initResourcesModal();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initPageTransition();
    initScrollTop();
    initResourcesSearch();
  } catch (e) {
    console.error('Page init error:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResourcesPage);
} else {
  initResourcesPage();
}
