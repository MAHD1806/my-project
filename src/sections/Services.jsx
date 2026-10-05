import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { img, SERVICES_IMAGE } from '../data/properties';
import { SERVICES } from '../data/site';

export default function Services() {
  return (
    <section id="services" className="section section--tint services">
      <div className="container services__grid">
        <Reveal className="services__intro">
          <p className="eyebrow">Services</p>
          <h2 className="h2">Every Step, Expertly Guided</h2>
          <p className="lead">From the first conversation to the final signature, our advisors bring craft and clarity to each transaction.</p>
          <div className="services__photo">
            <img src={img(SERVICES_IMAGE, 900)} alt="Modern residence with warm interior lighting" loading="lazy" width="900" height="1100" />
          </div>
          <Button to="/contact" variant="primary" arrow>Speak to an Advisor</Button>
        </Reveal>
        <ol className="services__list">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 60} className="service">
              <span className="service__no">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="service__title">{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
