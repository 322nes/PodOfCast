import '../scss/style.scss';
import './floating-btn';
import './aside-btn';
import './list';
import './header-animation';
import './splider';

import { initHeaderAnimation } from './header-animation';

console.log('[index] модуль загружен');
document.addEventListener('DOMContentLoaded', () => {
  console.log('[index] DOM готов, вызываю анимацию');
  initHeaderAnimation();
});