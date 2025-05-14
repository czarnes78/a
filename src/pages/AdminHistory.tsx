import { useEffect, useState } from 'react';

interface Request {
  name: string;
  email: string;
  carName: string;
  action: 'accept' | 'reject';
  timestamp: string;
}

export default function AdminHistory() {
  const [history, setHistory] = useState<Request[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/reservations/history')
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error('Błąd ładowania historii:', err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Historia rezerwacji</h2>

      {history.length === 0 ? (
        <p className="text-gray-600">Brak zarchiwizowanych rezerwacji.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Samochód:</strong> {item.carName}</p>
              <p><strong>Imię:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Status:</strong> {item.action === 'accept' ? '✅ Zaakceptowana' : '❌ Odrzucona'}</p>
              <p className="text-sm text-gray-500">Zarchiwizowano: {new Date(item.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
