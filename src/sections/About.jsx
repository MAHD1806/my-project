import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { ArrowRight } from '../components/Icons';
import { img, srcSet, ABOUT_IMAGES } from '../data/properties';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <p className="eyebrow">About Us</p>
          <h2 className="h2">Who We Are</h2>
          <p className="lead">At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do.</p>
          <Button to="/contact" arrow>Learn More</Button>
        </Reveal>
        <Reveal className="about__media" delay={120}>
          <div className="about__img about__img--main">
            <img src={img(ABOUT_IMAGES[0], 1000)} srcSet={srcSet(ABOUT_IMAGES[0], [500, 800, 1100])} sizes="(max-width: 900px) 90vw, 560px" alt="Contemporary home with terraces, pool and palm trees" loading="lazy" width="1000" height="760" />
          </div>
          <div className="about__img about__img--side" aria-hidden="true">
            <img src={img(ABOUT_IMAGES[1], 600)} alt="" loading="lazy" width="600" height="760" />
          </div>
          <Link to="/properties" className="round-btn about__arrow" aria-label="Browse all properties"><ArrowRight width={18} height={18} /></Link>
        </Reveal>
      </div>
    </section>
  );
}
