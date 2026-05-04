// modules/resources-modal.js - Modal logic for resources page

export function initResourcesModal() {
  const subscriptionModal = document.getElementById('subscriptionModal');
  const navSubscribeBtn = document.getElementById('navSubscribe');
  const modalClose = document.getElementById('modalClose');
  const subscriptionForm = document.getElementById('subscriptionForm');

  if (!subscriptionModal) return;

  function openSubscriptionModal() {
    subscriptionModal.style.display = '';
    subscriptionModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSubscriptionModal() {
    subscriptionModal.classList.remove('show');
    subscriptionModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (navSubscribeBtn) {
    navSubscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSubscriptionModal();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeSubscriptionModal);
  }

  if (subscriptionModal) {
    subscriptionModal.addEventListener('click', (e) => {
      if (e.target === subscriptionModal) closeSubscriptionModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && subscriptionModal.classList.contains('show')) {
      closeSubscriptionModal();
    }
  });

  if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(subscriptionForm);
      
      try {
        const response = await fetch(subscriptionForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          alert('Thank you for subscribing!');
          closeSubscriptionModal();
          subscriptionForm.reset();
        } else {
          alert('Subscription failed. Please try again.');
        }
      } catch (error) {
        alert('Network error. Please try again.');
      }
    });
  }
}
