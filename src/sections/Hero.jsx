import { img, srcSet, HERO_IMAGE } from '../data/properties';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg">
        <img src={img(HERO_IMAGE, 1800)} srcSet={srcSet(HERO_IMAGE, [800, 1400, 2000])} sizes="100vw" alt="Modern luxury villa with glass walls and an infinity pool at dusk" fetchpriority="high" width="2000" height="1200" />
      </div>
      <div className="hero__content container">
        <h1 id="hero-title" className="hero__title">Discover Exceptional<br />Homes &amp; Investments</h1>
        <p className="hero__text">Premium properties in prime locations. Find your dream home<br className="hide-sm" /> or the perfect investment with confidence.</p>
      </div>
    </section>
  );
}
