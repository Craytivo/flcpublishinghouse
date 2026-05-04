// modules/form.js - Subscription form handling

export function initForm() {
  const subscriptionForm = document.getElementById("subscriptionForm");
  const subscriptionStatus = document.getElementById("subscriptionStatus");
  
  if (!subscriptionForm || !subscriptionStatus) return;

  subscriptionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    subscriptionStatus.textContent = "Submitting...";

    try {
      const formData = new FormData(subscriptionForm);
      const response = await fetch(subscriptionForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        subscriptionStatus.textContent = "Thanks, you are subscribed.";
        subscriptionForm.reset();
      } else {
        subscriptionStatus.textContent = "Subscription failed. Please try again.";
      }
    } catch (error) {
      subscriptionStatus.textContent = "Network error. Please try again.";
    }
  });
}
