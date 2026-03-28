/* ─── Reveal on scroll ────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

revealEls.forEach((el) => observer.observe(el));

/* ─── Nav scroll style ───────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 20
    ? 'rgba(11, 13, 16, 0.98)'
    : 'rgba(15, 17, 20, 0.92)';
}, { passive: true });

/* ─── Mobile nav toggle ──────────────────────────────── */
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close on nav link click
links.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ─── Livery slider ───────────────────────────────────── */
const liverySlider = document.querySelector('[data-livery-slider]');

if (liverySlider) {
  const slides = Array.from(liverySlider.querySelectorAll('[data-slide]'));
  const dots = Array.from(liverySlider.querySelectorAll('[data-slide-dot]'));
  const prevButton = liverySlider.querySelector('[data-slide-prev]');
  const nextButton = liverySlider.querySelector('[data-slide-next]');
  let activeIndex = 0;
  let autoplayId;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeIndex);
    });
  };

  const restartAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 5000);
  };

  prevButton?.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    restartAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    restartAutoplay();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      showSlide(dotIndex);
      restartAutoplay();
    });
  });

  showSlide(0);
  restartAutoplay();
}
