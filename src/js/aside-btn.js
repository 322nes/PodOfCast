(function () {
  'use strict';

  const btn = document.querySelector('.aside_btn-scroll-top');
  if (!btn) return;

  const SHOW_AFTER = 400; // px — после какого скролла показывать
  let ticking = false;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle('is-visible', y > SHOW_AFTER);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // первичная проверка (если страница открылась уже прокрученной)
  update();
})();