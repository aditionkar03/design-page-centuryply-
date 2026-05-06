document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up, .reveal-down').forEach((el) => {
    observer.observe(el);
  });

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('opacity-100', 'scale-100', 'z-10');
    slides[currentSlide].classList.add('opacity-0', 'scale-110', 'z-0');
    dots[currentSlide].classList.remove('w-10', 'bg-gold');
    dots[currentSlide].classList.add('w-4', 'bg-cream/40');

    currentSlide = index;

    slides[currentSlide].classList.remove('opacity-0', 'scale-110', 'z-0');
    slides[currentSlide].classList.add('opacity-100', 'scale-100', 'z-10');
    dots[currentSlide].classList.remove('w-4', 'bg-cream/40');
    dots[currentSlide].classList.add('w-10', 'bg-gold');
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 4500);

  // Video Modal Logic
  const videoDialog = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const closeVideoBtn = document.getElementById('close-video-modal');

  document.querySelectorAll('.open-video-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const src = e.currentTarget.dataset.videoSrc;
      if (src) {
        videoIframe.src = src;
        videoDialog.showModal();
      }
    });
  });

  closeVideoBtn.addEventListener('click', () => {
    videoDialog.close();
    videoIframe.src = '';
  });

  videoDialog.addEventListener('click', (e) => {
    const dialogDimensions = videoDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      videoDialog.close();
      videoIframe.src = '';
    }
  });
});
