import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Phone, Menu, Close } from './Icons';
import { NAV, SITE } from '../data/site';

export default function Header() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (to) => {
    const [path, h] = to.split('#');
    if (h) return pathname === (path || '/') && hash === `#${h}`;
    if (to === '/') return pathname === '/' && !hash;
    return pathname.startsWith(to);
  };

  const solid = scrolled || open || !overHero;

  return (
    <header className={`header ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar container container--wide">
        <Logo />
        <nav className="header__nav" aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={`navlink ${isActive(item.to) ? 'is-active' : ''}`} aria-current={isActive(item.to) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={SITE.phoneHref} className="btn btn--outline btn--sm header__phone">
          <Phone width={15} height={15} /> {SITE.phone}
        </a>
        <button
          className="header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open} inert={!open ? '' : undefined}>
        <ul>
          {NAV.map((item) => (
            <li key={item.label}>
              <Link to={item.to} className={`mobile-menu__link ${isActive(item.to) ? 'is-active' : ''}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <a href={SITE.phoneHref} className="btn btn--outline btn--block"><Phone width={16} height={16} /> {SITE.phone}</a>
      </div>
    </header>
  );
}
