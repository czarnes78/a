import { useEffect, useState } from 'react';

interface Request {
  name: string;
  email: string;
  phone: string;
  message: string;
  startDate: string;
  endDate: string;
  carId: number;
  carName: string;
  timestamp: string;
  action: 'accept' | 'reject';
}

export default function AdminHistory() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/reservations/history')
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Błąd ładowania historii:', err));
  }, []);

  const handleDelete = (timestamp: string) => {
    fetch(`http://localhost:4000/api/reservations/history/${timestamp}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setRequests((prev) => prev.filter((r) => r.timestamp !== timestamp));
        } else {
          alert('Błąd podczas usuwania.');
        }
      })
      .catch(() => alert('Błąd sieci przy usuwaniu historii.'));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Historia rezerwacji</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Brak zarchiwizowanych rezerwacji.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, index) => (
            <li key={index} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Samochód:</strong> {req.carName}</p>
              <p><strong>Imię:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Status:</strong> <span className={req.action === 'accept' ? 'text-green-600' : 'text-red-600'}>
                {req.action === 'accept' ? 'Zaakceptowana' : 'Odrzucona'}
              </span></p>
              <p className="text-sm text-gray-500">Zarchiwizowano: {new Date(req.timestamp).toLocaleString()}</p>
              <button
                onClick={() => handleDelete(req.timestamp)}
                className="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Usuń z historii
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
