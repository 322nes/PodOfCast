// import Splide from '@splidejs/splide';
// import '@splidejs/splide/css'; // базовые стили (или своя тема)

// const splide = new Splide('.splide', {
//   type: 'loop',
//   perPage: 3,
//   focus: 'center',
//   gap: '24px',
//   padding: '5%',
//   breakpoints: {
//     1024: { perPage: 2 },
//     640: { perPage: 1 },
//   },
// });

// splide.mount();

import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const splide = new Splide('.header-splider__slider', {
  type: 'loop',
  autoplay: true,        // ← включает автопрокрутку
  interval: 5000,        // ← пауза между слайдами, мс (по умолчанию 5000)
  pauseOnHover: true,    // ← пауза при наведении мыши
  pauseOnFocus: true,    // ← пауза при фокусе с клавиатуры
  speed: 600,            // ← скорость анимации перехода, мс
  fixedWidth: 373,
  perPage: 3,
  focus: 'center',
  gap: '20px',
  padding: '5%',
  arrows: true,
  pagination: false,
  drag: true,
  breakpoints: {
    1024: { perPage: 2, gap: '16px' },
    640: { perPage: 1, gap: '12px', padding: '0' },
  },
});

splide.mount();