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

// ─── State ──────────────────────────────────────────────────────────────────────
let activeFilter = 'all';
let activeSearch  = '';
const coverCache = new Map();
const FALLBACK_COVER = '../assets/images/books/fallback.svg';

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
  const featuredBadge = book.featured
    ? `<span class="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style="background:rgba(154,123,79,0.12);color:#9A7B4F;">Foundational</span>`
    : '';
  const cardId = `card-${book.slug}`;
  const coverUrl = await getBookCover(book) || FALLBACK_COVER;
  
  return `
    <article class="book-card bg-white rounded-xl overflow-hidden shadow-sm"
             id="${esc(cardId)}"
             data-theme="${esc(book.theme)}" data-slug="${esc(book.slug)}">
      <button class="w-full text-left p-5 flex items-start gap-4 cursor-pointer hover:bg-flcOffWhite/50 transition-colors"
              onclick="toggleCard('${esc(cardId)}')">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-1.5 mb-2">
            <span class="text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style="background:${badgeBg};color:${accent};">${esc(book.theme)}</span>
            ${featuredBadge}
          </div>
          <h3 class="font-heading text-lg leading-snug text-flcNavy mb-1">${esc(book.title)}</h3>
          <p class="text-xs font-medium mb-0" style="color:rgba(44,44,44,0.55);">${esc(book.author)}</p>
        </div>
        <svg class="expand-icon w-5 h-5 flex-shrink-0 mt-1" style="color:rgba(44,44,44,0.3);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="book-details px-5 pb-5">
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="relative aspect-[2/3] w-24 sm:w-28 flex-shrink-0 bg-flcOffWhite rounded-lg overflow-hidden">
            <img src="${esc(coverUrl)}" 
                 alt="Book cover for ${esc(book.title)}" 
                 loading="lazy"
                 class="w-full h-full object-contain"
                 onerror="this.src='${esc(FALLBACK_COVER)}'" />
          </div>
          <p class="text-sm leading-relaxed" style="color:rgba(44,44,44,0.8);">${esc(book.summary)}</p>
        </div>
        <a href="${esc(book.link)}" target="_blank" rel="noopener noreferrer"
           class="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
           style="background:#1A3A52;color:white;"
           onmouseover="this.style.background='#9A7B4F'" onmouseout="this.style.background='#1A3A52'">
          View Book
          <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
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
}

// ─── Filter tabs renderer ─────────────────────────────────────────────────────
function renderFilterTabs(themes, books) {
  const container = document.getElementById('filterTabs');
  if (!container) return;

  const counts = {};
  themes.forEach(t => { counts[t] = 0; });
  books.forEach(b => { if (counts[b.theme] !== undefined) counts[b.theme]++; });

  const tabData = [{ label: 'All', value: 'all', count: books.length }, ...themes.map(t => ({ label: t, value: t, count: counts[t] }))];

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

async function filterAndRender(books) {
  const search = activeSearch.toLowerCase().trim();
  const libraryLabel = document.getElementById('libraryLabel');
  const libraryLabelText = document.getElementById('libraryLabelText');
  const grid = document.getElementById('bookGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('bookCount');

  if (libraryLabelText) {
    libraryLabelText.textContent = search ? 'Search Results' : activeFilter === 'all' ? 'Library' : activeFilter;
  }

  let filtered = books;
  if (activeFilter !== 'all') filtered = filtered.filter(b => b.theme === activeFilter);
  if (search) filtered = filtered.filter(b =>
    `${b.title} ${b.author} ${b.theme}`.toLowerCase().includes(search)
  );

  if (grid) {
    if (filtered.length > 0) {
      grid.classList.remove('hidden');
      const cardHtmls = await Promise.all(filtered.map(renderCard));
      animatedRender(grid, cardHtmls.join(''));
    } else {
      grid.classList.add('hidden');
    }
  }

  if (empty) empty.classList.toggle('hidden', filtered.length > 0);

  if (count) {
    count.textContent = `Showing ${filtered.length} of ${books.length} book${books.length !== 1 ? 's' : ''}`;
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────
async function initReadingLibrary() {
  const { page } = LIBRARY_DATA;
  const { books, themes } = page;

  const introEl = document.getElementById('libraryIntro');
  if (introEl) introEl.textContent = page.intro;

  renderFilterTabs(themes, books);
  await filterAndRender(books);

  document.getElementById('filterTabs')?.addEventListener('click', async e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    updateFilterBtnStyles(activeFilter);
    await filterAndRender(books);
  });

  const searchInput = document.getElementById('bookSearch');
  const clearBtn    = document.getElementById('clearSearch');

  searchInput?.addEventListener('input', async () => {
    activeSearch = searchInput.value;
    clearBtn?.classList.toggle('hidden', !activeSearch);
    await filterAndRender(books);
  });

  clearBtn?.addEventListener('click', async () => {
    if (searchInput) searchInput.value = '';
    activeSearch = '';
    clearBtn.classList.add('hidden');
    await filterAndRender(books);
  });

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

initReadingLibrary();
