// modules/poetry-prose.js - Poetry & Prose collection rendering
import { getPoetryProseEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText } from '../utils/images.js';
import { slugify } from '../utils/slugify.js';

let allEntries = [];
let currentFilter = 'all';

function esc(value) {
  if (value == null) return '';
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getSummary(fields) {
  const source = fields.description || fields.subtitle || fields.summary || fields.content || '';
  const text = typeof source === 'string' ? source : stripRichTextToPlain(source);
  return text.replace(/\s+/g, ' ').trim().slice(0, 170);
}

export async function initPoetryProse() {
  const grid = document.getElementById('poetryProseGrid');
  const loading = document.getElementById('loadingState');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('poetryProseCount');
  const filters = document.getElementById('filterTabs');
  if (!grid) return;

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const data = await getPoetryProseEntries();
    allEntries = (data.items || []).filter(item => item?.fields && item?.sys?.id).map(item => {
      const f = item.fields;
      const title = (f.title || 'Untitled').trim();
      return {
        id: item.sys.id,
        title,
        category: f.category || 'Writing',
        author: f.author || '',
        date: f.date || item.sys.updatedAt || '',
        summary: getSummary(f),
        image: getImageUrl(item, data.includes, 'featuredImage') || getImageUrl(item, data.includes, 'image'),
        alt: getImageAltText(item, 'featuredImage') || getImageAltText(item, 'image'),
        url: (cfg.postPagePath || '/pages/post.html') + '?title=' + encodeURIComponent(slugify(title))
      };
    });

    renderFilters();
    render();

    if (filters) {
      filters.addEventListener('click', event => {
        const button = event.target.closest('.filter-btn');
        if (!button) return;
        currentFilter = button.dataset.filter || 'all';
        renderFilters();
        render();
      });
    }
  } catch (error) {
    console.error('Failed to load Poetry & Prose:', error);
    if (loading) loading.classList.add('hidden');
    if (count) count.textContent = 'Unable to load Poetry & Prose right now.';
  }
}

function renderFilters() {
  const container = document.getElementById('filterTabs');
  if (!container) return;
  const categories = [...new Set(allEntries.map(entry => entry.category).filter(Boolean))].sort();
  const options = [{ label: 'All', value: 'all' }, ...categories.map(category => ({ label: category, value: category }))];
  container.innerHTML = options.map(option => '<button type="button" class="filter-btn" data-filter="' + esc(option.value) + '">' + esc(option.label) + '</button>').join('');
  container.querySelectorAll('.filter-btn').forEach(button => button.classList.toggle('active', button.dataset.filter === currentFilter));
}

function render() {
  const grid = document.getElementById('poetryProseGrid');
  const loading = document.getElementById('loadingState');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('poetryProseCount');
  if (!grid) return;

  const entries = allEntries.filter(entry => currentFilter === 'all' || entry.category === currentFilter).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  if (loading) loading.classList.add('hidden');
  if (count) count.textContent = entries.length ? 'Showing ' + entries.length + ' ' + (entries.length === 1 ? 'piece' : 'pieces') : '';

  if (!entries.length) {
    grid.classList.add('hidden');
    if (empty) empty.classList.remove('hidden');
    return;
  }

  if (empty) empty.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = entries.map(renderCard).join('');
}

function renderCard(entry) {
  const date = entry.date ? formatDateSafe(entry.date) : '';
  const image = entry.image
    ? '<img src="' + esc(entry.image) + '" alt="' + esc(entry.alt || entry.title) + '" class="w-full h-full object-cover" loading="lazy">'
    : '<div class="h-full w-full bg-flcNavyDark flex items-center justify-center px-6 text-center"><span class="font-heading text-xl text-white/90">' + esc(entry.title) + '</span></div>';

  return '<a href="' + esc(entry.url) + '" class="group bg-white rounded-2xl overflow-hidden border border-flcBorder/50 shadow-sm hover:shadow-editorial hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">' +
    '<div class="aspect-[16/9] overflow-hidden">' + image + '</div>' +
    '<div class="p-6 flex flex-col flex-1">' +
      '<div class="flex flex-wrap items-center gap-2 mb-3"><span class="text-[0.68rem] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full" style="background:rgba(154,123,79,0.10);color:#9A7B4F;">' + esc(entry.category) + '</span>' +
      (date ? '<span class="text-xs text-flcCharcoal/50">' + esc(date) + '</span>' : '') + '</div>' +
      '<h2 class="font-heading text-2xl leading-tight text-flcNavy group-hover:text-flcGold transition-colors">' + esc(entry.title) + '</h2>' +
      (entry.author ? '<p class="text-sm font-medium text-flcCharcoal/60 mt-2">By ' + esc(entry.author) + '</p>' : '') +
      (entry.summary ? '<p class="text-sm leading-relaxed text-flcCharcoal/65 mt-4 line-clamp-3">' + esc(entry.summary) + '</p>' : '') +
      '<span class="mt-6 inline-flex items-center text-sm font-semibold text-flcNavy">Read piece <span class="ml-2 transition-transform group-hover:translate-x-1">→</span></span>' +
    '</div></a>';
}
