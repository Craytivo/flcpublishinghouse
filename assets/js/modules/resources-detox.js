// modules/resources-detox.js - Detox loading logic for resources page

import { getDetoxEntries } from '../services/contentful.js';
import { formatDateSafe, removeSkeleton } from '../utils/format.js';
import { stripRichTextToPlain } from '../utils/richText.js';

function parseWeekNumber(fields) {
  if (!fields || typeof fields !== 'object') return NaN;
  const raw = fields.weekNumber ?? fields.week_number ?? fields.week ?? '';
  const value = Number(raw);
  return Number.isFinite(value) ? value : NaN;
}

function collectBooksFromFields(fields) {
  if (!fields || typeof fields !== 'object') return [];
  const out = [];
  const pushBook = (book) => {
    if (!book || !book.title) return;
    out.push({
      title: String(book.title || '').trim(),
      author: String(book.author || '').trim(),
      amazonUrl: book.amazonUrl || ''
    });
  };

  pushBook({
    title: fields.bookTitle || fields.book || fields.featuredBookTitle || '',
    author: fields.bookAuthor || fields.author || fields.featuredBookAuthor || '',
    amazonUrl: fields.amazonLink || fields.amazonUrl || fields.bookAmazonLink || fields.bookLink || ''
  });

  const list = fields.books || fields.recommendedBooks || fields.bookList || [];
  if (Array.isArray(list)) {
    list.forEach((item) => {
      if (typeof item === 'string') {
        const parts = item.split('|').map((p) => p.trim()).filter(Boolean);
        if (parts.length) {
          pushBook({
            title: parts[0] || '',
            author: parts[1] || '',
            amazonUrl: parts[2] || ''
          });
        }
      } else if (item && typeof item === 'object') {
        pushBook({
          title: item.title || item.bookTitle || '',
          author: item.author || item.bookAuthor || '',
          amazonUrl: item.amazonLink || item.amazonUrl || item.link || ''
        });
      }
    });
  }

  const unique = [];
  const seen = new Set();
  out.forEach((book) => {
    const key = `${book.title.toLowerCase()}|${book.author.toLowerCase()}`;
    if (!book.title || seen.has(key)) return;
    seen.add(key);
    unique.push(book);
  });
  return unique;
}

function isLikelyAmazonUrl(url) {
  return String(url || '').toLowerCase().includes('amazon.');
}

function buildAmazonSearchUrl(title, author) {
  const query = [String(title || '').trim(), String(author || '').trim(), 'book']
    .filter(Boolean)
    .join(' ');
  return query ? `https://www.amazon.com/s?k=${encodeURIComponent(query)}` : '';
}

export async function initResourcesDetox() {
  const detoxCountLabel = document.getElementById('detoxCountLabel');
  const detoxLinks = document.getElementById('detoxLinks');
  const detoxCard = document.getElementById('detox');
  const booksPanel = document.getElementById('booksPanel');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const { items, includes } = await getDetoxEntries();
    
    if (!items.length) return;

    const weeks = items
      .map((item) => ({
        id: item.sys.id,
        weekNumber: parseWeekNumber(item.fields),
        title: typeof item.fields.title === 'string' ? item.fields.title.trim() : 'Untitled',
        url: `${cfg.postPagePath || '../pages/post.html'}?entry=${encodeURIComponent(item.sys.id)}`,
        fields: item.fields
      }))
      .sort((a, b) => {
        const aw = Number.isFinite(a.weekNumber) ? a.weekNumber : 999;
        const bw = Number.isFinite(b.weekNumber) ? b.weekNumber : 999;
        return aw - bw;
      });

    if (weeks.length) {
      if (detoxCountLabel) {
        detoxCountLabel.textContent = `${weeks.length} ${weeks.length === 1 ? 'week' : 'weeks'}`;
      }

      if (detoxLinks) {
        const overview = `<a href="../pages/spiritual-detox.html" class="download-btn">Series Overview</a>`;
        const weekLinks = weeks.map((week, idx) => {
          const labelWeek = Number.isFinite(week.weekNumber) ? week.weekNumber : (idx + 1);
          return `<a href="${week.url}" class="download-btn">Week ${labelWeek}</a>`;
        }).join('');
        detoxLinks.innerHTML = `${overview}${weekLinks}`;
      }

      if (detoxCard && weeks[0] && weeks[0].url) {
        detoxCard.setAttribute('data-link', weeks[0].url);
      }
    }

    const books = [];
    weeks.forEach((week) => {
      const sourceWeek = Number.isFinite(week.weekNumber) ? `Spiritual Detox Week ${week.weekNumber}` : 'Spiritual Detox';
      collectBooksFromFields(week.fields).forEach((book) => {
        books.push({
          ...book,
          sourceTitle: sourceWeek,
          sourceUrl: week.url
        });
      });
    });

    if (books.length && booksPanel) {
      booksPanel.innerHTML = books.map((book) => {
        const amazonUrl = isLikelyAmazonUrl(book.amazonUrl)
          ? book.amazonUrl
          : buildAmazonSearchUrl(book.title, book.author);
        const title = book.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const author = (book.author || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const sourceTitle = (book.sourceTitle || 'Spiritual Detox').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const sourceUrl = book.sourceUrl || '../pages/spiritual-detox.html';
        const rowMeta = author
          ? `${author} &middot; From <a href="${sourceUrl}" class="book-source">${sourceTitle}</a>`
          : `From <a href="${sourceUrl}" class="book-source">${sourceTitle}</a>`;
        return `
          <div class="book-row">
            <div>
              <h3 class="text-base font-semibold text-flcNavy">${title}</h3>
              <p class="text-sm text-flcCharcoal/60">${rowMeta}</p>
            </div>
            <div class="flex flex-wrap gap-4">
              <a href="${amazonUrl}" target="_blank" rel="noopener" class="book-link">Amazon</a>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error('Failed to load detox resources:', error);
  }
}
