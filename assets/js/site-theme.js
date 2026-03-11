(function () {
  const scrollTargets = [
    document.getElementById('scrollTopBtn'),
    document.getElementById('scrollTop'),
    document.querySelector('.back-to-top')
  ].filter(Boolean);

  if (scrollTargets.length) {
    const toggle = () => {
      const visible = window.scrollY > 500;
      scrollTargets.forEach((el) => {
        if (visible) el.classList.add('visible');
        else el.classList.remove('visible');
      });
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    scrollTargets.forEach((el) => {
      if (el.dataset.boundScrollTop === 'true') return;
      el.dataset.boundScrollTop = 'true';
      el.addEventListener('click', (e) => {
        if (el.tagName.toLowerCase() === 'a') e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  const modal = document.getElementById('subscriptionModal');
  const navSubscribe = document.getElementById('navSubscribe');
  const modalClose = document.getElementById('modalClose');
  if (modal && navSubscribe && modalClose) {
    const open = () => {
      modal.style.display = '';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (navSubscribe.dataset.boundModal !== 'true') {
      navSubscribe.dataset.boundModal = 'true';
      navSubscribe.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    }

    if (modalClose.dataset.boundModal !== 'true') {
      modalClose.dataset.boundModal = 'true';
      modalClose.addEventListener('click', close);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) close();
    });
  }
})();

// Swipe gesture functionality for mobile navigation
(function() {
  let startX, startY, endX, endY;
  const minSwipeDistance = 50;
  const maxVerticalDistance = 100;

  // Define sections for swipe navigation
  const sections = [
    { id: 'top', name: 'Top' },
    { id: 'collections', name: 'Collections' },
    { id: 'books', name: 'Books' }
  ];

  function getCurrentSection() {
    const scrollY = window.scrollY;
    let currentSection = 0;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i].id);
      if (element && element.offsetTop <= scrollY + 100) {
        currentSection = i;
        break;
      }
    }

    return currentSection;
  }

  function scrollToSection(sectionIndex) {
    const section = sections[sectionIndex];
    if (!section) return;

    const element = document.getElementById(section.id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  function handleSwipe(direction) {
    const currentSection = getCurrentSection();
    let nextSection;

    if (direction === 'left') {
      nextSection = Math.min(currentSection + 1, sections.length - 1);
    } else if (direction === 'right') {
      nextSection = Math.max(currentSection - 1, 0);
    }

    if (nextSection !== currentSection) {
      scrollToSection(nextSection);
    }
  }

  // Touch event handlers
  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    if (!startX || !startY) return;

    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    const deltaX = startX - endX;
    const deltaY = startY - endY;

    // Check if it's a horizontal swipe (not vertical)
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < maxVerticalDistance) {
      if (deltaX > 0) {
        // Swipe left - next section
        handleSwipe('left');
      } else {
        // Swipe right - previous section
        handleSwipe('right');
      }
    }

    // Reset coordinates
    startX = null;
    startY = null;
  }

  // Only add swipe listeners on mobile devices
  if (window.innerWidth <= 768) {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Optional: Add visual feedback for swipe gestures
  let swipeIndicatorTimeout;
  function showSwipeIndicator() {
    clearTimeout(swipeIndicatorTimeout);

    let indicator = document.getElementById('swipe-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'swipe-indicator';
      indicator.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-flcNavy/90 text-white px-4 py-2 rounded-full text-sm font-medium z-50 opacity-0 transition-opacity duration-300';
      indicator.textContent = 'Swipe to navigate sections';
      document.body.appendChild(indicator);
    }

    indicator.classList.remove('opacity-0');
    indicator.classList.add('opacity-100');

    swipeIndicatorTimeout = setTimeout(() => {
      indicator.classList.remove('opacity-100');
      indicator.classList.add('opacity-0');
    }, 3000);
  }

  // Show swipe indicator on first visit to mobile
  if (window.innerWidth <= 768 && !localStorage.getItem('swipe-indicator-shown')) {
    setTimeout(showSwipeIndicator, 2000);
    localStorage.setItem('swipe-indicator-shown', 'true');
  }
})();

// Progressive disclosure functionality for collection cards
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent card click navigation

        const card = this.closest('.collection-card');
        const expandableContent = card.querySelector('.expandable-content');
        const expandText = this.querySelector('.expand-text');
        const icon = this.querySelector('svg');

        if (expandableContent.style.maxHeight === '0px' || !expandableContent.style.maxHeight) {
          // Expand
          expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px';
          expandText.textContent = 'Show Less';
          icon.style.transform = 'rotate(180deg)';
          this.classList.add('expanded');
        } else {
          // Collapse
          expandableContent.style.maxHeight = '0px';
          expandText.textContent = 'Show More';
          icon.style.transform = 'rotate(0deg)';
          this.classList.remove('expanded');
        }
      });
    });

    // Close expanded content when clicking elsewhere on the card
    document.addEventListener('click', function(e) {
      if (e.target.closest('.expand-btn')) return; // Don't close if clicking expand button

      const cards = document.querySelectorAll('.collection-card');
      cards.forEach(card => {
        const expandableContent = card.querySelector('.expandable-content');
        const expandBtn = card.querySelector('.expand-btn');
        const expandText = expandBtn?.querySelector('.expand-text');
        const icon = expandBtn?.querySelector('svg');

        if (expandableContent && expandableContent.style.maxHeight !== '0px' && expandableContent.style.maxHeight !== '') {
          expandableContent.style.maxHeight = '0px';
          if (expandText) expandText.textContent = 'Show More';
          if (icon) icon.style.transform = 'rotate(0deg)';
          if (expandBtn) expandBtn.classList.remove('expanded');
        }
      });
    });
  });
})();
