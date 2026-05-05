// modules/hero-enhancement.js - Hero section enhancements

export function initParticleEffect(container) {
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0.3;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function initParticles() {
    particles = Array.from({ length: 30 }, createParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(154, 123, 79, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
  window.addEventListener('resize', () => { resize(); initParticles(); });
}

export function initHeroEnhancements() {
  const heroSection = document.getElementById('heroSection');
  if (heroSection) {
    initParticleEffect(heroSection);
  }

  const heroTitle = document.getElementById('postTitle');
  if (heroTitle) {
    heroTitle.style.background = 'linear-gradient(135deg, #1A3A52 0%, #2C4F6A 100%)';
    heroTitle.style.webkitBackgroundClip = 'text';
    heroTitle.style.webkitTextFillColor = 'transparent';
    heroTitle.style.backgroundClip = 'text';
  }
}

