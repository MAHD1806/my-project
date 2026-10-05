import { useMemo, useRef, useState } from 'react';
import { img, srcSet, HERO_IMAGE } from '../data/properties';
import useMedia from '../hooks/useMedia';
import useScrollScrub, { pickVideoSource } from '../hooks/useScrollScrub';

/*
 * Scroll-driven hero: a tall section (see .hero--scrub) with a sticky 100vh stage.
 * Scroll progress through the section maps 0 -> 1 onto the video timeline.
 * Falls back to the still image if the video fails, or under prefers-reduced-motion.
 */
export default function Hero() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const mobile = useMedia('(max-width: 767px)');
  const [status, setStatus] = useState('loading'); // loading | ready | error

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const fadeRef = useRef(null);
  const barRef = useRef(null);

  const scrub = !reduced && status !== 'error';
  const source = useMemo(() => (reduced ? null : pickVideoSource(mobile)), [reduced, mobile]);

  useScrollScrub({ enabled: !reduced, source, sectionRef, videoRef, fadeRef, barRef, onStatus: setStatus });

  return (
    <section ref={sectionRef} className={`hero ${scrub ? 'hero--scrub' : ''} is-${status}`} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__bg">
          {scrub ? (
            <img className="hero__img" src="/video/hero-poster.jpg" alt="" fetchpriority="high" width="1168" height="768" />
          ) : (
            <img className="hero__img hero__img--still" src={img(HERO_IMAGE, 1800)} srcSet={srcSet(HERO_IMAGE, [800, 1400, 2000])} sizes="100vw" alt="Modern luxury villa with glass walls at dusk" fetchpriority="high" width="2000" height="1200" />
          )}
          {!reduced && status !== 'error' && (
            <video ref={videoRef} className="hero__video" muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} aria-hidden="true" />
          )}
        </div>

        <div ref={fadeRef} className="hero__fade">
          <div className="hero__content container">
            <h1 id="hero-title" className="hero__title">Discover Exceptional<br />Homes &amp; Investments</h1>
            <p className="hero__text">Premium properties in prime locations. Find your dream home<br className="hide-sm" /> or the perfect investment with confidence.</p>
          </div>
          {scrub && <p className="hero__cue" aria-hidden="true"><span>Scroll</span></p>}
        </div>

        {scrub && (
          <div className="hero__loader" role="status">
            <span className="sr-only">Loading cinematic hero</span>
            <span ref={barRef} className="hero__loader-bar" />
          </div>
        )}
      </div>
    </section>
  );
}
