// modules/resources-search.js — Collection search, sort & suggestions
// Searches across ALL items under collections: sermons, detox weeks,
// bible studies, devotionals, devotional guides, and announcements.

// ── Full collection items index ──
// Each entry maps to a collection card via `cardCategory` (matches the
// uppercase category <span> text inside the card).  Items without a
// matching card still appear in suggestions and link out directly.

import { getBibleStudyEntries } from '../services/contentful.js';
import { slugify } from '../utils/slugify.js';

function getBasePath() {
  const c = document.getElementById('headerContainer');
  return c?.dataset.basePath || c?.dataset.base || '.';
}

function withBase(path) {
  if (!path || /^(https?:)?\/\//i.test(path)) return path;
  const base = getBasePath().replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return (!base || base === '.') ? clean : `${base}/${clean}`;
}

const COLLECTION_ITEMS = [
  // Sermons
  { title: 'Sermon Notes & Media', type: 'Sermons', href: 'pages/sermons.html', tags: ['sermons', 'teaching', 'notes', 'media'], cardCategory: 'Sermons' },
  { title: "I'm Under Pressure", type: 'Sermons', href: 'pages/post.html?title=im-under-pressure', tags: ['sermon', 'pressure'], cardCategory: 'Sermons' },
  { title: 'Purpose Protected Me', type: 'Sermons', href: 'pages/post.html?title=purpose-protected-me', tags: ['sermon', 'purpose'], cardCategory: 'Sermons' },
  { title: 'When Compassion Costs You Sleep', type: 'Sermons', href: 'pages/post.html?title=when-compassion-costs-you-sleep', tags: ['sermon', 'compassion'], cardCategory: 'Sermons' },

  // Seasonal Devotionals
  { title: 'Advent Devotional Series', type: 'Seasonal Devotional', href: 'devotionals-pages/devotional-week1-hope.html', tags: ['devotional', 'advent', 'seasonal'], cardCategory: 'Devotionals' },
  { title: 'Devotional — Week 1 (Hope)', type: 'Seasonal Devotional', href: 'devotionals-pages/devotional-week1-hope.html', tags: ['devotional', 'advent', 'hope'], cardCategory: 'Devotionals' },
  { title: 'Devotional — Week 2 (Love)', type: 'Seasonal Devotional', href: 'devotionals-pages/devotional-week2-love.html', tags: ['devotional', 'advent', 'love'], cardCategory: 'Devotionals' },
  { title: 'Devotional — Week 3 (Peace)', type: 'Seasonal Devotional', href: 'devotionals-pages/devotional-week3-peace.html', tags: ['devotional', 'advent', 'peace'], cardCategory: 'Devotionals' },
  { title: 'Devotional — Week 4 (Joy)', type: 'Seasonal Devotional', href: 'devotionals-pages/devotional-week4-joy.html', tags: ['devotional', 'advent', 'joy'], cardCategory: 'Devotionals' },

  // Devotional Guides (Contentful-powered — placeholder)
  { title: 'Devotional Guides', type: 'Devotional Guide', href: '#', tags: ['devotional', 'guide', 'growth', 'reflection'], cardCategory: 'Devotional Guides' },

  // Spiritual Detox
  { title: 'The Kingdom Blueprint', type: 'Spiritual Detox', href: 'pages/spiritual-detox.html', tags: ['detox', 'kingdom', 'blueprint', 'newsletter'], cardCategory: 'Spiritual Detox' },
  { title: 'Spiritual Detox — Week 1', type: 'Spiritual Detox', href: 'pages/spiritual-detox-week1.html', tags: ['detox', 'week 1'], cardCategory: 'Spiritual Detox' },
  { title: 'Spiritual Detox — Week 2', type: 'Spiritual Detox', href: 'pages/spiritual-detox-week2.html', tags: ['detox', 'week 2'], cardCategory: 'Spiritual Detox' },
  { title: 'Spiritual Detox — Week 3', type: 'Spiritual Detox', href: 'pages/spiritual-detox-week3.html', tags: ['detox', 'week 3'], cardCategory: 'Spiritual Detox' },

  // Bible Study
  { title: 'Bible Studies', type: 'Bible Study', href: 'pages/bible-studies.html', tags: ['bible study', 'studies', 'notes', 'resources'], cardCategory: 'Bible Study' },

  // Announcements
  { title: 'Vision 2026', type: 'Announcement', href: 'assets/pdfs/Vision%202026.pdf', tags: ['vision', '2026', 'building', 'campaign', 'leadership', 'pdf', 'download'], cardCategory: 'Announcement' },
];

export function initResourcesSearch() {
  const grid = document.getElementById('collectionGrid');
  const searchInput = document.getElementById('collectionSearch');
  const clearBtn = document.getElementById('collectionClearSearch');
  const badge = document.getElementById('collectionResultBadge');
  const suggestionsEl = document.getElementById('collectionSuggestions');
  const sortSelect = document.getElementById('collectionSort');
  const countEl = document.getElementById('collectionCount');

  if (!grid || !searchInput) return;

  // Inject suggestion styles if not already present
  if (!document.getElementById('collectionSuggestionStyles')) {
    const style = document.createElement('style');
    style.id = 'collectionSuggestionStyles';
    style.textContent = `
      #collectionSuggestions .cs-group-label{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(26,58,82,.35);padding:.75rem 1rem .35rem}
      #collectionSuggestions .cs-item{display:flex;align-items:center;gap:.75rem;padding:.65rem 1rem;cursor:pointer;transition:background .12s ease}
      #collectionSuggestions .cs-item:hover,#collectionSuggestions .cs-item:focus{background:rgba(250,250,248,1)}
      #collectionSuggestions .cs-item+.cs-item{border-top:1px solid rgba(229,224,216,.3)}
      #collectionSuggestions .cs-type{font-size:.5625rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(154,123,79,.7);flex-shrink:0;width:5.5rem}
      #collectionSuggestions .cs-text{font-size:.8125rem;color:#1a3a52;font-weight:500;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      #collectionSuggestions .cs-text mark{background:rgba(154,123,79,.2);border-radius:2px;padding:0 1px;color:inherit}
      #collectionSuggestions .cs-empty{padding:1.25rem 1rem;text-align:center;font-size:.8125rem;color:rgba(26,58,82,.35)}
    `;
    document.head.appendChild(style);
  }

  // Build card index from DOM (for show/hide of grid cards)
  const cards = Array.from(grid.children).filter(el => el.dataset.date);
  const cardIndex = cards.map(card => {
    const category = card.querySelector('span')?.textContent.trim() || '';
    return { el: card, category };
  });

  // Resolve hrefs for collection items
  let items = COLLECTION_ITEMS.map(entry => ({
    ...entry,
    resolvedHref: entry.href === '#' ? '#' : withBase(entry.href)
  }));

  const totalCards = cardIndex.length;
  if (countEl) countEl.textContent = `${totalCards} collections`;

  let activeQuery = '';

  // --- Helpers ---
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlightMatch(text, query) {
    if (!query) return esc(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return esc(text).replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }

  function itemMatches(item, q) {
    if (!q) return true;
    const haystack = `${item.title} ${item.type} ${item.tags.join(' ')}`.toLowerCase();
    return haystack.includes(q);
  }

  async function loadDynamicBibleStudies() {
    try {
      const cfg = window.FLC_CONTENTFUL || {};
      const { items: bibleStudyItems } = await getBibleStudyEntries();
      const staticTitles = new Set(COLLECTION_ITEMS.map(item => item.title.toLowerCase()));
      const postPagePath = cfg.postPagePath || '/pages/post.html';
      const dynamicItems = (bibleStudyItems || [])
        .filter((item) => item && item.fields && item.sys)
        .map((item) => {
          const f = item.fields || {};
          const title = typeof f.title === 'string' ? f.title.trim() : '';
          if (!title || staticTitles.has(title.toLowerCase())) return null;
          const tags = Array.isArray(f.tags) ? f.tags : [f.tags].filter(Boolean);
          const href = `${postPagePath}?title=${encodeURIComponent(slugify(title))}`;
          return {
            title,
            type: 'Bible Study',
            href,
            tags: ['bible study', ...tags, f.subtitle || '', f.speaker || ''].map(tag => String(tag).toLowerCase()).filter(Boolean),
            cardCategory: 'Bible Study'
          };
        })
        .filter(Boolean);

      if (!dynamicItems.length) return;

      items = [...COLLECTION_ITEMS, ...dynamicItems].map(entry => ({
        ...entry,
        resolvedHref: entry.href === '#' ? '#' : withBase(entry.href)
      }));
      update();
      if (activeQuery.trim()) renderSuggestions(activeQuery);
    } catch (_) {
      // Static collection search still works.
    }
  }

  // --- Filter cards + update counts ---
  function update() {
    const q = activeQuery.trim().toLowerCase();
    const sortVal = sortSelect?.value || 'featured';

    // Find which card categories have matching items
    const matchingItems = items.filter(item => itemMatches(item, q));
    const matchingCategories = new Set(matchingItems.map(i => i.cardCategory));

    // Show/hide cards based on whether any item in their category matches
    let visibleCount = 0;
    cardIndex.forEach(card => {
      const show = !q || matchingCategories.has(card.category);
      card.el.toggleAttribute('hidden', !show);
      if (show) visibleCount++;
    });

    // Sort visible cards
    const visibleCards = cardIndex.filter(c => !c.el.hasAttribute('hidden'));
    if (sortVal === 'title') {
      visibleCards.sort((a, b) => (a.el.querySelector('h3')?.textContent || '').localeCompare(b.el.querySelector('h3')?.textContent || ''));
    } else if (sortVal === 'newest') {
      visibleCards.sort((a, b) => (b.el.dataset.date || '').localeCompare(a.el.dataset.date || ''));
    }
    visibleCards.forEach((c, i) => { c.el.style.order = String(i); });

    // Badge
    if (badge) {
      if (q) {
        badge.textContent = String(matchingItems.length);
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Count
    if (countEl) {
      if (q) {
        countEl.textContent = `${matchingItems.length} results across ${visibleCount} collections`;
      } else {
        countEl.textContent = `${totalCards} collections`;
      }
    }

    // Clear button
    if (clearBtn) clearBtn.classList.toggle('hidden', !q);
  }

  // --- Suggestions dropdown (grouped by type) ---
  function renderSuggestions(query) {
    if (!suggestionsEl) return;
    const q = (query || '').trim().toLowerCase();

    if (!q || q.length < 1) {
      suggestionsEl.classList.add('hidden');
      return;
    }

    const hits = items.filter(item => itemMatches(item, q));

    if (!hits.length) {
      suggestionsEl.innerHTML = '<div class="cs-empty">No matching collections</div>';
      suggestionsEl.classList.remove('hidden');
      return;
    }

    // Group by type
    const grouped = {};
    hits.forEach(item => {
      (grouped[item.type] = grouped[item.type] || []).push(item);
    });

    let html = '';
    Object.entries(grouped).forEach(([type, entries]) => {
      html += `<div class="cs-group-label">${esc(type)}</div>`;
      entries.forEach(item => {
        const href = item.resolvedHref !== '#' ? item.resolvedHref : '';
        const tag = href ? 'a' : 'div';
        const hrefAttr = href ? ` href="${href}"` : '';
        html += `<${tag}${hrefAttr} class="cs-item" data-suggestion="${esc(item.title)}">
          <span class="cs-type">${esc(item.type)}</span>
          <span class="cs-text">${highlightMatch(item.title, query)}</span>
        </${tag}>`;
      });
    });

    suggestionsEl.innerHTML = html;
    suggestionsEl.classList.remove('hidden');
  }

  // --- Events ---
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      activeQuery = searchInput.value;
      update();
      renderSuggestions(activeQuery);
    }, 120);
  });

  // Show all suggestions on focus when empty
  searchInput.addEventListener('focus', () => {
    if (!activeQuery.trim()) {
      renderSuggestions('');
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      activeQuery = '';
      update();
      if (suggestionsEl) suggestionsEl.classList.add('hidden');
      searchInput.focus();
    });
  }

  if (suggestionsEl) {
    suggestionsEl.addEventListener('click', e => {
      const item = e.target.closest('[data-suggestion]');
      if (!item) return;
      // If it's a link, let it navigate naturally
      if (item.tagName === 'A' && item.href) return;
      // Otherwise fill the search
      searchInput.value = item.dataset.suggestion;
      activeQuery = item.dataset.suggestion;
      suggestionsEl.classList.add('hidden');
      update();
    });
  }

  // Close suggestions on outside click
  document.addEventListener('click', e => {
    if (suggestionsEl && !searchInput.contains(e.target) && !suggestionsEl.contains(e.target)) {
      suggestionsEl.classList.add('hidden');
    }
  });

  // Keyboard navigation in suggestions
  searchInput.addEventListener('keydown', e => {
    if (!suggestionsEl || suggestionsEl.classList.contains('hidden')) return;
    const focusable = [...suggestionsEl.querySelectorAll('.cs-item')];
    if (!focusable.length) return;
    const active = suggestionsEl.querySelector('.cs-item:focus');
    const idx = active ? focusable.indexOf(active) : -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = idx < focusable.length - 1 ? idx + 1 : 0;
      focusable[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = idx > 0 ? idx - 1 : focusable.length - 1;
      focusable[prev].focus();
    } else if (e.key === 'Enter' && active) {
      e.preventDefault();
      if (active.tagName === 'A') active.click();
      else {
        searchInput.value = active.dataset.suggestion;
        activeQuery = active.dataset.suggestion;
        suggestionsEl.classList.add('hidden');
        update();
      }
    } else if (e.key === 'Escape') {
      suggestionsEl.classList.add('hidden');
      searchInput.focus();
    }
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', update);
  }

  // Initial count
  update();
  loadDynamicBibleStudies();
}
