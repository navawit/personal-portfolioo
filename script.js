document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const header = document.querySelector('.topbar');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActiveNav = () => {
    const offset = window.scrollY + 180;
    let currentId = sections[0]?.id || '';

    sections.forEach((section) => {
      if (section.offsetTop <= offset) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const revealItems = document.querySelectorAll('.service, .project, .section-heading, .about-copy, .hero-image, .contact');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    if (!prefersReducedMotion) {
      setActiveNav();
    }
  };

  if (prefersReducedMotion) {
    setActiveNav();
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
