import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import { Car, CarSegment, CarType } from '../types';

export default function Home() {
  const [segment, setSegment] = useState<CarSegment | ''>('');
  const [type, setType] = useState<CarType | ''>('');
  const [childSeat, setChildSeat] = useState(false);

  const filteredCars = cars.filter(car => {
    if (segment && car.segment !== segment) return false;
    if (type && car.type !== type) return false;
    if (childSeat && !car.childSeat) return false;
    return true;
  });

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-72 bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
        <h2 className="text-xl font-semibold mb-6">Filtry</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Segment</h3>
            <div className="space-y-2">
              {['KLASA A', 'KLASA B', 'KLASA C', 'KLASA D', 'KLASA E', 'KLASA F', 'KLASA J'].map((seg) => (
                <label key={seg} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={segment === seg.toLowerCase()}
                    onChange={() => setSegment(segment === seg.toLowerCase() ? '' : seg.toLowerCase() as CarSegment)}
                  />
                  <span className="ml-2">{seg}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Typ nadwozia</h3>
            <div className="space-y-2">
              {['Sedan', 'SUV', 'Hatchback', 'Kombi', 'Van'].map((t) => (
                <label key={t} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={type === t.toLowerCase()}
                    onChange={() => setType(type === t.toLowerCase() ? '' : t.toLowerCase() as CarType)}
                  />
                  <span className="ml-2">{t}</span>
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
                    disabled
                  />
                  <span className="ml-2">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-medium mb-3">Kontakt</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <span className="material-icons-outlined mr-2">📞</span>
                +48 123 456 789
              </p>
              <p className="flex items-center">
                <span className="material-icons-outlined mr-2">✉️</span>
                kontakt@mbmrent.pl
              </p>
              <p className="flex items-center">
                <span className="material-icons-outlined mr-2">📍</span>
                ul. Nowoursynowska 161, 02-787 Warszawa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Segment: </span>
                    <span className="ml-1 font-medium capitalize">{car.segment}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>Typ: </span>
                    <span className="ml-1 font-medium capitalize">{car.type}</span>
                  </div>
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