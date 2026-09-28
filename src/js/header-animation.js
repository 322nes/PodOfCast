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

  tl.to(split.chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.03,
    ease: 'back.out(1.6)',
  });

  tl.to(sublines, {
    x: 0,
    opacity: 1,
    duration: 0.9,
    stagger: 0.15,
  }, '-=0.4');
}