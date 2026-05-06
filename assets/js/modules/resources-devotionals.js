// modules/resources-devotionals.js - Devotional loading logic for resources page

import { getDevotionalGuideEntries } from '../services/contentful.js';
import { slugify } from '../utils/slugify.js';

export async function initResourcesDevotionals() {
  const devotionalGuideCountLabel = document.getElementById('devotionalGuideCountLabel');
  const devotionalGuideLinks = document.getElementById('devotionalGuideLinks');
  const devotionalGuidesCard = document.getElementById('devotionalGuides');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const items = await getDevotionalGuideEntries();

    const guides = items
      .filter((item) => item && item.fields && item.sys)
      .filter((item) => item.fields.status !== 'draft')
      .map((item) => {
        const title = typeof item.fields.title === 'string' ? item.fields.title.trim() : 'Untitled';
        const titleSlug = slugify(title);
        return {
          id: item.sys.id,
          title: title,
          slug: item.fields.slug || '',
          date: item.fields.startDate || '',
          url: `${cfg.postPagePath || '/pages/post.html'}?title=${encodeURIComponent(titleSlug)}`,
          fields: item.fields
        };
      });

    if (guides.length) {
      if (devotionalGuideCountLabel) {
        devotionalGuideCountLabel.textContent = `${guides.length} ${guides.length === 1 ? 'guide' : 'guides'}`;
      }

      if (devotionalGuideLinks) {
        devotionalGuideLinks.innerHTML = guides.map((guide) => {
          return `<a href="${guide.url}" class="download-btn">${guide.title}</a>`;
        }).join('');
      }

      if (devotionalGuidesCard && guides[0] && guides[0].url) {
        devotionalGuidesCard.setAttribute('data-link', guides[0].url);
      }
    }
  } catch (error) {
    console.error('Failed to load devotional guides:', error);
  }
}
