// utils/images.js - Image utility functions for Contentful assets

/**
 * Resolve image URL from Contentful entry
 * @param {Object} entry - Contentful entry
 * @param {Object} includes - Contentful includes object with assets
 * @param {string} fieldName - Field name to check for image (default: 'image')
 * @returns {string|null} Image URL or null if not found
 */
export function getImageUrl(entry, includes = {}, fieldName = 'image') {
  if (!entry || !entry.fields) return null;
  
  if (entry.fields[fieldName]) {
    const imageField = entry.fields[fieldName];
    
    // If it's a direct URL string
    if (typeof imageField === 'string') {
      return imageField;
    }

    // If the asset is already resolved inline (has file.url)
    if (imageField && imageField.fields && imageField.fields.file && imageField.fields.file.url) {
      return imageField.fields.file.url;
    }
    
    // If it's a linked asset reference, resolve from includes
    if (imageField && imageField.sys && (imageField.sys.type === 'Asset' || imageField.sys.linkType === 'Asset') && imageField.sys.id) {
      const assets = includes.Asset;
      if (Array.isArray(assets)) {
        const asset = assets.find(a => a.sys && a.sys.id === imageField.sys.id);
        if (asset && asset.fields && asset.fields.file) {
          return asset.fields.file.url;
        }
      } else if (assets && assets[imageField.sys.id]) {
        const asset = assets[imageField.sys.id];
        if (asset && asset.fields && asset.fields.file) {
          return asset.fields.file.url;
        }
      }
    }
  }
  
  return null;
}

/**
 * Get image alt text from Contentful entry
 * @param {Object} entry - Contentful entry
 * @param {string} fieldName - Field name to check for image (default: 'image')
 * @returns {string} Alt text for the image
 */
export function getImageAltText(entry, fieldName = 'image') {
  if (!entry || !entry.fields) return '';
  
  // Check for alt text field
  const altField = entry.fields[`${fieldName}Alt`] || entry.fields[`${fieldName}AltText`] || entry.fields.altText;
  if (altField) return altField;
  
  // Use title as fallback
  return entry.fields.title || 'Sermon image';
}

/**
 * Get responsive image sizes
 * @param {string} url - Image URL
 * @param {number} width - Desired width in pixels
 * @returns {string} Image URL with Contentful resizing parameters
 */
export function getResponsiveImageUrl(url, width = 800) {
  if (!url) return null;
  
  // Contentful supports image resizing via query parameters
  const baseUrl = url.split('?')[0];
  const params = new URLSearchParams();
  params.append('w', width.toString());
  params.append('fm', 'webp'); // Use WebP format for better performance
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate srcset for responsive images
 * @param {string} url - Image URL
 * @returns {string} srcset attribute value
 */
export function generateSrcset(url) {
  if (!url) return '';
  
  const sizes = [400, 800, 1200];
  return sizes.map(width => {
    const responsiveUrl = getResponsiveImageUrl(url, width);
    return `${responsiveUrl} ${width}w`;
  }).join(', ');
}
