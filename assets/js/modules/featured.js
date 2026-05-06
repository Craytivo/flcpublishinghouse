// modules/featured.js - Featured posts section rendering

import { getLatestSermonEntries } from '../services/contentful.js';
import { escapeHTML } from '../utils/sanitize.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { slugify } from '../utils/slugify.js';

function buildCard(item, postPagePath) {
  const f = item.fields;
  const title = escapeHTML((f.title || 'Untitled').trim());
  const bodyRaw = f.body || f.content || f.summary || '';
  const summaryText = typeof bodyRaw === 'string' ? bodyRaw : stripRichTextToPlain(bodyRaw);
  const summary = summaryText
    ? escapeHTML(summaryText.slice(0, 140)) + (summaryText.length > 140 ? '...' : '')
    : 'Freshly published teaching notes and resources from Freedom Life Church.';
  const isDevotional = !!(f.startDate || f.endDate || f.devotionalGuide);
  const kicker = isDevotional ? 'Devotional Guide' : 'Sermon';
  const dateText = formatDateSafe(f.date || f.startDate);
  const byline = escapeHTML(f.pastor || f.pastorName || f.preacher || f.speaker || 'FLC Team');
  const titleSlug = slugify(f.title || '');
  const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
  return { title, summary, kicker, dateText, byline, href };
}

const chevron = `<svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
const chevronSm = `<svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;

export async function initFeaturedPosts() {
  const grid = document.getElementById("featuredPostsGrid");
  if (!grid) return;

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const contentfulData = await getLatestSermonEntries();
    const items = (contentfulData?.items || [])
      .filter((item) => item && item.fields && item.sys && item.sys.id)
      .slice(0, 3);

    if (!items.length) {
      grid.innerHTML = `<div class="col-span-full text-center text-sm text-flcCharcoal/60">No resources available right now.</div>`;
      return;
    }

    const postPagePath = cfg.postPagePath || '/pages/post.html';
    const cards = items.map((item) => buildCard(item, postPagePath));
    const [main, ...rest] = cards;

    const mainCard = `
      <article class="lg:col-span-2 relative bg-white rounded-2xl border border-flcBorder overflow-hidden shadow-soft">
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-flcGold to-flcGoldLight"></div>
        <div class="p-8 pl-10">
          <p class="text-xs font-semibold tracking-[0.14em] text-flcGold uppercase mb-3">${main.kicker}</p>
          <h3 class="font-heading text-2xl sm:text-3xl text-flcNavy leading-tight mb-3">${main.title}</h3>
          <p class="text-flcCharcoal/80 leading-relaxed mb-3">${main.summary}</p>
          <p class="text-sm text-flcCharcoal/60 mb-5">${main.dateText} &middot; ${main.byline}</p>
          <a href="${main.href}" class="inline-flex items-center px-5 py-2.5 bg-flcNavy text-white font-semibold text-sm rounded-xl hover:bg-flcGold transition-colors">Read now${chevron}</a>
        </div>
      </article>`;

    const sideCards = rest.map((c) => `
      <article class="bg-white rounded-2xl border border-flcBorder p-6 shadow-soft flex-1">
        <p class="text-xs font-semibold tracking-[0.12em] text-flcGold uppercase mb-2">${c.kicker}</p>
        <h3 class="font-heading text-lg text-flcNavy mb-3">${c.title}</h3>
        <p class="text-sm text-flcCharcoal/75 mb-4">${c.summary}</p>
        <a href="${c.href}" class="inline-flex items-center text-flcNavy font-semibold hover:text-flcGold text-sm transition-colors">Read now${chevronSm}</a>
      </article>`).join('');

    grid.innerHTML = mainCard + (rest.length ? `<div class="flex flex-col gap-6">${sideCards}</div>` : '');
  } catch (error) {
    console.error("Failed to load featured posts section:", error);
    grid.innerHTML = `<div class="col-span-full text-center text-sm text-flcCharcoal/60">Failed to load featured posts.</div>`;
  }
}
