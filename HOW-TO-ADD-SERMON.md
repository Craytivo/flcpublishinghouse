# How to Add a New Sermon

## Quick Steps to Display New Sermons Automatically

When you add a new sermon HTML file to the `/sermons/` folder, follow these steps to make it appear in the library:

### 1. Update Library Page (`pages/library.html`)

#### A. Update Sermon Count
Find this line (around line 1883):
```html
<span class="text-xs text-flcGold font-semibold uppercase tracking-widePlus">3 Messages</span>
```
Change the number to reflect the new total.

#### B. Add New Sermon Card
Add your sermon card at the **TOP** of the grid (after the opening `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">` tag):

```html
<!-- Sermon X: [Your Sermon Title] -->
<a href="../sermons/sermon-your-filename.html" class="group block bg-flcOffWhite/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-flcBorder/50 hover:border-flcGold/30">
  <div class="aspect-video w-full overflow-hidden rounded-lg mb-4">
    <img src="../assets/images/your-image.webp" alt="[Your Sermon Title]" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
  </div>
  <div class="flex items-center gap-2 mb-3">
    <span class="text-xs font-semibold text-flcGold uppercase tracking-wider">Sermon</span>
    <span class="text-xs text-flcCharcoal/50">•</span>
    <span class="text-xs text-flcCharcoal/60">[Date]</span>
  </div>
  <h4 class="text-xl font-heading font-bold text-flcNavy mb-2 group-hover:text-flcGold transition-colors">[Your Sermon Title]</h4>
  <p class="text-flcCharcoal/70 text-sm mb-4 line-clamp-2">[Brief description of the sermon]</p>
  <div class="flex items-center gap-2">
    <span class="inline-flex items-center gap-1 px-3 py-1 bg-flcGold/10 rounded-full text-flcGold text-xs font-medium">[Tag 1]</span>
    <span class="inline-flex items-center gap-1 px-3 py-1 bg-flcGold/10 rounded-full text-flcGold text-xs font-medium">[Tag 2]</span>
  </div>
</a>
```

#### C. Update Latest Sermon Link
Find the footer config (around line 3033):
```html
data-config='{"logoPath": "../assets/images/Logo.png", "homePath": "../index.html", "libraryPath": "library.html", "devotionalsPath": "devotionals.html", "resourcesPath": "resources.html", "latestSermonPath": "../sermons/sermon-purpose-protected-me.html"}'
```
Update `latestSermonPath` to point to your new sermon.

### 2. Create New Sermon File

Use `sermon-purpose-protected-me.html` as a template:

#### Required Updates:
1. **Title** (line ~3): `<title>Your Sermon Title - FLC Publishing House</title>`
2. **Hero Image** (line ~865): Update `src="../assets/images/your-image.webp"`
3. **Sermon Title** (line ~880): Update the `<h1>` text
4. **Date** (line ~900): Update the date span
5. **Tags** (line ~915): Update the topic tags
6. **YouTube Video** (line ~830): Update the video ID in both places:
   - Action button: `href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"`
   - Embedded video: `src="https://www.youtube.com/embed/YOUR_VIDEO_ID"`
7. **PDF Download** (line ~835): Update `href="../assets/pdfs/Your-Sermon.pdf"`
8. **Main Idea** (line ~920): Update the sermon description
9. **Key Scriptures** (line ~930+): Update scripture references
10. **Sermon Outline** (line ~960+): Update your sermon points

### 3. File Naming Convention

- **Sermon HTML**: `sermon-your-title-here.html` (lowercase, hyphenated)
- **PDF Handout**: `Your Sermon Title - Handout.pdf` (Title case)
- **Image**: `your-image.webp` or `.png` (lowercase, optimized)

### 4. Image Requirements

- **Format**: WebP preferred (PNG/JPG acceptable)
- **Size**: Minimum 1280x720px for 16:9 ratio
- **Location**: `/assets/images/`
- **Optimization**: Compress images to reduce file size

### 5. Testing Checklist

After adding your sermon:
- ✅ Sermon appears in library page
- ✅ Image loads correctly
- ✅ YouTube video embeds properly
- ✅ PDF download link works
- ✅ All internal links function
- ✅ Responsive on mobile/tablet/desktop
- ✅ Latest sermon link in footer updates

---

## Example: Adding "Purpose Protected Me"

**Library HTML Update:**
```html
<!-- Count -->
<span class="text-xs text-flcGold font-semibold uppercase tracking-widePlus">3 Messages</span>

<!-- Card -->
<a href="../sermons/sermon-purpose-protected-me.html" class="group block...">
  <img src="../assets/images/purpose protected .webp" alt="Purpose Protected Me">
  <span class="text-xs text-flcCharcoal/60">December 7, 2025</span>
  <h4>Purpose Protected Me</h4>
  <p>Experience the complete message as Pastor Rohan Samuels explores how God's purpose provides divine protection...</p>
  <span>Purpose</span>
  <span>Protection</span>
</a>

<!-- Footer Config -->
"latestSermonPath": "../sermons/sermon-purpose-protected-me.html"
```

---

## Future Enhancement: Automatic Display

To fully automate sermon display, you would need to:

1. **Use a CMS** (Content Management System) like WordPress, Strapi, or Contentful
2. **Implement a Static Site Generator** like Next.js, Gatsby, or 11ty with a headless CMS
3. **Add a Database** to store sermon metadata and dynamically generate the library page
4. **Use JavaScript** to fetch sermon data from a JSON file and render cards dynamically

For now, manual updates following this guide ensure consistency and quality control.
