// pages/post.js - Entry point for post page

import '../config.js';
import { initScrollAnimations } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initPostFeatures } from '../modules/post-content.js';

// Initialize all modules when DOM is ready
function initPostPage() {
  try {
    initScrollAnimations();
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
