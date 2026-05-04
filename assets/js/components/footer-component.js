// footer-component.js - Universal Footer Component for FLC Publishing House

function createFooter() {
  const footerContainer = document.getElementById('footerContainer');
  if (!footerContainer) return;

  // Get configuration from data attributes
  const config = JSON.parse(footerContainer.getAttribute('data-config') || '{}');
  const logoPath = config.logoPath || '../assets/images/Logo.png';
  const homePath = config.homePath || '../index.html';
  const devotionalsPath = config.devotionalsPath || 'devotionals.html';
  const resourcesPath = config.resourcesPath || 'resources.html';
  const latestSermonPath = config.latestSermonPath || '../sermons/sermon-im-under-pressure.html';

  const sermonsPath = config.sermonsPath || resourcesPath;
  const detoxPath = config.detoxPath || '../pages/spiritual-detox.html';
  const bibleStudiesPath = config.bibleStudiesPath || resourcesPath;
  const booksPath = resourcesPath;

  const footerHTML = `
  <!-- Footer -->
  <footer class="bg-white text-flcNavy mt-20 border-t border-flcBorder" style="background-color: #ffffff !important; color: #1A3A52 !important;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12">
        
        <!-- Brand Section -->
        <div class="text-center sm:text-left">
          <h3 class="text-xl sm:text-2xl font-heading font-bold mb-4 text-flcNavy">FLC Publishing House</h3>
          <p class="text-flcCharcoal/70 text-sm leading-relaxed mb-4">
            Equipping believers with biblical truth and practical resources for spiritual growth.
          </p>
          <div class="flex items-center justify-center sm:justify-start gap-3">
            <a href="https://www.instagram.com/flcyeg/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-flcNavy/5 hover:bg-flcGold/20 rounded-lg flex items-center justify-center transition-colors">
              <svg class="w-5 h-5 text-flcNavy" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-heading font-bold mb-4 text-flcNavy">Explore</h4>
          <ul class="space-y-2 flex flex-col items-center sm:items-start">
            <li><a href="${homePath}" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Home</a></li>
            <li><a href="${resourcesPath}" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Resources</a></li>
            <li><a href="${sermonsPath}" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Sermons</a></li>
            <li><a href="${resourcesPath}" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Devotionals</a></li>
            <li><a href="${detoxPath}" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Spiritual Detox</a></li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="text-center sm:text-left">
          <h4 class="text-base sm:text-lg font-heading font-bold mb-4 text-flcNavy">Connect</h4>
          <ul class="space-y-2 flex flex-col items-center sm:items-start">
            <li><a href="#" class="subscribe-btn-footer text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Subscribe for Updates</a></li>
            <li><a href="mailto:contact@flcpublishing.com" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">Contact Us</a></li>
            <li><a href="https://freedomlifechurch.ca/about/" target="_blank" rel="noopener noreferrer" class="text-flcCharcoal/70 hover:text-flcGold transition-colors text-sm">About FLC</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-flcBorder pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p class="text-flcCharcoal/60 text-sm">
            © 2025 FLC Publishing House. All rights reserved.
          </p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-flcCharcoal/60 hover:text-flcGold text-sm transition-colors">Privacy Policy</a>
            <a href="#" class="text-flcCharcoal/60 hover:text-flcGold text-sm transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button id="backToTop" class="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 bg-flcNavy rounded-full shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:bg-flcGold hover:text-white z-50">
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
