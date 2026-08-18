// services/contentful.js - Contentful API service with caching
// Updated cache headers to force reload

const cache = {};

function sortTime(entry) {
  const d = entry?.fields?.date || entry?.fields?.startDate || entry?.fields?.publishDate || entry?.fields?.publishedDate || entry?.sys?.updatedAt || '';
  const ms = d ? Date.parse(d) : NaN;
  return Number.isNaN(ms) ? 0 : ms;
}

function getConfiguredContentTypes() {
  const cfg = window.FLC_CONTENTFUL || {};
  return [
    cfg.contentType,
    cfg.devotionalGuideContentType,
    cfg.detoxContentType,
    cfg.bibleStudyContentType
  ].filter(Boolean);
}

function fetchEntries(params) {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) return Promise.resolve({ items: [], includes: {} });
  const env = cfg.environment || 'master';
  const qs = new URLSearchParams({ access_token: cfg.accessToken, include: '2', ...params });
  const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${qs}`;
  return fetch(url, { headers: { Accept: 'application/json' } })
    .then(r => r.ok ? r.json() : { items: [], includes: {} })
    .catch(() => ({ items: [], includes: {} }));
}

export async function getLatestSermonEntries() {
  if (cache.sermons) return cache.sermons;
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.contentType) { cache.sermons = { items: [], includes: {} }; return cache.sermons; }
  cache.sermons = fetchEntries({ content_type: cfg.contentType, order: '-fields.date', limit: '24' })
    .then(payload => ({
      items: (payload.items || []).sort((a, b) => sortTime(b) - sortTime(a)),
      includes: payload.includes || {}
    }));
  return cache.sermons;
}

export async function getDetoxEntries() {
  if (cache.detox) return cache.detox;
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.detoxContentType) { cache.detox = { items: [], includes: {} }; return cache.detox; }
  cache.detox = fetchEntries({ content_type: cfg.detoxContentType, order: 'fields.weekNumber', limit: '100' })
    .then(payload => {
      const items = (payload.items || []).filter(i => i?.fields?.published !== false);
      return { items, includes: payload.includes || {} };
    });
  return cache.detox;
}

export async function getDevotionalGuideEntries() {
  if (cache.devotionals) return cache.devotionals;
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.devotionalGuideContentType) { cache.devotionals = []; return cache.devotionals; }
  cache.devotionals = fetchEntries({ content_type: cfg.devotionalGuideContentType, order: '-fields.startDate', limit: '24' })
    .then(payload => payload.items || []);
  return cache.devotionals;
}

export async function getBibleStudyEntries() {
  if (cache.bibleStudies) return cache.bibleStudies;
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.bibleStudyContentType) {
    cache.bibleStudies = { items: [], includes: {} };
    return cache.bibleStudies;
  }
  cache.bibleStudies = fetchEntries({ content_type: cfg.bibleStudyContentType, order: '-sys.updatedAt', limit: '24' })
    .then(payload => {
      const items = (payload.items || [])
        .filter(i => i?.fields?.status !== 'draft' && i?.fields?.published !== false)
        .sort((a, b) => sortTime(b) - sortTime(a));
      return { items, includes: payload.includes || {} };
    });
  return cache.bibleStudies;
}

export async function getLatestAnyEntry() {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) return null;

  const types = getConfiguredContentTypes();
  const results = await Promise.all(
    types.map(ct => fetchEntries({ content_type: ct, order: '-sys.updatedAt', limit: '1' }))
  );

  const candidates = results.flatMap(r => r.items || []);
  if (!candidates.length) return null;

  return candidates.reduce((best, entry) => sortTime(entry) > sortTime(best) ? entry : best);
}

export async function getAllLatestEntries(limit = 24) {
  if (cache.allLatest) return cache.allLatest;
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) { cache.allLatest = { items: [], includes: {} }; return cache.allLatest; }

  const types = getConfiguredContentTypes();
  cache.allLatest = Promise.all(
    types.map(ct => fetchEntries({ content_type: ct, order: '-sys.updatedAt', limit: String(limit) }))
  ).then(results => {
    const items = results.flatMap(r => r.items || [])
      .filter(i => i && i.fields && i.sys && i.sys.id)
      .sort((a, b) => sortTime(b) - sortTime(a))
      .slice(0, limit);
    const includes = results.reduce((acc, r) => {
      const inc = r.includes || {};
      for (const key of Object.keys(inc)) {
        acc[key] = [...(acc[key] || []), ...(inc[key] || [])];
      }
      return acc;
    }, {});
    return { items, includes };
  });
  return cache.allLatest;
}

export async function getEntryById(entryId) {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) return null;
  const env = cfg.environment || 'master';
  const qs = new URLSearchParams({ access_token: cfg.accessToken, 'sys.id': entryId, include: '2' });
  const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${qs}`;
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!r.ok) return null;
    const payload = await r.json();
    const entry = payload.items?.[0];
    if (!entry) return null;
    entry._includes = payload.includes || {};
    return entry;
  } catch {
    return null;
  }
}

/**
 * Slugify a string for URL comparison
 */
function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-{2,}/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

/**
 * Search for an entry by slugified title
 * Searches across all configured content types
 */
export async function getEntryByTitle(titleSlug) {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken || !titleSlug) return null;
  
  const env = cfg.environment || 'master';
  const types = getConfiguredContentTypes();
  
  for (const contentType of types) {
    const qs = new URLSearchParams({ 
      access_token: cfg.accessToken, 
      content_type: contentType,
      limit: '100'
    });
    const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${qs}`;
    
    try {
      const r = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!r.ok) continue;
      const payload = await r.json();
      const items = payload.items || [];
      
      // Find matching entry by comparing slugified titles
      const match = items.find(item => {
        const title = item?.fields?.title;
        const slug = item?.fields?.slug;
        if (slug && slugify(slug) === titleSlug) return true;
        if (!title) return false;
        return slugify(title) === titleSlug;
      });
      
      if (match) {
        match._includes = payload.includes || {};
        return match;
      }
    } catch {
      continue;
    }
  }
  
  return null;
}
