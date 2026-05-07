function lockBody(locked) {
  document.body.classList.toggle('is-nav-open', locked);
  document.body.style.overflow = locked ? 'hidden' : '';
}

export function initNavigation() {
  const button = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileMenu');
  const header = document.getElementById('mainNav');
  if (!button || !drawer || !header || header.dataset.navReady === 'true') return;

  function setOpen(open) {
    button.classList.toggle('is-open', open);
    drawer.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    drawer.setAttribute('aria-hidden', String(!open));
    lockBody(open);
  }

  button.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });

  header.dataset.navReady = 'true';
}
