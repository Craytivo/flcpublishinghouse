// modules/hero.js - Hero section rendering

import { getLatestSermonEntries } from '../services/contentful.js';
import { renderFeaturedPostCard } from '../components/renderPostCard.js';
import { removeSkeleton } from '../utils/format.js';

export async function initHero() {
  const items = await getLatestSermonEntries();
  if (!items.length) return;

  const latest = items[0];
  const postPagePath = window.FLC_CONTENTFUL?.postPagePath || "pages/post.html";
  const { title, summary, dateLabel, pastor, href } = renderFeaturedPostCard(latest, postPagePath);

  const aboutTitleEl = document.getElementById("aboutFeaturedTitle");
  const aboutSummaryEl = document.getElementById("aboutFeaturedSummary");
  const aboutDateEl = document.getElementById("aboutFeaturedDate");
  const aboutPastorEl = document.getElementById("aboutFeaturedPastor");
  const aboutLinkEl = document.getElementById("aboutFeaturedLink");

  if (aboutTitleEl) {
    aboutTitleEl.textContent = title;
    removeSkeleton(aboutTitleEl);
  }
  if (aboutSummaryEl) {
    aboutSummaryEl.textContent = summary;
    removeSkeleton(aboutSummaryEl);
  }
  if (aboutDateEl) {
    aboutDateEl.textContent = dateLabel;
    removeSkeleton(aboutDateEl);
  }
  if (aboutPastorEl) {
    aboutPastorEl.textContent = pastor;
    removeSkeleton(aboutPastorEl);
  }
  if (aboutLinkEl) aboutLinkEl.href = href;
}
