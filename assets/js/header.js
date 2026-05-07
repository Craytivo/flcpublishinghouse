const DEFAULT_LINKS = {
  home: 'index.html',
  sermons: 'pages/sermons.html',
  resources: 'pages/resources.html',
  readingLibrary: 'pages/reading-library.html',
  devotionals: 'pages/devotionals.html',
  detox: 'pages/spiritual-detox.html',
  post: 'pages/post.html',
  logo: 'assets/images/Logo.png'
};

function getBasePath(container) {
  return container?.dataset.basePath || container?.dataset.base || '.';
}

function normalizeBase(basePath) {
  if (!basePath || basePath === '.') return '';
  return basePath.replace(/\/+$/, '');
}

function withBase(path, basePath) {
  if (!path || /^(https?:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) return path;
  const base = normalizeBase(basePath);
  return base ? `${base}/${path.replace(/^\/+/, '')}` : path.replace(/^\/+/, '');
}

function getAssetBase(basePath) {
  return withBase('assets/components/header.html', basePath);
}

function currentPageKey(container) {
  return container?.dataset.currentPage || container?.dataset.page || '';
}

function applyLinks(root, basePath) {
  root.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    if (!DEFAULT_LINKS[key]) return;
    const attr = el.tagName === 'IMG' ? 'src' : 'href';
    el.setAttribute(attr, withBase(DEFAULT_LINKS[key], basePath));
  });
  root.querySelectorAll('[data-logo]').forEach(img => {
    img.setAttribute('src', withBase(DEFAULT_LINKS.logo, basePath));
  });
}

function applyActiveState(root, key) {
  if (!key) return;
  root.querySelectorAll(`[data-nav-key="${key}"]`).forEach(el => {
    el.classList.add('is-active');
    el.setAttribute('aria-current', 'page');
  });
}

export async function initHeader() {
  const container = document.getElementById('headerContainer');
  if (!container || container.dataset.ready === 'true') return;

  try {
    const basePath = getBasePath(container);
    const response = await fetch(getAssetBase(basePath));
    if (!response.ok) { console.error(`Header template: ${response.status}`); return; }

    container.innerHTML = await response.text();
    applyLinks(container, basePath);
    applyActiveState(container, currentPageKey(container));
    container.dataset.ready = 'true';
  } catch (err) {
    console.error('Header init failed:', err);
  }
}
