// components/renderPostCard.js - Reusable post card renderer

import { escapeHTML } from '../utils/sanitize.js';
import { formatDateSafe, normalizePastor } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';

export function renderPostCard(item, index, postPagePath) {
  const title = escapeHTML((item.fields.title || "Untitled Sermon").trim());
  const summaryRaw = stripRichTextToPlain(item.fields.body);
  const summary = summaryRaw
    ? `${escapeHTML(summaryRaw.slice(0, 120))}${summaryRaw.length > 120 ? "..." : ""}`
    : "Freshly published teaching notes and resources from Freedom Life Church.";
  const dateText = formatDateSafe(item.fields.date);
  const pastor = normalizePastor(item.fields.pastor || item.fields.pastorName || item.fields.preacher);
  const href = `${postPagePath}?entry=${encodeURIComponent(item.sys.id)}`;

  const isAccent = index === 2;
  const cardClasses = isAccent
    ? "bg-flcNavy text-white rounded-2xl border border-flcNavy p-6 shadow-medium"
    : "bg-white rounded-2xl border border-flcBorder p-6 shadow-soft";
  const kickerClasses = isAccent
    ? "text-xs font-semibold tracking-wide text-flcGoldLight uppercase"
    : "text-xs font-semibold tracking-wide text-flcGold uppercase";
  const headingClasses = isAccent
    ? "font-heading text-2xl mt-2"
    : "font-heading text-2xl text-flcNavy mt-2";
  const summaryClasses = isAccent
    ? "mt-3 text-white/82"
    : "mt-3 text-flcCharcoal/80";
  const metaClasses = isAccent
    ? "mt-3 text-xs text-white/70"
    : "mt-3 text-xs text-flcCharcoal/60";
  const linkClasses = isAccent
    ? "inline-flex mt-5 text-flcGoldLight font-semibold hover:text-white"
    : "inline-flex mt-5 text-flcNavy font-semibold hover:text-flcGold";

  return `
    <article class="${cardClasses}">
      <p class="${kickerClasses}">Sermon</p>
      <h3 class="${headingClasses}">${title}</h3>
      <p class="${summaryClasses}">${summary}</p>
      <p class="${metaClasses}">${dateText} · ${pastor}</p>
      <a href="${href}" class="${linkClasses}">Read now</a>
    </article>
  `;
}

export function renderFeaturedPostCard(item, postPagePath) {
  const title = escapeHTML((item.fields.title || "Untitled Sermon").trim());
  const summaryRaw = stripRichTextToPlain(item.fields.body);
  const summary = summaryRaw
    ? `${escapeHTML(summaryRaw.slice(0, 140))}${summaryRaw.length > 140 ? "..." : ""}`
    : "Freshly published teaching notes and resources.";
  const dateLabel = formatDateSafe(item.fields.date);
  const pastor = normalizePastor(item.fields.pastor || item.fields.pastorName || item.fields.preacher);
  const href = `${postPagePath}?entry=${encodeURIComponent(item.sys.id)}`;

  return { title, summary, dateLabel, pastor, href };
}
