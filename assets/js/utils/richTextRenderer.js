// utils/richTextRenderer.js - Editorial Contentful Rich Text renderer

export function renderRichText(richText, includes = {}) {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (richText.nodeType === 'document') return renderRichTextNodes(richText.content || [], includes);
  return renderRichTextNode(richText, includes);
}

function renderRichTextNodes(nodes, includes) {
  if (!Array.isArray(nodes)) return '';
  return nodes.map(node => renderRichTextNode(node, includes)).join('');
}

function renderRichTextNode(node, includes) {
  if (!node || !node.nodeType) return '';
  const content = node.content ? renderRichTextNodes(node.content, includes) : '';

  switch (node.nodeType) {
    case 'document': return content;
    case 'paragraph': return `<p>${content}</p>`;
    // Keep H1 as H2 inside an article because the page already has one H1 title.
    case 'heading-1': return `<h2 class="rich-heading rich-heading-1">${content}</h2>`;
    case 'heading-2': return `<h2 class="rich-heading rich-heading-2">${content}</h2>`;
    case 'heading-3': return `<h3 class="rich-heading rich-heading-3">${content}</h3>`;
    case 'heading-4': return `<h4 class="rich-heading rich-heading-4">${content}</h4>`;
    case 'heading-5': return `<h5 class="rich-heading rich-heading-5">${content}</h5>`;
    case 'heading-6': return `<h6 class="rich-heading rich-heading-6">${content}</h6>`;
    case 'text': return renderTextNode(node);
    case 'blockquote':
    case 'quote': return renderQuote(node, includes);
    case 'unordered-list': return `<ul>${content}</ul>`;
    case 'ordered-list': return `<ol>${content}</ol>`;
    case 'list-item': return `<li>${content}</li>`;
    case 'hyperlink': return renderExternalLink(node, content);
    case 'entry-hyperlink': return renderEntryLink(node, content, includes);
    case 'asset-hyperlink': return renderAssetLink(node, content, includes);
    case 'resource-hyperlink': return renderEntryLink(node, content, includes);
    case 'embedded-asset-block':
    case 'embedded-resource-block': return renderEmbeddedAsset(node, includes);
    case 'embedded-entry-block': return renderEmbeddedEntry(node, includes);
    case 'embedded-entry-inline':
    case 'embedded-resource-inline': return renderInlineEntry(node, includes, content);
    case 'hr': return '<hr>';
    case 'table': return `<div class="rich-table-wrap"><table>${content}</table></div>`;
    case 'table-row': return `<tr>${content}</tr>`;
    case 'table-header-cell': return `<th scope="col">${content}</th>`;
    case 'table-cell': return `<td>${content}</td>`;
    default: return content;
  }
}

function renderTextNode(node) {
  let value = escapeHtml(node.value || '');
  for (const mark of node.marks || []) {
    switch (mark?.type) {
      case 'bold': value = `<strong>${value}</strong>`; break;
      case 'italic': value = `<em>${value}</em>`; break;
      case 'underline': value = `<u>${value}</u>`; break;
      case 'code': value = `<code>${value}</code>`; break;
      case 'superscript': value = `<sup>${value}</sup>`; break;
      case 'subscript': value = `<sub>${value}</sub>`; break;
      default: break;
    }
  }
  return value;
}

function renderQuote(node, includes) {
  const inner = renderRichTextNodes(node.content || [], includes);
  const plain = stripMarkup(inner).trim();
  const data = node.data || {};
  const citation = data.citation || data.source || data.attribution || data.author || '';
  const scripture = data.type === 'scripture' || data.variant === 'scripture' || looksLikeScriptureReference(plain);
  const classes = scripture ? 'rich-quote rich-scripture' : 'rich-quote';
  const label = scripture ? 'Scripture' : 'Reflection';

  return `<figure class="${classes}">
    <div class="rich-quote-label">${label}</div>
    <blockquote>${inner}</blockquote>
    ${citation ? `<figcaption>— ${escapeHtml(String(citation))}</figcaption>` : ''}
  </figure>`;
}

function renderExternalLink(node, content) {
  const href = safeHref(node.data?.uri);
  if (!href) return content;
  const external = /^https?:\/\//i.test(href);
  return `<a href="${escapeAttribute(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content}</a>`;
}

function renderEntryLink(node, content, includes) {
  const target = resolveReference(node, includes, 'Entry');
  const slug = target?.fields?.slug;
  if (!slug) return content;
  const href = `../pages/post.html?title=${encodeURIComponent(slug)}`;
  return `<a href="${escapeAttribute(href)}">${content}</a>`;
}

function renderAssetLink(node, content, includes) {
  const asset = resolveReference(node, includes, 'Asset');
  const url = assetUrl(asset);
  if (!url) return content;
  return `<a href="${escapeAttribute(withHttps(url))}" target="_blank" rel="noopener noreferrer">${content}</a>`;
}

function renderEmbeddedAsset(node, includes) {
  const asset = resolveReference(node, includes, 'Asset');
  const url = assetUrl(asset);
  if (!url) return '<div class="rich-embed-missing" role="note">Embedded image unavailable.</div>';

  const fields = asset.fields || {};
  const file = fields.file || {};
  const details = file.details?.image || {};
  const alt = fields.description || fields.title || 'Embedded image';
  const caption = fields.description || fields.title || '';
  const width = Number(details.width) || null;
  const height = Number(details.height) || null;

  return `<figure class="rich-embed-image">
    <img src="${escapeAttribute(withHttps(url))}" alt="${escapeAttribute(alt)}"
      ${width ? `width="${width}"` : ''} ${height ? `height="${height}"` : ''}
      loading="lazy" decoding="async">
    ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
  </figure>`;
}

function renderEmbeddedEntry(node, includes) {
  const entry = resolveReference(node, includes, 'Entry');
  if (!entry) return '<div class="rich-embed-missing" role="note">Embedded content unavailable.</div>';

  const fields = entry.fields || {};
  const title = fields.title || fields.name || '';
  const description = fields.subtitle || fields.description || fields.summary || '';
  const slug = fields.slug;
  if (!title && !description) return '';

  const body = `
    ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
    ${description ? `<p>${escapeHtml(plainField(description))}</p>` : ''}
  `;
  if (!slug) return `<aside class="rich-embedded-entry">${body}</aside>`;

  const href = `../pages/post.html?title=${encodeURIComponent(slug)}`;
  return `<aside class="rich-embedded-entry"><a href="${escapeAttribute(href)}">${body}<span class="rich-embedded-entry-link">Read piece →</span></a></aside>`;
}

function renderInlineEntry(node, includes, content) {
  const entry = resolveReference(node, includes, 'Entry');
  const title = entry?.fields?.title || entry?.fields?.name;
  if (!title) return content;
  const slug = entry.fields?.slug;
  if (!slug) return escapeHtml(title);
  const href = `../pages/post.html?title=${encodeURIComponent(slug)}`;
  return `<a class="rich-inline-entry" href="${escapeAttribute(href)}" title="${escapeAttribute(title)}">${content || escapeHtml(title)}</a>`;
}

function resolveReference(node, includes, expectedType) {
  const target = node?.data?.target;
  if (!target) return null;
  if (target.fields) return target;
  const id = target.sys?.id;
  if (!id) return null;
  const collection = includes?.[expectedType];
  return Array.isArray(collection) ? collection.find(item => item?.sys?.id === id) || null : null;
}

function assetUrl(asset) {
  return asset?.fields?.file?.url || asset?.fields?.url || '';
}

function withHttps(url) {
  return url?.startsWith('//') ? `https:${url}` : (url || '');
}

function safeHref(value) {
  if (!value || typeof value !== 'string') return '';
  const href = value.trim();
  if (/^(javascript|vbscript|data):/i.test(href)) return '';
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (/^(\/|\.|#|\?)/.test(href)) return href;
  return '';
}

function plainField(value) {
  if (typeof value === 'string') return value;
  if (value?.nodeType === 'document') return stripMarkup(renderRichText(value));
  return '';
}

function stripMarkup(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return (temp.textContent || '').replace(/\s+/g, ' ');
}

function looksLikeScriptureReference(text) {
  return /(?:[1-3]\s*)?(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1\s*Samuel|2\s*Samuel|1\s*Kings|2\s*Kings|1\s*Chronicles|2\s*Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1\s*Corinthians|2\s*Corinthians|Galatians|Ephesians|Philippians|Colossians|1\s*Thessalonians|2\s*Thessalonians|1\s*Timothy|2\s*Timothy|Titus|Philemon|Hebrews|James|1\s*Peter|2\s*Peter|1\s*John|2\s*John|3\s*John|Jude|Revelation)\s+\d{1,3}(?::\d{1,3}(?:[-–—]\d{1,3})?(?:,\s*\d{1,3}(?:[-–—]\d{1,3})?)*)?\s*$/i.test(text);
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
