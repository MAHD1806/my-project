import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { Key } from '../components/Icons';

export default function CtaBand() {
  return (
    <section className="cta-wrap">
      <div className="container">
        <Reveal className="cta">
          <span className="cta__icon"><Key width={34} height={34} /></span>
          <div className="cta__copy">
            <h2>Ready to Find Your Perfect Property?</h2>
            <p>Let our experts guide you to the right home or investment.</p>
          </div>
          <Button to="/contact" arrow>Get in Touch</Button>
        </Reveal>
      </div>
    </section>
  );
}
