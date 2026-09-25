// import gsap from 'gsap';
// import SplitType from 'split-type';

// export function initHeaderAnimation() {
//   console.log('[anim] функция вызвана');          // ← сюда

//   const title = document.querySelector('.header_text-title');
//   console.log('[anim] title:', title);            // ← и сюда

//   if (!title) return;

//   const split = new SplitType(title, { types: 'chars,words' });
//   console.log('[anim] split.chars:', split.chars); // ← и сюда

//   gsap.set(split.chars, { yPercent: 120, opacity: 0 });
//   gsap.to(split.chars, {
//     yPercent: 0, opacity: 1, duration: 0.8,
//     stagger: 0.03, ease: 'back.out(1.6)',
//   });

//   const sublines = document.querySelectorAll('.header_text-subline');

//   gsap.set(sublines, { x: 80, opacity: 0 });

//   gsap.to(sublines, {
//     x: 0,
//     opacity: 1,
//     duration: 0.9,
//     stagger: 0.15,       // вторая строка стартует через 0.15 с после первой
//     ease: 'power3.out',
//     delay: 0.8,          // начнётся после того, как заголовок выехал
//   });
// }

import gsap from 'gsap';
import SplitType from 'split-type';

export function initHeaderAnimation() {
  const title = document.querySelector('.header_text-title');
  const sublines = document.querySelectorAll('.header_text-subline');

  if (!title) return;

  const split = new SplitType(title, {
    types: 'chars,words',
    wordClass: 'word',
  });

  const words = title.querySelectorAll('.word');
  if (words.length) words[words.length - 1].classList.add('word--accent');

  gsap.set(split.chars, { yPercent: 120, opacity: 0 });
  gsap.set(sublines, { x: 80, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. буквы заголовка влетают снизу
  tl.to(split.chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.6)',
  });

  // 2. подзаголовок выезжает справа
  tl.to(sublines, {
    x: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.15,
  }, '-=0.4'); // начнётся за 0.4 с до конца предыдущего шага
}