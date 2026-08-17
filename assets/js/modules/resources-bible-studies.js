// modules/resources-bible-studies.js - Bible Study loading logic for resources page

import { getBibleStudyEntries } from '../services/contentful.js';
import { stripRichTextToPlain } from '../utils/richText.js';
import { slugify } from '../utils/slugify.js';

function textFrom(value) {
  if (!value) return '';
  return typeof value === 'string' ? value : stripRichTextToPlain(value);
}

function getSummary(fields) {
  const raw = fields.descrition || fields.description || fields.summary || fields.body || fields.content || fields.studyContent || fields.lesson || '';
  const text = textFrom(raw).replace(/\s+/g, ' ').trim();
  if (!text) return 'Bible study notes and downloadable handout.';
  return text.length > 120 ? `${text.slice(0, 120)}...` : text;
}

function getDateValue(fields, entry) {
  return fields.date || fields.startDate || fields.publishDate || fields.publishedDate || entry?.sys?.updatedAt || '';
}

export async function initResourcesBibleStudies() {
  const bibleStudyCard = document.getElementById('bibleStudyCard');
  const bibleStudyTitle = document.getElementById('bibleStudyTitle');
  const bibleStudyDescription = document.getElementById('bibleStudyDescription');
  const bibleStudyCta = document.getElementById('bibleStudyCta');
  const bibleStudyCountLabel = document.getElementById('bibleStudyCountLabel');

  try {
    const cfg = window.FLC_CONTENTFUL || {};
    const { items } = await getBibleStudyEntries();
    const studies = (items || [])
      .filter((item) => item && item.fields && item.sys)
      .map((item) => {
        const fields = item.fields || {};
        const title = typeof fields.title === 'string' && fields.title.trim()
          ? fields.title.trim()
          : 'Untitled Bible Study';
        const titleSlug = slugify(title);
        return {
          id: item.sys.id,
          title,
          summary: getSummary(fields),
          date: getDateValue(fields, item),
          url: `${cfg.postPagePath || '/pages/post.html'}?title=${encodeURIComponent(titleSlug)}`
        };
      })
      .filter((study) => study.title && study.url);

    if (!studies.length) return;

    const newest = studies[0];
    if (bibleStudyCard) {
      bibleStudyCard.href = newest.url;
      if (newest.date) bibleStudyCard.dataset.date = newest.date;
    }
    if (bibleStudyTitle) bibleStudyTitle.textContent = newest.title;
    if (bibleStudyDescription) bibleStudyDescription.textContent = newest.summary;
    if (bibleStudyCta) bibleStudyCta.textContent = studies.length === 1 ? 'View Study' : 'View Latest Study';
    if (bibleStudyCountLabel) {
      bibleStudyCountLabel.textContent = 'Bible Study';
      bibleStudyCountLabel.dataset.count = String(studies.length);
    }
  } catch (error) {
    console.error('Failed to load Bible studies:', error);
  }
}
