(function () {
  'use strict';

  const burger = document.querySelector('.header_burger');
  const overlay = document.querySelector('.header_overlay');
  const menu = document.querySelector('.header_mobile-menu');

  if (!burger || !menu) return;

  function openMenu() {
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    menu.classList.add('is-open');
    overlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    menu.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    menu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  menu.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('click', () => {
      if (el.classList.contains('header_navigation-toggle')) return;
      closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();