(function () {
  const scrollTargets = [
    document.getElementById('scrollTopBtn'),
    document.getElementById('scrollTop'),
    document.querySelector('.back-to-top')
  ].filter(Boolean);

  if (scrollTargets.length) {
    const toggle = () => {
      const visible = window.scrollY > 500;
      scrollTargets.forEach((el) => {
        if (visible) el.classList.add('visible');
        else el.classList.remove('visible');
      });
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    scrollTargets.forEach((el) => {
      if (el.dataset.boundScrollTop === 'true') return;
      el.dataset.boundScrollTop = 'true';
      el.addEventListener('click', (e) => {
        if (el.tagName.toLowerCase() === 'a') e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  const modal = document.getElementById('subscriptionModal');
  const navSubscribe = document.getElementById('navSubscribe');
  const modalClose = document.getElementById('modalClose');
  if (modal && navSubscribe && modalClose) {
    const open = () => {
      modal.style.display = '';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (navSubscribe.dataset.boundModal !== 'true') {
      navSubscribe.dataset.boundModal = 'true';
      navSubscribe.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    }

    if (modalClose.dataset.boundModal !== 'true') {
      modalClose.dataset.boundModal = 'true';
      modalClose.addEventListener('click', close);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) close();
    });
  }
})();
