// modules/featured.js - Featured posts section rendering

import { getLatestSermonEntries } from '../services/contentful.js';
import { renderPostCard } from '../components/renderPostCard.js';

export async function initFeaturedPosts() {
  const grid = document.getElementById("featuredPostsGrid");
  if (!grid) return;

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const items = await getLatestSermonEntries();
    const topThree = items.filter((item) => item && item.fields && item.sys && item.sys.id).slice(0, 3);
    
    if (!topThree.length) {
      grid.innerHTML = `
        <div class="col-span-full text-center text-sm text-flcCharcoal/60">
          No resources available right now.
        </div>
      `;
      return;
    }

    const postPagePath = cfg.postPagePath || "pages/post.html";
    grid.innerHTML = topThree.map((item, index) => renderPostCard(item, index, postPagePath)).join("");
  } catch (error) {
    console.error("Failed to load featured posts section:", error);
  }
}
