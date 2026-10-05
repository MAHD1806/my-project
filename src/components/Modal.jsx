import { useEffect, useRef } from 'react';
import { Close } from './Icons';

export default function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const prevFocus = document.activeElement;
    ref.current?.querySelector('input, textarea, button')?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prevFocus?.focus?.(); };
  }, [onClose]);

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__panel" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <button className="modal__close" onClick={onClose} aria-label="Close"><Close /></button>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
