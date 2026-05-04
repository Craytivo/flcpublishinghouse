// main.js - Entry point that initializes everything

import './config.js';
import { initHero } from './modules/hero.js';
import { initFeaturedPosts } from './modules/featured.js';
import { initDevotionals } from './modules/devotionals.js';
import { initScrollAnimations } from './modules/animations.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initForm } from './modules/form.js';

// Initialize all modules when DOM is ready
function initApp() {
  initHero();
  initFeaturedPosts();
  initDevotionals();
  initScrollAnimations();
  initScrollTop();
  initForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
