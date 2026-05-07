// pages/reading-library.js — Consecration Reading Library

import '../config.js';
import { initHeader } from '../header.js';
import { initFooter } from '../footer.js';
import { initNavigation } from '../navigation.js';
import { initScrollAnimations, initSearchModal, initPageTransition } from '../modules/animations.js';
import { initSearch } from '../modules/search.js';

const LIBRARY_DATA = {
  page: {
    title: 'Consecration Reading Library',
    intro:
      "These are not casual recommendations. Each book in this library has been selected for its proven capacity to confront, form, and redirect those who engage it seriously. The focus throughout is on holiness, spiritual formation, and the kind of transformation that costs the reader something. Come prepared to be changed.",
    themes: [
      'Holiness of God',
      'Discipleship',
      'Spiritual Formation',
      'Christian Leadership',
      'Church & Mission',
      'Sin & Repentance',
      'Wholeness & Care',
    ],
    books: [
      {
        title: 'The Holiness of God',
        author: 'R.C. Sproul',
        isbn: '0842339655',
        summary:
          "Sproul's defining work confronts readers with the transcendent majesty and absolute moral purity of God, drawing on Isaiah's vision in the temple to examine the meaning of holiness and its implications for human sinfulness. It is a rigorous theological treatment of God's otherness and the gravity of standing before Him. No book more clearly establishes why holiness is the foundation of everything else in Christian thought.",
        theme: 'Holiness of God',
        link: 'https://www.amazon.com/Holiness-God-R-C-Sproul/dp/0842339124',
        slug: 'the-holiness-of-god-sproul',
        featured: true,
      },
      {
        title: 'The Awe of God',
        author: 'John Bevere',
        isbn: '1400336708',
        summary:
          'Bevere examines the biblical concept of the fear of the Lord, arguing that it is not terror but holy reverence—a posture that transforms character, conduct, and capacity for God. The book traces how genuine awe produces freedom, fruitfulness, and spiritual authority rather than bondage. It is an accessible yet theologically grounded treatment of a foundational disposition for the Christian life.',
        theme: 'Holiness of God',
        link: 'https://www.amazon.com/Awe-God-Astounding-Healthy-Transforms/dp/0781414571',
        slug: 'the-awe-of-god',
        featured: false,
      },
      {
        title: 'Lead Like Christ',
        author: 'A.W. Tozer',
        isbn: '1600660444',
        summary:
          "Compiled from Tozer's writings and sermons, this volume presents a vision of Christian leadership rooted entirely in Christlike character rather than institutional effectiveness or cultural competence. Tozer challenges those in ministry to pursue personal holiness as the irreducible foundation of spiritual authority. It is a prophetic corrective for leaders shaped more by organizational culture than by the character of Christ.",
        theme: 'Christian Leadership',
        link: 'https://www.amazon.com/Lead-Like-Christ-Reflecting-Ministry/dp/1600660444',
        slug: 'lead-like-christ',
        featured: false,
      },
      {
        title: 'The Cost of Discipleship',
        author: 'Dietrich Bonhoeffer',
        isbn: '0684815001',
        summary:
          'Bonhoeffer draws a sharp and enduring distinction between cheap grace—grace that demands nothing—and costly grace, which calls the disciple to death to self and total submission to Christ. Written against the backdrop of Nazi Germany, the book carries both theological precision and urgent moral weight. It remains one of the most challenging and necessary texts on the nature of genuine Christian obedience.',
        theme: 'Discipleship',
        link: 'https://www.amazon.com/Cost-Discipleship-Dietrich-Bonhoeffer/dp/0684815001',
        slug: 'the-cost-of-discipleship',
        featured: true,
      },
      {
        title: 'Holiness',
        author: 'J.C. Ryle',
        isbn: '1619581973',
        summary:
          'Ryle presents a robust, scripturally grounded account of sanctification, pressing upon readers the necessity of practical holiness as an essential mark of saving faith. With characteristic directness, he addresses sin, repentance, growth in grace, and the marks of a holy character without sentimentality or false comfort. This nineteenth-century classic remains one of the clearest and most demanding treatments of biblical holiness available.',
        theme: 'Holiness of God',
        link: 'https://www.amazon.com/Holiness-J-C-Ryle/dp/1619581973',
        slug: 'holiness-ryle',
        featured: true,
      },
      {
        title: 'Unleashed',
        author: 'Eric Mason',
        isbn: '0802406602',
        summary:
          "Mason explores what it means to be genuinely conformed to the image of Christ, examining the Spirit's transforming work across every dimension of the believer's life. The book integrates theological depth with pastoral directness, calling readers to surrender fully to Christ's lordship over identity, relationships, and purpose. Mason writes with particular attention to the intersection of spiritual formation and cultural particularity.",
        theme: 'Spiritual Formation',
        link: 'https://www.amazon.com/Unleashed-Being-Conformed-Image-Christ/dp/0802406602',
        slug: 'unleashed-mason',
        featured: false,
      },
      {
        title: 'Rebranding the Church',
        author: 'Eric Mason',
        isbn: '1433527383',
        summary:
          "Mason argues that the church has allowed cultural distortion to obscure its God-given identity and its witness in the world, calling it to recover a biblical ecclesiology grounded in the image of God. He offers both a diagnosis of contemporary drift and a constructive theological vision for faithful community and presence. The book is a serious call to the kind of church that is distinctive because it is genuinely formed by Christ.",
        theme: 'Church & Mission',
        link: 'https://www.amazon.com/Rebranding-Church-Restoring-Image-People/dp/1433527383',
        slug: 'rebranding-the-church',
        featured: false,
      },
      {
        title: 'Emotionally Healthy Spirituality',
        author: 'Peter Scazzero',
        isbn: '0310348498',
        summary:
          'Scazzero exposes the widespread disconnect between emotional immaturity and genuine spiritual depth, arguing that unprocessed emotions are a primary obstacle to authentic growth in Christ. He integrates contemplative spiritual disciplines with emotional self-awareness drawn from Scripture and pastoral experience. The result is a framework for a spirituality that engages the whole person rather than bypassing the interior life.',
        theme: 'Spiritual Formation',
        link: 'https://www.amazon.com/Emotionally-Healthy-Spirituality-Impossible-Spiritual/dp/0310348752',
        slug: 'emotionally-healthy-spirituality',
        featured: true,
      },
      {
        title: 'Emotionally Healthy Discipleship',
        author: 'Peter Scazzero',
        isbn: '0310105617',
        summary:
          'Building on his earlier work, Scazzero applies the principles of emotional health to the practice of making disciples, presenting a model that goes beneath surface behavior to address interior life, family history, and relational patterns. He argues that discipleship which ignores emotional reality produces spiritually shallow people regardless of doctrinal knowledge. This book offers a more integrated and honest vision of formation.',
        theme: 'Discipleship',
        link: 'https://www.amazon.com/Emotionally-Healthy-Discipleship-Moving-Surface/dp/0310105617',
        slug: 'emotionally-healthy-discipleship',
        featured: false,
      },
      {
        title: 'Here and Now',
        author: 'Henri Nouwen',
        isbn: '0824519671',
        summary:
          "Nouwen reflects on the discipline of living attentively in the present moment, resisting the spiritual erosion of past regret and future anxiety. Drawing on Christian mysticism and his own pastoral experience, he guides readers toward a continuous awareness of God's presence as the defining orientation of the spiritual life. This compact work is a serious invitation to contemplative attentiveness as a form of obedience.",
        theme: 'Spiritual Formation',
        link: 'https://www.amazon.com/Here-Now-Living-Spirit-Nouwen/dp/0824512790',
        slug: 'here-and-now-nouwen',
        featured: false,
      },
      {
        title: 'The Practice of the Presence of God',
        author: 'Brother Lawrence',
        isbn: '1521299757',
        summary:
          "This brief collection of letters and conversations from a seventeenth-century Carmelite monk presents one of the most enduring accounts of sustained communion with God in Christian literature. Brother Lawrence describes his practice of maintaining simple, unbroken awareness of God's presence throughout the most ordinary tasks of daily life. It is a foundational text for those seeking to integrate the whole of life into one continuous act of devotion.",
        theme: 'Spiritual Formation',
        link: 'https://www.amazon.com/Practice-Presence-God-Brother-Lawrence/dp/1612615635',
        slug: 'the-practice-of-the-presence-of-god',
        featured: true,
      },
      {
        title: 'The Sinfulness of Sin',
        author: 'Ralph Venning',
        isbn: '085151053X',
        summary:
          "First published in 1669, Venning's treatise offers an exhaustive and searching examination of the nature, extent, and consequences of sin. With Puritan precision, he exposes the radical corruption that sin introduces into every dimension of human life, insisting that the seriousness with which Scripture treats sin must be matched by those who profess Christ. This work is an essential corrective to shallow or sentimental accounts of human fallenness.",
        theme: 'Sin & Repentance',
        link: 'https://www.amazon.com/Sinfulness-Sin-Ralph-Venning/dp/085151053X',
        slug: 'the-sinfulness-of-sin',
        featured: true,
      },
      {
        title: 'The Imitation of Christ',
        author: 'Thomas à Kempis',
        isbn: '0385005377',
        summary:
          'Written in the early fifteenth century, this devotional classic ranks among the most widely read and lasting works in the history of Christian literature. Thomas à Kempis calls readers away from worldly ambition and intellectual pride toward humble conformity to Christ through self-denial, interior prayer, and reverent attention to Scripture. Its directness and simplicity make it perpetually confronting to those who encounter it honestly.',
        theme: 'Discipleship',
        link: 'https://www.amazon.com/Imitation-Christ-Thomas-Kempis/dp/0385005377',
        slug: 'the-imitation-of-christ',
        featured: true,
      },
      {
        title: 'The Pursuit of Holiness',
        author: 'Jerry Bridges',
        isbn: '1631466399',
        summary:
          "Bridges provides a practical and theologically grounded framework for the intentional pursuit of holiness in everyday life, addressing both the believer's genuine responsibility and total dependence on God's grace in sanctification. He carefully avoids both the passivity that leaves growth to God alone and the moralism that reduces holiness to human effort. The book is a widely trusted foundational text for those seeking disciplined growth in sanctification.",
        theme: 'Holiness of God',
        link: 'https://www.amazon.com/Pursuit-Holiness-Jerry-Bridges/dp/1600062245',
        slug: 'the-pursuit-of-holiness',
        featured: false,
      },
      {
        title: 'Powers, Principalities, and the Spirit',
        author: 'Esther Acolatse',
        isbn: '0802864058',
        summary:
          "Acolatse offers a rigorous theological examination of spiritual warfare, engaging both Western and African Christian perspectives to develop a biblical account of demonic powers and the Spirit's authority over them. She challenges the church to take seriously the reality of spiritual opposition without falling into either rationalistic dismissal or uncritical sensationalism. The work is an important contribution to the church's understanding of mission in a world where spiritual realities are actively contested.",
        theme: 'Church & Mission',
        link: 'https://www.amazon.com/Powers-Principalities-Spirit-Biblical-Church/dp/0802874193',
        slug: 'powers-principalities-and-the-spirit',
        featured: false,
      },
      {
        title: 'Sacred Self-Care',
        author: 'Chanequa Walker-Barnes',
        isbn: '1506471277',
        summary:
          'Walker-Barnes draws on Black feminist theology, womanist ethics, and contemplative spirituality to present self-care as a sacred and prophetic act rather than a cultural indulgence. She challenges those in ministry and caregiving roles to attend to their own souls as an act of faithfulness, grounded in the love of God and the recognition of their image-bearing dignity. The book recovers self-care from therapeutic distortion by rooting it firmly in the character and call of God.',
        theme: 'Wholeness & Care',
        link: 'https://www.amazon.com/Sacred-Self-Care-Chanequa-Walker-Barnes/dp/1506471277',
        slug: 'sacred-self-care',
        featured: false,
      },
    ],
  },
};

const FALLBACK_COVER = '../assets/images/books/fallback.svg';
const STORAGE_KEY = 'flc_reading_library';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  return esc(str).replace(/'/g, '&#39;');
}

function tokenize(q) {
  return (q || '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

function highlightMatch(text, query) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return esc(text);
  const lower = text.toLowerCase();
  const covered = new Array(text.length).fill(false);
  for (const tok of tokens) {
    if (!tok) continue;
    let pos = lower.indexOf(tok);
    while (pos !== -1) {
      for (let k = pos; k < pos + tok.length; k++) covered[k] = true;
      pos = lower.indexOf(tok, pos + tok.length);
    }
  }
  let out = '';
  let p = 0;
  while (p < text.length) {
    if (!covered[p]) {
      out += esc(text[p]);
      p++;
      continue;
    }
    let j = p;
    while (j < text.length && covered[j]) j++;
    out += `<mark>${esc(text.slice(p, j))}</mark>`;
    p = j;
  }
  return out;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ sort: activeSort }));
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

let activeFilter = 'all';
let activeSearch = '';
let activeSort = 'featured';
let savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

const DOM = {
  libraryLabelText: null,
  grid: null,
  empty: null,
  count: null,
  searchInput: null,
  clearBtn: null,
  clearFiltersBtn: null,
  searchSuggestions: null,
  filterTabs: null,
  backToTop: null,
  sortSelect: null,
  searchResultBadge: null,
  emptyStateClear: null,
  filterBar: null,
};

function coverSrc(isbn) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
}

function buildCardHTML(book, searchQuery) {
  const cardId = `card-${book.slug}`;
  const featuredBadge = book.featured
    ? '<span class="foundational-badge text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full">Foundational</span>'
    : '';
  const cover = coverSrc(book.isbn);
  const q = searchQuery || '';
  return `
    <article class="book-card bg-white rounded-xl overflow-hidden shadow-sm"
             id="${esc(cardId)}"
             data-slug="${esc(book.slug)}"
             data-theme="${escAttr(book.theme)}"
             data-title="${escAttr(book.title)}"
             data-author="${escAttr(book.author)}"
             tabindex="0"
             role="button"
             aria-expanded="false">
      <button type="button" class="book-card-toggle w-full text-left p-6 flex items-start gap-5 cursor-pointer hover:bg-flcOffWhite/50 transition-colors focus:outline-none focus:ring-2 focus:ring-flcGold/50 rounded-lg"
              aria-label="Toggle details for ${esc(book.title)} by ${esc(book.author)}">
        <div class="relative aspect-[2/3] w-20 flex-shrink-0 bg-flcOffWhite rounded-lg overflow-hidden book-cover-container">
          <img src="${esc(cover)}"
               alt="Book cover for ${esc(book.title)}"
               loading="lazy"
               decoding="async"
               fetchpriority="low"
               class="book-cover-img w-full h-full object-contain opacity-0 transition-opacity duration-300"
               data-fallback="${esc(FALLBACK_COVER)}"
               onerror="this.onerror=null;this.src=this.dataset.fallback"
               onload="this.classList.remove('opacity-0')" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-1.5 mb-2">
            <span class="theme-badge text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full">${esc(book.theme)}</span>
            ${featuredBadge}
          </div>
          <h3 class="book-card__title font-heading text-lg leading-snug text-flcNavy mb-1 truncate">${highlightMatch(book.title, q)}</h3>
          <p class="book-card__author text-xs font-medium mb-0 book-card__meta">${highlightMatch(book.author, q)}</p>
        </div>
        <svg class="expand-icon w-5 h-5 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="book-details px-6 pb-6" role="region" aria-label="Book details">
        <p class="book-card__summary text-sm leading-relaxed mb-4 mt-2">${esc(book.summary)}</p>
        <a href="${esc(book.link)}" target="_blank" rel="noopener noreferrer"
           class="book-view-btn inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors">
          View Book
          <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
        <button type="button" class="book-share-btn inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border border-flcBorder text-flcCharcoal/70 hover:bg-flcOffWhite hover:text-flcNavy transition-colors"
                data-link="${escAttr(book.link)}" data-title="${escAttr(book.title)}">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          Share
        </button>
      </div>
    </article>`;
}

function toggleCard(card) {
  if (!card) return;
  const details = card.querySelector('.book-details');
  const icon = card.querySelector('.expand-icon');
  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  details?.classList.toggle('open', !isExpanded);
  icon?.classList.toggle('rotated', !isExpanded);
  card.setAttribute('aria-expanded', String(!isExpanded));
}

function shareBook(link, title) {
  const shareText = `Check out "${title}" from the Consecration Reading Library: ${link}`;
  if (navigator.share) {
    navigator
      .share({ title, text: shareText, url: link })
      .catch(() => copyToClipboard(link, title));
  } else {
    copyToClipboard(link, title);
  }
}

function copyToClipboard(link, title) {
  navigator.clipboard
    .writeText(link)
    .then(() => alert(`Link for "${title}" copied to clipboard!`))
    .catch(() => alert('Failed to copy link. Please try again.'));
}

function sortBooks(books) {
  const sorted = [...books];
  switch (activeSort) {
    case 'featured':
      sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      break;
    case 'title':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'author':
      sorted.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'theme':
      sorted.sort((a, b) => a.theme.localeCompare(b.theme));
      break;
  }
  return sorted;
}

function bookMatches(book, search) {
  if (activeFilter !== 'all' && book.theme !== activeFilter) return false;
  const tokens = tokenize(search);
  if (tokens.length === 0) return true;
  const hay = `${book.title} ${book.author} ${book.theme}`.toLowerCase();
  return tokens.every(t => hay.includes(t));
}

function updateCardHighlights(card, search) {
  const titleEl = card.querySelector('.book-card__title');
  const authorEl = card.querySelector('.book-card__author');
  const t = card.dataset.title || '';
  const a = card.dataset.author || '';
  if (titleEl) titleEl.innerHTML = highlightMatch(t, search);
  if (authorEl) authorEl.innerHTML = highlightMatch(a, search);
}

function updateLibraryView(books) {
  const search = activeSearch.toLowerCase().trim();

  if (DOM.libraryLabelText) {
    if (search) DOM.libraryLabelText.textContent = 'Search Results';
    else if (activeFilter === 'all') DOM.libraryLabelText.textContent = 'Library';
    else DOM.libraryLabelText.textContent = activeFilter;
  }

  const hasActiveFilters = activeFilter !== 'all' || search !== '' || activeSort !== 'featured';
  DOM.clearFiltersBtn?.classList.toggle('hidden', !hasActiveFilters);

  const visibleBooks = books.filter(b => bookMatches(b, search));
  const ordered = sortBooks(visibleBooks);
  const orderMap = new Map(ordered.map((b, i) => [b.slug, i]));

  let visibleCount = 0;
  const cards = DOM.grid?.querySelectorAll('.book-card') || [];
  cards.forEach(card => {
    const slug = card.dataset.slug;
    const book = books.find(b => b.slug === slug);
    if (!book) return;
    const visible = bookMatches(book, search);
    if (visible) visibleCount++;
    card.toggleAttribute('hidden', !visible);
    card.style.order = visible ? String(orderMap.get(slug) ?? 999) : '9999';
    if (visible) updateCardHighlights(card, activeSearch);
  });

  const anyVisible = visibleCount > 0;
  DOM.grid?.classList.toggle('hidden', !anyVisible);
  DOM.empty?.classList.toggle('hidden', anyVisible);

  if (DOM.count) {
    if (search || activeFilter !== 'all') {
      DOM.count.textContent = `${visibleCount} book${visibleCount !== 1 ? 's' : ''} found`;
    } else {
      DOM.count.textContent = `${books.length} books`;
    }
  }

  // Search result badge inside input
  if (DOM.searchResultBadge) {
    if (search) {
      DOM.searchResultBadge.textContent = `${visibleCount}`;
      DOM.searchResultBadge.classList.remove('hidden');
    } else {
      DOM.searchResultBadge.classList.add('hidden');
    }
  }

  // Staggered card entrance animation
  animateVisibleCards();
}

function animateVisibleCards() {
  if (!DOM.grid) return;
  const visibleCards = Array.from(DOM.grid.querySelectorAll('.book-card:not([hidden])'));
  visibleCards.forEach(card => {
    card.classList.add('card-enter');
    card.classList.remove('card-visible');
  });
  requestAnimationFrame(() => {
    visibleCards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.remove('card-enter');
        card.classList.add('card-visible');
      }, i * 40);
    });
  });
}

function exportReadingList() {
  const { books } = LIBRARY_DATA.page;
  const search = activeSearch.toLowerCase().trim();
  let filtered = books.filter(b => bookMatches(b, search));
  filtered = sortBooks(filtered);

  let text = 'Consecration Reading Library\n================================\n\n';
  if (activeFilter !== 'all' || activeSearch) {
    text += `Filtered view: ${activeFilter === 'all' ? 'All' : activeFilter}${activeSearch ? ' - Search: ' + activeSearch : ''}\n\n`;
  }
  filtered.forEach((book, index) => {
    text += `${index + 1}. ${book.title}\n   Author: ${book.author}\n   Theme: ${book.theme}\n`;
    if (book.featured) text += '   [Foundational]\n';
    text += `   Link: ${book.link}\n   ${book.summary}\n\n`;
  });
  text += `\nTotal: ${filtered.length} books\nGenerated: ${new Date().toLocaleDateString()}\n`;

  navigator.clipboard
    .writeText(text)
    .then(() => alert('Reading list copied to clipboard!'))
    .catch(() => alert('Failed to copy to clipboard. Please try again.'));
}

function getSearchSuggestions(query, books) {
  const tokens = tokenize(query);
  if (tokens.length === 0 || query.trim().length < 2) return [];
  const hits = [];
  const seen = new Set();
  const matchAnyToken = s => {
    const lower = s.toLowerCase();
    return tokens.some(t => lower.includes(t));
  };
  for (const b of books) {
    if (matchAnyToken(b.title) && !seen.has('t:' + b.title)) {
      seen.add('t:' + b.title);
      hits.push({ text: b.title, type: 'Title', author: b.author });
    }
    if (matchAnyToken(b.author) && !seen.has('a:' + b.author)) {
      seen.add('a:' + b.author);
      hits.push({ text: b.author, type: 'Author' });
    }
    if (matchAnyToken(b.theme) && !seen.has('th:' + b.theme)) {
      seen.add('th:' + b.theme);
      hits.push({ text: b.theme, type: 'Theme' });
    }
  }
  return hits.slice(0, 8);
}

function renderSuggestions(suggestions) {
  if (!DOM.searchSuggestions) return;
  if (suggestions.length === 0) {
    DOM.searchSuggestions.classList.add('hidden');
    return;
  }
  DOM.searchSuggestions.innerHTML = suggestions
    .map(
      s => `<button type="button" class="suggestion-item w-full text-left focus:outline-none" data-suggestion="${escAttr(s.text)}">
        <span class="suggestion-type">${esc(s.type)}</span>
        <span class="suggestion-text flex-1 min-w-0 truncate">${highlightMatch(s.text, activeSearch)}</span>
        ${s.author ? `<span class="text-xs text-flcCharcoal/40 flex-shrink-0">${esc(s.author)}</span>` : ''}
      </button>`
    )
    .join('');
  DOM.searchSuggestions.classList.remove('hidden');
}

function syncMobileSearchInput() {
  const mobile = document.getElementById('mobileSearchInput');
  if (mobile && DOM.searchInput) mobile.value = DOM.searchInput.value;
}

function selectSuggestion(suggestion) {
  if (!DOM.searchInput) return;
  DOM.searchInput.value = suggestion;
  activeSearch = suggestion;
  syncMobileSearchInput();
  DOM.searchSuggestions?.classList.add('hidden');
  DOM.clearBtn?.classList.toggle('hidden', !activeSearch);
  updateLibraryView(LIBRARY_DATA.page.books);
}

function renderFilterTabs(themes, books) {
  const container = document.getElementById('filterTabs');
  if (!container) return;
  const counts = {};
  themes.forEach(t => {
    counts[t] = 0;
  });
  books.forEach(b => {
    if (counts[b.theme] !== undefined) counts[b.theme]++;
  });
  const tabData = [
    { label: 'All', value: 'all', count: books.length },
    ...themes.map(t => ({ label: t, value: t, count: counts[t] })),
  ];
  container.innerHTML = tabData
    .map(
      (tab, i) => `
    <button type="button"
      class="filter-btn whitespace-nowrap flex items-center gap-2 rounded-full border"
      data-filter="${esc(tab.value)}"
      aria-pressed="${i === 0}"
      role="tab">
      ${esc(tab.label)}
      <span class="filter-count font-semibold px-1.5 py-0.5 rounded-full leading-none">${tab.count}</span>
    </button>`
    )
    .join('');
}

function updateFilterBtnStyles(theme) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === theme));
  });
}

function initReadingLibrary() {
  const { page } = LIBRARY_DATA;
  const { books, themes } = page;

  if (savedState.sort) activeSort = savedState.sort;

  DOM.libraryLabelText = document.getElementById('libraryLabelText');
  DOM.grid = document.getElementById('bookGrid');
  DOM.empty = document.getElementById('emptyState');
  DOM.count = document.getElementById('bookCount');
  DOM.searchInput = document.getElementById('bookSearch');
  DOM.clearBtn = document.getElementById('clearSearch');
  DOM.clearFiltersBtn = document.getElementById('clearFilters');
  DOM.searchSuggestions = document.getElementById('searchSuggestions');
  DOM.filterTabs = document.getElementById('filterTabs');
  DOM.backToTop = document.getElementById('backToTop');
  DOM.sortSelect = document.getElementById('sortSelect');
  DOM.searchResultBadge = document.getElementById('searchResultBadge');
  DOM.emptyStateClear = document.getElementById('emptyStateClear');
  DOM.filterBar = document.getElementById('filterBar');

  const introEl = document.getElementById('libraryIntro');
  if (introEl) introEl.textContent = page.intro;
  if (DOM.sortSelect) DOM.sortSelect.value = activeSort;

  renderFilterTabs(themes, books);

  const initialOrder = sortBooks([...books]);
  if (DOM.grid) {
    DOM.grid.innerHTML = initialOrder.map(b => buildCardHTML(b, '')).join('');
    DOM.grid.classList.remove('hidden');
  }

  updateLibraryView(books);

  DOM.filterTabs?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    updateFilterBtnStyles(activeFilter);
    updateLibraryView(books);
  });

  DOM.sortSelect?.addEventListener('change', e => {
    activeSort = e.target.value;
    saveState();
    updateLibraryView(books);
  });

  const runSearch = () => {
    activeSearch = DOM.searchInput?.value || '';
    syncMobileSearchInput();
    DOM.clearBtn?.classList.toggle('hidden', !activeSearch);
    const suggestions = getSearchSuggestions(activeSearch, books);
    renderSuggestions(suggestions);
    updateLibraryView(books);
  };

  const debouncedSearch = debounce(runSearch, 300);
  DOM.searchInput?.addEventListener('input', debouncedSearch);

  document.addEventListener('click', e => {
    if (
      DOM.searchSuggestions &&
      !DOM.searchSuggestions.contains(e.target) &&
      e.target !== DOM.searchInput
    ) {
      DOM.searchSuggestions.classList.add('hidden');
    }
  });

  DOM.searchSuggestions?.addEventListener('click', e => {
    const item = e.target.closest('.suggestion-item');
    if (!item?.dataset.suggestion) return;
    selectSuggestion(item.dataset.suggestion);
  });

  DOM.searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Escape') DOM.searchSuggestions?.classList.add('hidden');
  });

  DOM.clearBtn?.addEventListener('click', () => {
    if (DOM.searchInput) DOM.searchInput.value = '';
    activeSearch = '';
    syncMobileSearchInput();
    DOM.clearBtn.classList.add('hidden');
    DOM.searchResultBadge?.classList.add('hidden');
    DOM.searchSuggestions?.classList.add('hidden');
    updateLibraryView(books);
    DOM.searchInput?.focus();
  });

  DOM.clearFiltersBtn?.addEventListener('click', () => {
    activeFilter = 'all';
    activeSearch = '';
    activeSort = 'featured';
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';
    syncMobileSearchInput();
    updateFilterBtnStyles('all');
    DOM.searchResultBadge?.classList.add('hidden');
    DOM.searchSuggestions?.classList.add('hidden');
    saveState();
    updateLibraryView(books);
  });

  document.getElementById('searchBtn')?.addEventListener('click', () => {
    DOM.searchInput?.focus({ preventScroll: false });
    DOM.searchInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('exportList')?.addEventListener('click', exportReadingList);

  const mobileSearch = document.getElementById('mobileSearchInput');
  if (mobileSearch && DOM.searchInput) {
    mobileSearch.addEventListener('input', () => {
      DOM.searchInput.value = mobileSearch.value;
      debouncedSearch();
    });
  }

  if (DOM.grid) {
    DOM.grid.addEventListener('click', e => {
      const share = e.target.closest('.book-share-btn');
      if (share) {
        e.preventDefault();
        shareBook(share.dataset.link || '', share.dataset.title || '');
        return;
      }
      if (e.target.closest('.book-card-toggle')) {
        e.preventDefault();
        toggleCard(e.target.closest('.book-card'));
      }
    });

    DOM.grid.addEventListener('keydown', e => {
      const card = e.target.closest('.book-card');
      if (!card || e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      } else if (e.key === 'Escape' && card.classList.contains('expanded')) {
        e.preventDefault();
        toggleCard(card);
      }
    });
  }

  document.addEventListener(
    'error',
    e => {
      if (e.target.classList?.contains('book-cover-img')) {
        e.target.src = e.target.dataset.fallback;
        e.target.classList.remove('opacity-0');
      }
    },
    true
  );

  DOM.filterTabs?.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const buttons = Array.from(DOM.filterTabs.querySelectorAll('.filter-btn'));
    const currentIndex = buttons.indexOf(document.activeElement);
    const direction = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
    buttons[nextIndex].focus();
    buttons[nextIndex].click();
  });

  // Empty state "Reset Filters" button
  DOM.emptyStateClear?.addEventListener('click', () => {
    activeFilter = 'all';
    activeSearch = '';
    activeSort = 'featured';
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';
    syncMobileSearchInput();
    updateFilterBtnStyles('all');
    saveState();
    updateLibraryView(books);
    DOM.searchInput?.focus();
  });

  if (DOM.backToTop) {
    window.addEventListener(
      'scroll',
      () => {
        DOM.backToTop.classList.toggle('visible', window.scrollY > 300);
        DOM.filterBar?.classList.toggle('scrolled', window.scrollY > 100);
      },
      { passive: true }
    );
    DOM.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const observer = new IntersectionObserver(
    entries => entries.forEach(en => en.isIntersecting && en.target.classList.add('visible')),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

setTimeout(() => { document.body.classList.add('pt-ready'); }, 3000);

async function initReadingLibraryPage() {
  try {
    await initHeader();
    await initFooter();
    initNavigation();
    initScrollAnimations();
    initSearchModal();
    await initSearch();
    initReadingLibrary();
  } catch (error) {
    console.error('Error initializing reading-library page:', error);
  } finally {
    initPageTransition();
  }
}

initReadingLibraryPage();
