// modules/hero-tabs.js - Category tabs with latest content for hero section

import { getLatestSermonEntries } from '../services/contentful.js';
import { getDevotionalGuideEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText } from '../utils/images.js';
import { slugify } from '../utils/slugify.js';

// Inline Bible Study fetch to bypass caching issues
async function getBibleStudyEntries() {
  const cfg = window.FLC_CONTENTFUL || {};
  if (!cfg.enabled || !cfg.spaceId || !cfg.accessToken) return { items: [], includes: {} };
  if (!cfg.bibleStudyContentType) return { items: [], includes: {} };
  
  const env = cfg.environment || 'master';
  const qs = new URLSearchParams({ 
    access_token: cfg.accessToken, 
    content_type: cfg.bibleStudyContentType,
    order: '-sys.updatedAt',
    limit: '3',
    include: '2'
  });
  const url = `https://cdn.contentful.com/spaces/${cfg.spaceId}/environments/${env}/entries?${qs}`;
  
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!r.ok) return { items: [], includes: {} };
    const payload = await r.json();
    const items = (payload.items || [])
      .filter(i => i?.fields?.status !== 'draft' && i?.fields?.published !== false)
      .sort((a, b) => {
        const dateA = a?.fields?.date || a?.fields?.startDate || a?.sys?.updatedAt || '';
        const dateB = b?.fields?.date || b?.fields?.startDate || b?.sys?.updatedAt || '';
        return new Date(dateB || 0) - new Date(dateA || 0);
      });
    return { items, includes: payload.includes || {} };
  } catch {
    return { items: [], includes: {} };
  }
}

let currentCategory = 'sermons';
let categoryData = {};

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderCard(item, category, contentfulData) {
  const cfg = window.FLC_CONTENTFUL || {};
  const title = escapeHTML((item.fields.title || 'Untitled').trim());
  const bodyRaw = item.fields.summary || item.fields.body || item.fields.content || item.fields.studyContent || '';
  const summaryText = typeof bodyRaw === 'string' ? bodyRaw : stripRichTextToPlain(bodyRaw);
  const summary = summaryText
    ? escapeHTML(summaryText.slice(0, 120)) + (summaryText.length > 120 ? '...' : '')
    : 'Explore this resource for deeper insights and practical application.';
  const dateText = formatDateSafe(item.fields.date || item.fields.startDate || item.fields.publishDate);
  const imageUrl = getImageUrl(item, contentfulData.includes, 'image') || getImageUrl(item, contentfulData.includes, 'featuredImage');
  const titleSlug = slugify(title);
  const postPagePath = cfg.postPagePath || '/pages/post.html';
  const href = `${postPagePath}?title=${encodeURIComponent(titleSlug)}`;
  
  const categoryColors = {
    sermons: { bg: 'bg-flcNavy/6', text: 'text-flcNavy/70', badge: 'bg-flcNavy/10 text-flcNavy' },
    devotionals: { bg: 'bg-flcGold/8', text: 'text-flcGold', badge: 'bg-flcGold/10 text-flcGold' },
    bibleStudies: { bg: 'bg-flcGold/8', text: 'text-flcGold', badge: 'bg-flcGold/10 text-flcGold' }
  };
  
  const colors = categoryColors[category] || categoryColors.sermons;
  const categoryLabel = category === 'sermons' ? 'Sermon' : category === 'devotionals' ? 'Devotional' : 'Bible Study';
  
  return `
    <a href="${href}" class="group bg-white/95 rounded-xl border border-flcBorder/50 overflow-hidden card-hover block">
      <div class="p-5 sm:p-6">
        <div class="flex items-start gap-4">
          ${imageUrl ? `
            <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden ${colors.bg}">
              <img src="${escapeHTML(imageUrl)}" alt="${escapeHTML(getImageAltText(item, 'image') || getImageAltText(item, 'featuredImage') || title)}" class="w-full h-full object-cover" loading="lazy">
            </div>
          ` : `
            <div class="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg ${colors.bg} flex items-center justify-center">
              <svg class="w-8 h-8 ${colors.text}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
          `}
          <div class="flex-1 min-w-0">
            <span class="inline-block text-[0.6rem] font-semibold tracking-[0.14em] uppercase ${colors.badge} px-2 py-0.5 rounded-full mb-2">${categoryLabel}</span>
            <h3 class="font-heading text-base sm:text-lg text-flcNavy leading-snug mb-2 group-hover:text-flcGold motion-fast truncate">${title}</h3>
            ${dateText ? `<p class="text-xs text-flcCharcoal/40 mb-2">${dateText}</p>` : ''}
            <p class="text-sm text-flcCharcoal/60 line-clamp-2">${summary}</p>
          </div>
        </div>
      </div>
    </a>
  `;
}

async function loadCategoryContent(category) {
  try {
    let contentfulData;
    let items = [];
    
    if (category === 'sermons') {
      contentfulData = await getLatestSermonEntries();
      items = contentfulData?.items || [];
    } else if (category === 'devotionals') {
      items = await getDevotionalGuideEntries();
      contentfulData = { includes: {} };
    } else if (category === 'bibleStudies') {
      contentfulData = await getBibleStudyEntries();
      items = contentfulData?.items || [];
    }
    
    return { items, includes: contentfulData?.includes || {} };
  } catch (error) {
    console.error(`Failed to load ${category}:`, error);
    return { items: [], includes: {} };
  }
}

async function renderCategoryContent(category) {
  const container = document.getElementById('heroTabsContent');
  const loadingState = document.getElementById('heroTabsLoading');
  const emptyState = document.getElementById('heroTabsEmpty');
  
  if (!container) return;
  
  // Show loading
  if (loadingState) loadingState.classList.remove('hidden');
  if (container) container.classList.add('hidden');
  if (emptyState) emptyState.classList.add('hidden');
  
  // Load data
  const { items, includes } = await loadCategoryContent(category);
  categoryData[category] = { items, includes };
  
  // Hide loading
  if (loadingState) loadingState.classList.add('hidden');
  
  if (items && items.length > 0) {
    const cardsHtml = items.slice(0, 3).map(item => renderCard(item, category, { includes })).join('');
    container.innerHTML = cardsHtml;
    container.classList.remove('hidden');
  } else {
    if (emptyState) emptyState.classList.remove('hidden');
  }
}

function updateTabStyles(activeCategory) {
  document.querySelectorAll('.hero-tab-btn').forEach(btn => {
    const category = btn.dataset.category;
    if (category === activeCategory) {
      btn.classList.add('bg-flcNavy', 'text-white');
      btn.classList.remove('bg-white', 'text-flcNavy', 'hover:bg-flcGold/10');
    } else {
      btn.classList.remove('bg-flcNavy', 'text-white');
      btn.classList.add('bg-white', 'text-flcNavy', 'hover:bg-flcGold/10');
    }
  });
  
  // Update view all link
  const viewAllLink = document.getElementById('heroViewAllLink');
  if (viewAllLink) {
    const links = {
      sermons: { href: 'pages/sermons.html', text: 'View all sermons' },
      devotionals: { href: 'pages/devotionals.html', text: 'View all devotionals' },
      bibleStudies: { href: 'pages/bible-studies.html', text: 'View all Bible studies' }
    };
    const linkData = links[activeCategory] || links.sermons;
    viewAllLink.href = linkData.href;
    viewAllLink.innerHTML = `${linkData.text}<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
  }
}

export async function initHeroTabs() {
  const tabsContainer = document.getElementById('heroTabsContainer');
  if (!tabsContainer) return;
  
  // Setup tab click handlers
  tabsContainer.addEventListener('click', async (e) => {
    const btn = e.target.closest('.hero-tab-btn');
    if (!btn) return;
    
    const category = btn.dataset.category;
    if (category === currentCategory) return;
    
    currentCategory = category;
    updateTabStyles(category);
    await renderCategoryContent(category);
  });
  
  // Load initial category
  await renderCategoryContent(currentCategory);
  updateTabStyles(currentCategory);
}
