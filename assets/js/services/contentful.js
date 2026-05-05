// services/contentful.js - Contentful API service with caching

let latestEntriesPromise = null;
let detoxEntriesPromise = null;

function getSermonSortTime(entry) {
  const sermonDate = entry && entry.fields ? entry.fields.date : "";
  const dateMs = sermonDate ? Date.parse(sermonDate) : NaN;
  if (!Number.isNaN(dateMs)) return dateMs;
  const updatedAt = entry && entry.sys ? entry.sys.updatedAt : "";
  const updatedMs = updatedAt ? Date.parse(updatedAt) : NaN;
  return Number.isNaN(updatedMs) ? 0 : updatedMs;
}

function getDetoxSortTime(entry) {
  const weekNumber = entry && entry.fields ? entry.fields.weekNumber : NaN;
  if (!Number.isNaN(weekNumber)) return weekNumber;
  const updatedAt = entry && entry.sys ? entry.sys.updatedAt : "";
  const updatedMs = updatedAt ? Date.parse(updatedAt) : NaN;
  return Number.isNaN(updatedMs) ? 0 : updatedMs;
}

export async function getLatestSermonEntries() {
  if (latestEntriesPromise) return latestEntriesPromise;

  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken || !cfg.contentType) {
    latestEntriesPromise = Promise.resolve([]);
    return latestEntriesPromise;
  }

  const env = cfg.environment || "master";
  const params = new URLSearchParams({
    access_token: cfg.accessToken,
    content_type: cfg.contentType,
    order: "-fields.date",
    include: "2"
  });
  const endpoint = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${params.toString()}`;

  latestEntriesPromise = fetch(endpoint, { headers: { Accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : { items: [], includes: {} }))
    .then((payload) => {
      const items = Array.isArray(payload.items) ? payload.items : [];
      const includes = payload.includes || {};
      return {
        items: items.sort((a, b) => getSermonSortTime(b) - getSermonSortTime(a)),
        includes: includes
      };
    })
    .catch(() => ({ items: [], includes: {} }));

  return latestEntriesPromise;
}

export async function getDetoxEntries() {
  if (detoxEntriesPromise) return detoxEntriesPromise;

  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken || !cfg.detoxContentType) {
    detoxEntriesPromise = Promise.resolve([]);
    return detoxEntriesPromise;
  }

  const env = cfg.environment || "master";
  const params = new URLSearchParams({
    access_token: cfg.accessToken,
    content_type: cfg.detoxContentType,
    order: "fields.weekNumber",
    limit: "100",
    include: "2"
  });
  const endpoint = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${params.toString()}`;

  detoxEntriesPromise = fetch(endpoint, { headers: { Accept: "application/json" } })
    .then((response) => (response.ok ? response.json() : { items: [], includes: {} }))
    .then((payload) => {
      const items = Array.isArray(payload.items) ? payload.items : [];
      const filtered = items.filter((item) => item && item.fields && item.fields.published !== false);
      return {
        items: filtered.sort((a, b) => getDetoxSortTime(a) - getDetoxSortTime(b)),
        includes: payload.includes || {}
      };
    })
    .catch(() => ({ items: [], includes: {} }));

  return detoxEntriesPromise;
}

export async function getDevotionalGuideEntries() {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken || !cfg.devotionalGuideContentType) {
    return [];
  }

  const env = cfg.environment || "master";
  const params = new URLSearchParams({
    access_token: cfg.accessToken,
    content_type: cfg.devotionalGuideContentType,
    order: "-fields.startDate",
    limit: "24"
  });
  const endpoint = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${params.toString()}`;

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload.items) ? payload.items : [];
  } catch (error) {
    console.error("Failed to load devotional guides:", error);
    return [];
  }
}

export async function getEntryById(entryId) {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) {
    return null;
  }

  const env = cfg.environment || "master";
  // Use collection endpoint with sys.id filter so includes (assets) are returned
  const params = new URLSearchParams({
    access_token: cfg.accessToken,
    "sys.id": entryId,
    include: "2"
  });
  const endpoint = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${params.toString()}`;

  try {
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const payload = await response.json();
    const entry = payload.items && payload.items[0];
    if (!entry) return null;
    // Attach includes to the entry so callers can resolve linked assets
    entry._includes = payload.includes || {};
    return entry;
  } catch (error) {
    console.error("Failed to load entry by ID:", error);
    return null;
  }
}
