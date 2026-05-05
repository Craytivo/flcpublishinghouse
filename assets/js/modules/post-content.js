// modules/post-content.js - Contentful post loading logic for post page

import { getEntryById } from '../services/contentful.js';
import { getLatestSermonEntries } from '../services/contentful.js';
import { formatDateSafe } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { getImageUrl, getImageAltText, generateSrcset } from '../utils/images.js';
import { renderRichText } from '../utils/richTextRenderer.js';
import { initHeroEnhancements } from './hero-enhancement.js';

export function initPostFeatures() {
  loadPost();
  initNotes();
  initMobileSidebar();
}

// Mobile sidebar toggle functionality
function initMobileSidebar() {
  const toggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.getElementById('mobileSidebar');
  const overlay = document.getElementById('mobileSidebarOverlay');
  const content = document.getElementById('mobileSidebarContent');
  
  if (!toggle || !sidebar || !overlay || !content) return;
  
  toggle.addEventListener('click', () => {
    sidebar.classList.remove('hidden');
    setTimeout(() => {
      content.classList.remove('translate-y-full');
    }, 10);
  });
  
  overlay.addEventListener('click', () => {
    content.classList.add('translate-y-full');
    setTimeout(() => {
      sidebar.classList.add('hidden');
    }, 300);
  });
}

// Calculate reading time based on word count
function calculateReadingTime(text) {
  if (!text) return '--';
  
  // Strip HTML tags to get plain text
  const plainText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = plainText.split(' ').length;
  
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min`;
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

    // Display subtitle if available
    const postSubtitle = document.getElementById('postSubtitle');
    if (postSubtitle && entry.fields.subtitle) {
      postSubtitle.textContent = entry.fields.subtitle;
      postSubtitle.classList.remove('hidden');
    }

    // Display speaker if available (for any content type)
    const postSpeaker = document.getElementById('postSpeaker');
    if (postSpeaker && entry.fields.speaker) {
      postSpeaker.textContent = entry.fields.speaker;
      postSpeaker.classList.remove('hidden');
    }
    
    // Display start/end dates if available (for devotional guides, events, etc.)
    const postStartDate = document.getElementById('postStartDate');
    const postEndDate = document.getElementById('postEndDate');
    
    let hasDateRange = false;
    if (postStartDate && entry.fields.startDate) {
      postStartDate.textContent = 'Start: ' + formatDateSafe(entry.fields.startDate);
      postStartDate.classList.remove('hidden');
      hasDateRange = true;
    }
    
    if (postEndDate && entry.fields.endDate) {
      postEndDate.textContent = 'End: ' + formatDateSafe(entry.fields.endDate);
      postEndDate.classList.remove('hidden');
      hasDateRange = true;
    }

    // Determine content type to set appropriate CTA
    // Don't use 'speaker' in isSermon - devotional guides also have speakers
    const isDevotionalGuide = entry.fields.startDate || entry.fields.endDate || entry.fields.devotionalGuide;
    const isSermon = !isDevotionalGuide && (entry.fields.pastor || entry.fields.pastorName || entry.fields.preacher || entry.fields.sermon);

    // Display pastor/preacher for sermons only (not devotional guides)
    if (postPastor) {
      if (isSermon) {
        const pastor = entry.fields.pastor || entry.fields.pastorName || entry.fields.preacher || '';
        if (pastor) {
          postPastor.textContent = pastor;
        } else {
          postPastor.style.display = 'none';
          const sep = document.getElementById('metaSeparator');
          if (sep) sep.style.display = 'none';
        }
      } else {
        postPastor.style.display = 'none';
        const sep = document.getElementById('metaSeparator');
        if (sep) sep.style.display = 'none';
      }
    }

    // Display date if available and not a date-range content
    if (postDate && entry.fields.date && !hasDateRange) {
      postDate.textContent = formatDateSafe(entry.fields.date);
    } else if (postDate) {
      postDate.style.display = 'none';
    }
    
    // Update CTA based on content type
    const ctaTitle = document.getElementById('ctaTitle');
    const ctaLink = document.getElementById('ctaLink');
    const ctaText = document.getElementById('ctaText');
    
    if (isDevotionalGuide) {
      if (ctaTitle) ctaTitle.textContent = 'More Devotionals';
      if (ctaLink) ctaLink.href = '../pages/devotionals.html';
      if (ctaText) ctaText.textContent = 'Back to All Devotionals';
    } else {
      // Default to sermons
      if (ctaTitle) ctaTitle.textContent = 'More Sermons';
      if (ctaLink) ctaLink.href = '../pages/sermons.html';
      if (ctaText) ctaText.textContent = 'Back to All Sermons';
    }

    // Optional excerpt - use description field if available, otherwise fall back to summary/body/content
    if (postExcerpt) {
      let summary = '';
      
      // Try description field first (note: Contentful has typo "descrition")
      if (entry.fields.descrition) {
        const descriptionRaw = entry.fields.descrition;
        const descPlain = descriptionRaw ? stripRichTextToPlain(descriptionRaw).trim() : '';
        summary = descPlain.length > 0 ? descPlain.slice(0, 200) + (descPlain.length > 200 ? '...' : '') : '';
      } else {
        // Fall back to summary/body/content, but strip headings
        const summaryRaw = entry.fields.summary || entry.fields.body || entry.fields.content || '';
        if (summaryRaw) {
          let plainText = stripRichTextToPlain(summaryRaw);
          // Strip headings (lines that are all caps or start with common heading patterns)
          plainText = plainText.split('\n')
            .filter(line => {
              const trimmed = line.trim();
              // Filter out lines that are all caps, very short, or common heading patterns
              return trimmed.length > 10 && 
                     trimmed !== trimmed.toUpperCase() &&
                     !trimmed.match(/^(scripture|passage|reference|text|verse|reading)$/i);
            })
            .join(' ')
            .trim();
          summary = plainText.length > 0 ? plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '') : '';
        }
      }
      
      if (summary) {
        postExcerpt.textContent = summary;
      } else {
        postExcerpt.style.display = 'none';
      }
    }

    // Display featured image if available (in hero)
    if (postImageContainer) {
      const imageUrl = getImageUrl(entry, entry._includes || {}, 'image') || getImageUrl(entry, entry._includes || {}, 'featuredImage');
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
          <div class="youtube-video-container relative rounded-[20px] overflow-hidden shadow-[0_32px_96px_rgba(26,58,82,0.12)]">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}" 
              title="${entry.fields.title || 'Sermon Video'}"
              class="w-full aspect-video"
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
        
        // Calculate and display reading time
        const readingTimeElement = document.getElementById('readingTime');
        if (readingTimeElement) {
          readingTimeElement.textContent = calculateReadingTime(bodyHtml);
        }
        
        // Calculate and display word count
        const wordCountElement = document.getElementById('wordCount');
        if (wordCountElement) {
          const plainText = bodyHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          const wordCount = plainText.split(' ').length;
          wordCountElement.textContent = wordCount.toLocaleString() + ' words';
        }
        
        // Sync mobile sidebar values
        const mobileReadingTimeElement = document.getElementById('mobileReadingTime');
        if (mobileReadingTimeElement) {
          mobileReadingTimeElement.textContent = calculateReadingTime(bodyHtml);
        }
        
        const mobileWordCountElement = document.getElementById('mobileWordCount');
        if (mobileWordCountElement) {
          const plainText = bodyHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          const wordCount = plainText.split(' ').length;
          mobileWordCountElement.textContent = wordCount.toLocaleString() + ' words';
        }
      } else if (typeof bodyField === 'string') {
        // Plain text - parse as markdown if marked is available
        if (typeof marked !== 'undefined') {
          postBody.innerHTML = marked.parse(bodyField);
        } else {
          // Fallback to basic paragraph formatting
          postBody.innerHTML = `<p>${bodyField.replace(/\n\n/g, '</p><p>')}</p>`;
        }
        
        // Calculate and display reading time
        const readingTimeElement = document.getElementById('readingTime');
        if (readingTimeElement) {
          readingTimeElement.textContent = calculateReadingTime(bodyField);
        }
        
        // Calculate and display word count
        const wordCountElement = document.getElementById('wordCount');
        if (wordCountElement) {
          const plainText = bodyField.replace(/\s+/g, ' ').trim();
          const wordCount = plainText.split(' ').length;
          wordCountElement.textContent = wordCount.toLocaleString() + ' words';
        }
        
        // Sync mobile sidebar values
        const mobileReadingTimeElement = document.getElementById('mobileReadingTime');
        if (mobileReadingTimeElement) {
          mobileReadingTimeElement.textContent = calculateReadingTime(bodyField);
        }
        
        const mobileWordCountElement = document.getElementById('mobileWordCount');
        if (mobileWordCountElement) {
          const plainText = bodyField.replace(/\s+/g, ' ').trim();
          const wordCount = plainText.split(' ').length;
          mobileWordCountElement.textContent = wordCount.toLocaleString() + ' words';
        }
      } else {
        postBody.innerHTML = 'No content available.';
      }
    }

    // Show post content
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    postContent.classList.remove('hidden');

    // Wire up share buttons
    const shareUrl = window.location.href;
    const shareTitle = entry.fields.title || document.title;

    const shareNative = document.getElementById('shareNative');
    if (shareNative) {
      shareNative.addEventListener('click', async () => {
        if (navigator.share) {
          await navigator.share({ title: shareTitle, url: shareUrl });
        } else {
          await navigator.clipboard.writeText(shareUrl);
          shareNative.title = 'Link copied!';
          setTimeout(() => { shareNative.title = 'Share'; }, 2000);
        }
      });
    }

    const shareTwitter = document.getElementById('shareTwitter');
    if (shareTwitter) {
      shareTwitter.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
      });
    }

    const shareEmail = document.getElementById('shareEmail');
    if (shareEmail) {
      shareEmail.addEventListener('click', () => {
        const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`;
        window.location.href = emailUrl;
      });
    }

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

    // Initialize hero enhancements
    initHeroEnhancements();

  } catch (error) {
    console.error('Failed to load post:', error);
    showError();
  }
}

function initSidebarProgress() {
  const progressBar = document.getElementById('sidebarProgress');
  const progressText = document.getElementById('sidebarProgressText');
  const mobileProgressBar = document.getElementById('mobileSidebarProgress');
  const mobileProgressText = document.getElementById('mobileSidebarProgressText');
  
  if (!progressBar || !progressText) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    progressBar.style.width = scrolled + '%';
    progressText.textContent = Math.round(scrolled) + '% complete';
    
    // Sync mobile sidebar
    if (mobileProgressBar) {
      mobileProgressBar.style.width = scrolled + '%';
    }
    if (mobileProgressText) {
      mobileProgressText.textContent = Math.round(scrolled) + '% complete';
    }
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
  const sidebarRecommended = document.getElementById('sidebarRecommendedPosts');
  if (!sidebarRecommended) return;

  try {
    const contentfulData = await getLatestSermonEntries();
    if (!contentfulData || !contentfulData.items || !contentfulData.items.length) return;

    const cfg = window.FLC_CONTENTFUL || {};
    const postPagePath = cfg.postPagePath || "pages/post.html";

    // Filter out current post and limit to 2 recommendations
    const recommended = contentfulData.items
      .filter(item => item.sys.id !== currentEntryId)
      .slice(0, 2);

    if (!recommended.length) {
      sidebarRecommended.innerHTML = '<p class="text-flcCharcoal/60 text-xs">No recommendations available.</p>';
      return;
    }

    sidebarRecommended.innerHTML = recommended.map(item => {
      const title = (item.fields.title || 'Untitled').trim();
      const summaryRaw = item.fields.body || item.fields.content || item.fields.summary || '';
      const summary = summaryRaw ? stripRichTextToPlain(summaryRaw).slice(0, 60) + '...' : '';
      const imageUrl = getImageUrl(item, contentfulData.includes, 'image') || getImageUrl(item, contentfulData.includes, 'featuredImage');
      const href = `${postPagePath}?entry=${encodeURIComponent(item.sys.id)}`;

      const postHtml = `
        <a href="${href}" class="block group">
          <div class="flex items-start gap-3">
            ${imageUrl ? `
              <div class="w-16 h-16 flex-shrink-0 bg-flcCream/60 rounded-lg overflow-hidden">
                <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300" loading="lazy" />
              </div>
            ` : ''}
            <div class="flex-1 min-w-0">
              <h4 class="font-heading text-sm font-bold text-flcNavy mb-1 group-hover:text-flcGold transition-colors duration-300 tracking-tight line-clamp-2">${title}</h4>
              <p class="text-xs text-flcCharcoal/60 line-clamp-1">${summary}</p>
            </div>
          </div>
        </a>
      `;
      
      return postHtml;
    }).join('');
    
    // Sync to mobile sidebar
    const mobileSidebarRecommended = document.getElementById('mobileSidebarRecommendedPosts');
    if (mobileSidebarRecommended) {
      mobileSidebarRecommended.innerHTML = sidebarRecommended.innerHTML;
    }
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
