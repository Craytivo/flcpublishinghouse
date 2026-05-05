// utils/richTextRenderer.js - Simple Contentful rich text to HTML renderer

/**
 * Render Contentful rich text to HTML
 * @param {Object} richText - Contentful rich text object
 * @returns {string} HTML string
 */
export function renderRichText(richText) {
  if (!richText) return '';
  
  // If it's already a string, return it
  if (typeof richText === 'string') {
    return richText;
  }
  
  // If it's a rich text object with nodeType
  if (richText.nodeType === 'document') {
    return richText.content ? renderRichTextNodes(richText.content) : '';
  }
  
  // Handle other node types
  return renderRichTextNode(richText);
}

function renderRichTextNodes(nodes) {
  if (!Array.isArray(nodes)) return '';
  
  return nodes.map(node => renderRichTextNode(node)).join('');
}

function renderRichTextNode(node) {
  if (!node || !node.nodeType) return '';
  
  switch (node.nodeType) {
    case 'paragraph':
      const content = node.content ? renderRichTextNodes(node.content) : '';
      return `<p class="mb-7 leading-[1.8]">${content}</p>`;
    
    case 'heading-1':
      return `<h1 class="font-heading text-2xl font-bold text-flcNavy mb-6 mt-10 tracking-tight leading-[1.2]">${node.content ? renderRichTextNodes(node.content) : ''}</h1>`;
    
    case 'heading-2':
      return `<h2 class="font-heading text-xl font-bold text-flcNavy mb-5 mt-10 tracking-tight leading-[1.25]">${node.content ? renderRichTextNodes(node.content) : ''}</h2>`;
    
    case 'heading-3':
      return `<h3 class="font-heading text-lg font-bold text-flcNavy mb-4 mt-8 tracking-tight leading-[1.3]">${node.content ? renderRichTextNodes(node.content) : ''}</h3>`;
    
    case 'heading-4':
      return `<h4 class="font-heading text-base font-bold text-flcNavy mb-4 mt-6 tracking-tight leading-[1.35]">${node.content ? renderRichTextNodes(node.content) : ''}</h4>`;
    
    case 'heading-5':
      return `<h5 class="font-heading text-sm font-bold text-flcNavy mb-3 mt-6 tracking-tight">${node.content ? renderRichTextNodes(node.content) : ''}</h5>`;
    
    case 'heading-6':
      return `<h6 class="font-heading text-xs font-bold text-flcNavy mb-3 mt-6 tracking-tight">${node.content ? renderRichTextNodes(node.content) : ''}</h6>`;
    
    case 'text':
      let textValue = node.value || '';
      // Apply marks (bold, italic, underline, code)
      if (node.marks && Array.isArray(node.marks)) {
        node.marks.forEach(mark => {
          if (mark.type === 'bold') {
            textValue = `<strong class="font-bold text-flcNavy">${textValue}</strong>`;
          } else if (mark.type === 'italic') {
            textValue = `<em class="italic">${textValue}</em>`;
          } else if (mark.type === 'underline') {
            textValue = `<u class="underline decoration-2 underline-offset-3">${textValue}</u>`;
          } else if (mark.type === 'code') {
            textValue = `<code class="bg-flcCream/80 px-2 py-1 rounded text-sm font-mono text-flcNavy">${textValue}</code>`;
          }
        });
      }
      return textValue;
    
    case 'bold':
      return `<strong class="font-bold text-flcNavy">${node.content ? renderRichTextNodes(node.content) : ''}</strong>`;
    
    case 'italic':
      return `<em class="italic">${node.content ? renderRichTextNodes(node.content) : ''}</em>`;
    
    case 'underline':
      return `<u class="underline decoration-2 underline-offset-3">${node.content ? renderRichTextNodes(node.content) : ''}</u>`;
    
    case 'code':
      return `<code class="bg-flcCream/80 px-2 py-1 rounded text-sm font-mono text-flcNavy">${node.content ? renderRichTextNodes(node.content) : ''}</code>`;
    
    case 'blockquote':
      return `<blockquote class="border-l-3 border-flcGold pl-7 italic text-flcCharcoal/85 my-10 text-lg leading-[1.75]">${node.content ? renderRichTextNodes(node.content) : ''}</blockquote>`;
    
    case 'unordered-list':
      return `<ul class="mb-7 space-y-3 pl-6">${node.content ? renderRichTextNodes(node.content) : ''}</ul>`;
    
    case 'ordered-list':
      return `<ol class="mb-7 space-y-3 pl-6">${node.content ? renderRichTextNodes(node.content) : ''}</ol>`;
    
    case 'list-item':
      return `<li class="leading-[1.8] pl-1">${node.content ? renderRichTextNodes(node.content) : ''}</li>`;
    
    case 'hyperlink':
      const href = node.data?.uri || '#';
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-flcGold hover:text-flcNavy underline decoration-2 underline-offset-3 transition-all duration-200">${node.content ? renderRichTextNodes(node.content) : ''}</a>`;
    
    case 'hr':
      return '<hr class="my-12 border-flcBorder/50">';
    
    default:
      // For unknown node types, try to render content
      if (node.content) {
        return renderRichTextNodes(node.content);
      }
      return '';
  }
}
