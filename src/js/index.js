import '../scss/style.scss';
import './floating-btn';
import './aside-btn';
import './list';
import './header-animation';
import './splider';

import { initHeaderAnimation } from './header-animation';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderAnimation();
});