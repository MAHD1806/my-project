import Reveal from '../components/Reveal';
import { WHY } from '../data/site';

export default function Why() {
  return (
    <section id="why" className="section why">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow eyebrow--light">Why Choose Horizon</p>
          <h2 className="h2 h2--light">A Higher Standard of Service</h2>
        </Reveal>
        <ul className="why__grid">
          {WHY.map((w, i) => (
            <Reveal as="li" key={w.label} delay={i * 80} className="why__item">
              <p className="why__value">{w.value}</p>
              <h3 className="why__label">{w.label}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
