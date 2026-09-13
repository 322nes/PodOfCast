/* floating-btn.js
   Плавающая кнопка SUBSCRIBE с перетаскиванием по экрану.
   - position: fixed → держится относительно окна, не скроллится с контентом
   - клик (без перетаскивания) — переход по ссылке
   - позиция сохраняется в localStorage и восстанавливается при загрузке
   - при ресайзе окна кнопка не уезжает за границы */

(function () {
  'use strict';

  // ---------- настройки ----------
  const LABEL = 'SUBSCRIBE';
  const HREF = '/subscribe';
  const START = { top: 24, left: 24 };
  const STORAGE_KEY = 'floatingBtnPos';
  const DRAG_THRESHOLD = 4; // px — меньше этого считаем кликом, а не перетаскиванием

  // ---------- создаём элемент ----------
  const btn = document.createElement('a');
  btn.className = 'floating-btn';
  btn.href = HREF;
  btn.textContent = LABEL;

  // стартовая позиция
  const saved = loadPos();
  btn.style.top = (saved?.y ?? START.top) + 'px';
  btn.style.left = (saved?.x ?? START.left) + 'px';

  // ---------- монтирование ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  function mount() {
    document.body.appendChild(btn);
    initDrag();
    window.addEventListener('resize', clampToViewport);
    clampToViewport(); // на случай, если сохранённая позиция вне текущего окна
  }

  // ---------- перетаскивание ----------
  function initDrag() {
    let dragging = false;
    let moved = false;         // был ли фактический сдвиг
    let startX = 0, startY = 0;
    let offsetX = 0, offsetY = 0;

    btn.addEventListener('pointerdown', (e) => {
      // только левая кнопка мыши
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

      // порог: не считаем дрожание мыши перетаскиванием
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

    // клик — только если не таскали
    btn.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // запрет «нативного» drag у ссылки
    btn.addEventListener('dragstart', (e) => e.preventDefault());
  }

  // ---------- утилиты ----------

  // не даём кнопке уехать за пределы окна (например, после ресайза)
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
    } catch (_) { /* приватный режим — молча игнорируем */ }
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