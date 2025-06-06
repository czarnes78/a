import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

<<<<<<< HEAD
// ✅ Typ rezerwacji, żeby naprawić błędy TS
=======
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
type Reservation = {
  carId: number;
  action: string;
  startDate: string;
  endDate: string;
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [segments, setSegments] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [childSeat, setChildSeat] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
<<<<<<< HEAD
  const [reservationHistory, setReservationHistory] = useState<Reservation[]>([]); // 🛠️ naprawiony typ

  useEffect(() => {
    fetch('http://localhost:4000/api/reservations/history')
      .then((res) => res.json())
      .then((data) => setReservationHistory(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
=======
  const [reservationHistory, setReservationHistory] = useState<Reservation[]>([]);

  // 🚀 Mechanizm automatycznego odświeżania JWT co 55 minut
  useEffect(() => {
    const fetchToken = () => {
      fetch("/api/test-jwt")
        .then(res => res.json())
        .then(data => {
          console.log("Nowy token:", data.token);
          localStorage.setItem('adminToken', data.token);
        })
        .catch(err => console.error("Błąd pobierania nowego JWT:", err));
    };

    // Pierwsze pobranie po załadowaniu komponentu
    fetchToken();

    // Ustaw co 55 minut odświeżanie tokena
    const interval = setInterval(() => {
      fetchToken();
    }, 55 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    fetch("/api/reservations/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          console.warn("Brak uprawnień do historii (JWT?)");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dane historii w Home:", data);
        if (!Array.isArray(data)) {
          console.warn("Dane historii nie są tablicą");
          setReservationHistory([]);
        } else {
          setReservationHistory(data);
        }
      })
      .catch((err) => {
        console.error("Błąd historii:", err);
        setReservationHistory([]);
      });
  }, []);

  useEffect(() => {
    fetch("/api/cars")
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error('Błąd ładowania aut:', err));
  }, []);

  const handleSegmentChange = (seg: string) => {
    setSegments(prev =>
      prev.includes(seg) ? prev.filter(s => s !== seg) : [...prev, seg]
    );
  };

  const handleTypeChange = (type: string) => {
    setTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const resetFilters = () => {
    setSegments([]);
    setTypes([]);
    setChildSeat(false);
    setSelectedFeatures([]);
  };

  const isCarReservedNow = (carId: number) => {
    const now = new Date();
<<<<<<< HEAD
=======
    if (!Array.isArray(reservationHistory)) {
      console.warn('Brak poprawnej historii rezerwacji:', reservationHistory);
      return false;
    }
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
    return reservationHistory.some(r =>
      r.carId === carId &&
      r.action === 'accept' &&
      new Date(r.startDate) <= now &&
      now <= new Date(r.endDate)
    );
  };

  const filteredCars = cars.filter(car => {
    if (segments.length > 0 && !segments.includes(car.segment.toLowerCase())) return false;
    if (types.length > 0 && !types.includes(car.type.toLowerCase())) return false;
    if (childSeat && !car.childSeat) return false;
    if (selectedFeatures.length > 0 && !selectedFeatures.every(f =>
      car.features.some(cf => cf.toLowerCase() === f.toLowerCase())
    )) return false;
    return true;
  });

  return (
    <div className="flex">
      <div className="w-72 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        <h2 className="text-xl font-semibold mb-6">Filtry</h2>
<<<<<<< HEAD

=======
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Segment</h3>
            <div className="space-y-2">
              {['klasa a', 'klasa b', 'klasa c', 'klasa d', 'klasa e', 'klasa f', 'klasa j'].map((seg) => (
                <label key={seg} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={segments.includes(seg)}
                    onChange={() => handleSegmentChange(seg)}
                  />
                  <span className="ml-2">{seg.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Typ nadwozia</h3>
            <div className="space-y-2">
              {['sedan', 'suv', 'hatchback', 'kombi', 'van'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={types.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span className="ml-2">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Wyposażenie</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  checked={childSeat}
                  onChange={(e) => setChildSeat(e.target.checked)}
                />
                <span className="ml-2">Fotelik dla dziecka</span>
              </label>
              {['Nawigacja GPS', 'Automatyczna skrzynia', 'Bluetooth', 'Bagażnik dachowy'].map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureChange(feature)}
                  />
                  <span className="ml-2">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="mt-4 w-full text-sm bg-gray-100 border border-gray-300 rounded py-2 hover:bg-gray-200 transition-colors"
          >
            Resetuj filtry
          </button>

          <div className="pt-6 border-t">
            <h3 className="font-medium mb-3">Kontakt</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">📞 +48 123 456 789</p>
              <p className="flex items-center">✉️ kontakt@mbmrent.pl</p>
              <p className="flex items-center">📍 ul. Nowoursynowska 161, 02-787 Warszawa</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 ml-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isCarReservedNow(car.id) ? 'opacity-40 grayscale' : ''}`}
                />
                {isCarReservedNow(car.id) && (
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black bg-opacity-30">
                    Niedostępne
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div>Segment: <span className="font-medium capitalize">{car.segment}</span></div>
                  <div>Typ: <span className="font-medium capitalize">{car.type}</span></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {car.price} PLN/dzień
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Zarezerwuj
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
