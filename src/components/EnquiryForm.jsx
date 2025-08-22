import { useState } from 'react';

export default function EnquiryForm({ product }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    // Build form data to send to Formspree
    const data = new FormData();

    data.append('name', form.name);
    data.append('email', form.email);
    data.append('phone', form.phone);
    data.append('message', form.message);

    // Include product info as hidden fields
    data.append('productId', product?.id || '');
    data.append('productTitle', product?.title || '');

    try {
      const response = await fetch('https://formspree.io/f/xanbronl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        setOk(true);
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        const result = await response.json();
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Enquiry</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          disabled={sending}
          name="name"
        />
        <input
          className="border rounded-xl px-3 py-2"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          disabled={sending}
          name="email"
        />
        <input
          className="border rounded-xl px-3 py-2"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          disabled={sending}
          name="phone"
        />
        <textarea
          className="border rounded-xl px-3 py-2"
          rows="4"
          placeholder="Tell us what you need…"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          disabled={sending}
          name="message"
        />
        <button className="btn" type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Enquiry'}
        </button>
        {ok && <p className="text-green-600 text-sm">Thanks! We received your enquiry.</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}