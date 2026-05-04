// modules/devotionals.js - Devotionals section rendering

import { getDevotionalGuideEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';

export async function initDevotionals() {
  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const items = await getDevotionalGuideEntries();
    const publishedItems = items.filter((item) => item && item.fields && item.sys && item.sys.id);
    
    if (!publishedItems.length) return;

    const featuredGuide = publishedItems[0];
    const title = (featuredGuide.fields.title || "").trim();
    const summaryRaw = featuredGuide.fields.descrition || featuredGuide.fields.body || "";
    const summary = summaryRaw ? `${summaryRaw.slice(0, 120)}${summaryRaw.length > 120 ? "..." : ""}` : "Freshly published devotional guide from Freedom Life Church.";
    const dateText = formatDateSafe(featuredGuide.fields.startDate);
    const postPagePath = cfg.postPagePath || "pages/post.html";
    const href = `${postPagePath}?entry=${encodeURIComponent(featuredGuide.sys.id)}`;

    const featuredDevotionalCard = document.querySelector('a[href="pages/devotionals.html"]');
    if (featuredDevotionalCard) {
      const titleEl = featuredDevotionalCard.querySelector('.text-flcNavy');
      const descEl = featuredDevotionalCard.querySelector('.text-flcCharcoal/70');
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = summary;
      featuredDevotionalCard.href = href;
    }
  } catch (error) {
    console.error("Failed to load devotional guides:", error);
  }
}
