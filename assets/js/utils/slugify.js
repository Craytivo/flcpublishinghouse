/**
 * Slugify a string for use in URLs
 * Converts spaces to hyphens, removes special characters, lowercases
 */
export function slugify(text) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Remove multiple consecutive hyphens
    .replace(/\-{2,}/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^\-+|\-+$/g, '');
}

/**
 * Create a URL-safe post link using title
 */
export function createPostUrl(title, postPagePath) {
  const slug = slugify(title);
  return `${postPagePath}?title=${encodeURIComponent(slug)}`;
}
