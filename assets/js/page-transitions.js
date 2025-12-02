// FLC Publishing House - Page Transitions & Performance Enhancements
// Smooth page transitions, lazy loading, and skeleton loaders

(function() {
  'use strict';
  
  // Page Transition Handler
  function initPageTransitions() {
    const pageTransition = document.getElementById('pageTransition');
    if (!pageTransition) return;
    
    const transitionLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"]):not([href^="javascript:"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    transitionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if it's an external link
        if (href.includes('://') && !href.includes(window.location.host)) {
          return;
        }
        
        e.preventDefault();
        pageTransition.classList.add('active');
        
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    });
    
    // Remove transition overlay on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        pageTransition.classList.remove('active');
      }, 200);
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        pageTransition.classList.remove('active');
      }
    });
  }
  
  // Lazy Loading Images with Intersection Observer
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Create a temporary image to load
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = img.dataset.src;
              img.classList.add('lazy-loaded');
              img.removeAttribute('data-src');
            };
            tempImg.src = img.dataset.src;
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.01
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('lazy-loaded');
        img.removeAttribute('data-src');
      });
    }
  }
  
  // Skeleton Loader - Hide when content is loaded
  function initSkeletonLoaders() {
    const skeletons = document.querySelectorAll('.skeleton-loader');
    
    skeletons.forEach(skeleton => {
      const targetContent = skeleton.nextElementSibling;
      
      if (targetContent) {
        // Wait for images in content to load
        const images = targetContent.querySelectorAll('img');
        let loadedCount = 0;
        
        if (images.length === 0) {
          // No images, hide skeleton immediately
          skeleton.style.display = 'none';
          targetContent.style.display = 'block';
        } else {
          images.forEach(img => {
            if (img.complete) {
              loadedCount++;
            } else {
              img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                  skeleton.style.display = 'none';
                  targetContent.style.display = 'block';
                }
              });
            }
          });
          
          // If all images already loaded
          if (loadedCount === images.length) {
            skeleton.style.display = 'none';
            targetContent.style.display = 'block';
          }
        }
      }
    });
  }
  
  // Progressive Enhancement - Fade in sections
  function initFadeInSections() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    if ('IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
      // Fallback - show all immediately
      fadeElements.forEach(el => el.classList.add('is-visible'));
    }
  }
  
  // Initialize all enhancements
  function init() {
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initPageTransitions();
        initLazyLoading();
        initSkeletonLoaders();
        initFadeInSections();
      });
    } else {
      initPageTransitions();
      initLazyLoading();
      initSkeletonLoaders();
      initFadeInSections();
    }
  }
  
  init();
})();
