// config.js - Application configuration

const FLC_CONTENTFUL = {
  enabled: true,
  spaceId: "i8pstcwrkztq",
  environment: "master",
  accessToken: "pLj1jC1-l70jtAmGBWhrexrKWRbaLwKVtOHjpMVXzLw",
  contentType: "blogPage",
  detoxContentType: "detoxPost",
  devotionalGuideContentType: "devotionalGuide",
  postPagePath: "pages/post.html"
};

// Set on window for global access
window.FLC_CONTENTFUL = FLC_CONTENTFUL;

export default FLC_CONTENTFUL;

// SECURITY NOTE: Contentful access token is exposed client-side for development.
// In production, this should be moved to a serverless API (Netlify/Vercel Functions)
// to protect credentials and enable rate limiting. Never expose tokens in client-side code.
