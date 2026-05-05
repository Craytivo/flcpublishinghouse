// modules/hero.js - Hero section rendering

import { getLatestAnyEntry } from '../services/contentful.js';
import { removeSkeleton, formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';

export async function initHero() {
  try {
    const entry = await getLatestAnyEntry();
    if (!entry || !entry.fields) return;

    const f = entry.fields;
    const postPagePath = window.FLC_CONTENTFUL?.postPagePath || '/pages/post.html';

    const summaryRaw = f.descrition || f.description || '';
    let summary = typeof summaryRaw === 'string'
      ? summaryRaw
      : stripRichTextToPlain(summaryRaw);
    if (!summary) {
      const bodyRaw = f.body || f.content || f.summary || '';
      summary = typeof bodyRaw === 'string'
        ? bodyRaw
        : stripRichTextToPlain(bodyRaw);
    }
    summary = summary
      ? summary.slice(0, 140) + (summary.length > 140 ? '...' : '')
      : 'Freshly published teaching notes and resources.';

    const title = (f.title || 'Untitled').trim();
    const dateLabel = formatDateSafe(f.date || f.startDate);
    const byline = f.pastor || f.pastorName || f.preacher || f.speaker || '';
    const href = `${postPagePath}?entry=${encodeURIComponent(entry.sys.id)}`;

    const els = {
      title: document.getElementById('aboutFeaturedTitle'),
      summary: document.getElementById('aboutFeaturedSummary'),
      date: document.getElementById('aboutFeaturedDate'),
      pastor: document.getElementById('aboutFeaturedPastor'),
      link: document.getElementById('aboutFeaturedLink'),
    };

    if (els.title) { els.title.textContent = title; removeSkeleton(els.title); }
    if (els.summary) { els.summary.textContent = summary; removeSkeleton(els.summary); }
    if (els.date) { els.date.textContent = dateLabel; removeSkeleton(els.date); }
    if (els.pastor) {
      if (byline) { els.pastor.textContent = byline; removeSkeleton(els.pastor); }
      else { els.pastor.style.display = 'none'; }
    }
    if (els.link) els.link.href = href;
  } catch (error) {
    console.error('Error loading hero content:', error);
  }
}

