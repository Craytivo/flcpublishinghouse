// modules/resources-sermons.js - Sermon loading logic for resources page

import { getLatestSermonEntries } from '../services/contentful.js';
import { formatDateSafe, removeSkeleton } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';

export async function initResourcesSermons() {
  const sermonLinks = document.getElementById('sermonLinks');
  const sermonCount = document.getElementById('sermonCountLabel');
  const featuredSermonCard = document.getElementById('featuredSermonCard');
  const featuredSermonTitle = document.getElementById('featuredSermonTitle');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const items = await getLatestSermonEntries();
    const sermons = items
      .filter((item) => item && item.fields && item.sys)
      .map((item) => ({
        title: (item.fields.title || 'Untitled Sermon').trim(),
        url: `${cfg.postPagePath || '../pages/post.html'}?entry=${encodeURIComponent(item.sys.id)}`
      }))
      .filter((item) => item.title && item.url);

    if (sermons.length) {
      if (sermonLinks) {
        sermonLinks.innerHTML = sermons.map((sermon) => {
          return `<a href="${sermon.url}" class="download-btn">${sermon.title}</a>`;
        }).join('');
      }

      if (sermonCount) {
        const suffix = sermons.length === 1 ? 'message' : 'messages';
        sermonCount.textContent = `${sermons.length} ${suffix}`;
      }

      const newest = sermons[0];
      if (featuredSermonCard && newest) featuredSermonCard.href = newest.url;
      if (featuredSermonTitle && newest) featuredSermonTitle.textContent = newest.title;
    }
  } catch (error) {
    console.error('Failed to load sermons:', error);
  }
}
