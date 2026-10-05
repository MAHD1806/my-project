import InquiryForm from '../components/InquiryForm';
import { Phone, Mail, Pin } from '../components/Icons';
import { SITE } from '../data/site';

export default function Contact() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--light">Contact</p>
          <h1 className="h1">Get in Touch</h1>
          <p>Let our experts guide you to the right home or investment.</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container contact__grid">
          <div>
            <h2 className="h3">Send us a message</h2>
            <InquiryForm mode="contact" />
          </div>
          <div className="contact__info">
            <h2 className="h3">Visit or call</h2>
            <ul>
              <li><Phone width={20} height={20} /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li><Mail width={20} height={20} /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><Pin width={20} height={20} /><span>{SITE.address}</span></li>
            </ul>
            <p className="contact__hours">Monday – Friday, 9am – 6pm<br />Saturday by appointment</p>
          </div>
        </div>
      </section>
    </main>
  );
}
