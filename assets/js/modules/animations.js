/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS.JS — Premium Animation System
   IntersectionObserver-based scroll reveals, parallax, image effects
   ═══════════════════════════════════════════════════════════════════════════ */

const CONFIG = {
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  staggerBase: 60,
  thresholds: { default: 0.12, early: 0.05, late: 0.25 }
};

function createObserver(threshold, rootMargin = '0px') {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin, root: null });
}

function initScrollReveals() {
  const observers = {
    default: createObserver(CONFIG.thresholds.default, '0px'),
    early: createObserver(CONFIG.thresholds.early, '-40px'),
    late: createObserver(CONFIG.thresholds.late, '0px')
  };

  document.querySelectorAll('.reveal-up').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.reveal-left').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.reveal-right').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.reveal-scale').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.fade-in-up').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.img-reveal').forEach(el => { el.classList.add('img-reveal'); observers.early.observe(el); });
  document.querySelectorAll('.stagger-children').forEach(el => observers.default.observe(el));
  document.querySelectorAll('.hero-line').forEach(el => observers.early.observe(el));
}

let parallaxElements = [];
let ticking = false;

function initParallax() {
  if (CONFIG.prefersReducedMotion) return;
  parallaxElements = [...document.querySelectorAll('.parallax-slow'), ...document.querySelectorAll('.parallax-subtle')];
  if (!parallaxElements.length) return;
  window.addEventListener('scroll', updateParallax, { passive: true });
}

function updateParallax() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = el.classList.contains('parallax-slow') ? 0.15 : 0.06;
      const yPos = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${yPos}px)`;
    });
    ticking = false;
  });
}

function initImageReveal() {
  const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
  images.forEach(img => {
    const parent = img.closest('.img-reveal, .img-hover-zoom') || img.parentElement;
    parent.classList.add('img-reveal');
    img.addEventListener('load', () => requestAnimationFrame(() => parent.classList.add('visible')));
    if (img.complete) parent.classList.add('visible');
  });
}

function initSearchModalAnimations() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearch = document.getElementById('closeSearch');
  const searchModalBackdrop = document.getElementById('searchModalBackdrop');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  if (!searchModal) return;
  const modal = searchModal.querySelector('.search-modal-enter');
  let activeIndex = -1;

  function getResultItems() {
    return searchResults ? [...searchResults.querySelectorAll('[role="option"]')] : [];
  }

  function setActiveResult(index) {
    const items = getResultItems();
    items.forEach((el, i) => {
      el.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    activeIndex = index;
    if (items[index]) items[index].scrollIntoView({ block: 'nearest' });
  }

  function openSearch() {
    searchModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    activeIndex = -1;
    requestAnimationFrame(() => {
      if (modal) modal.classList.add('open');
      setTimeout(() => searchInput?.focus(), 80);
    });
  }

  function closeSearchModal() {
    if (modal) modal.classList.remove('open');
    setTimeout(() => {
      searchModal.classList.add('hidden');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '<p class="text-base font-medium text-flcCharcoal/50 text-center py-10">Type to search...</p>';
      activeIndex = -1;
    }, 250);
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);
  if (searchModalBackdrop) searchModalBackdrop.addEventListener('click', closeSearchModal);

  // Cmd/Ctrl+K shortcut to open
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('hidden')) openSearch();
      else closeSearchModal();
    }
    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) closeSearchModal();
  });

  // Reset keyboard selection when user types (results re-render)
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      activeIndex = -1;
    });

    // Keyboard navigation within results
    searchInput.addEventListener('keydown', (e) => {
      const items = getResultItems();
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveResult(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveResult(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const link = items[activeIndex].querySelector('a') || items[activeIndex].closest('a');
        if (link) link.click();
      }
    });
  }
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenuBtn || !mobileMenu) return;
  mobileMenu.classList.add('mobile-drawer');
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-drawer-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-40';
  mobileMenu.before(backdrop);
  mobileMenu.querySelectorAll('a').forEach(el => el.classList.add('mobile-nav-item'));
  mobileMenuBtn.classList.add('hamburger');
  const lines = mobileMenuBtn.querySelectorAll('svg path, svg line');
  lines.forEach(line => line.classList.add('hamburger-line'));
  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove('hidden');
      backdrop.classList.add('open');
      mobileMenuBtn.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => mobileMenu.classList.add('open'));
    } else {
      mobileMenu.classList.remove('open');
      backdrop.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => mobileMenu.classList.add('hidden'), 400);
    }
  }
  mobileMenuBtn.addEventListener('click', () => { const isOpen = mobileMenu.classList.contains('open'); toggleMenu(!isOpen); });
  backdrop.addEventListener('click', () => toggleMenu(false));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileMenu.classList.contains('open')) toggleMenu(false); });
}

function isInternalLink(link) {
  if (link.target || link.download || link.hasAttribute('data-no-transition')) return false;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return false;
  if (/^https?:\/\//i.test(href) && !href.includes(location.hostname)) return false;
  return true;
}

function initPageTransitions() {
  // Body starts hidden via inline <style> in HTML: body{opacity:0}
  // This function reveals it smoothly and handles exit transitions.

  if (CONFIG.prefersReducedMotion) {
    document.body.classList.add('pt-ready');
    return;
  }

  // Inject only animation/transition rules (hiding is in HTML)
  const s = document.createElement('style');
  s.textContent = `
    body.pt-ready {
      animation: ptReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    @keyframes ptReveal {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    body.pt-exit {
      animation: none !important;
      opacity: 0 !important;
      transform: translateY(-8px) !important;
      transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1),
                  transform 0.3s cubic-bezier(0.4, 0, 1, 1);
      pointer-events: none;
    }
  `;
  document.head.appendChild(s);

  // Reveal page once DOM + styles are ready
  document.body.classList.add('pt-ready');

  // Re-show on browser back/forward (bfcache)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.classList.remove('pt-exit');
      document.body.classList.add('pt-ready');
    }
  });

  // Intercept internal link clicks for smooth exit
  let navigating = false;
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !isInternalLink(a) || navigating) return;
    e.preventDefault();
    navigating = true;
    const href = a.getAttribute('href');

    document.body.classList.remove('pt-ready');
    void document.body.offsetHeight;
    document.body.classList.add('pt-exit');

    const go = () => { if (navigating) { navigating = false; window.location.href = href; } };
    document.body.addEventListener('transitionend', (ev) => {
      if (ev.propertyName === 'opacity') go();
    }, { once: true });
    setTimeout(go, 380);
  });
}

function initFallbackTransitions() {
  // Unified in initPageTransitions
}

function initCardHovers() {
  document.querySelectorAll('.card-link').forEach(card => card.classList.add('card-glow'));
}

export function initAnimations() {
  if (CONFIG.prefersReducedMotion) {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .img-reveal, .stagger-children, .hero-line').forEach(el => el.classList.add('visible'));
    return;
  }
  initScrollReveals();
  initParallax();
  initImageReveal();
  initCardHovers();
}

export function initScrollAnimations() {
  initAnimations();
}

export function initMobileDrawer() {
  initMobileMenu();
}

export function initSearchModal() {
  initSearchModalAnimations();
}

export function initPageTransition() {
  initPageTransitions();
  initFallbackTransitions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}
