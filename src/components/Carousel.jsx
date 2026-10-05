import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

// Scroll-snap carousel: mouse drag, touch swipe, arrow buttons, arrow keys, wrap-around.
export default function Carousel({ label, className = '', children }) {
  const track = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const cleanup = useRef(null);

  useEffect(() => () => cleanup.current?.(), []);

  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0];
    const step = (card ? card.offsetWidth : 300) + 20;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 6) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && el.scrollLeft <= 6) el.scrollTo({ left: max, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = track.current;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    const move = (ev) => {
      const dx = ev.clientX - drag.current.startX;
      if (Math.abs(dx) > 5) { drag.current.moved = true; el.classList.add('is-dragging'); }
      if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
    };
    const up = () => {
      drag.current.down = false;
      el.classList.remove('is-dragging');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      cleanup.current = null;
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    cleanup.current = up;
  };

  const onKeyDown = (e) => {
    if (e.target !== track.current) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <div className={`carousel ${className}`}>
      <button className="carousel__btn carousel__btn--prev" onClick={() => go(-1)} aria-label={`Previous ${label}`}><ChevronLeft /></button>
      <div
        ref={track}
        className="carousel__track"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onKeyDown={onKeyDown}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
      >
        {children}
      </div>
      <button className="carousel__btn carousel__btn--next" onClick={() => go(1)} aria-label={`Next ${label}`}><ChevronRight /></button>
    </div>
  );
}
