import { useState } from 'react';
import Button from './Button';
import { Check } from './Icons';

const STORE = 'horizon_inquiries';

// mode: "contact" | "viewing". Submissions are stored locally; swap save() for an API call later.
export function save(entry) {
  const list = JSON.parse(localStorage.getItem(STORE) || '[]');
  localStorage.setItem(STORE, JSON.stringify([...list, { ...entry, at: new Date().toISOString() }]));
}

export default function InquiryForm({ mode = 'contact', property, onDone }) {
  const viewing = mode === 'viewing';
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const today = new Date().toISOString().split('T')[0];

  const submit = (e) => {
    e.preventDefault();
    save({ mode, property: property?.name || null, ...form });
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon"><Check width={26} height={26} /></span>
        <h3>{viewing ? 'Viewing requested' : 'Message sent'}</h3>
        <p>Thank you, {form.name.split(' ')[0] || 'we'} — a Horizon advisor will be in touch within one business day.</p>
        {onDone && <Button variant="primary" onClick={onDone}>Close</Button>}
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <div className="field"><label htmlFor={`${mode}-name`}>Full name</label><input id={`${mode}-name`} required value={form.name} onChange={set('name')} autoComplete="name" /></div>
        <div className="field"><label htmlFor={`${mode}-email`}>Email</label><input id={`${mode}-email`} type="email" required value={form.email} onChange={set('email')} autoComplete="email" /></div>
      </div>
      <div className="form__row">
        <div className="field"><label htmlFor={`${mode}-phone`}>Phone</label><input id={`${mode}-phone`} type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></div>
        {viewing && <div className="field"><label htmlFor={`${mode}-date`}>Preferred date</label><input id={`${mode}-date`} type="date" required min={today} value={form.date} onChange={set('date')} /></div>}
      </div>
      <div className="field">
        <label htmlFor={`${mode}-msg`}>Message</label>
        <textarea id={`${mode}-msg`} rows={4} required value={form.message} onChange={set('message')} placeholder={property ? `I’m interested in ${property.name}.` : 'How can we help?'} />
      </div>
      <Button variant="primary" type="submit" arrow>{viewing ? 'Request viewing' : 'Send message'}</Button>
    </form>
  );
}
