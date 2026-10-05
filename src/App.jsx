import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CtaBand from './sections/CtaBand';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import Button from './components/Button';

// Scrolls to #hash targets or top on every navigation.
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

const NotFound = () => (
  <main className="page page--center"><div className="container empty">
    <h1 className="h2">Page not found</h1>
    <Button to="/" variant="primary">Back home</Button>
  </div></main>
);

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { if (!pathname.startsWith('/properties/')) document.title = 'Horizon Properties — Exceptional Homes & Investments'; }, [pathname]);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollManager />
      <Header />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {pathname !== '/' && pathname !== '/contact' && <CtaBand />}
      <Footer />
    </>
  );
}
