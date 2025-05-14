import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { cars } from '../data/cars';
import { Calendar, Info, Car as CarIcon } from 'lucide-react';

export default function CarDetails() {
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const car = cars.find(c => c.id === Number(id));

  if (!car) {
    return <div>Nie znaleziono samochodu</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowContactForm(false);
    alert('Dziękujemy za zapytanie. Skontaktujemy się z Państwem wkrótce.');
  };

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
              {car.features.map((feature, index) => (
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

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-blue-600">
              {car.price} PLN/dzień
            </div>
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Zapytaj o dostępność
            </button>
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border rounded-md p-2"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">Telefon</label>
                  <input
                    type="tel"
                    required
                    className="w-full border rounded-md p-2"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">Wiadomość</label>
                  <textarea
                    required
                    className="w-full border rounded-md p-2"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
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