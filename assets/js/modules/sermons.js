// modules/sermons.js - Sermon loading logic for sermons page

import { getLatestSermonEntries } from '../services/contentful.js';
import { formatDateSafe, removeSkeleton } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText, generateSrcset } from '../utils/images.js';
import { slugify } from '../utils/slugify.js';

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 6;

let allSermons = [];
let currentFilter = 'all';
let displayedCount = INITIAL_DISPLAY_COUNT;

// Map of static sermon files
const staticSermonMap = {
  "sermon-im-under-pressure.html": "../sermons/sermon-im-under-pressure.html",
  "sermon-purpose-protected-me.html": "../sermons/sermon-purpose-protected-me.html",
  "sermon-when-compassion-costs-you-sleep.html": "../sermons/sermon-when-compassion-costs-you-sleep.html",
  "sermon-its-time-to-crossover.html": "../sermons/sermon-its-time-to-crossover.html"
};

export async function initSermons() {
  const sermonGrid = document.getElementById('sermonGrid');
  const sermonCount = document.getElementById('sermonCount');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const contentfulData = await getLatestSermonEntries();
    
    let sermons = [];
    
    if (contentfulData && contentfulData.items && contentfulData.items.length > 0) {
      sermons = contentfulData.items
        .filter((item) => item && item.fields && item.sys)
        .map((item) => {
          const title = (item.fields.title || 'Untitled Sermon').trim();
          const postPagePath = cfg.postPagePath || 'post.html';
          const imageUrl = getImageUrl(item, contentfulData.includes, 'image') || getImageUrl(item, contentfulData.includes, 'featuredImage');
          const titleSlug = slugify(title);
          
          return {
            id: item.sys.id,
            title: title,
            summary: stripRichTextToPlain(item.fields.summary || ''),
            date: item.fields.date || '',
            url: `${postPagePath}?title=${encodeURIComponent(titleSlug)}`,
            image: imageUrl,
            altText: getImageAltText(item, 'image') || getImageAltText(item, 'featuredImage')
          };
        })
        .filter((item) => item.title && item.url);
    }

    allSermons = sermons;

    if (allSermons.length) {
      if (sermonCount) {
        const suffix = allSermons.length === 1 ? 'sermon' : 'sermons';
        sermonCount.textContent = `${allSermons.length} ${suffix}`;
      }

      renderSermons();

      // Setup filter buttons
      setupFilters();

      // Setup load more button
      if (loadMoreBtn && loadMoreContainer) {
        loadMoreBtn.addEventListener('click', () => {
          displayedCount += LOAD_MORE_COUNT;
          renderSermons();
        });
      }
    }
  } catch (error) {
    console.error('Failed to load sermons:', error);
    if (sermonCount) {
      sermonCount.textContent = 'Failed to load sermons';
    }
  }
}

function setupFilters() {
  const filterAll = document.getElementById('filterAll');
  const filterNewest = document.getElementById('filterNewest');
  const filterOldest = document.getElementById('filterOldest');

  if (filterAll) {
    filterAll.addEventListener('click', () => setFilter('all', filterAll, filterNewest, filterOldest));
  }
  if (filterNewest) {
    filterNewest.addEventListener('click', () => setFilter('newest', filterAll, filterNewest, filterOldest));
  }
  if (filterOldest) {
    filterOldest.addEventListener('click', () => setFilter('oldest', filterAll, filterNewest, filterOldest));
  }
}

function setFilter(filter, allBtn, newestBtn, oldestBtn) {
  currentFilter = filter;
  displayedCount = INITIAL_DISPLAY_COUNT;

  // Update button styles
  if (allBtn && newestBtn && oldestBtn) {
    [allBtn, newestBtn, oldestBtn].forEach(btn => {
      btn.classList.remove('active', 'border-flcGold', 'bg-flcGold/10', 'text-flcGold');
      btn.classList.add('border-flcBorder', 'text-flcCharcoal');
    });

    const activeBtn = filter === 'all' ? allBtn : filter === 'newest' ? newestBtn : oldestBtn;
    activeBtn.classList.add('active', 'border-flcGold', 'bg-flcGold/10', 'text-flcGold');
    activeBtn.classList.remove('border-flcBorder', 'text-flcCharcoal');
  }

  renderSermons();
}

function getFilteredSermons() {
  let filtered = [...allSermons];

  if (currentFilter === 'newest') {
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } else if (currentFilter === 'oldest') {
    filtered.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  } else {
    // Default sort by date descending
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  return filtered;
}

function renderSermons() {
  const sermonGrid = document.getElementById('sermonGrid');
  const loadMoreContainer = document.getElementById('loadMoreContainer');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (!sermonGrid) return;

  const filtered = getFilteredSermons();
  const toDisplay = filtered.slice(0, displayedCount);

  sermonGrid.innerHTML = toDisplay.map((sermon) => {
    const dateLabel = sermon.date ? formatDateSafe(sermon.date) : '';
    const summaryText = sermon.summary || 'Teaching notes and sermon resources.';
    
    // Image HTML if available
    let imageHtml = '';
    if (sermon.image) {
      const srcset = generateSrcset(sermon.image);
      const altText = sermon.altText || sermon.title;
      imageHtml = `
        <div class="mb-4 aspect-video bg-flcCream rounded-lg overflow-hidden">
          <img 
            src="${sermon.image}" 
            srcset="${srcset}"
            sizes="(max-width: 640px) 400px, 800px"
            alt="${altText}"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      `;
    }
    
    return `
      <a href="${sermon.url}" class="sermon-card p-6" aria-label="Open ${sermon.title} sermon">
        ${imageHtml}
        <div class="${sermon.image ? '' : 'mb-4'}">
          ${dateLabel ? `<p class="text-sm text-flcGold font-semibold mb-2">${dateLabel}</p>` : ''}
          <h3 class="font-heading text-lg font-bold text-flcNavy">${sermon.title}</h3>
          <p class="mt-2 text-sm text-flcCharcoal/60">
            ${summaryText}
          </p>
        </div>
        <div class="mt-4 pt-4 border-t border-flcBorder flex items-center justify-between">
          <span class="text-xs text-flcCharcoal/50">Teaching Notes</span>
          <span class="btn-primary px-4 py-2 text-xs sm:text-sm" aria-hidden="true">Open</span>
        </div>
      </a>
    `;
  }).join('');

  // Remove skeleton loading state
  removeSkeleton(sermonGrid);

  // Show/hide load more button
  if (loadMoreContainer && loadMoreBtn) {
    if (displayedCount < filtered.length) {
      loadMoreContainer.classList.remove('hidden');
      loadMoreBtn.textContent = `Load More (${filtered.length - displayedCount} remaining)`;
    } else {
      loadMoreContainer.classList.add('hidden');
    }
  }
}
