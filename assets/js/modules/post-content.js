// modules/post-content.js - Contentful post loading logic for post page

import { getEntryById } from '../services/contentful.js';
import { getLatestSermonEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText, generateSrcset } from '../utils/images.js';
import { renderRichText } from '../utils/richTextRenderer.js';

export function initPostFeatures() {
  loadPost();
  initReadingProgress();
  initNotes();
}

async function loadPost() {
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const postContent = document.getElementById('postContent');
  const postTitle = document.getElementById('postTitle');
  const postPastor = document.getElementById('postPastor');
  const postDate = document.getElementById('postDate');
  const postExcerpt = document.getElementById('postExcerpt');
  const postImageContainer = document.getElementById('postImageContainer');
  const postBody = document.getElementById('postBody');
  const heroImage = document.getElementById('heroImage');

  if (!loadingState || !errorState || !postContent) return;

  // Get entry ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const entryId = urlParams.get('entry');

  if (!entryId) {
    showError();
    return;
  }

  try {
    const entry = await getEntryById(entryId);

    if (!entry || !entry.fields) {
      showError();
      return;
    }

    // Render post content
    if (postTitle) {
      postTitle.textContent = entry.fields.title || 'Untitled Post';
    }

    if (postPastor) {
      const pastor = entry.fields.pastor || entry.fields.pastorName || entry.fields.preacher || '';
      if (pastor) {
        postPastor.textContent = pastor;
      } else {
        postPastor.parentElement.style.display = 'none';
      }
    }

    if (postDate && entry.fields.date) {
      postDate.textContent = formatDateSafe(entry.fields.date);
    }

    // Optional excerpt
    if (postExcerpt) {
      const summaryRaw = entry.fields.summary || entry.fields.body || entry.fields.content || '';
      const summary = summaryRaw ? stripRichTextToPlain(summaryRaw).slice(0, 200) + '...' : '';
      if (summary) {
        postExcerpt.textContent = summary;
      } else {
        postExcerpt.style.display = 'none';
      }
    }

    // Display featured image if available (in hero)
    if (postImageContainer) {
      const imageUrl = getImageUrl(entry, {}, 'image') || getImageUrl(entry, {}, 'featuredImage');
      if (imageUrl) {
        if (heroImage) {
          heroImage.src = imageUrl;
          heroImage.alt = getImageAltText(entry, 'image') || getImageAltText(entry, 'featuredImage') || entry.fields.title;
        }
        postImageContainer.classList.remove('hidden');
      } else {
        postImageContainer.classList.add('hidden');
      }
    }

    // Display YouTube video if available
    const youtubeContainer = document.getElementById('youtubeVideoContainer');
    if (youtubeContainer) {
      // Check multiple possible field names for YouTube URL/ID
      let videoId = entry.fields.youTubeVideo ||  // Capital T
                     entry.fields.youtubeVideoId || 
                     entry.fields.youtubeUrl || 
                     entry.fields.youtube || 
                     entry.fields.videoUrl || 
                     entry.fields.video || 
                     entry.fields.videoId || 
                     entry.fields.youtubeVideo || 
                     '';
      
      // Extract video ID from YouTube URL if full URL is provided
      if (videoId && typeof videoId === 'string') {
        if (videoId.includes('youtube.com/watch?v=')) {
          videoId = videoId.split('v=')[1]?.split('&')[0];
        } else if (videoId.includes('youtu.be/')) {
          videoId = videoId.split('youtu.be/')[1]?.split('?')[0];
        }
      }
      
      if (videoId) {
        youtubeContainer.innerHTML = `
          <div class="youtube-video-container">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}" 
              title="${entry.fields.title || 'Sermon Video'}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        `;
        youtubeContainer.classList.remove('hidden');
      } else {
        youtubeContainer.classList.add('hidden');
      }
    }

    if (postBody) {
      const bodyField = entry.fields.content || entry.fields.body || entry.fields.summary || '';
      
      // If the body field is an object (rich text), convert it to HTML
      if (bodyField && typeof bodyField === 'object' && bodyField.nodeType) {
        // Rich text object - render as HTML
        const bodyHtml = renderRichText(bodyField);
        postBody.innerHTML = bodyHtml || 'No content available.';
      } else if (typeof bodyField === 'string') {
        // Plain text - preserve line breaks and basic formatting
        postBody.innerHTML = `<p>${bodyField.replace(/\n\n/g, '</p><p>')}</p>`;
      } else {
        postBody.innerHTML = 'No content available.';
      }
    }

    // Show post content
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    postContent.classList.remove('hidden');

    // Load recommended posts
    loadRecommendedPosts(entryId);

    // Initialize sidebar progress
    initSidebarProgress();

    // Trigger animations
    requestAnimationFrame(() => {
      document.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.add('visible');
      });
    });

  } catch (error) {
    console.error('Failed to load post:', error);
    showError();
  }
}

function initSidebarProgress() {
  const progressBar = document.getElementById('sidebarProgress');
  const progressText = document.getElementById('sidebarProgressText');
  if (!progressBar || !progressText) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    progressText.textContent = Math.round(scrolled) + '% complete';
  });
}

function showError() {
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  const postContent = document.getElementById('postContent');

  if (loadingState) loadingState.classList.add('hidden');
  if (postContent) postContent.classList.add('hidden');
  if (errorState) errorState.classList.remove('hidden');
}

async function loadRecommendedPosts(currentEntryId) {
  const recommendedGrid = document.getElementById('recommendedPostsGrid');
  if (!recommendedGrid) return;

  try {
    const contentfulData = await getLatestSermonEntries();
    if (!contentfulData || !contentfulData.items || !contentfulData.items.length) return;

    const cfg = window.FLC_CONTENTFUL || {};
    const postPagePath = cfg.postPagePath || "pages/post.html";

    // Filter out current post and limit to 3 recommendations
    const recommended = contentfulData.items
      .filter(item => item.sys.id !== currentEntryId)
      .slice(0, 3);

    if (!recommended.length) {
      recommendedGrid.innerHTML = '<p class="text-flcCharcoal/60 col-span-full text-center">No recommended posts available.</p>';
      return;
    }

    recommendedGrid.innerHTML = recommended.map(item => {
      const title = (item.fields.title || 'Untitled').trim();
      const summaryRaw = item.fields.body || item.fields.content || item.fields.summary || '';
      const summary = summaryRaw ? stripRichTextToPlain(summaryRaw).slice(0, 120) + '...' : 'No description.';
      const imageUrl = getImageUrl(item, contentfulData.includes, 'image') || getImageUrl(item, contentfulData.includes, 'featuredImage');
      const href = `${postPagePath}?entry=${encodeURIComponent(item.sys.id)}`;

      return `
        <a href="${href}" class="group bg-white/90 backdrop-blur-md rounded-[18px] border border-flcBorder/40 p-6 shadow-[0_8px_32px_rgba(26,58,82,0.08)] hover:shadow-[0_16px_64px_rgba(26,58,82,0.16)] hover:border-flcGold/30 transition-all duration-500 transform hover:-translate-y-2">
          ${imageUrl ? `
            <div class="aspect-video mb-5 bg-flcCream/60 rounded-xl overflow-hidden">
              <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
            </div>
          ` : ''}
          <h3 class="font-heading text-lg font-bold text-flcNavy mb-3 group-hover:text-flcGold transition-colors duration-300 tracking-tight">${title}</h3>
          <p class="text-sm text-flcCharcoal/70 mb-5 line-clamp-2 leading-relaxed">${summary}</p>
          <div class="flex items-center text-flcGold text-sm font-semibold tracking-wide">
            Read more
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </a>
      `;
    }).join('');
  } catch (error) {
    console.error('Failed to load recommended posts:', error);
  }
}

function initReadingProgress() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

function initNotes() {
  const textareas = document.querySelectorAll('.note-textarea');
  if (!textareas.length) return;

  // Get entry ID for note storage
  const urlParams = new URLSearchParams(window.location.search);
  const entryId = urlParams.get('entry') || 'default';

  // Load saved notes
  textareas.forEach(textarea => {
    const noteId = textarea.getAttribute('data-note');
    const savedNote = localStorage.getItem(`post-${entryId}-${noteId}`);
    if (savedNote) {
      textarea.value = savedNote;
    }
  });

  // Save notes on input
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      const noteId = this.getAttribute('data-note');
      localStorage.setItem(`post-${entryId}-${noteId}`, this.value);
    });
  });
}
