import { useMemo, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';
import { Search } from '../components/Icons';
import { properties, locations, propertyTypes } from '../data/properties';
import { useFavorites } from '../hooks/useFavorites';

const PRICE_RANGES = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under $2M', min: 0, max: 2_000_000 },
  { label: '$2M – $3M', min: 2_000_000, max: 3_000_000 },
  { label: '$3M – $5M', min: 3_000_000, max: 5_000_000 },
  { label: '$5M +', min: 5_000_000, max: Infinity },
];
const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => b.featured - a.featured || a.id - b.id },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  beds: { label: 'Most bedrooms', fn: (a, b) => b.beds - a.beds },
  size: { label: 'Largest', fn: (a, b) => b.sqft - a.sqft },
};
const INITIAL = { q: '', location: '', type: '', price: 0, beds: 0, baths: 0, sort: 'featured', saved: false };

function Select({ id, label, value, onChange, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>{children}</select>
    </div>
  );
}

export default function Properties() {
  const [f, setF] = useState(INITIAL);
  const favs = useFavorites();
  const set = (k, num) => (e) => setF((s) => ({ ...s, [k]: num ? Number(e.target.value) : e.target.value }));

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const range = PRICE_RANGES[f.price];
    return properties
      .filter((p) =>
        (!q || `${p.name} ${p.city} ${p.state} ${p.type}`.toLowerCase().includes(q)) &&
        (!f.location || `${p.city}, ${p.state}` === f.location) &&
        (!f.type || p.type === f.type) &&
        p.price >= range.min && p.price < range.max &&
        p.beds >= f.beds && p.baths >= f.baths &&
        (!f.saved || favs.includes(p.id)))
      .sort(SORTS[f.sort].fn);
  }, [f, favs]);

  const dirty = JSON.stringify(f) !== JSON.stringify(INITIAL);

  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Properties</p>
          <h1 className="h1">Find Your Next Home</h1>
          <p>Browse our curated collection of luxury homes and investment properties.</p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <form className="filters" role="search" aria-label="Property search" onSubmit={(e) => e.preventDefault()}>
            <div className="field field--search">
              <label htmlFor="f-q">Search</label>
              <div className="search-input"><Search width={18} height={18} /><input id="f-q" type="search" placeholder="Name, city or type" value={f.q} onChange={set('q')} /></div>
            </div>
            <Select id="f-loc" label="Location" value={f.location} onChange={set('location')}>
              <option value="">All locations</option>
              {locations.map((l) => <option key={l}>{l}</option>)}
            </Select>
            <Select id="f-type" label="Property type" value={f.type} onChange={set('type')}>
              <option value="">All types</option>
              {propertyTypes.map((t) => <option key={t}>{t}</option>)}
            </Select>
            <Select id="f-price" label="Price range" value={f.price} onChange={set('price', true)}>
              {PRICE_RANGES.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
            </Select>
            <Select id="f-beds" label="Bedrooms" value={f.beds} onChange={set('beds', true)}>
              {[0, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n ? `${n}+ beds` : 'Any'}</option>)}
            </Select>
            <Select id="f-baths" label="Bathrooms" value={f.baths} onChange={set('baths', true)}>
              {[0, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n ? `${n}+ baths` : 'Any'}</option>)}
            </Select>
          </form>

          <div className="results-bar">
            <p role="status" aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'property' : 'properties'} found</p>
            <div className="results-bar__right">
              <label className="check"><input type="checkbox" checked={f.saved} onChange={(e) => setF((s) => ({ ...s, saved: e.target.checked }))} /> Saved only ({favs.length})</label>
              <div className="field field--inline">
                <label htmlFor="f-sort">Sort by</label>
                <select id="f-sort" value={f.sort} onChange={set('sort')}>
                  {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
                </select>
              </div>
              {dirty && <button className="link-btn" onClick={() => setF(INITIAL)}>Reset</button>}
            </div>
          </div>

          {results.length ? (
            <ul className="grid-cards">
              {results.map((p) => <li key={p.id}><PropertyCard property={p} variant="grid" sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px" /></li>)}
            </ul>
          ) : (
            <div className="empty">
              <h2>No properties match your search</h2>
              <p>Try widening your filters or resetting them.</p>
              <Button variant="primary" onClick={() => setF(INITIAL)}>Reset filters</Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
