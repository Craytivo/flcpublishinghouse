// modules/bible-studies.js - Bible Study loading logic for bible-studies page

import { getBibleStudyEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText } from '../utils/images.js';
import { slugify } from '../utils/slugify.js';

let allBibleStudies = [];
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

export async function initBibleStudies() {
  const bibleStudyGrid = document.getElementById('bibleStudyGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const bibleStudyCount = document.getElementById('bibleStudyCount');
  const bibleStudyLabelText = document.getElementById('bibleStudyLabelText');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const contentfulData = await getBibleStudyEntries();
    
    let bibleStudies = [];
    
    if (contentfulData && contentfulData.items && contentfulData.items.length > 0) {
      bibleStudies = contentfulData.items
        .filter((item) => item && item.fields && item.sys)
        .map((item) => {
          const title = (item.fields.title || 'Untitled Bible Study').trim();
          const postPagePath = cfg.postPagePath || '/pages/post.html';
          const imageUrl = getImageUrl(item, contentfulData.includes, 'image') || getImageUrl(item, contentfulData.includes, 'featuredImage');
          const titleSlug = slugify(title);
          
          return {
            id: item.sys.id,
            title: title,
            summary: stripRichTextToPlain(item.fields.summary || item.fields.body || item.fields.content || ''),
            date: item.fields.date || item.fields.startDate || '',
            url: `${postPagePath}?title=${encodeURIComponent(titleSlug)}`,
            image: imageUrl,
            altText: getImageAltText(item, 'image') || getImageAltText(item, 'featuredImage')
          };
        })
        .filter((item) => item.title && item.url);
    }

    allBibleStudies = bibleStudies;

    if (allBibleStudies.length) {
      if (bibleStudyCount) {
        const suffix = allBibleStudies.length === 1 ? 'study' : 'studies';
        bibleStudyCount.textContent = `Showing ${allBibleStudies.length} ${suffix}`;
      }

      await renderBibleStudies();
    }
  } catch (error) {
    console.error('Failed to load Bible studies:', error);
    if (bibleStudyCount) {
      bibleStudyCount.textContent = 'Failed to load Bible studies';
    }
    // Hide loading state on error
    if (loadingState) loadingState.classList.add('hidden');
  }
}

async function renderBibleStudies() {
  const bibleStudyGrid = document.getElementById('bibleStudyGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  const bibleStudyLabelText = document.getElementById('bibleStudyLabelText');
  const bibleStudyCount = document.getElementById('bibleStudyCount');

  if (!bibleStudyGrid) return;

  // Show loading state
  if (loadingState) loadingState.classList.remove('hidden');
  if (bibleStudyGrid) bibleStudyGrid.classList.add('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  // Update label text
  if (bibleStudyLabelText) {
    bibleStudyLabelText.textContent = 'All Bible Studies';
  }

  // Sort by date (newest first)
  const sorted = [...allBibleStudies].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // Hide loading state and show results
  if (loadingState) loadingState.classList.add('hidden');
  if (bibleStudyGrid) bibleStudyGrid.classList.remove('hidden');

  if (sorted.length > 0) {
    bibleStudyGrid.classList.remove('hidden');
    const cardHtmls = sorted.map(renderCard);
    animatedRender(bibleStudyGrid, cardHtmls.join(''));
  } else {
    bibleStudyGrid.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
  }

  if (bibleStudyCount) {
    const suffix = sorted.length === 1 ? 'study' : 'studies';
    bibleStudyCount.textContent = `Showing ${sorted.length} ${suffix}`;
  }
}

function renderCard(bibleStudy) {
  const cardId = `card-${bibleStudy.id}`;
  const dateLabel = bibleStudy.date ? formatDateSafe(bibleStudy.date) : '';
  
  return `
    <a href="${esc(bibleStudy.url)}" class="bible-study-card bg-white rounded-xl overflow-hidden shadow-sm p-6 flex flex-col h-full hover:-translate-y-1 transition-transform">
      <div class="flex-1">
        ${dateLabel ? `<p class="text-xs font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full inline-block mb-2" style="background:rgba(154,123,79,0.10);color:#9A7B4F;">${esc(dateLabel)}</p>` : ''}
        <h3 class="font-heading text-lg leading-snug text-flcNavy mb-1">${esc(bibleStudy.title)}</h3>
      </div>
      <div class="flex items-center justify-between mt-3">
        <svg class="w-5 h-5 flex-shrink-0" style="color:rgba(44,44,44,0.3);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </div>
    </a>`;
}
