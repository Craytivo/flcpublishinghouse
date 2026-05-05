// pages/sermons.js - Entry point for sermons page

import '../config.js';
import { initScrollAnimations } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSermons } from '../modules/sermons.js';

// Initialize all modules when DOM is ready
function initSermonsPage() {
  try {
    initScrollAnimations();
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
