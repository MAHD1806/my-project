import { Link } from 'react-router-dom';
import { img, srcSet, formatPrice, locationOf } from '../data/properties';
import { Pin, Bed, Bath, Area, Heart } from './Icons';
import { useFavorites, toggleFavorite } from '../hooks/useFavorites';

export function FavoriteButton({ id, name, className = '' }) {
  const favs = useFavorites();
  const on = favs.includes(id);
  return (
    <button
      type="button"
      className={`fav ${on ? 'is-on' : ''} ${className}`}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from saved` : `Save ${name}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(id); }}
    >
      <Heart filled={on} width={18} height={18} />
    </button>
  );
}

// variant "overlay": info over the image (featured carousel). "grid": info below (listings).
export default function PropertyCard({ property: p, variant = 'overlay', lazy = true, sizes = '(max-width: 640px) 80vw, 420px' }) {
  const cover = p.images[0];
  return (
    <article className={`pcard pcard--${variant}`}>
      <Link to={`/properties/${p.slug}`} className="pcard__link" draggable="false">
        <div className="pcard__media">
          <img src={img(cover, 800)} srcSet={srcSet(cover)} sizes={sizes} alt={`${p.name} — ${p.type.toLowerCase()} in ${p.city}`} loading={lazy ? 'lazy' : 'eager'} decoding="async" draggable="false" width="800" height="1000" />
          {variant === 'grid' && <span className="pcard__tag">{p.type}</span>}
        </div>
        <div className="pcard__info">
          <h3 className="pcard__name">{p.name}</h3>
          <p className="pcard__loc"><Pin width={14} height={14} /> {locationOf(p)}</p>
          {variant === 'grid' && (
            <ul className="pcard__specs" aria-label="Key details">
              <li><Bed width={16} height={16} /> {p.beds} Beds</li>
              <li><Bath width={16} height={16} /> {p.baths} Baths</li>
              <li><Area width={16} height={16} /> {p.sqft.toLocaleString()} sq ft</li>
            </ul>
          )}
          <p className="pcard__price">{formatPrice(p.price)}</p>
        </div>
      </Link>
      <FavoriteButton id={p.id} name={p.name} className="pcard__fav" />
    </article>
  );
}
