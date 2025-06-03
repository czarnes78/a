import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Info, Car as CarIcon } from 'lucide-react';
import { useAdminAuth } from '../auth/AdminAuthContext';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [car, setCar] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
<<<<<<< HEAD
    fetch(`http://localhost:4000/api/cars/${id}`)
=======
    fetch(`/api/cars/${id}`)
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
      .then(res => res.json())
      .then(data => setCar(data))
      .catch(err => console.error('Błąd pobierania auta:', err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest = {
      ...formData,
      startDate,
      endDate,
      carId: car.id,
      carName: car.name
    };

    try {
<<<<<<< HEAD
      await fetch('http://localhost:4000/api/reservations', {
=======
      await fetch("/api/reservations", {
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
      setShowContactForm(false);
      alert('Dziękujemy za zapytanie. Skontaktujemy się z Państwem wkrótce.');
    } catch (error) {
      console.error('Błąd podczas wysyłania formularza:', error);
    }
  };

  if (!car) {
    return <div className="p-8 text-gray-600">Wczytywanie danych samochodu...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{car.name}</h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <CarIcon className="h-5 w-5 text-blue-600" />
              <span>Segment: {car.segment}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <span>Typ: {car.type}</span>
            </div>
            <div>Przebieg: {car.mileage} km</div>
            <div>Silnik: {car.engine}</div>
            <div>Rok produkcji: {car.year}</div>
            <div>{car.childSeat ? 'Fotelik dostępny' : 'Brak fotelika'}</div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Wyposażenie:</h2>
            <ul className="grid grid-cols-2 gap-2">
              {car.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Opis:</h2>
            <p className="text-gray-600">{car.description}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-3xl font-bold text-blue-600">
              {car.price} PLN/dzień
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Zapytaj o dostępność
              </button>

              {isAdmin && (
                <button
                  onClick={() => navigate(`/admin/edit-car/${car.id}`)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edytuj samochód
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Zapytaj o dostępność</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Data początkowa
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    Data końcowa
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Wyślij
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
