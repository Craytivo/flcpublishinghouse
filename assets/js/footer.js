const DEFAULT_LINKS = {
  home: 'index.html',
  sermons: 'pages/sermons.html',
  resources: 'pages/resources.html',
  readingLibrary: 'pages/reading-library.html',
  devotionals: 'pages/devotionals.html',
  detox: 'pages/spiritual-detox.html',
  post: 'pages/post.html'
};

function normalizeBase(basePath) {
  if (!basePath || basePath === '.') return '';
  return basePath.replace(/\/+$/, '');
}

function withBase(path, basePath) {
  if (!path || /^(https?:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) return path;
  const base = normalizeBase(basePath);
  return base ? `${base}/${path.replace(/^\/+/, '')}` : path.replace(/^\/+/, '');
}

function getBasePath(container) {
  return container?.dataset.basePath || container?.dataset.base || '.';
}

function getTemplatePath(basePath) {
  return withBase('assets/components/footer.html', basePath);
}

function applyLinks(root, basePath) {
  root.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    if (!DEFAULT_LINKS[key]) return;
    el.setAttribute('href', withBase(DEFAULT_LINKS[key], basePath));
  });
}

export async function initFooter() {
  const container = document.getElementById('footerContainer');
  if (!container || container.dataset.ready === 'true') return;

  try {
    const basePath = getBasePath(container);
    const response = await fetch(getTemplatePath(basePath));
    if (!response.ok) { console.error(`Footer template: ${response.status}`); return; }

    container.innerHTML = await response.text();
    applyLinks(container, basePath);
    container.dataset.ready = 'true';
  } catch (err) {
    console.error('Footer init failed:', err);
  }
}
