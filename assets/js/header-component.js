/**
 * Universal Header Component
 * FLC Publishing House
 */

function createHeader(config = {}) {
  const {
    currentPage = '',
    logoPath = 'assets/images/Dark Logo.png',
    homePath = 'index.html',
    libraryPath = 'pages/library.html',
    devotionalsPath = 'pages/devotionals.html',
    resourcesPath = 'pages/resources.html',
    logoHeight = '105px'
  } = config;

  return `
  <!-- Navigation -->
  <nav id="mainNav" class="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-flcGold/10 shadow-sm">
    <!-- Premium Header Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-18 lg:h-20">
        <!-- Logo -->
        <a href="${homePath}" class="flex items-center group flex-shrink-0 absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
          <img src="${logoPath}" alt="FLC Publishing House" class="w-auto group-hover:scale-105 transition-all duration-300 filter group-hover:brightness-110" style="height: ${logoHeight}; object-fit: contain;">
        </a>
        
        <!-- Center: Navigation Links (Large Desktop) -->
        <div class="nav-links hidden lg:flex items-center gap-1">
          <a href="https://freedomlifechurch.ca/" target="_blank" rel="noopener noreferrer" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5">
            <span class="inline-flex items-center gap-1.5">
              Church
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </span>
          </a>
          <a href="${libraryPath}" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5 ${currentPage === 'library' ? 'text-flcGold bg-flcGold/5 font-semibold' : ''}">Library</a>
          <a href="${devotionalsPath}" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5 ${currentPage === 'devotionals' ? 'text-flcGold bg-flcGold/5 font-semibold' : ''}">Devotionals</a>
          <a href="${resourcesPath}" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5 ${currentPage === 'resources' ? 'text-flcGold bg-flcGold/5 font-semibold' : ''}">Resources</a>
        </div>
        
        <!-- Right: Actions (Tablet & Desktop) -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <!-- Search (Tablet & Desktop) -->
          <div class="search-bar relative hidden md:block">
            <input
              type="text"
              id="resourceSearch"
              placeholder="Search..."
              class="w-40 lg:w-56 xl:w-64 px-3 py-1.5 lg:px-4 lg:py-2 pl-9 lg:pl-10 rounded-full border border-flcGold/20 bg-flcCream/40 focus:outline-none focus:border-flcGold focus:bg-white text-sm text-flcCharcoal placeholder:text-flcCharcoal/50 transition-all duration-200 hover:border-flcGold/40"
            />
            <svg class="absolute left-3 lg:left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-flcCharcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Subscribe Button (Tablet & Desktop) -->
          <a href="#" class="subscribe-btn hidden md:inline-flex items-center gap-1.5 lg:gap-2 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-flcGold to-flcGoldLight text-white font-semibold text-xs lg:text-sm rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
            <svg class="w-3.5 h-3.5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="hidden lg:inline">Subscribe</span>
          </a>
          
          <!-- Mobile/Tablet Menu Button -->
          <button id="mobileMenuBtn" class="lg:hidden p-2 sm:p-2.5 text-flcNavy hover:text-flcGold hover:bg-flcGold/5 rounded-lg transition-all duration-200">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile/Tablet Menu -->
    <div id="mobileMenu" class="hidden lg:hidden border-t border-flcGold/10 bg-flcCream/50 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
        <a href="https://freedomlifechurch.ca/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium">
          <span>Church Website</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
        <a href="${libraryPath}" class="block py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium ${currentPage === 'library' ? 'bg-flcGold/10 text-flcGold font-semibold' : ''}">Library</a>
        <a href="${devotionalsPath}" class="block py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium ${currentPage === 'devotionals' ? 'bg-flcGold/10 text-flcGold font-semibold' : ''}">Devotionals</a>
        <a href="${resourcesPath}" class="block py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium ${currentPage === 'resources' ? 'bg-flcGold/10 text-flcGold font-semibold' : ''}">Resources</a>
        
        <!-- Mobile-only Search & Subscribe -->
        <div class="pt-2 space-y-2 md:hidden">
          <div class="search-bar relative px-4 pb-2">
            <input
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-2.5 pl-10 rounded-lg border border-flcGold/20 bg-white focus:outline-none focus:border-flcGold text-sm text-flcCharcoal placeholder:text-flcCharcoal/50 transition-all duration-200"
            />
            <svg class="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-flcCharcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <a href="#" class="flex items-center justify-center gap-2 mx-4 py-3 bg-gradient-to-r from-flcGold to-flcGoldLight text-white rounded-lg font-semibold hover:shadow-md active:scale-95 transition-all duration-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            Subscribe
          </a>
        </div>
      </div>
    </div>
  </nav>
  `;
}

function createDevotionalHeader(config = {}) {
  const {
    logoPath = '../assets/images/Logo.png',
    homePath = '../index.html',
    libraryPath = '../pages/library.html',
    devotionalsPath = '../pages/devotionals.html',
    logoHeight = '85px'
  } = config;

  return `
  <!-- Navigation -->
  <nav id="mainNav" class="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-flcGold/10 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-18 lg:h-20">
        <!-- Logo -->
        <a href="${homePath}" class="logo-link flex items-center group absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <img src="${logoPath}" alt="FLC Publishing House" class="w-auto group-hover:scale-105 transition-all duration-300 filter group-hover:brightness-110" style="height: ${logoHeight}; object-fit: contain;">
        </a>
        
        <!-- Desktop Navigation Links -->
        <div class="nav-links hidden md:flex items-center gap-1">
          <a href="https://freedomlifechurch.ca/" target="_blank" rel="noopener noreferrer" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5">
            <span class="inline-flex items-center gap-1.5">
              Church
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </span>
          </a>
          <a href="${libraryPath}" class="nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-[15px] tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5">Library</a>
          <a href="${devotionalsPath}" class="nav-link px-5 py-2 text-flcGold bg-flcGold/5 font-semibold text-[15px] tracking-wide transition-all duration-200 rounded-lg">Devotionals</a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button id="mobileMenuBtn" class="md:hidden p-2 sm:p-2.5 text-flcNavy hover:text-flcGold hover:bg-flcGold/5 rounded-lg transition-all duration-200">
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div id="mobileMenu" class="hidden md:hidden border-t border-flcGold/10 bg-flcCream/50 backdrop-blur-lg">
        <div class="px-4 sm:px-6 py-4 space-y-1">
          <a href="https://freedomlifechurch.ca/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium">
            <span>Church Website</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <a href="${libraryPath}" class="block py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium">Library</a>
          <a href="${devotionalsPath}" class="block py-3 px-4 text-flcGold bg-flcGold/10 rounded-lg font-semibold">Devotionals</a>
        </div>
      </div>
    </div>
  </nav>
  `;
}

// Initialize header on DOM load
document.addEventListener('DOMContentLoaded', function() {
  const headerContainer = document.getElementById('headerContainer');
  if (headerContainer) {
    const config = JSON.parse(headerContainer.getAttribute('data-config') || '{}');
    const isDevotional = headerContainer.getAttribute('data-type') === 'devotional';
    
    headerContainer.innerHTML = isDevotional ? createDevotionalHeader(config) : createHeader(config);
    
    // Initialize mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
    }
    
    // Connect subscribe buttons to modal
    setTimeout(function() {
      const subscribeButtons = document.querySelectorAll('.subscribe-btn');
      subscribeButtons.forEach(function(btn) {
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
  }
});
