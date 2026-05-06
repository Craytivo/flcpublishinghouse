// modules/scrollTop.js - Scroll-to-top button logic

export function initScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  // Handle both Lenis smooth scroll and standard scroll
  const checkScrollPosition = () => {
    // Try Lenis first, fall back to standard window.scrollY
    const scrollY = window.lenisScroller 
      ? window.lenisScroller.actualScroll 
      : window.scrollY;
    
    if (scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  };

  // Listen to both scroll events and animation frames (for Lenis compatibility)
  window.addEventListener("scroll", checkScrollPosition, { passive: true });
  
  // Also check on animation frame for Lenis smooth scroll
  const raf = setInterval(() => {
    checkScrollPosition();
  }, 50);

  scrollTopBtn.addEventListener("click", () => {
    // Handle both Lenis and standard scroll
    if (window.lenisScroller) {
      window.lenisScroller.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}
