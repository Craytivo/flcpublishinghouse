// components/renderPostCard.js - Reusable post card renderer

import { escapeHTML } from '../utils/sanitize.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { slugify } from '../utils/slugify.js';

export function renderPostCard(item, index, postPagePath) {
  const f = item.fields;
  const title = escapeHTML((f.title || 'Untitled').trim());

  const bodyRaw = f.description || f.body || f.content || f.studyContent || f.lesson || f.summary || '';
  const summaryText = typeof bodyRaw === 'string' ? bodyRaw : stripRichTextToPlain(bodyRaw);
  const summary = summaryText
    ? escapeHTML(summaryText.slice(0, 120)) + (summaryText.length > 120 ? '...' : '')
    : 'Freshly published teaching notes and resources from Freedom Life Church.';

  const cfg = window.FLC_CONTENTFUL || {};
  const contentTypeId = item.sys?.contentType?.sys?.id || '';
  const isBibleStudy = contentTypeId === cfg.bibleStudyContentType || !!(f.bibleStudy || f.studyGuide);
  const isDevotional = contentTypeId === cfg.devotionalGuideContentType || !!(f.startDate || f.endDate || f.devotionalGuide);
  const kicker = isBibleStudy ? 'Bible Study' : isDevotional ? 'Devotional Guide' : 'Sermon';
  const dateText = formatDateSafe(f.date || f.startDate || f.publishDate || f.publishedDate);
  const byline = f.pastor || f.pastorName || f.preacher || f.speaker || 'FLC Team';
  const titleSlug = slugify(f.title || '');
  const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;

  const isAccent = index === 2;
  const cardClasses = isAccent
    ? 'bg-flcNavy text-white rounded-2xl border border-flcNavy p-6 shadow-medium'
    : 'bg-white rounded-2xl border border-flcBorder p-6 shadow-soft';
  const kickerClasses = isAccent
    ? 'text-xs font-semibold tracking-wide text-flcGoldLight uppercase'
    : 'text-xs font-semibold tracking-wide text-flcGold uppercase';
  const headingClasses = isAccent
    ? 'font-heading text-2xl mt-2'
    : 'font-heading text-2xl text-flcNavy mt-2';
  const summaryClasses = isAccent ? 'mt-3 text-white/82' : 'mt-3 text-flcCharcoal/80';
  const metaClasses = isAccent ? 'mt-3 text-xs text-white/70' : 'mt-3 text-xs text-flcCharcoal/60';
  const linkClasses = isAccent
    ? 'inline-flex mt-5 text-flcGoldLight font-semibold hover:text-white'
    : 'inline-flex mt-5 text-flcNavy font-semibold hover:text-flcGold';

  return `
    <article class="${cardClasses}">
      <p class="${kickerClasses}">${kicker}</p>
      <h3 class="${headingClasses}">${title}</h3>
      <p class="${summaryClasses}">${summary}</p>
      <p class="${metaClasses}">${dateText} · ${escapeHTML(byline)}</p>
      <a href="${href}" class="${linkClasses}">Read now</a>
    </article>
  `;
}
