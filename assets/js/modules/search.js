// modules/search.js - Search index & modal filtering

const DEFAULT_PAGES = [
  { title: 'Sermons', type: 'Pages', tags: ['sermons', 'teaching', 'notes'] },
  { title: 'Resources Hub', type: 'Pages', tags: ['resources', 'download', 'hub'] },
  { title: 'Consecration Reading Library', type: 'Pages', tags: ['books', 'reading', 'library', 'consecration'] },
  { title: 'Devotionals', type: 'Pages', tags: ['devotional', 'advent'] },
  { title: 'Spiritual Detox — Overview', type: 'Spiritual Detox', tags: ['detox', 'kingdom blueprint'] },
  { title: 'Spiritual Detox — Week 1', type: 'Spiritual Detox', tags: ['detox', 'week 1'] },
  { title: 'Spiritual Detox — Week 2', type: 'Spiritual Detox', tags: ['detox', 'week 2'] },
  { title: 'Spiritual Detox — Week 3', type: 'Spiritual Detox', tags: ['detox', 'week 3'] },
  { title: "I'm Under Pressure", type: 'Sermon', tags: ['sermon', 'pressure'] },
  { title: 'Purpose Protected Me', type: 'Sermon', tags: ['sermon', 'purpose'] },
  { title: 'When Compassion Costs You Sleep', type: 'Sermon', tags: ['sermon', 'compassion'] },
  { title: 'Devotional — Week 1 (Hope)', type: 'Seasonal Devotional', tags: ['devotional', 'seasonal', 'advent', 'hope'] },
  { title: 'Devotional — Week 2 (Love)', type: 'Seasonal Devotional', tags: ['devotional', 'seasonal', 'advent', 'love'] },
  { title: 'Devotional — Week 3 (Peace)', type: 'Seasonal Devotional', tags: ['devotional', 'seasonal', 'advent', 'peace'] },
  { title: 'Devotional — Week 4 (Joy)', type: 'Seasonal Devotional', tags: ['devotional', 'seasonal', 'advent', 'joy'] },
  { title: 'Bible Study — Advent Hope', type: 'Bible Study', tags: ['bible study', 'advent', 'hope'] }
];

const PATH_MAP = {
  'Sermons': 'pages/sermons.html',
  'Resources Hub': 'pages/resources.html',
  'Consecration Reading Library': 'pages/reading-library.html',
  'Devotionals': 'pages/devotionals.html',
  'Spiritual Detox — Overview': 'pages/spiritual-detox.html',
  'Spiritual Detox — Week 1': 'pages/spiritual-detox-week1.html',
  'Spiritual Detox — Week 2': 'pages/spiritual-detox-week2.html',
  'Spiritual Detox — Week 3': 'pages/spiritual-detox-week3.html',
  "I'm Under Pressure": 'pages/post.html?title=im-under-pressure',
  'Purpose Protected Me': 'pages/post.html?title=purpose-protected-me',
  'When Compassion Costs You Sleep': 'pages/post.html?title=when-compassion-costs-you-sleep',
  'Devotional — Week 1 (Hope)': 'devotionals-pages/devotional-week1-hope.html',
  'Devotional — Week 2 (Love)': 'devotionals-pages/devotional-week2-love.html',
  'Devotional — Week 3 (Peace)': 'devotionals-pages/devotional-week3-peace.html',
  'Devotional — Week 4 (Joy)': 'devotionals-pages/devotional-week4-joy.html',
  'Bible Study — Advent Hope': 'bible-studies/bible-study-advent-hope.html'
};

function getBasePath() {
  const container = document.getElementById('headerContainer');
  return container?.dataset.basePath || container?.dataset.base || '.';
}

function withBase(path) {
  if (!path || /^(https?:)?\/\//i.test(path)) return path;
  const base = getBasePath();
  const normalised = (!base || base === '.') ? '' : base.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return normalised ? `${normalised}/${clean}` : clean;
}

function slugify(text) {
  if (!text) return '';
  return text.toLowerCase().trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeTags(tags) {
  return Array.isArray(tags) ? tags : [tags].filter(Boolean);
}

function highlightMatch(text, query) {
  if (!query) return text;
  const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${esc})`, 'gi'), '<mark class="bg-flcGold/15 text-flcNavy rounded px-0.5">$1</mark>');
}

export async function initSearch() {
  const inputEl = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  if (!inputEl || !resultsEl) return;

  // Build search index with resolved paths
  const postPagePath = withBase('pages/post.html');
  const searchIndex = DEFAULT_PAGES.map(entry => ({
    ...entry,
    href: withBase(PATH_MAP[entry.title] || '')
  }));

  // Fetch dynamic Contentful entries
  try {
    const cfg = window.FLC_CONTENTFUL || {};
    if (cfg.enabled && cfg.spaceId && cfg.accessToken) {
      const env = cfg.environment || 'master';
      const types = [
        { ct: cfg.contentType, label: 'Sermon', dateField: 'date' },
        { ct: cfg.devotionalGuideContentType, label: 'Devotional', dateField: 'startDate' },
        { ct: cfg.bibleStudyContentType, label: 'Bible Study', order: '-sys.updatedAt' }
      ].filter(t => t.ct);

      const results = await Promise.all(types.map(t =>
        fetch(`https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${new URLSearchParams({
          access_token: cfg.accessToken,
          content_type: t.ct,
          order: t.order || `-fields.${t.dateField}`,
          limit: '20'
        })}`, { headers: { Accept: 'application/json' } })
          .then(r => r.ok ? r.json() : { items: [] })
          .then(data => (data.items || []).map(item => ({ item, label: t.label })))
          .catch(() => [])
      ));

      results.flat().forEach(({ item, label }) => {
        const f = item.fields || {};
        const title = (f.title || '').trim();
        if (!title || searchIndex.find(e => e.title === title)) return;
        const titleSlug = slugify(title);
        const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
        const tags = [label.toLowerCase(), ...normalizeTags(f.tags), f.pastor || '', f.speaker || ''].map(t => String(t).toLowerCase()).filter(Boolean);
        searchIndex.push({ title, type: label, href, tags });
      });
    }
  } catch (_) { /* static index still works */ }

  // Filtering
  function filterItems(query) {
    const q = query.trim().toLowerCase();
    return searchIndex.filter(item => {
      if (!q) return true;
      const haystack = `${item.title} ${item.type} ${item.tags.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  // Render grouped results
  function renderResults(query) {
    const items = filterItems(query);
    const q = query.trim();

    if (!items.length) {
      resultsEl.innerHTML = '<div class="text-center py-10"><p class="text-base font-medium text-flcCharcoal/60">No results found.</p><p class="text-sm text-flcCharcoal/40 mt-1.5">Try a different keyword.</p></div>';
      return;
    }

    const grouped = {};
    items.forEach(item => {
      (grouped[item.type] = grouped[item.type] || []).push(item);
    });

    let html = '';
    Object.entries(grouped).forEach(([type, entries]) => {
      html += `<div class="mb-2"><p class="text-[0.7rem] font-bold tracking-widest text-flcNavy/50 uppercase px-3 pt-4 pb-1.5">${type}</p>`;
      entries.forEach(item => {
        html += `<div role="option" aria-selected="false" class="search-result-item rounded-xl px-4 py-3 cursor-pointer hover:bg-flcGold/8 motion-fast border border-transparent hover:border-flcGold/15"><a href="${item.href}" class="block no-underline"><span class="block text-[0.938rem] font-semibold text-flcNavy leading-snug">${q ? highlightMatch(item.title, q) : item.title}</span><span class="block text-[0.75rem] text-flcCharcoal/65 mt-1 font-medium">${item.type}</span></a></div>`;
      });
      html += '</div>';
    });

    resultsEl.innerHTML = html;
  }

  // Wire up input listener
  inputEl.addEventListener('input', () => renderResults(inputEl.value));
}
