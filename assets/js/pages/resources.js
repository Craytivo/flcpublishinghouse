// pages/resources.js - Entry point for resources page

import '../config.js';
import { initResourcesSermons } from '../modules/resources-sermons.js';
import { initResourcesDetox } from '../modules/resources-detox.js';
import { initResourcesDevotionals } from '../modules/resources-devotionals.js';
import { initResourcesBooks } from '../modules/resources-books.js';
import { initResourcesModal } from '../modules/resources-modal.js';
import { initScrollAnimations } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';

// Initialize all modules when DOM is ready
function initResourcesPage() {
  initResourcesSermons();
  initResourcesDetox();
  initResourcesDevotionals();
  initResourcesBooks();
  initResourcesModal();
  initScrollAnimations();
  initScrollTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResourcesPage);
} else {
  initResourcesPage();
}
