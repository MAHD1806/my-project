import { useCallback, useEffect, useRef, useState } from 'react';
import { img, srcSet } from '../data/properties';
import { ChevronLeft, ChevronRight, Close, Expand } from './Icons';

function Lightbox({ images, index, alt, onClose, onChange }) {
  const closeRef = useRef(null);
  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, prev, next]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${alt} image viewer`}>
      <button ref={closeRef} className="lightbox__close" onClick={onClose} aria-label="Close viewer"><Close /></button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous image"><ChevronLeft /></button>
      <img key={index} className="lightbox__img" src={img(images[index], 1800)} alt={`${alt} — photo ${index + 1}`} />
      <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next image"><ChevronRight /></button>
      <p className="lightbox__count" aria-live="polite">{index + 1} / {images.length}</p>
    </div>
  );
}

export default function Gallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="gallery">
      <button className="gallery__main" onClick={() => setOpen(true)} aria-label="Open fullscreen image viewer">
        <img key={active} src={img(images[active], 1400)} srcSet={srcSet(images[active], [640, 1000, 1400])} sizes="(max-width: 960px) 100vw, 800px" alt={`${alt} — photo ${active + 1}`} fetchpriority="high" width="1400" height="940" />
        <span className="gallery__expand"><Expand width={18} height={18} /> View fullscreen</span>
      </button>
      <ul className="gallery__thumbs" aria-label="Image thumbnails">
        {images.map((id, i) => (
          <li key={id}>
            <button className={i === active ? 'is-active' : ''} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === active}>
              <img src={img(id, 300)} alt="" loading="lazy" width="300" height="200" />
            </button>
          </li>
        ))}
      </ul>
      {open && <Lightbox images={images} index={active} alt={alt} onClose={close} onChange={setActive} />}
    </div>
  );
}
