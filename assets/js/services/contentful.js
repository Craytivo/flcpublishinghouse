// services/contentful.js - Contentful API service with caching

const cache = {};

function sortTime(entry) {
  const d = entry?.fields?.date || entry?.fields?.startDate || entry?.sys?.updatedAt || '';
  const ms = d ? Date.parse(d) : NaN;
  return Number.isNaN(ms) ? 0 : ms;
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

export async function getLatestAnyEntry() {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) return null;

  const types = [cfg.contentType, cfg.devotionalGuideContentType].filter(Boolean);
  const results = await Promise.all(
    types.map(ct => fetchEntries({ content_type: ct, order: '-sys.updatedAt', limit: '1' }))
  );

  const candidates = results.flatMap(r => r.items || []);
  if (!candidates.length) return null;

  return candidates.reduce((best, entry) => sortTime(entry) > sortTime(best) ? entry : best);
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

