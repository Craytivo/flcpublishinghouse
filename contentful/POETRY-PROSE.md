# Poetry & Prose — Contentful content type

The site expects the Contentful API identifier `poetryProse` for the **Poetry & Prose** content type.

## Content type

- **Name:** Poetry & Prose
- **API ID:** `poetryProse`
- **Description:** Dive into a collection of elegant theological essays, sharp literary and scripture criticism, and deeply reflective creative writing. Each piece is crafted not just to inform, but to delight, inspire, and elevate your spiritual journey through stylistic beauty and artistic expression.
- **Display field:** Title

## Fields

| Field | Type | Required |
|---|---|---:|
| Title | Short text | Yes |
| Slug | Short text | Yes |
| Subtitle | Long text | No |
| Description | Long text | No |
| Content | Rich text | Yes |
| Author | Short text | No |
| Category | Short text, validated | No |
| Publication Date | Date & time | No |
| Featured Image | Media / Asset | No |
| Tags | Short text, multiple values | No |
| Status | Short text, validated | No |

### Category values

- Theological Essay
- Literary Criticism
- Scripture Criticism
- Poetry
- Prose
- Creative Writing
- Reflection

### Status values

- draft
- published

The JSON model in `contentful/poetry-prose-content-type.json` is the source-of-truth definition.

## Contentful setup

Create the content type in **Contentful → Content model → Add content type**, use the name above, and configure the API identifier as `poetryProse`. Contentful's documentation confirms that the content model editor is where content types and fields are created and saved. citeturn0search1turn0search6

The frontend has already been wired to recognize `poetryProse`, include it in the latest-content aggregation, resolve individual entries through the existing post page, and include entries in site search.

Contentful's API supports creating a content type with a specified ID via PUT; using a stable ID is preferable when that ID is referenced by application code. citeturn0search3
