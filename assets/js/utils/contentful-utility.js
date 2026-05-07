// utils/contentful-utility.js - Unified data fetching and transformation
// Consolidates duplicate logic from resources-sermons.js, resources-devotionals.js, etc.

import { 
  getLatestSermonEntries, 
  getDevotionalGuideEntries, 
  getDetoxEntries 
} from '../services/contentful.js';
import { slugify } from './slugify.js';
import { formatDateSafe } from './format.js';
import { stripRichTextToPlain } from './richText.js';

/**
 * Unified config getter
 */
export function getConfig() {
  return window.FLC_CONTENTFUL || {};
}

/**
 * Escape HTML safely
 */
export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Filter valid items from Contentful response
 */
export function filterValidItems(items) {
  return (items || [])
    .filter((item) => item && item.fields && item.sys && item.sys.id);
}

/**
 * Generic item transformer to include title, slug, and URL
 */
function transformItemToLink(item, cfg = {}) {
  const postPagePath = cfg.postPagePath || '/pages/post.html';
  const title = (item.fields.title || 'Untitled').trim();
  const titleSlug = slugify(title);
  
  return {
    id: item.sys.id,
    title: title,
    slug: item.fields.slug || titleSlug,
    url: `${postPagePath}?title=${encodeURIComponent(titleSlug)}`,
    date: item.fields.date || item.fields.startDate || '',
    fields: item.fields
  };
}

/**
 * Fetch and transform sermons
 */
export async function fetchSermons() {
  try {
    const cfg = getConfig();
    const { items } = await getLatestSermonEntries();
    return filterValidItems(items).map((item) => transformItemToLink(item, cfg));
  } catch (error) {
    console.error('Failed to fetch sermons:', error);
    return [];
  }
}

/**
 * Fetch and transform devotional guides
 */
export async function fetchDevotionals(filterDrafts = false) {
  try {
    const cfg = getConfig();
    let items = await getDevotionalGuideEntries();
    
    if (filterDrafts) {
      items = items.filter((item) => item.fields.status !== 'draft');
    }
    
    return filterValidItems(items).map((item) => transformItemToLink(item, cfg));
  } catch (error) {
    console.error('Failed to fetch devotionals:', error);
    return [];
  }
}

/**
 * Fetch and transform detox entries
 */
export async function fetchDetoxEntries() {
  try {
    const items = await getDetoxEntries();
    return filterValidItems(items);
  } catch (error) {
    console.error('Failed to fetch detox entries:', error);
    return [];
  }
}

/**
 * Extract and format summary from rich text or string fields
 */
export function extractSummary(item, maxLength = 120) {
  const fields = item.fields || {};
  
  // Try multiple field names for summary/description
  let rawSummary = fields.descrition || fields.description || fields.summary || '';
  
  let summary = typeof rawSummary === 'string'
    ? rawSummary
    : stripRichTextToPlain(rawSummary);
  
  // If no summary found, try body/content
  if (!summary) {
    const rawBody = fields.body || fields.content || '';
    summary = typeof rawBody === 'string'
      ? rawBody
      : stripRichTextToPlain(rawBody);
  }
  
  // Truncate with ellipsis
  if (!summary) {
    return 'Freshly published content from Freedom Life Church.';
  }
  
  return summary.length > maxLength
    ? summary.slice(0, maxLength) + '...'
    : summary;
}

/**
 * Get the speaker/pastor name from various field names
 */
export function getAuthor(item) {
  const fields = item.fields || {};
  return fields.pastor || fields.pastorName || fields.preacher || fields.speaker || '';
}

/**
 * Get formatted date from item
 */
export function getDate(item) {
  const fields = item.fields || {};
  return formatDateSafe(fields.date || fields.startDate || '');
}

/**
 * Build a link with URL-encoded title slug
 */
export function buildContentLink(title, cfg = {}) {
  const postPagePath = cfg.postPagePath || '/pages/post.html';
  const titleSlug = slugify(title);
  return `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
}

/**
 * Update DOM element safely
 */
export function updateElement(selector, content, removeSkeleton = false) {
  const el = typeof selector === 'string' 
    ? document.getElementById(selector) 
    : selector;
  
  if (el) {
    el.textContent = content;
    if (removeSkeleton && el.classList.contains('skeleton')) {
      el.classList.remove('skeleton');
    }
  }
  
  return el;
}

/**
 * Create plural suffix for counts
 */
export function getPluralSuffix(count, singular = 'item', plural = 'items') {
  return count === 1 ? singular : plural;
}

/**
 * Render plural count text
 */
export function renderCountText(count, singular, plural) {
  return `${count} ${getPluralSuffix(count, singular, plural)}`;
}
