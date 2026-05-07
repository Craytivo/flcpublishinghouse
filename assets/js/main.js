// main.js - Entry point that initializes everything

import './config.js';
import { initHeader } from './header.js';
import { initFooter } from './footer.js';
import { initNavigation } from './navigation.js';
import { initFeaturedPosts } from './modules/featured.js';
import { initDevotionals } from './modules/devotionals.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from './modules/animations.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initForm } from './modules/form.js';
import { initSearch } from './modules/search.js';

// Safety: never leave the page invisible for more than 3 seconds
setTimeout(() => { document.body.classList.add('pt-ready'); }, 3000);

// Initialize all modules when DOM is ready
async function initApp() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initFeaturedPosts();
    initDevotionals();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initScrollTop();
    initForm();
  } catch (error) {
    console.error('Error initializing app:', error);
  } finally {
    initPageTransition();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
