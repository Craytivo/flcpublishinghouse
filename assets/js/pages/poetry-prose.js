import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initScrollTop } from '../modules/scrollTop.js';
import { initSearch } from '../modules/search.js';
import { initPoetryProse } from '../modules/poetry-prose.js';

setTimeout(() => { document.body.classList.add('pt-ready'); }, 3000);

async function initPoetryProsePage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initScrollTop();
    await initPoetryProse();
  } catch (error) {
    console.error('Error initializing Poetry & Prose page:', error);
  } finally {
    initPageTransition();
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPoetryProsePage);
else initPoetryProsePage();
