import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Instagram, Linkedin, Facebook, XSocial, ArrowRight } from './Icons';
import { NAV, SITE } from '../data/site';

const SOCIAL = [
  { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com' },
  { label: 'LinkedIn', Icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Facebook', Icon: Facebook, href: 'https://facebook.com' },
  { label: 'X', Icon: XSocial, href: 'https://x.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem('horizon_newsletter') || '[]');
    localStorage.setItem('horizon_newsletter', JSON.stringify([...list, { email, at: new Date().toISOString() }]));
    setDone(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>Premium homes and investments in prime locations. Integrity, transparency and client satisfaction in everything we do.</p>
          <ul className="social" aria-label="Social media">
            {SOCIAL.map(({ label, Icon, href }) => (
              <li key={label}><a href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon width={18} height={18} /></a></li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer__title">Explore</h2>
          <ul>{NAV.map((n) => <li key={n.label}><Link to={n.to}>{n.label}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 className="footer__title">Contact</h2>
          <ul className="footer__contact">
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.address}</li>
          </ul>
        </div>
        <div>
          <h2 className="footer__title">Newsletter</h2>
          {done ? (
            <p className="footer__thanks" role="status">Thank you — you’re on the list.</p>
          ) : (
            <form className="newsletter" onSubmit={subscribe}>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" aria-label="Subscribe"><ArrowRight width={18} height={18} /></button>
            </form>
          )}
          <p className="footer__note">New listings and market insight, monthly.</p>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
        <p>Equal Housing Opportunity</p>
      </div>
    </footer>
  );
}
