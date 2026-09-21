// modules/featured.js - Featured posts section rendering

import { getAllLatestEntries } from '../services/contentful.js';
import { escapeHTML } from '../utils/sanitize.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { slugify } from '../utils/slugify.js';
import { getImageUrl, getImageAltText } from '../utils/images.js';

function stripMarkdown(str) {
  return str
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim();
}

function buildCard(item, postPagePath, includes = {}) {
  const f = item.fields;
  const title = escapeHTML((f.title || 'Untitled').trim());
  const bodyRaw = f.description || f.body || f.content || f.studyContent || f.lesson || f.summary || '';
  const summaryText = typeof bodyRaw === 'string' ? stripMarkdown(bodyRaw) : stripRichTextToPlain(bodyRaw);
  const summary = summaryText
    ? escapeHTML(summaryText.slice(0, 160)) + (summaryText.length > 160 ? '...' : '')
    : 'Freshly published teaching notes and resources from Freedom Life Church.';
  const cfg = window.FLC_CONTENTFUL || {};
  const contentTypeId = item.sys?.contentType?.sys?.id || '';
  const isBibleStudy = contentTypeId === cfg.bibleStudyContentType || !!(f.bibleStudy || f.studyGuide);
  const isDetox = contentTypeId === cfg.detoxContentType || !!(f.weekNumber || f.detoxWeek);
  const isDevotional = contentTypeId === cfg.devotionalGuideContentType || !!(f.startDate || f.endDate || f.devotionalGuide);
  const kicker = isBibleStudy ? 'Bible Study' : isDetox ? 'Detox' : isDevotional ? 'Devotional' : 'Sermon';
  const dateText = formatDateSafe(f.date || f.startDate || f.publishDate || f.publishedDate);
  const byline = escapeHTML(f.pastor || f.pastorName || f.preacher || f.speaker || 'FLC Team');
  const titleSlug = slugify(f.title || '');
  const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
  const image = getImageUrl(item, includes, 'featuredImage') || getImageUrl(item, includes, 'image');
  const imageAlt = escapeHTML(getImageAltText(item, 'featuredImage') || getImageAltText(item, 'image') || f.title || 'FLC Publishing House');
  return { title, summary, kicker, dateText, byline, href, image, imageAlt };
}

const chevronSm = `<svg class="w-3 h-3 group-hover:translate-x-0.5 motion-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;

function renderFeatured(c) {
  return `
    <article class="group relative bg-white rounded-2xl border border-flcBorder/55 overflow-hidden card-hover">
      ${c.image ? `<div class="aspect-[16/8] overflow-hidden bg-flcOffWhite"><img src="${c.image}" alt="${c.imageAlt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy"></div>` : ''}
      <div class="p-7 sm:p-8 lg:p-9">
        <div class="flex items-center gap-3 mb-3">
          <p class="text-[0.6rem] font-semibold tracking-[0.16em] text-flcGold uppercase">${c.kicker}</p>
          <span class="h-px w-8 bg-flcGold/35"></span>
          <p class="text-[0.65rem] text-flcCharcoal/35">${c.dateText}</p>
        </div>
        <h3 class="font-heading text-2xl sm:text-3xl lg:text-[2.15rem] text-flcNavy leading-[1.08] mb-3 max-w-2xl">${c.title}</h3>
        <p class="text-sm sm:text-base text-flcCharcoal/60 leading-[1.7] line-clamp-3 mb-5 max-w-2xl">${c.summary}</p>
        <div class="flex items-center justify-between gap-4">
          <p class="text-xs text-flcCharcoal/40">${c.byline}</p>
          <a href="${c.href}" class="inline-flex items-center gap-1.5 text-flcNavy font-semibold text-sm group-hover:text-flcGold motion-fast">Read piece${chevronSm}</a>
        </div>
      </div>
    </article>`;
}

function renderSecondary(c) {
  return `
    <article class="group bg-white/80 rounded-xl border-t border-flcBorder/40 pt-5 px-1 card-hover">
      <p class="text-[0.6rem] font-semibold tracking-[0.16em] text-flcGold/70 uppercase mb-1.5">${c.kicker}</p>
      <h3 class="font-heading text-base text-flcNavy leading-snug mb-2">${c.title}</h3>
      <p class="text-sm text-flcCharcoal/50 leading-relaxed line-clamp-2 mb-2">${c.summary}</p>
      <p class="text-xs text-flcCharcoal/30 mb-3">${c.dateText} &middot; ${c.byline}</p>
      <a href="${c.href}" class="inline-flex items-center gap-1 text-flcNavy/55 font-medium text-sm group-hover:text-flcGold motion-fast">Read${chevronSm}</a>
    </article>`;
}

export async function initFeaturedPosts() {
  const grid = document.getElementById("featuredPostsGrid");
  if (!grid) return;

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const contentfulData = await getAllLatestEntries(3);
    const items = (contentfulData?.items || []).slice(0, 3);

    if (!items.length) {
      grid.innerHTML = `<div class="col-span-full text-center text-sm text-flcCharcoal/50 py-8">No resources available right now.</div>`;
      return;
    }

    const postPagePath = cfg.postPagePath || '/pages/post.html';
    const cards = items.map((item) => buildCard(item, postPagePath, contentfulData.includes || {}));

    const featured = renderFeatured(cards[0]);
    const secondary = cards.slice(1).map(c => renderSecondary(c)).join('');

    grid.innerHTML = `${featured}<div class="grid gap-5">${secondary}</div>`;
  } catch (error) {
    console.error("Failed to load featured posts section:", error);
    grid.innerHTML = `<div class="col-span-full text-center text-sm text-flcCharcoal/50 py-8">Unable to load featured posts.</div>`;
  }
}
