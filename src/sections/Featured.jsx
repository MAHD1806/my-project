import Reveal from '../components/Reveal';
import Carousel from '../components/Carousel';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Featured() {
  const items = properties.filter((p) => p.featured);
  return (
    <section id="featured" className="section featured">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">Featured</p>
          <h2 className="h2">Featured Properties</h2>
        </Reveal>
        <Reveal delay={100}>
          <Carousel label="featured properties" className="featured__carousel">
            {items.map((p) => <PropertyCard key={p.id} property={p} />)}
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
