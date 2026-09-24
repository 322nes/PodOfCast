(function () {
  'use strict';

  const LABEL = 'SUBSCRIBE';
  const HREF = '/subscribe';
  const STORAGE_KEY = 'floatingBtnPos';
  const DRAG_THRESHOLD = 4;

  const btn = document.createElement('a');
  btn.className = 'floating-btn button';
  btn.href = HREF;
  btn.textContent = LABEL;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  function mount() {
    document.body.appendChild(btn);

    // восстановить сохранённую позицию, если есть
    const saved = loadPos();
    if (saved) {
      btn.style.left = saved.x + 'px';
      btn.style.top = saved.y + 'px';
    }

    initDrag();
    window.addEventListener('resize', clampToViewport);
    clampToViewport();
  }

  function initDrag() {
    let dragging = false;
    let moved = false;
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    btn.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      dragging = true;
      moved = false;

      const rect = btn.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      startX = e.clientX;
      startY = e.clientY;

      btn.classList.add('dragging');
      btn.setPointerCapture(e.pointerId);
    });

    btn.addEventListener('pointermove', (e) => {
      if (!dragging) return;

      if (!moved) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) return;
        moved = true;
      }

      const maxX = window.innerWidth - btn.offsetWidth;
      const maxY = window.innerHeight - btn.offsetHeight;

      const x = Math.min(Math.max(e.clientX - offsetX, 0), maxX);
      const y = Math.min(Math.max(e.clientY - offsetY, 0), maxY);

      btn.style.left = x + 'px';
      btn.style.top = y + 'px';
    });

    btn.addEventListener('pointerup', (e) => {
      if (!dragging) return;
      dragging = false;
      btn.classList.remove('dragging');

      try { btn.releasePointerCapture(e.pointerId); } catch (_) { }

      if (moved) savePos();
    });

    btn.addEventListener('pointercancel', () => {
      dragging = false;
      btn.classList.remove('dragging');
      if (moved) savePos();
    });

    btn.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    btn.addEventListener('dragstart', (e) => e.preventDefault());
  }

  function clampToViewport() {
    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;

    const x = Math.min(Math.max(parseInt(btn.style.left, 10) || 0, 0), maxX);
    const y = Math.min(Math.max(parseInt(btn.style.top, 10) || 0, 0), maxY);

    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
  }

  function savePos() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        x: parseInt(btn.style.left, 10) || 0,
        y: parseInt(btn.style.top, 10) || 0,
      }));
    } catch (_) { }
  }

  function loadPos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (typeof p?.x === 'number' && typeof p?.y === 'number') return p;
    } catch (_) { }
    return null;
  }
})();