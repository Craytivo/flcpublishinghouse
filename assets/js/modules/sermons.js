// modules/sermons.js - Sermon loading logic for sermons page

import { getLatestSermonEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText } from '../utils/images.js';
import { slugify } from '../utils/slugify.js';

let allSermons = [];
let currentFilter = 'all';

// Helper function to escape HTML
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Helper function for animated render
function animatedRender(container, html) {
  container.style.opacity = '0';
  container.style.transform = 'translateY(10px)';
  container.innerHTML = html;
  setTimeout(() => {
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 120);
}

// Map of static sermon files
const staticSermonMap = {
  "sermon-im-under-pressure.html": "../sermons/sermon-im-under-pressure.html",
  "sermon-purpose-protected-me.html": "../sermons/sermon-purpose-protected-me.html",
  "sermon-when-compassion-costs-you-sleep.html": "../sermons/sermon-when-compassion-costs-you-sleep.html",
  "sermon-its-time-to-crossover.html": "../sermons/sermon-its-time-to-crossover.html"
};

export async function initSermons() {
  const sermonGrid = document.getElementById('sermonGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const sermonCount = document.getElementById('sermonCount');
  const filterTabs = document.getElementById('filterTabs');
  const sermonLabelText = document.getElementById('sermonLabelText');

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
        sermonCount.textContent = `Showing ${allSermons.length} ${suffix}`;
      }

      renderFilterTabs();
      await renderSermons();

      // Setup filter tabs
      if (filterTabs) {
        filterTabs.addEventListener('click', async e => {
          const btn = e.target.closest('.filter-btn');
          if (!btn) return;
          currentFilter = btn.dataset.filter;
          updateFilterBtnStyles(currentFilter);
          await renderSermons();
        });
      }
    }
  } catch (error) {
    console.error('Failed to load sermons:', error);
    if (sermonCount) {
      sermonCount.textContent = 'Failed to load sermons';
    }
    // Hide loading state on error
    if (loadingState) loadingState.classList.add('hidden');
  }
}

function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container) return;

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Newest', value: 'newest' },
    { label: 'Oldest', value: 'oldest' }
  ];

  container.innerHTML = filters.map(f => 
    `<button class="filter-btn" data-filter="${esc(f.value)}">${esc(f.label)}</button>`
  ).join('');

  updateFilterBtnStyles(currentFilter);
}

function updateFilterBtnStyles(activeFilter) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function getFilteredSermons() {
  let filtered = [...allSermons];

  if (currentFilter === 'newest') {
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } else if (currentFilter === 'oldest') {
    filtered.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  } else {
    filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  return filtered;
}

async function renderSermons() {
  const sermonGrid = document.getElementById('sermonGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const sermonLabelText = document.getElementById('sermonLabelText');
  const sermonCount = document.getElementById('sermonCount');

  if (!sermonGrid) return;

  // Show loading state
  if (loadingState) loadingState.classList.remove('hidden');
  if (sermonGrid) sermonGrid.classList.add('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  // Update label text
  if (sermonLabelText) {
    if (currentFilter === 'all') {
      sermonLabelText.textContent = 'All Sermons';
    } else {
      sermonLabelText.textContent = currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1);
    }
  }

  const filtered = getFilteredSermons();

  // Hide loading state and show results
  if (loadingState) loadingState.classList.add('hidden');
  if (sermonGrid) sermonGrid.classList.remove('hidden');

  if (filtered.length > 0) {
    sermonGrid.classList.remove('hidden');
    const cardHtmls = filtered.map(renderCard);
    animatedRender(sermonGrid, cardHtmls.join(''));
  } else {
    sermonGrid.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
  }

  if (sermonCount) {
    const suffix = filtered.length === 1 ? 'sermon' : 'sermons';
    sermonCount.textContent = `Showing ${filtered.length} ${suffix}`;
  }
}

function renderCard(sermon) {
  const cardId = `card-${sermon.id}`;
  const dateLabel = sermon.date ? formatDateSafe(sermon.date) : '';
  const summaryText = sermon.summary || 'Teaching notes and sermon resources.';
  
  return `
    <article class="sermon-card bg-white rounded-xl overflow-hidden shadow-sm"
             id="${esc(cardId)}"
             tabindex="0"
             role="button"
             aria-expanded="false"
             onkeydown="handleCardKeydown(event, '${esc(cardId)}')">
      <button class="w-full text-left p-6 flex items-start gap-5 cursor-pointer hover:bg-flcOffWhite/50 transition-colors focus:outline-none focus:ring-2 focus:ring-flcGold/50 rounded-lg"
              onclick="toggleCard('${esc(cardId)}')"
              aria-label="Toggle details for ${esc(sermon.title)}">
        <div class="flex-1 min-w-0">
          ${dateLabel ? `<p class="text-xs font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full inline-block mb-2" style="background:rgba(154,123,79,0.10);color:#9A7B4F;">${esc(dateLabel)}</p>` : ''}
          <h3 class="font-heading text-lg leading-snug text-flcNavy mb-1">${esc(sermon.title)}</h3>
          <p class="text-sm" style="color:rgba(44,44,44,0.55);">Teaching Notes</p>
        </div>
        <svg class="expand-icon w-5 h-5 flex-shrink-0 mt-1" style="color:rgba(44,44,44,0.3);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="sermon-details px-6 pb-6" role="region" aria-label="Sermon details">
        <p class="text-sm leading-relaxed mb-4 mt-2" style="color:rgba(44,44,44,0.8);">${esc(summaryText)}</p>
        <a href="${esc(sermon.url)}" class="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors bg-flcNavy text-white hover:bg-flcGold">
          View Sermon
          <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </article>`;
}

function toggleCard(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const details = card.querySelector('.sermon-details');
  const icon = card.querySelector('.expand-icon');
  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  details?.classList.toggle('open', !isExpanded);
  icon?.classList.toggle('rotated', !isExpanded);
  card.setAttribute('aria-expanded', !isExpanded);
}

function handleCardKeydown(event, cardId) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleCard(cardId);
      break;
    case 'Escape':
      const card = document.getElementById(cardId);
      if (card && card.classList.contains('expanded')) {
        toggleCard(cardId);
      }
      break;
  }
}
