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

  // Video Cards — open YouTube directly in new tab
document.querySelectorAll('.open-video-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const url = e.currentTarget.dataset.videoUrl;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
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

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn) {
    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        hamburgerIcon.classList.remove('opacity-100');
        hamburgerIcon.classList.add('opacity-0', 'pointer-events-none');
        closeIcon.classList.remove('opacity-0', 'pointer-events-none');
        closeIcon.classList.add('opacity-100');
      } else {
        mobileMenu.classList.add('translate-x-full');
        closeIcon.classList.remove('opacity-100');
        closeIcon.classList.add('opacity-0', 'pointer-events-none');
        hamburgerIcon.classList.remove('opacity-0', 'pointer-events-none');
        hamburgerIcon.classList.add('opacity-100');
      }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }
});
