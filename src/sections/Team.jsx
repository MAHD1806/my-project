import Reveal from '../components/Reveal';
import { Phone, Mail } from '../components/Icons';
import { img } from '../data/properties';
import { TEAM } from '../data/site';

export default function Team() {
  return (
    <section id="team" className="section team">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Our Team</p>
          <h2 className="h2">Meet the Advisors</h2>
        </Reveal>
        <ul className="team__grid">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 80} className="member">
              <div className="member__photo">
                <img src={img(m.photo, 600)} alt={`Portrait of ${m.name}`} loading="lazy" width="600" height="760" />
                <div className="member__links">
                  <a href={`tel:${m.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${m.name}`}><Phone width={16} height={16} /></a>
                  <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}><Mail width={16} height={16} /></a>
                </div>
              </div>
              <h3 className="member__name">{m.name}</h3>
              <p className="member__role">{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
