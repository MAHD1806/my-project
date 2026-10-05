import { Link } from 'react-router-dom';

export function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 36V15l7-5v26M12 36V8l8-5 8 5v28M28 36V14l7 5v17M3 36h34M17 14v22M23 14v22" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`logo ${className}`} aria-label="Horizon Properties — home">
      <span className="logo__mark"><LogoMark /></span>
      <span className="logo__text">
        <span className="logo__name">HORIZON</span>
        <span className="logo__sub">PROPERTIES</span>
      </span>
    </Link>
  );
}
