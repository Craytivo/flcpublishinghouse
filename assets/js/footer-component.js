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
    <!-- Wave Divider -->
    <div class="absolute top-0 left-0 right-0 -translate-y-full">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-16">
        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#0d2338" fill-opacity="0.9"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
        
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="${logoPath}" alt="FLC Publishing House" class="h-12 w-auto">
          </div>
          <h3 class="text-xl font-heading font-bold mb-3 text-flcGold">FLC Publishing House</h3>
          <p class="text-white/70 text-sm leading-relaxed mb-4">
            Equipping believers with biblical truth and practical resources for spiritual growth.
          </p>
          <div class="flex items-center gap-3">
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-flcGold/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-flcGold/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-flcGold/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-heading font-bold mb-4 text-white">Explore</h4>
          <ul class="space-y-2.5">
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
        <div>
          <h4 class="text-lg font-heading font-bold mb-4 text-white">Connect</h4>
          <ul class="space-y-2.5">
            <li><a href="#" class="subscribe-btn-footer text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Subscribe for Updates
            </a></li>
            <li><a href="mailto:contact@flcpublishing.com" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              Contact Us
            </a></li>
            <li><a href="${homePath}" class="text-white/70 hover:text-flcGold transition-colors text-sm flex items-center gap-2 group">
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              About FLC
            </a></li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div>
          <h4 class="text-lg font-heading font-bold mb-4 text-white">Stay Updated</h4>
          <p class="text-white/70 text-sm mb-4">Get weekly updates on new resources and sermons</p>
          <div class="flex gap-2">
            <input type="email" placeholder="Your email" class="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-flcGold focus:bg-white/15 transition-all">
            <button class="subscribe-btn-footer px-4 py-2 bg-gradient-to-r from-flcGold to-flcGoldLight rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          <!-- Trust Badges -->
          <div class="flex items-center gap-3 mt-6">
            <div class="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white/80">✓ Free Resources</div>
            <div class="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white/80">✓ Faith-Based</div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-white/60 text-sm">
            © 2025 FLC Publishing House. All rights reserved.
          </p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-white/60 hover:text-flcGold text-sm transition-colors">Privacy Policy</a>
            <a href="#" class="text-white/60 hover:text-flcGold text-sm transition-colors">Terms of Use</a>
          </div>
          <p class="text-white/50 text-sm">
            Built with ❤️ for the Kingdom
          </p>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button id="backToTop" class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-flcGold to-flcGoldLight rounded-full shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:scale-110 z-50">
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
