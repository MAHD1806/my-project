import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import Modal from '../components/Modal';
import InquiryForm from '../components/InquiryForm';
import PropertyCard, { FavoriteButton } from '../components/PropertyCard';
import { Pin, Bed, Bath, Area, Check, Calendar, Mail, Phone, ArrowLeft } from '../components/Icons';
import { getProperty, properties, formatPrice, locationOf, img } from '../data/properties';
import { TEAM } from '../data/site';

export default function PropertyDetail() {
  const { slug } = useParams();
  const p = getProperty(slug);
  const [modal, setModal] = useState(null); // 'contact' | 'viewing' | null

  useEffect(() => { setModal(null); }, [slug]);
  useEffect(() => { if (p) document.title = `${p.name} — Horizon Properties`; }, [p]);

  if (!p) {
    return (
      <main className="page page--center">
        <div className="container empty">
          <h1 className="h2">Property not found</h1>
          <p>The listing you’re looking for may have been sold or moved.</p>
          <Button to="/properties" variant="primary">Browse properties</Button>
        </div>
      </main>
    );
  }

  const agent = TEAM[p.agent];
  const similar = properties
    .filter((x) => x.id !== p.id)
    .sort((a, b) => (b.type === p.type) - (a.type === p.type) || Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, 3);
  const specs = [
    { Icon: Bed, label: 'Bedrooms', value: p.beds },
    { Icon: Bath, label: 'Bathrooms', value: p.baths },
    { Icon: Area, label: 'Square feet', value: p.sqft.toLocaleString() },
  ];

  return (
    <main className="page detail">
      <div className="container">
        <Link to="/properties" className="back"><ArrowLeft width={16} height={16} /> All properties</Link>

        <div className="detail__top">
          <div>
            <p className="eyebrow">{p.type}</p>
            <h1 className="h1 h1--dark">{p.name}</h1>
            <p className="detail__loc"><Pin width={16} height={16} /> {locationOf(p)}</p>
          </div>
          <div className="detail__top-right">
            <p className="detail__price">{formatPrice(p.price)}</p>
            <FavoriteButton id={p.id} name={p.name} className="fav--lg" />
          </div>
        </div>

        <Gallery images={p.images} alt={p.name} />

        <div className="detail__grid">
          <div className="detail__main">
            <ul className="specs">
              {specs.map(({ Icon, label, value }) => (
                <li key={label}><Icon width={22} height={22} /><strong>{value}</strong><span>{label}</span></li>
              ))}
              <li><Calendar width={22} height={22} /><strong>{p.year}</strong><span>Year built</span></li>
            </ul>

            <h2 className="h3">About this property</h2>
            <p className="lead lead--body">{p.description}</p>

            <div className="lists">
              <div>
                <h2 className="h3">Key features</h2>
                <ul className="checklist">{p.features.map((f) => <li key={f}><Check width={16} height={16} />{f}</li>)}</ul>
              </div>
              <div>
                <h2 className="h3">Amenities</h2>
                <ul className="checklist">{p.amenities.map((f) => <li key={f}><Check width={16} height={16} />{f}</li>)}</ul>
              </div>
            </div>
          </div>

          <aside className="detail__aside" aria-label="Contact agent">
            <div className="agent">
              <img src={img(agent.photo, 200)} alt={`Portrait of ${agent.name}`} width="72" height="72" loading="lazy" />
              <div>
                <p className="agent__label">Listing agent</p>
                <p className="agent__name">{agent.name}</p>
                <p className="agent__role">{agent.role}</p>
              </div>
            </div>
            <ul className="agent__contact">
              <li><a href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}><Phone width={16} height={16} /> {agent.phone}</a></li>
              <li><a href={`mailto:${agent.email}`}><Mail width={16} height={16} /> {agent.email}</a></li>
            </ul>
            <Button variant="primary" arrow className="btn--block" onClick={() => setModal('viewing')}>Schedule a viewing</Button>
            <Button variant="outline-dark" className="btn--block" onClick={() => setModal('contact')}>Contact agent</Button>
          </aside>
        </div>

        <section className="similar" aria-labelledby="similar-title">
          <h2 id="similar-title" className="h2">Similar Properties</h2>
          <ul className="grid-cards">
            {similar.map((s) => <li key={s.id}><PropertyCard property={s} variant="grid" sizes="(max-width: 640px) 100vw, 380px" /></li>)}
          </ul>
        </section>
      </div>

      <div className="sticky-cta">
        <div>
          <p>{formatPrice(p.price)}</p>
        </div>
        <Button variant="outline-dark" className="btn--sm" onClick={() => setModal('contact')}>Contact</Button>
        <Button variant="primary" className="btn--sm" onClick={() => setModal('viewing')}>Schedule viewing</Button>
      </div>

      {modal && (
        <Modal title={modal === 'viewing' ? `Schedule a viewing — ${p.name}` : `Contact ${agent.name}`} onClose={() => setModal(null)}>
          <InquiryForm mode={modal} property={p} onDone={() => setModal(null)} />
        </Modal>
      )}
    </main>
  );
}
