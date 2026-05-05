// modules/hero-enhancement.js - Editorial hero section enhancements

let lenis;
let magneticElements = [];
let scrollProgress = 0;

// Initialize Lenis smooth scroll
export function initLenis() {
  if (typeof Lenis === 'undefined') return;
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Text reveal animation (staggered character reveal)
export function initTextReveal(element) {
  if (!element) return;
  
  const text = element.textContent;
  const words = text.split(' ');
  
  element.innerHTML = words.map((word, wordIndex) => {
    const letters = word.split('').map((letter, letterIndex) => {
      return `<span class="hero-letter" style="transition-delay: ${wordIndex * 50 + letterIndex * 30}ms; opacity: 0; transform: translateY(100%); display: inline-block;">${letter}</span>`;
    }).join('');
    return `<span class="hero-word" style="display: inline-block; margin-right: 0.2em;">${letters}</span>`;
  }).join('');

  // Trigger animation after a short delay
  setTimeout(() => {
    const letters = element.querySelectorAll('.hero-letter');
    letters.forEach(letter => {
      letter.style.opacity = '1';
      letter.style.transform = 'translateY(0)';
    });
  }, 100);
}

// Magnetic effect for interactive elements
export function initMagneticEffect(element, strength = 0.3) {
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  element.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) * strength;
    const deltaY = (mouseY - centerY) * strength;
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
    element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
  
  magneticElements.push(element);
}

// Scroll-based animations
export function initScrollAnimations() {
  const heroTitle = document.getElementById('postTitle');
  const heroExcerpt = document.getElementById('postExcerpt');
  const heroImage = document.getElementById('heroImage');
  const metaLine = document.getElementById('postPastor')?.parentElement;
  
  window.addEventListener('scroll', () => {
    scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Fade out title on scroll
    if (heroTitle) {
      const opacity = Math.max(0, 1 - scrollProgress * 2);
      const translateY = scrollProgress * 50;
      heroTitle.style.opacity = opacity;
      heroTitle.style.transform = `translateY(${translateY}px)`;
    }
    
    // Parallax effect on hero image
    if (heroImage) {
      const parallaxY = scrollProgress * 30;
      heroImage.style.transform = `translateY(${parallaxY}px)`;
    }
    
    // Reveal excerpt on scroll
    if (heroExcerpt && scrollProgress > 0.1) {
      heroExcerpt.style.opacity = Math.min(1, (scrollProgress - 0.1) * 3);
    }
    
    // Animate meta line on scroll
    if (metaLine && scrollProgress < 0.5) {
      const metaOpacity = Math.max(0, 1 - scrollProgress * 2);
      metaLine.style.opacity = metaOpacity;
    }
  });
}

// Subtle particle effect (lightweight canvas)
export function initParticleEffect(container) {
  if (!container) return;
  
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-particles';
  canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.3;';
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
    particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }
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
  
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
}

// Initialize all hero enhancements
export function initHeroEnhancements() {
  initLenis();
  
  const heroSection = document.querySelector('.relative.pt-10');
  if (heroSection) {
    initParticleEffect(heroSection);
  }
  
  // Initialize text reveal for title
  const heroTitle = document.getElementById('postTitle');
  if (heroTitle) {
    initTextReveal(heroTitle);
  }
  
  // Initialize magnetic effect for title
  if (heroTitle) {
    initMagneticEffect(heroTitle, 0.15);
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Add gradient mask to title
  if (heroTitle) {
    heroTitle.style.background = 'linear-gradient(135deg, #1A3A52 0%, #9A7B4F 100%)';
    heroTitle.style.webkitBackgroundClip = 'text';
    heroTitle.style.webkitTextFillColor = 'transparent';
    heroTitle.style.backgroundClip = 'text';
  }
}

// Cleanup function
export function cleanupHeroEnhancements() {
  if (lenis) {
    lenis.destroy();
  }
  
  magneticElements.forEach(element => {
    element.removeEventListener('mousemove', null);
    element.removeEventListener('mouseleave', null);
  });
  
  magneticElements = [];
}
