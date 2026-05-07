// modules/featured.js - Featured posts section rendering

import { getAllLatestEntries } from '../services/contentful.js';
import { escapeHTML } from '../utils/sanitize.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { slugify } from '../utils/slugify.js';

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

function buildCard(item, postPagePath) {
  const f = item.fields;
  const title = escapeHTML((f.title || 'Untitled').trim());
  const bodyRaw = f.body || f.content || f.summary || '';
  const summaryText = typeof bodyRaw === 'string' ? stripMarkdown(bodyRaw) : stripRichTextToPlain(bodyRaw);
  const summary = summaryText
    ? escapeHTML(summaryText.slice(0, 160)) + (summaryText.length > 160 ? '...' : '')
    : 'Freshly published teaching notes and resources from Freedom Life Church.';
  const isDetox = !!(f.weekNumber || f.detoxWeek);
  const isDevotional = !!(f.startDate || f.endDate || f.devotionalGuide);
  const kicker = isDetox ? 'Detox' : isDevotional ? 'Devotional' : 'Sermon';
  const dateText = formatDateSafe(f.date || f.startDate);
  const byline = escapeHTML(f.pastor || f.pastorName || f.preacher || f.speaker || 'FLC Team');
  const titleSlug = slugify(f.title || '');
  const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
  return { title, summary, kicker, dateText, byline, href };
}

const chevronSm = `<svg class="w-3 h-3 group-hover:translate-x-0.5 motion-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;

function renderFeatured(c) {
  return `
    <article class="group relative bg-white/90 rounded-2xl border border-flcBorder/50 overflow-hidden p-7 sm:p-8 card-hover">
      <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-flcGold to-flcGold/10 rounded-full"></div>
      <div class="pl-4">
        <p class="text-[0.6rem] font-semibold tracking-[0.16em] text-flcGold/80 uppercase mb-2">${c.kicker}</p>
        <h3 class="font-heading text-xl sm:text-2xl text-flcNavy leading-snug mb-3">${c.title}</h3>
        <p class="text-sm text-flcCharcoal/55 leading-relaxed line-clamp-3 mb-4">${c.summary}</p>
        <p class="text-xs text-flcCharcoal/35 mb-5">${c.dateText} &middot; ${c.byline}</p>
        <a href="${c.href}" class="inline-flex items-center gap-1 text-flcNavy/60 font-medium text-sm group-hover:text-flcGold motion-fast">Read now${chevronSm}</a>
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
    const cards = items.map((item) => buildCard(item, postPagePath));

    const featured = renderFeatured(cards[0]);
    const secondary = cards.slice(1).map(c => renderSecondary(c)).join('');

    grid.innerHTML = `${featured}<div class="grid gap-5">${secondary}</div>`;
  } catch (error) {
    console.error("Failed to load featured posts section:", error);
    grid.innerHTML = `<div class="col-span-full text-center text-sm text-flcCharcoal/50 py-8">Unable to load featured posts.</div>`;
  }
}
