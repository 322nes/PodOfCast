(function () {
  'use strict';

  const dropdowns = document.querySelectorAll('.header_navigation-item--dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('.header_navigation-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach((dd) => {
      dd.classList.remove('is-open');
      dd.querySelector('.header_navigation-toggle')
        ?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    dropdowns.forEach((dd) => {
      dd.classList.remove('is-open');
      dd.querySelector('.header_navigation-toggle')
        ?.setAttribute('aria-expanded', 'false');
    });
  });
})();