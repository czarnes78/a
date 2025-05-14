import React, { useState } from 'react';

export default function AddCar() {
  const [formData, setFormData] = useState({
    name: '',
    segment: '',
    type: '',
    mileage: '',
    engine: '',
    year: '',
    childSeat: false,
    features: [],
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFormData(prev => {
      const features = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCar = {
      ...formData,
      mileage: Number(formData.mileage),
      year: Number(formData.year),
      price: Number(formData.price),
    };

    const res = await fetch('http://localhost:4000/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar),
    });

    if (res.ok) {
      alert('Samochód dodany!');
      setFormData({
        name: '', segment: '', type: '', mileage: '', engine: '', year: '',
        childSeat: false, features: [], description: '', price: '', image: ''
      });
    } else {
      alert('Błąd przy dodawaniu samochodu.');
    }
  };

  const segmentOptions = ['klasa a', 'klasa b', 'klasa c', 'klasa d', 'klasa e', 'klasa f', 'klasa j'];
  const typeOptions = ['sedan', 'suv', 'hatchback', 'kombi', 'van'];
  const featureOptions = ['Nawigacja GPS', 'Automatyczna skrzynia', 'Bluetooth', 'Bagażnik dachowy'];

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Dodaj nowy samochód</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow p-6 rounded-lg">
        <div>
          <label className="block font-medium mb-1">Model</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Segment</label>
          <select name="segment" value={formData.segment} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">-- wybierz segment --</option>
            {segmentOptions.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Typ</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">-- wybierz typ --</option>
            {typeOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Przebieg (km)</label>
          <input name="mileage" type="number" value={formData.mileage} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Silnik</label>
          <input name="engine" value={formData.engine} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Rok produkcji</label>
          <input name="year" type="number" value={formData.year} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Fotelik dla dziecka</label>
          <input type="checkbox" name="childSeat" checked={formData.childSeat} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Wyposażenie</label>
          <div className="space-y-1">
            {featureOptions.map(feature => (
              <label key={feature} className="block">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="mr-2"
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Opis</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Cena (PLN/dzień)</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block font-medium mb-1">Link do zdjęcia</label>
          <input name="image" value={formData.image} onChange={handleChange} className="w-full border rounded p-2" />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Dodaj samochód
          </button>
        </div>
      </form>
    </div>
  );
}