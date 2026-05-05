// modules/sermon-features.js - Sermon-specific features (reading progress, notes, etc.)

export function initSermonFeatures(sermonId) {
  initReadingProgress();
  initNotes(sermonId);
}

function initReadingProgress() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

function initNotes(sermonId) {
  const textareas = document.querySelectorAll('.note-textarea');
  if (!textareas.length) return;

  // Load saved notes
  textareas.forEach(textarea => {
    const noteId = textarea.getAttribute('data-note');
    const savedNote = localStorage.getItem(`${sermonId}-${noteId}`);
    if (savedNote) {
      textarea.value = savedNote;
    }
  });

  // Save notes on input
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      const noteId = this.getAttribute('data-note');
      localStorage.setItem(`${sermonId}-${noteId}`, this.value);
    });
  });
}
