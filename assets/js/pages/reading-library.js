// pages/reading-library.js — Consecration Reading Library

// ─── Content Data ────────────────────────────────────────────────────────────
// Matches the requested JSON schema exactly. Add new books here; the page
// renders and filters automatically. No structural changes needed.

const LIBRARY_DATA = {
  page: {
    title: "Consecration Reading Library",
    intro: "These are not casual recommendations. Each book in this library has been selected for its proven capacity to confront, form, and redirect those who engage it seriously. The focus throughout is on holiness, spiritual formation, and the kind of transformation that costs the reader something. Come prepared to be changed.",
    themes: [
      "Holiness of God",
      "Discipleship",
      "Spiritual Formation",
      "Christian Leadership",
      "Church & Mission",
      "Sin & Repentance",
      "Wholeness & Care"
    ],
    books: [
      {
        title: "The Holiness of God",
        author: "R.C. Sproul",
        isbn: "0842339655",
        summary: "Sproul's defining work confronts readers with the transcendent majesty and absolute moral purity of God, drawing on Isaiah's vision in the temple to examine the meaning of holiness and its implications for human sinfulness. It is a rigorous theological treatment of God's otherness and the gravity of standing before Him. No book more clearly establishes why holiness is the foundation of everything else in Christian thought.",
        theme: "Holiness of God",
        link: "https://www.amazon.com/Holiness-God-R-C-Sproul/dp/0842339124",
        slug: "the-holiness-of-god-sproul",
        featured: true
      },
      {
        title: "The Awe of God",
        author: "John Bevere",
        isbn: "1400336708",
        summary: "Bevere examines the biblical concept of the fear of the Lord, arguing that it is not terror but holy reverence—a posture that transforms character, conduct, and capacity for God. The book traces how genuine awe produces freedom, fruitfulness, and spiritual authority rather than bondage. It is an accessible yet theologically grounded treatment of a foundational disposition for the Christian life.",
        theme: "Holiness of God",
        link: "https://www.amazon.com/Awe-God-Astounding-Healthy-Transforms/dp/0781414571",
        slug: "the-awe-of-god",
        featured: false
      },
      {
        title: "Lead Like Christ",
        author: "A.W. Tozer",
        summary: "Compiled from Tozer's writings and sermons, this volume presents a vision of Christian leadership rooted entirely in Christlike character rather than institutional effectiveness or cultural competence. Tozer challenges those in ministry to pursue personal holiness as the irreducible foundation of spiritual authority. It is a prophetic corrective for leaders shaped more by organizational culture than by the character of Christ.",
        theme: "Christian Leadership",
        link: "https://www.amazon.com/Lead-Like-Christ-Reflecting-Ministry/dp/1600660444",
        slug: "lead-like-christ",
        featured: false
      },
      {
        title: "The Cost of Discipleship",
        author: "Dietrich Bonhoeffer",
        isbn: "0684815001",
        summary: "Bonhoeffer draws a sharp and enduring distinction between cheap grace—grace that demands nothing—and costly grace, which calls the disciple to death to self and total submission to Christ. Written against the backdrop of Nazi Germany, the book carries both theological precision and urgent moral weight. It remains one of the most challenging and necessary texts on the nature of genuine Christian obedience.",
        theme: "Discipleship",
        link: "https://www.amazon.com/Cost-Discipleship-Dietrich-Bonhoeffer/dp/0684815001",
        slug: "the-cost-of-discipleship",
        featured: true
      },
      {
        title: "Holiness",
        author: "J.C. Ryle",
        summary: "Ryle presents a robust, scripturally grounded account of sanctification, pressing upon readers the necessity of practical holiness as an essential mark of saving faith. With characteristic directness, he addresses sin, repentance, growth in grace, and the marks of a holy character without sentimentality or false comfort. This nineteenth-century classic remains one of the clearest and most demanding treatments of biblical holiness available.",
        theme: "Holiness of God",
        link: "https://www.amazon.com/Holiness-J-C-Ryle/dp/1619581973",
        slug: "holiness-ryle",
        featured: true
      },
      {
        title: "Unleashed",
        author: "Eric Mason",
        summary: "Mason explores what it means to be genuinely conformed to the image of Christ, examining the Spirit's transforming work across every dimension of the believer's life. The book integrates theological depth with pastoral directness, calling readers to surrender fully to Christ's lordship over identity, relationships, and purpose. Mason writes with particular attention to the intersection of spiritual formation and cultural particularity.",
        theme: "Spiritual Formation",
        link: "https://www.amazon.com/Unleashed-Being-Conformed-Image-Christ/dp/0802406602",
        slug: "unleashed-mason",
        featured: false
      },
      {
        title: "Rebranding the Church",
        author: "Eric Mason",
        summary: "Mason argues that the church has allowed cultural distortion to obscure its God-given identity and its witness in the world, calling it to recover a biblical ecclesiology grounded in the image of God. He offers both a diagnosis of contemporary drift and a constructive theological vision for faithful community and presence. The book is a serious call to the kind of church that is distinctive because it is genuinely formed by Christ.",
        theme: "Church & Mission",
        link: "https://www.amazon.com/Rebranding-Church-Restoring-Image-People/dp/1433527383",
        slug: "rebranding-the-church",
        featured: false
      },
      {
        title: "Emotionally Healthy Spirituality",
        author: "Peter Scazzero",
        isbn: "0310348498",
        summary: "Scazzero exposes the widespread disconnect between emotional immaturity and genuine spiritual depth, arguing that unprocessed emotions are a primary obstacle to authentic growth in Christ. He integrates contemplative spiritual disciplines with emotional self-awareness drawn from Scripture and pastoral experience. The result is a framework for a spirituality that engages the whole person rather than bypassing the interior life.",
        theme: "Spiritual Formation",
        link: "https://www.amazon.com/Emotionally-Healthy-Spirituality-Impossible-Spiritual/dp/0310348752",
        slug: "emotionally-healthy-spirituality",
        featured: true
      },
      {
        title: "Emotionally Healthy Discipleship",
        author: "Peter Scazzero",
        summary: "Building on his earlier work, Scazzero applies the principles of emotional health to the practice of making disciples, presenting a model that goes beneath surface behavior to address interior life, family history, and relational patterns. He argues that discipleship which ignores emotional reality produces spiritually shallow people regardless of doctrinal knowledge. This book offers a more integrated and honest vision of formation.",
        theme: "Discipleship",
        link: "https://www.amazon.com/Emotionally-Healthy-Discipleship-Moving-Surface/dp/0310105617",
        slug: "emotionally-healthy-discipleship",
        featured: false
      },
      {
        title: "Here and Now",
        author: "Henri Nouwen",
        isbn: "0824519671",
        summary: "Nouwen reflects on the discipline of living attentively in the present moment, resisting the spiritual erosion of past regret and future anxiety. Drawing on Christian mysticism and his own pastoral experience, he guides readers toward a continuous awareness of God's presence as the defining orientation of the spiritual life. This compact work is a serious invitation to contemplative attentiveness as a form of obedience.",
        theme: "Spiritual Formation",
        link: "https://www.amazon.com/Here-Now-Living-Spirit-Nouwen/dp/0824512790",
        slug: "here-and-now-nouwen",
        featured: false
      },
      {
        title: "The Practice of the Presence of God",
        author: "Brother Lawrence",
        isbn: "1521299757",
        summary: "This brief collection of letters and conversations from a seventeenth-century Carmelite monk presents one of the most enduring accounts of sustained communion with God in Christian literature. Brother Lawrence describes his practice of maintaining simple, unbroken awareness of God's presence throughout the most ordinary tasks of daily life. It is a foundational text for those seeking to integrate the whole of life into one continuous act of devotion.",
        theme: "Spiritual Formation",
        link: "https://www.amazon.com/Practice-Presence-God-Brother-Lawrence/dp/1612615635",
        slug: "the-practice-of-the-presence-of-god",
        featured: true
      },
      {
        title: "The Sinfulness of Sin",
        author: "Ralph Venning",
        summary: "First published in 1669, Venning's treatise offers an exhaustive and searching examination of the nature, extent, and consequences of sin. With Puritan precision, he exposes the radical corruption that sin introduces into every dimension of human life, insisting that the seriousness with which Scripture treats sin must be matched by those who profess Christ. This work is an essential corrective to shallow or sentimental accounts of human fallenness.",
        theme: "Sin & Repentance",
        link: "https://www.amazon.com/Sinfulness-Sin-Ralph-Venning/dp/085151053X",
        slug: "the-sinfulness-of-sin",
        featured: true
      },
      {
        title: "The Imitation of Christ",
        author: "Thomas à Kempis",
        summary: "Written in the early fifteenth century, this devotional classic ranks among the most widely read and lasting works in the history of Christian literature. Thomas à Kempis calls readers away from worldly ambition and intellectual pride toward humble conformity to Christ through self-denial, interior prayer, and reverent attention to Scripture. Its directness and simplicity make it perpetually confronting to those who encounter it honestly.",
        theme: "Discipleship",
        link: "https://www.amazon.com/Imitation-Christ-Thomas-Kempis/dp/0385005377",
        slug: "the-imitation-of-christ",
        featured: true
      },
      {
        title: "The Pursuit of Holiness",
        author: "Jerry Bridges",
        isbn: "1631466399",
        summary: "Bridges provides a practical and theologically grounded framework for the intentional pursuit of holiness in everyday life, addressing both the believer's genuine responsibility and total dependence on God's grace in sanctification. He carefully avoids both the passivity that leaves growth to God alone and the moralism that reduces holiness to human effort. The book is a widely trusted foundational text for those seeking disciplined growth in sanctification.",
        theme: "Holiness of God",
        link: "https://www.amazon.com/Pursuit-Holiness-Jerry-Bridges/dp/1600062245",
        slug: "the-pursuit-of-holiness",
        featured: false
      },
      {
        title: "Powers, Principalities, and the Spirit",
        author: "Esther Acolatse",
        isbn: "0802864058",
        summary: "Acolatse offers a rigorous theological examination of spiritual warfare, engaging both Western and African Christian perspectives to develop a biblical account of demonic powers and the Spirit's authority over them. She challenges the church to take seriously the reality of spiritual opposition without falling into either rationalistic dismissal or uncritical sensationalism. The work is an important contribution to the church's understanding of mission in a world where spiritual realities are actively contested.",
        theme: "Church & Mission",
        link: "https://www.amazon.com/Powers-Principalities-Spirit-Biblical-Church/dp/0802874193",
        slug: "powers-principalities-and-the-spirit",
        featured: false
      },
      {
        title: "Sacred Self-Care",
        author: "Chanequa Walker-Barnes",
        summary: "Walker-Barnes draws on Black feminist theology, womanist ethics, and contemplative spirituality to present self-care as a sacred and prophetic act rather than a cultural indulgence. She challenges those in ministry and caregiving roles to attend to their own souls as an act of faithfulness, grounded in the love of God and the recognition of their image-bearing dignity. The book recovers self-care from therapeutic distortion by rooting it firmly in the character and call of God.",
        theme: "Wholeness & Care",
        link: "https://www.amazon.com/Sacred-Self-Care-Chanequa-Walker-Barnes/dp/1506471277",
        slug: "sacred-self-care",
        featured: false
      }
    ]
  }
};

// ─── Theme accent colours ─────────────────────────────────────────────────────
// Kept within the site's muted, deep palette. Used for card top bars and badges.
const THEME_ACCENTS = {
  'Holiness of God':      '#9A7B4F',
  'Discipleship':         '#1A3A52',
  'Spiritual Formation':  '#5E4F7A',
  'Christian Leadership': '#2A537A',
  'Church & Mission':     '#3A6B50',
  'Sin & Repentance':     '#7A3535',
  'Wholeness & Care':     '#3A6B6B',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    sort: activeSort
  }));
}

function fuzzyMatch(text, query) {
  if (!query) return true;
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  let i = 0;
  for (const char of t) {
    if (char === q[i]) i++;
    if (i === q.length) return true;
  }
  return false;
}

function highlightMatch(text, query) {
  if (!query) return esc(text);
  const q = query.toLowerCase();
  const t = text;
  let result = '';
  let i = 0;
  let j = 0;
  while (i < t.length && j < q.length) {
    if (t[i].toLowerCase() === q[j]) {
      result += `<mark class="bg-flcGold/30 rounded px-0.5">${esc(t[i])}</mark>`;
      j++;
    } else {
      result += esc(t[i]);
    }
    i++;
  }
  result += esc(t.slice(i));
  return result;
}

// ─── State ──────────────────────────────────────────────────────────────────────
let activeFilter = 'all';
let activeSearch  = '';
let activeSort   = 'featured'; // 'featured', 'title', 'author', 'theme'
const coverCache = new Map();
const FALLBACK_COVER = '../assets/images/books/fallback.svg';
const STORAGE_KEY = 'flc_reading_library';

// Load saved preferences
let savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

// ─── Cached DOM elements ───────────────────────────────────────────────────────
const DOM = {
  libraryLabel: null,
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
  sortSelect: null
};

// ─── Debounce utility ───────────────────────────────────────────────────────────
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
// ─── Open Library Cover Fetching ─────────────────────────────────────────────────
async function getCoverByISBN(isbn) {
  const cacheKey = `isbn-${isbn}`;
  if (coverCache.has(cacheKey)) return coverCache.get(cacheKey);
  
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  coverCache.set(cacheKey, url);
  return url;
}

async function searchCover(title, author) {
  const cacheKey = `search-${title}-${author}`;
  if (coverCache.has(cacheKey)) return coverCache.get(cacheKey);
  
  try {
    const query = encodeURIComponent(`${title} ${author}`);
    const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
    const data = await response.json();
    
    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      const url = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
      coverCache.set(cacheKey, url);
      return url;
    }
  } catch (e) {
    return null;
  }
  
  coverCache.set(cacheKey, null);
  return null;
}

async function getBookCover(book) {
  if (book.isbn) {
    return await getCoverByISBN(book.isbn);
  }
  return await searchCover(book.title, book.author);
}

// ─── Animated render ─────────────────────────────────────────────────────────
function animatedRender(container, html) {
  container.style.transition = 'opacity 0.12s ease, transform 0.12s ease';
  container.style.opacity = '0';
  container.style.transform = 'translateY(5px)';
  setTimeout(() => {
    container.innerHTML = html;
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 120);
}

// ─── Card renderer (accordion) ────────────────────────────────────────────────────
async function renderCard(book) {
  const accent = THEME_ACCENTS[book.theme] || '#9A7B4F';
  const badgeBg = hexToRgba(accent, 0.10);
  const gradientBg = `linear-gradient(135deg, ${hexToRgba(accent, 0.03)} 0%, ${hexToRgba(accent, 0.08)} 100%)`;
  const featuredBadge = book.featured
    ? `<span class="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style="background:rgba(154,123,79,0.12);color:#9A7B4F;">Foundational</span>`
    : '';
  const cardId = `card-${book.slug}`;
  const coverUrl = await getBookCover(book) || FALLBACK_COVER;
  
  return `
    <article class="book-card bg-white rounded-xl overflow-hidden shadow-sm"
             id="${esc(cardId)}"
             data-theme="${esc(book.theme)}" data-slug="${esc(book.slug)}"
             tabindex="0"
             role="button"
             aria-expanded="false"
             onkeydown="handleCardKeydown(event, '${esc(cardId)}')"
             style="background: ${gradientBg};">
      <button class="w-full text-left p-6 flex items-start gap-5 cursor-pointer hover:bg-flcOffWhite/50 transition-colors focus:outline-none focus:ring-2 focus:ring-flcGold/50 rounded-lg"
              onclick="toggleCard('${esc(cardId)}')"
              aria-label="Toggle details for ${esc(book.title)} by ${esc(book.author)}">
        <div class="relative aspect-[2/3] w-20 flex-shrink-0 bg-flcOffWhite rounded-lg overflow-hidden book-cover-container">
          <img src="${esc(coverUrl)}" 
               alt="Book cover for ${esc(book.title)}" 
               loading="lazy"
               class="book-cover-img w-full h-full object-contain opacity-0 transition-opacity duration-300"
               data-fallback="${esc(FALLBACK_COVER)}"
               onload="this.classList.remove('opacity-0')" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-1.5 mb-2">
            <span class="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style="background:${badgeBg};color:${accent};">${esc(book.theme)}</span>
            ${featuredBadge}
          </div>
          <h3 class="font-heading text-lg leading-snug text-flcNavy mb-1 truncate">${highlightMatch(book.title, activeSearch)}</h3>
          <p class="text-xs font-medium mb-0" style="color:rgba(44,44,44,0.55);">${highlightMatch(book.author, activeSearch)}</p>
        </div>
        <svg class="expand-icon w-5 h-5 flex-shrink-0 mt-1" style="color:rgba(44,44,44,0.3);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="book-details px-6 pb-6" role="region" aria-label="Book details">
        <p class="text-sm leading-relaxed mb-4 mt-2" style="color:rgba(44,44,44,0.8);">${esc(book.summary)}</p>
        <a href="${esc(book.link)}" target="_blank" rel="noopener noreferrer"
           class="book-view-btn inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors">
          View Book
          <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
        <button onclick="shareBook('${esc(book.link)}', '${esc(book.title)}')" class="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg border border-flcBorder text-flcCharcoal/70 hover:bg-flcOffWhite hover:text-flcNavy transition-colors">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          Share
        </button>
      </div>
    </article>`;
}

function toggleCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const details = card.querySelector('.book-details');
  const icon = card.querySelector('.expand-icon');
  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  details?.classList.toggle('open', !isExpanded);
  icon?.classList.toggle('rotated', !isExpanded);
  card.setAttribute('aria-expanded', !isExpanded);
}

function handleCardKeydown(event, cardId) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleCard(cardId);
      break;
    case 'Escape':
      const card = document.getElementById(cardId);
      if (card && card.classList.contains('expanded')) {
        toggleCard(cardId);
      }
      break;
  }
}

function exportReadingList() {
  const { page } = LIBRARY_DATA;
  const { books } = page;
  
  // Get currently filtered books
  let filtered = books;
  if (activeFilter !== 'all') {
    filtered = filtered.filter(b => b.theme === activeFilter);
  }
  if (activeSearch) {
    filtered = filtered.filter(b =>
      fuzzyMatch(b.title, activeSearch) || 
      fuzzyMatch(b.author, activeSearch) || 
      fuzzyMatch(b.theme, activeSearch)
    );
  }
  filtered = sortBooks(filtered);
  
  // Create text format
  let text = 'Consecration Reading Library\n';
  text += '================================\n\n';
  
  if (activeFilter !== 'all' || activeSearch) {
    text += `Filtered view: ${activeFilter === 'all' ? 'All' : activeFilter}${activeSearch ? ' - Search: ' + activeSearch : ''}\n\n`;
  }
  
  filtered.forEach((book, index) => {
    text += `${index + 1}. ${book.title}\n`;
    text += `   Author: ${book.author}\n`;
    text += `   Theme: ${book.theme}\n`;
    if (book.featured) text += '   [Foundational]\n';
    text += `   Link: ${book.link}\n`;
    text += `   ${book.summary}\n\n`;
  });
  
  text += `\nTotal: ${filtered.length} books\n`;
  text += `Generated: ${new Date().toLocaleDateString()}\n`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(text).then(() => {
    alert('Reading list copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard. Please try again.');
  });
}

function shareBook(link, title) {
  const shareText = `Check out "${title}" from the Consecration Reading Library: ${link}`;
  
  if (navigator.share) {
    navigator.share({
      title: title,
      text: shareText,
      url: link
    }).catch(err => {
      console.log('Share failed:', err);
      // Fallback to clipboard
      copyToClipboard(link, title);
    });
  } else {
    copyToClipboard(link, title);
  }
}

function copyToClipboard(link, title) {
  navigator.clipboard.writeText(link).then(() => {
    alert(`Link for "${title}" copied to clipboard!`);
  }).catch(err => {
    console.error('Failed to copy:', err);
    alert('Failed to copy link. Please try again.');
  });
}

function getSearchSuggestions(query, books) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const suggestions = new Set();
  
  books.forEach(book => {
    // Add title matches
    if (book.title.toLowerCase().includes(q)) {
      suggestions.add(book.title);
    }
    // Add author matches
    if (book.author.toLowerCase().includes(q)) {
      suggestions.add(book.author);
    }
    // Add theme matches
    if (book.theme.toLowerCase().includes(q)) {
      suggestions.add(book.theme);
    }
  });
  
  return Array.from(suggestions).slice(0, 8);
}

function renderSuggestions(suggestions) {
  if (!DOM.searchSuggestions) return;
  
  if (suggestions.length === 0) {
    DOM.searchSuggestions.classList.add('hidden');
    return;
  }
  
  DOM.searchSuggestions.innerHTML = suggestions.map(s => `
    <button class="w-full text-left px-4 py-2 text-sm hover:bg-flcOffWhite transition-colors focus:outline-none focus:bg-flcOffWhite"
            onclick="selectSuggestion('${esc(s)}')">
      ${esc(s)}
    </button>
  `).join('');
  
  DOM.searchSuggestions.classList.remove('hidden');
}

function selectSuggestion(suggestion) {
  if (DOM.searchInput) {
    DOM.searchInput.value = suggestion;
    activeSearch = suggestion;
    DOM.searchSuggestions.classList.add('hidden');
    const { page } = LIBRARY_DATA;
    filterAndRender(page.books);
  }
}

// ─── Filter tabs renderer ─────────────────────────────────────────────────────
function renderFilterTabs(themes, books) {
  const container = document.getElementById('filterTabs');
  if (!container) return;

  const counts = {};
  themes.forEach(t => { counts[t] = 0; });
  books.forEach(b => { if (counts[b.theme] !== undefined) counts[b.theme]++; });

  const tabData = [
    { label: 'All', value: 'all', count: books.length },
    ...themes.map(t => ({ label: t, value: t, count: counts[t] }))
  ];

  container.innerHTML = tabData.map((tab, i) => {
    const active = i === 0;
    const btnStyle = active
      ? 'background:#1A3A52;color:white;border-color:#1A3A52;'
      : 'background:white;color:rgba(44,44,44,0.65);border-color:#E5E0D8;';
    const spanStyle = active
      ? 'background:rgba(255,255,255,0.18);color:white;'
      : 'background:#F5F1E8;color:rgba(44,44,44,0.55);';
    return `
    <button
      class="filter-btn whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
      style="${btnStyle}"
      data-filter="${esc(tab.value)}"
      aria-pressed="${active}"
    >
      ${esc(tab.label)}
      <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style="${spanStyle}">${tab.count}</span>
    </button>`;
  }).join('');
}

// ─── Filter logic ─────────────────────────────────────────────────────────────
const BTN_BASE = 'filter-btn whitespace-nowrap flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border';

function updateFilterBtnStyles(theme) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const active = btn.dataset.filter === theme;
    btn.className = BTN_BASE;
    btn.style.background  = active ? '#1A3A52' : 'white';
    btn.style.color       = active ? 'white'   : 'rgba(44,44,44,0.65)';
    btn.style.borderColor = active ? '#1A3A52' : '#E5E0D8';
    btn.setAttribute('aria-pressed', active);
    const countEl = btn.querySelector('span');
    if (countEl) {
      countEl.style.background = active ? 'rgba(255,255,255,0.18)' : '#F5F1E8';
      countEl.style.color      = active ? 'white' : 'rgba(44,44,44,0.55)';
    }
  });
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

async function filterAndRender(books) {
  const search = activeSearch.toLowerCase().trim();
  
  if (DOM.libraryLabelText) {
    if (search) {
      DOM.libraryLabelText.textContent = 'Search Results';
    } else if (activeFilter === 'all') {
      DOM.libraryLabelText.textContent = 'Library';
    } else {
      DOM.libraryLabelText.textContent = activeFilter;
    }
  }

  // Show/hide Clear Filters button
  const hasActiveFilters = activeFilter !== 'all' || search !== '' || activeSort !== 'featured';
  if (DOM.clearFiltersBtn) {
    DOM.clearFiltersBtn.classList.toggle('hidden', !hasActiveFilters);
  }

  let filtered = books;
  
  // Apply filter
  if (activeFilter !== 'all') {
    filtered = filtered.filter(b => b.theme === activeFilter);
  }
  
  // Apply search with fuzzy matching
  if (search) {
    filtered = filtered.filter(b =>
      fuzzyMatch(b.title, search) || 
      fuzzyMatch(b.author, search) || 
      fuzzyMatch(b.theme, search)
    );
  }
  
  // Apply sorting
  filtered = sortBooks(filtered);

  if (DOM.grid) {
    if (filtered.length > 0) {
      DOM.grid.classList.remove('hidden');
      const cardHtmls = await Promise.all(filtered.map(renderCard));
      animatedRender(DOM.grid, cardHtmls.join(''));
    } else {
      DOM.grid.classList.add('hidden');
    }
  }

  if (DOM.empty) DOM.empty.classList.toggle('hidden', filtered.length > 0);

  if (DOM.count) {
    DOM.count.textContent = `Showing ${filtered.length} of ${books.length} book${books.length !== 1 ? 's' : ''}`;
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────
async function initReadingLibrary() {
  const { page } = LIBRARY_DATA;
  const { books, themes } = page;

  // Load saved sort preference
  if (savedState.sort) {
    activeSort = savedState.sort;
  }

  // Cache DOM elements
  DOM.libraryLabel = document.getElementById('libraryLabel');
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

  const introEl = document.getElementById('libraryIntro');
  if (introEl) introEl.textContent = page.intro;

  // Set initial sort value
  if (DOM.sortSelect) {
    DOM.sortSelect.value = activeSort;
  }

  renderFilterTabs(themes, books);
  await filterAndRender(books);

  DOM.filterTabs?.addEventListener('click', async e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    updateFilterBtnStyles(activeFilter);
    await filterAndRender(books);
  });

  // Sort select handler
  DOM.sortSelect?.addEventListener('change', async e => {
    activeSort = e.target.value;
    saveState();
    await filterAndRender(books);
  });

  const debouncedSearch = debounce(async () => {
    activeSearch = DOM.searchInput.value;
    DOM.clearBtn?.classList.toggle('hidden', !activeSearch);
    
    // Update suggestions
    const suggestions = getSearchSuggestions(activeSearch, books);
    renderSuggestions(suggestions);
    
    await filterAndRender(books);
  }, 300);

  DOM.searchInput?.addEventListener('input', debouncedSearch);
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', e => {
    if (DOM.searchSuggestions && !DOM.searchSuggestions.contains(e.target) && e.target !== DOM.searchInput) {
      DOM.searchSuggestions.classList.add('hidden');
    }
  });
  
  // Hide suggestions on Escape
  DOM.searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Escape' && DOM.searchSuggestions) {
      DOM.searchSuggestions.classList.add('hidden');
    }
  });

  DOM.clearBtn?.addEventListener('click', async () => {
    if (DOM.searchInput) DOM.searchInput.value = '';
    activeSearch = '';
    DOM.clearBtn.classList.add('hidden');
    await filterAndRender(books);
  });

  DOM.clearFiltersBtn?.addEventListener('click', async () => {
    activeFilter = 'all';
    activeSearch = '';
    activeSort = 'featured';
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';
    updateFilterBtnStyles('all');
    saveState();
    await filterAndRender(books);
  });

  document.getElementById('exportList')?.addEventListener('click', exportReadingList);

  if (DOM.backToTop) {
    window.addEventListener('scroll', () => {
      DOM.backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    DOM.backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Event delegation for image error fallback
  document.addEventListener('error', e => {
    if (e.target.classList.contains('book-cover-img')) {
      e.target.src = e.target.dataset.fallback;
      e.target.classList.remove('opacity-0');
    }
  }, true);

  // Keyboard navigation for filter tabs
  DOM.filterTabs?.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const buttons = Array.from(DOM.filterTabs.querySelectorAll('.filter-btn'));
      const currentIndex = buttons.indexOf(document.activeElement);
      const direction = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    }
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

initReadingLibrary();
