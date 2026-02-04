/**
 * Universal Header Component
 * FLC Publishing House
 */

const mobileBaseCss = `
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
  }
  *, *::before, *::after { box-sizing: border-box; }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    max-width: 100vw;
  }
  img, svg, video, canvas { max-width: 100%; height: auto; }
  iframe { max-width: 100%; }
  table { width: 100%; }
  pre, code { white-space: pre-wrap; word-break: break-word; }
  a, button { touch-action: manipulation; }
  @media (max-width: 768px){
    .desktop-only{ display: none !important; }
    .mobile-full{ width: 100% !important; }
  }
`;

const searchCss = `
  .search-results{
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid rgba(229,224,216,0.85);
    border-radius: 1rem;
    box-shadow: 0 12px 30px rgba(26,58,82,0.08);
    z-index: 999;
    overflow: hidden;
  }
  .search-results.hidden{ display: none; }
  .search-results .filters{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem 0.9rem;
    border-bottom: 1px solid rgba(229,224,216,0.75);
    background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
  }
  .search-results .filter-chip{
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.35rem 0.65rem;
    border-radius: 9999px;
    border: 1px solid rgba(229,224,216,0.9);
    color: rgba(44,44,44,0.7);
    background: #fff;
    cursor: pointer;
    transition: all .15s ease;
  }
  .search-results .filter-chip.active{
    color: #1A3A52;
    border-color: rgba(154,123,79,0.6);
    background: rgba(154,123,79,0.08);
  }
  .search-results ul{
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
    display: grid;
    gap: 0.4rem;
  }
  .search-results li a{
    display: block;
    padding: 0.6rem 0.75rem;
    border-radius: 0.75rem;
    color: #1A3A52;
    text-decoration: none;
    border: 1px solid transparent;
    transition: all .15s ease;
  }
  .search-results li a:hover{
    border-color: rgba(154,123,79,0.35);
    background: rgba(154,123,79,0.08);
  }
  .search-results .meta{
    font-size: 0.75rem;
    color: rgba(44,44,44,0.6);
    margin-top: 0.15rem;
  }
  .search-results .empty{
    padding: 0.9rem 1rem;
    font-size: 0.85rem;
    color: rgba(44,44,44,0.65);
  }
`;

function ensureMobileBaseStyles() {
  if (document.getElementById('flc-mobile-base')) return;
  const styleTag = document.createElement('style');
  styleTag.id = 'flc-mobile-base';
  styleTag.textContent = mobileBaseCss;
  document.head.appendChild(styleTag);
}

function ensureSearchStyles() {
  if (document.getElementById('flc-search-styles')) return;
  const styleTag = document.createElement('style');
  styleTag.id = 'flc-search-styles';
  styleTag.textContent = searchCss;
  document.head.appendChild(styleTag);
}

function createHeader(config = {}) {
  const {
    currentPage = '',
    basePath = '',
    logoPath,
    homePath,
    devotionalsPath,
    resourcesPath,
    logoHeight = '105px'
  } = config;

  function normalizeBase(path) {
    if (!path) return '';
    return path.replace(/\/+$/, '');
  }

  function deriveBasePath() {
    if (basePath) return basePath;
    if (homePath) {
      const trimmed = homePath.replace(/\/?index\.html$/i, '');
      return trimmed || '.';
    }
    return '.';
  }

  function withBase(path) {
    if (!path) return '';
    if (/^(https?:)?\/\//i.test(path)) return path;
    const clean = path.replace(/^\/+/, '');
    const root = normalizeBase(deriveBasePath());
    if (!root || root === '.') return clean;
    return `${root}/${clean}`;
  }

  const computedHomePath = homePath || withBase('index.html');
  const computedLogoPath = logoPath || withBase('assets/images/Logo.png');
  const computedDevotionalsPath = devotionalsPath || withBase('pages/devotionals.html');
  const computedResourcesPath = resourcesPath || withBase('pages/resources.html');

  const computedDetoxPath = withBase('pages/spiritual-detox.html');
  const computedDetoxWeek1Path = withBase('pages/spiritual-detox-week1.html');
  const computedDetoxWeek2Path = withBase('pages/spiritual-detox-week2.html');
  const computedDetoxWeek3Path = withBase('pages/spiritual-detox-week3.html');

  const computedDevotionalWeek1Path = withBase('devotionals-pages/devotional-week1-hope.html');
  const computedDevotionalWeek2Path = withBase('devotionals-pages/devotional-week2-love.html');
  const computedDevotionalWeek3Path = withBase('devotionals-pages/devotional-week3-peace.html');
  const computedDevotionalWeek4Path = withBase('devotionals-pages/devotional-week4-joy.html');

  const computedSermon1Path = withBase('sermons/sermon-im-under-pressure.html');
  const computedSermon2Path = withBase('sermons/sermon-purpose-protected-me.html');
  const computedSermon3Path = withBase('sermons/sermon-when-compassion-costs-you-sleep.html');

  const computedBibleStudyPath = withBase('bible-studies/bible-study-advent-hope.html');
  const computedResourcesBooksPath = `${computedResourcesPath}#books`;

  const menu = [
    { label: 'Home', href: computedHomePath, key: 'home' },
    {
      label: 'Resources',
      href: computedResourcesPath,
      key: 'resources',
      children: [
        { label: 'All Resources', href: computedResourcesPath },
        { label: 'Spiritual Detox', href: computedDetoxPath },
        { label: 'Sermons', href: computedResourcesPath },
        { label: 'Devotionals', href: computedResourcesPath },
        { label: 'Bible Studies', href: computedResourcesPath },
        { label: 'Books', href: computedResourcesPath }
      ]
    },
    {
      label: 'Church',
      href: 'https://freedomlifechurch.ca/',
      key: 'church',
      external: true
    }
  ];

  const dropdownCaret = `
    <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  `;

  function navLinkClass(active) {
    return `nav-link px-5 py-2 text-flcNavy/80 hover:text-flcGold font-medium text-sm lg:text-base tracking-wide transition-all duration-200 rounded-lg hover:bg-flcGold/5 ${active ? 'text-flcGold bg-flcGold/5 font-semibold' : ''}`;
  }

  function navLinkExternalClass() {
    return 'nav-link px-5 py-2 text-flcNavy/70 hover:text-flcGold font-semibold text-sm lg:text-base tracking-wide transition-all duration-200 rounded-lg border border-flcGold/20 hover:bg-flcGold/5';
  }

  function renderDesktopLink(item) {
    const isActive = currentPage && item.key && currentPage === item.key;
    if (!item.children || item.children.length === 0) {
      const externalAttrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const label = item.external
        ? `<span class="inline-flex items-center gap-1.5">${item.label}<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></span>`
        : item.label;
      const classes = item.external ? navLinkExternalClass() : navLinkClass(isActive);
      return `<a href="${item.href}" class="${classes}"${externalAttrs}>${label}</a>`;
    }
    const children = item.children
      .map((child) => `<a href="${child.href}" class="block px-4 py-2 text-sm text-flcCharcoal hover:bg-flcGold/5">${child.label}</a>`)
      .join('');
    return `
      <div class="relative group">
        <a href="${item.href}" class="${navLinkClass(isActive)}">
          <span class="inline-flex items-center gap-1.5">${item.label}${dropdownCaret}</span>
        </a>
        <div class="absolute left-0 mt-2 w-72 bg-white border border-flcGold/10 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150">
          ${children}
        </div>
      </div>
    `;
  }

  function mobileLinkClass(active, isChild) {
    const base = `block py-3 px-4 text-flcNavy hover:bg-flcGold/10 rounded-lg transition-all duration-200 font-medium ${active ? 'bg-flcGold/10 text-flcGold font-semibold' : ''}`;
    return isChild ? `${base} pl-8 text-sm` : base;
  }

  function renderMobileSection(item) {
    const isActive = currentPage && item.key && currentPage === item.key;
    if (!item.children || item.children.length === 0) {
      const externalAttrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${item.href}" class="${mobileLinkClass(isActive, false)}"${externalAttrs}>${item.label}</a>`;
    }
    const children = item.children
      .map((child) => `<a href="${child.href}" class="${mobileLinkClass(false, true)}">${child.label}</a>`)
      .join('');
    return `
      <div class="pt-2">
        <div class="px-4 text-[0.7rem] uppercase tracking-[0.2em] text-flcCharcoal/50">${item.label}</div>
        ${children}
      </div>
    `;
  }

  return `
  <!-- Navigation -->
  <nav id="mainNav" class="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-flcGold/10 shadow-sm">
    <!-- Premium Header Layout -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-18 lg:h-20">
        <!-- Logo -->
        <a href="${computedHomePath}" class="flex items-center group flex-shrink-0 absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
          <img src="${computedLogoPath}" alt="FLC Publishing House" class="w-auto group-hover:scale-105 transition-all duration-300 filter group-hover:brightness-110" style="height: ${logoHeight}; object-fit: contain;">
        </a>
        
        <!-- Center: Navigation Links (Large Desktop) -->
        <div class="nav-links hidden lg:flex items-center gap-1">
          ${menu.map(renderDesktopLink).join('')}
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
            <div id="resourceSearchResults" class="search-results hidden"></div>
            <svg class="absolute left-3 lg:left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-flcCharcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Subscribe Button (Tablet & Desktop) -->
          <a href="#" class="subscribe-btn hidden md:inline-flex items-center gap-1.5 lg:gap-2 px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-flcGold to-flcGoldLight text-white font-semibold text-sm lg:text-base rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200">
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
    <div id="mobileMenu" class="hidden lg:hidden border-t border-flcGold/10 bg-flcCream/50 backdrop-blur-lg max-h-[80vh] overflow-y-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
        ${menu.map(renderMobileSection).join('')}
        
        <!-- Mobile-only Search & Subscribe -->
        <div class="pt-2 space-y-2 md:hidden">
          <div class="search-bar relative px-4 pb-2">
            <input
              type="text"
              id="resourceSearchMobile"
              placeholder="Search..."
              class="w-full px-4 py-2.5 pl-10 rounded-lg border border-flcGold/20 bg-white focus:outline-none focus:border-flcGold text-sm text-flcCharcoal placeholder:text-flcCharcoal/50 transition-all duration-200"
            />
            <div id="resourceSearchResultsMobile" class="search-results hidden"></div>
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
  return createHeader({
    ...config,
    currentPage: config.currentPage || 'devotionals'
  });
}

// Initialize header on DOM load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof document !== 'undefined') {
    ensureMobileBaseStyles();
    ensureSearchStyles();
  }
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

    function normalizeBase(path) {
      if (!path) return '';
      return path.replace(/\/+$/, '');
    }

    function deriveBasePath() {
      if (config.basePath) return config.basePath;
      if (config.homePath) {
        const trimmed = config.homePath.replace(/\/?index\.html$/i, '');
        return trimmed || '.';
      }
      return '.';
    }

    function withBase(path) {
      if (!path) return '';
      if (/^(https?:)?\/\//i.test(path)) return path;
      const clean = path.replace(/^\/+/, '');
      const root = normalizeBase(deriveBasePath());
      if (!root || root === '.') return clean;
      return `${root}/${clean}`;
    }

    const computedResourcesPath = config.resourcesPath || withBase('pages/resources.html');
    const computedDetoxPath = withBase('pages/spiritual-detox.html');
    const computedDetoxWeek1Path = withBase('pages/spiritual-detox-week1.html');
    const computedDetoxWeek2Path = withBase('pages/spiritual-detox-week2.html');
    const computedDetoxWeek3Path = withBase('pages/spiritual-detox-week3.html');
    const computedDevotionalWeek1Path = withBase('devotionals-pages/devotional-week1-hope.html');
    const computedDevotionalWeek2Path = withBase('devotionals-pages/devotional-week2-love.html');
    const computedDevotionalWeek3Path = withBase('devotionals-pages/devotional-week3-peace.html');
    const computedDevotionalWeek4Path = withBase('devotionals-pages/devotional-week4-joy.html');
    const computedSermon1Path = withBase('sermons/sermon-im-under-pressure.html');
    const computedSermon2Path = withBase('sermons/sermon-purpose-protected-me.html');
    const computedSermon3Path = withBase('sermons/sermon-when-compassion-costs-you-sleep.html');
    const computedBibleStudyPath = withBase('bible-studies/bible-study-advent-hope.html');
    const computedResourcesBooksPath = `${computedResourcesPath}#books`;

    const searchIndex = [
      { title: 'Resources Hub', type: 'Resources', href: computedResourcesPath, tags: ['resources', 'download', 'hub'] },
      { title: 'Books (Resources)', type: 'Resources', href: computedResourcesBooksPath, tags: ['books', 'reading'] },
      { title: 'Spiritual Detox — Overview', type: 'Spiritual Detox', href: computedDetoxPath, tags: ['detox', 'kingdom blueprint'] },
      { title: 'Spiritual Detox — Week 1', type: 'Spiritual Detox', href: computedDetoxWeek1Path, tags: ['detox', 'week 1'] },
      { title: 'Spiritual Detox — Week 2', type: 'Spiritual Detox', href: computedDetoxWeek2Path, tags: ['detox', 'week 2'] },
      { title: 'Spiritual Detox — Week 3', type: 'Spiritual Detox', href: computedDetoxWeek3Path, tags: ['detox', 'week 3'] },
      { title: "I'm Under Pressure", type: 'Sermon', href: computedSermon1Path, tags: ['sermon', 'pressure'] },
      { title: 'Purpose Protected Me', type: 'Sermon', href: computedSermon2Path, tags: ['sermon', 'purpose'] },
      { title: 'When Compassion Costs You Sleep', type: 'Sermon', href: computedSermon3Path, tags: ['sermon', 'compassion'] },
      { title: 'Devotional — Week 1 (Hope)', type: 'Devotional', href: computedDevotionalWeek1Path, tags: ['devotional', 'hope'] },
      { title: 'Devotional — Week 2 (Love)', type: 'Devotional', href: computedDevotionalWeek2Path, tags: ['devotional', 'love'] },
      { title: 'Devotional — Week 3 (Peace)', type: 'Devotional', href: computedDevotionalWeek3Path, tags: ['devotional', 'peace'] },
      { title: 'Devotional — Week 4 (Joy)', type: 'Devotional', href: computedDevotionalWeek4Path, tags: ['devotional', 'joy'] },
      { title: 'Bible Study — Advent Hope', type: 'Bible Study', href: computedBibleStudyPath, tags: ['bible study', 'advent', 'hope'] }
    ];

    function initSearch(inputEl, resultsEl) {
      if (!inputEl || !resultsEl) return;
      let activeType = 'All';

      function buildFilters(items) {
        const counts = items.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        }, {});
        const types = ['All', ...Object.keys(counts)];
        const chips = types.map((type) => {
          const count = type === 'All' ? items.length : counts[type];
          const active = type === activeType ? 'active' : '';
          return `<button type="button" class="filter-chip ${active}" data-type="${type}">${type} ${count}</button>`;
        }).join('');
        return `<div class="filters">${chips}</div>`;
      }

      function filterItems(query) {
        const q = query.trim().toLowerCase();
        let items = searchIndex.filter((item) => {
          if (!q) return true;
          const haystack = `${item.title} ${item.type} ${item.tags.join(' ')}`.toLowerCase();
          return haystack.includes(q);
        });
        if (activeType !== 'All') {
          items = items.filter((item) => item.type === activeType);
        }
        return items;
      }

      function renderResults(query) {
        const items = filterItems(query);
        const filterHtml = buildFilters(searchIndex);
        const listHtml = items.length
          ? `<ul>${items.map((item) => `<li><a href="${item.href}"><div class="font-semibold">${item.title}</div><div class="meta">${item.type}</div></a></li>`).join('')}</ul>`
          : `<div class="empty">No results found. Try a different keyword.</div>`;

        resultsEl.innerHTML = `${filterHtml}${listHtml}`;
        resultsEl.classList.toggle('hidden', false);
      }

      function closeResults() {
        resultsEl.classList.add('hidden');
      }

      inputEl.addEventListener('input', () => renderResults(inputEl.value));
      inputEl.addEventListener('focus', () => renderResults(inputEl.value));
      document.addEventListener('click', (e) => {
        if (!resultsEl.contains(e.target) && e.target !== inputEl) {
          closeResults();
        }
      });

      resultsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          activeType = chip.dataset.type || 'All';
          renderResults(inputEl.value);
        }
      });
    }

    initSearch(document.getElementById('resourceSearch'), document.getElementById('resourceSearchResults'));
    initSearch(document.getElementById('resourceSearchMobile'), document.getElementById('resourceSearchResultsMobile'));
  }
});
