// pages/post.js - Entry point for post page

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';
import { initPostFeatures } from '../modules/post-content.js';

// Initialize all modules when DOM is ready
async function initPostPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initPageTransition();
    initScrollTop();
    initPostFeatures();
  } catch (error) {
    console.error('Error initializing post page:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPostPage);
} else {
  initPostPage();
}
