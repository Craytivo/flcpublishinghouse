// footer-component.js - Universal Footer Component for FLC Publishing House

function createFooter() {
  const footerContainer = document.getElementById('footerContainer');
  if (!footerContainer) return;

  // Get configuration from data attributes
  const config = JSON.parse(footerContainer.getAttribute('data-config') || '{}');
  const logoPath = config.logoPath || '../assets/images/Logo.png';
  const homePath = config.homePath || '../index.html';
  const libraryPath = config.libraryPath || 'library.html';
  const devotionalsPath = config.devotionalsPath || 'devotionals.html';
  const resourcesPath = config.resourcesPath || 'resources.html';
  const latestSermonPath = config.latestSermonPath || '../sermons/sermon-im-under-pressure.html';

  const footerHTML = `
  <!-- Premium Footer -->
  <footer class="relative bg-gradient-to-br from-[#0d2338] via-[#1A3A52] to-[#0a1921] text-white mt-20">
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
        
        <!-- Brand Section -->
        <div class="lg:col-span-1 text-center sm:text-left">
          <h3 class="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4 text-flcGold">FLC Publishing House</h3>
          <p class="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            Equipping believers with biblical truth and practical resources for spiritual growth.
          </p>
          <div class="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
            <a href="https://www.instagram.com/flcyeg/" target="_blank" rel="noopener noreferrer" class="w-11 h-11 sm:w-10 sm:h-10 bg-white/10 hover:bg-flcGold/20 rounded-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-heading font-bold mb-3 sm:mb-4 text-white">Explore</h4>
          <ul class="space-y-2 sm:space-y-2.5 flex flex-col items-center sm:items-start">
            <li><a href="${libraryPath}" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Library
            </a></li>
            <li><a href="${devotionalsPath}" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Devotionals
            </a></li>
            <li><a href="${resourcesPath}" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Resources
            </a></li>
            <li><a href="${latestSermonPath}" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Latest Sermon
            </a></li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-heading font-bold mb-3 sm:mb-4 text-white">Connect</h4>
          <ul class="space-y-2 sm:space-y-2.5 flex flex-col items-center sm:items-start">
            <li><a href="#" class="subscribe-btn-footer text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Subscribe for Updates
            </a></li>
            <li><a href="mailto:contact@flcpublishing.com" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Contact Us
            </a></li>
            <li><a href="https://freedomlifechurch.ca/about/" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              About FLC
            </a></li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div class="text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-heading font-bold mb-3 sm:mb-4 text-white">Stay Updated</h4>
          <p class="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">Get weekly updates on new resources and sermons</p>
          <div class="flex gap-2 max-w-sm mx-auto sm:mx-0">
            <input type="email" placeholder="Your email" class="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs sm:text-sm focus:outline-none focus:border-flcGold focus:bg-white/15 transition-all">
            <button class="subscribe-btn-footer px-3 sm:px-4 py-2.5 sm:py-2 bg-gradient-to-r from-flcGold to-flcGoldLight rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          <!-- Trust Badges -->
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div class="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-[10px] sm:text-xs font-semibold text-white/80">✓ Free Resources</div>
            <div class="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full text-[10px] sm:text-xs font-semibold text-white/80">✓ Faith-Based</div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-6 sm:pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <p class="text-white/60 text-xs sm:text-sm order-1 md:order-none">
            © 2025 FLC Publishing House. All rights reserved.
          </p>
          <div class="flex items-center gap-4 sm:gap-6 order-2 md:order-none">
            <a href="#" class="text-white/60 hover:text-flcGold text-xs sm:text-sm transition-colors min-h-[44px] flex items-center">Privacy Policy</a>
            <a href="#" class="text-white/60 hover:text-flcGold text-xs sm:text-sm transition-colors min-h-[44px] flex items-center">Terms of Use</a>
          </div>
          <p class="text-white/50 text-xs sm:text-sm order-3 md:order-none">
            Built with ❤️ for the Kingdom
          </p>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button id="backToTop" class="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-r from-flcGold to-flcGoldLight rounded-full shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:scale-110 active:scale-95 z-50">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
    </button>
  </footer>

  <script>
    // Back to Top functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'all';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Connect footer subscribe buttons to modal
    setTimeout(function() {
      const footerSubscribeBtns = document.querySelectorAll('.subscribe-btn-footer');
      footerSubscribeBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const modal = document.getElementById('subscriptionModal');
          if (modal) {
            modal.style.display = '';
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
          }
        });
      });
    }, 100);
  </script>
  `;

  footerContainer.innerHTML = footerHTML;
}

// Initialize footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFooter);
} else {
  createFooter();
}
