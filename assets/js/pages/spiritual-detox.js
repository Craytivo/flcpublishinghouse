// pages/spiritual-detox.js - Entry point for spiritual-detox page

import '../config.js';
import { initScrollAnimations } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';

// Initialize all modules when DOM is ready
function initSpiritualDetoxPage() {
  initScrollAnimations();
  initScrollTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSpiritualDetoxPage);
} else {
  initSpiritualDetoxPage();
}
