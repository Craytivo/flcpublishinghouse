# How to Add Sermons (Contentful)

Sermons on the Resources page can now be published from Contentful.

## 1. Configure Contentful in `pages/resources.html`

Find this block near the top script section:

```js
window.FLC_CONTENTFUL = window.FLC_CONTENTFUL || {
  enabled: false,
  spaceId: '',
  environment: 'master',
  accessToken: '',
  contentType: 'blogPage',
  postPagePath: '../pages/post.html'
};
```

Update it with your values:

1. Set `enabled` to `true`
2. Set `spaceId` to your Contentful Space ID
3. Set `accessToken` to your Content Delivery API token
4. Keep `environment` as `master` unless you use another environment
5. Set `contentType` to your content type ID (`blogPage`)
6. Optional: set `entryIds` (array) to force specific entries in order
7. Keep `postPagePath` as `../pages/post.html`

## 2. Contentful Query Modes

You can use either mode:

1. `entryIds` mode:
   Set `entryIds: ['ENTRY_ID_1', 'ENTRY_ID_2']` to fetch specific entries directly.
2. `contentType` mode:
   Set `contentType` and the page fetches latest entries of that type.

If `entryIds` is provided and returns valid entries, it is used first.

## 3. Your Exact Content Model

Your live Contentful type is:

1. Content type ID: `blogPage`
2. Fields used by the site:
   `title` (Symbol), `body` (RichText), `image` (Asset Link), `recommendedPosts` (Entry Array)

`recommendedPosts` now renders automatically on each post page as "Related Posts" cards (title + image).

Optional video field (recommended):
`youtubeUrl` (Symbol)

No `url` or `slug` field is needed.  
Links are generated automatically as:
`../pages/post.html?entry={entryId}`

## 4. Add YouTube Video In Contentful

In content type `blogPage`, add one optional field:

1. Field ID: `youtubeUrl`
2. Type: Short text (Symbol)

Accepted values:

1. Full URL:
   `https://www.youtube.com/watch?v=kBFOH2pxS4A`
2. Short URL:
   `https://youtu.be/kBFOH2pxS4A`
3. Video ID only:
   `kBFOH2pxS4A`

When present, `post.html` auto-embeds the video above the body content.

## 5. Publish in Contentful

1. Create or update sermon entry
2. Publish the entry
3. Refresh `pages/resources.html`

The page will automatically:

1. Update sermon count
2. Replace sermon button list
3. Set the newest sermon as featured

## 6. Fallback Behavior

If Contentful is not configured or unavailable, the site uses the existing hardcoded sermon links.

## 7. Legacy Manual Method

You can still add a local file under `sermons/` and manually add links in `pages/resources.html`, but Contentful is now the primary posting flow.
