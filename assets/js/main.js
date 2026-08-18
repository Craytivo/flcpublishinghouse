// main.js - Entry point that initializes everything

import './config.js?v=1.0.2';
import { initHeader } from './header.js?v=1.0.2';
import { initFooter } from './footer.js?v=1.0.2';
import { initNavigation } from './navigation.js?v=1.0.2';
import { initFeaturedPosts } from './modules/featured.js?v=1.0.2';
import { initDevotionals } from './modules/devotionals.js?v=1.0.2';
import { initHeroTabs } from './modules/hero-tabs.js?v=1.0.2';
import { initScrollAnimations, initSearchModal, initPageTransition } from './modules/animations.js?v=1.0.2';
import { initScrollTop } from './modules/scrollTop.js?v=1.0.2';
import { initForm } from './modules/form.js?v=1.0.2';
import { initSearch } from './modules/search.js?v=1.0.2';

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
    initHeroTabs();
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
