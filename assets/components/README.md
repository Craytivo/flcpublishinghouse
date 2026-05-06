# Sermon Page Component

This component provides a standardized template and styling for sermon pages across the FLC Publishing House website.

## Files

- **assets/components/sermon-template.html** - Reusable HTML template for new sermon pages
- **assets/css/sermon-page.css** - Shared CSS styles for sermon page elements

## Creating a New Sermon Page

1. Copy `assets/components/sermon-template.html` to the `sermons/` folder
2. Rename the file to match your sermon title (e.g., `sermon-your-title.html`)
3. Replace the placeholder content:
   - `SERMON_TITLE` - The sermon title
   - `SERMON_SUBTITLE` - A brief description of the sermon
   - `SERMON_DATE` - The date of the sermon (format: January 12, 2025)
   - `SERMON_JS_FILENAME` - The JavaScript entry point filename (e.g., `sermon-your-title`)
   - `SERMON_BODY_CONTENT` - The actual sermon content

4. Create the corresponding JavaScript entry point in `assets/js/pages/`:
   ```javascript
   // assets/js/pages/sermon-your-title.js
   import '../config.js';
   import { initScrollAnimations } from '../modules/animations.js';
   import { initScrollTop } from '../modules/scrollTop.js';
   import { initSermonFeatures } from '../modules/sermon-features.js';

   function initSermonPage() {
     initScrollAnimations();
     initScrollTop();
     initSermonFeatures('sermon-your-title');
   }

   if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', initSermonPage);
   } else {
     initSermonPage();
   }
   ```

5. Add the sermon to `assets/js/modules/sermons.js` in the static sermons array

## Available CSS Classes

### Scripture Callouts
```html
<div class="scripture-callout">
  <p>"Your scripture verse here"</p>
  <span class="scripture-ref">Book Chapter:Verse</span>
</div>
```

### Pull Quotes
```html
<p class="pull-quote">Your key quote here</p>
```

### Key Points
```html
<div class="key-point">
  <h4>Key Point Title</h4>
  <p>Your key point content here</p>
</div>
```

### Discussion Questions
```html
<div class="discussion-questions">
  <h4>Discussion Questions</h4>
  <ul>
    <li>Question 1</li>
    <li>Question 2</li>
  </ul>
</div>
```

### Section Dividers
```html
<hr class="section-divider">
```

### Related Sermons
```html
<div class="related-sermons">
  <h3>Related Sermons</h3>
  <a href="../sermons/sermon-title.html" class="sermon-link">Sermon Title</a>
</div>
```

## Content Structure

The sermon content should follow this structure:
- Introduction
- Main points (use h2 for major sections, h3 for subsections)
- Scripture references (use scripture-callout class)
- Key quotes (use pull-quote class)
- Discussion questions (optional)
- Notes section (automatically included in template)

## Features Included

- Reading progress bar
- Scroll-to-top button
- Notes functionality with localStorage
- Header and footer components
- Responsive design
- Accessibility features (skip link, ARIA labels)
- Fade-in animations
