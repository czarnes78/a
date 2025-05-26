import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

const siteKey = '6Lde9EgrAAAAAO0IdAm0hoVrcUfrnCINOmjQEkWw'; // << Twój klucz reCAPTCHA
console.log('Długość siteKey:', siteKey.length);


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    captchaToken: '',
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.captchaToken) {
      alert('Proszę potwierdzić, że nie jesteś robotem.');
      return;
    }

    setSending(true);

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Dziękujemy za wiadomość. Odpowiemy najszybciej jak to możliwe.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          captchaToken: '',
        });
      } else {
        alert('Błąd podczas wysyłania wiadomości.');
      }
    } catch (err) {
      alert('Nie udało się połączyć z serwerem.');
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Kontakt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Dane kontaktowe</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <span>+48 123 456 789</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>kontakt@mbmrent.pl</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>ul. Nowoursynowska 161, 02-787 Warszawa</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Godziny otwarcia:</h3>
            <p>Poniedziałek - Piątek: 8:00 - 20:00</p>
            <p>Sobota: 9:00 - 16:00</p>
            <p>Niedziela: zamknięte</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Formularz kontaktowy</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Imię i nazwisko</label>
              <input
                type="text"
                required
                className="w-full border rounded-md p-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full border rounded-md p-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-1">Telefon</label>
              <input
                type="tel"
                required
                className="w-full border rounded-md p-2"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-1">Wiadomość</label>
              <textarea
                required
                className="w-full border rounded-md p-2"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(token) => setFormData({ ...formData, captchaToken: token || '' })}
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {sending ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
