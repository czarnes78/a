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
}

export default function AdminRequests() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch('http://localhost:4000/api/reservations')
=======
    fetch("/api/reservations")
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error('Błąd ładowania zapytań:', err));
  }, []);

  const archiveRequest = async (req: Request, action: 'accept' | 'reject') => {
<<<<<<< HEAD
    await fetch('http://localhost:4000/api/reservations/archive', {
=======
    await fetch("/api/reservations/archive", {
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...req,
        action,
        originalTimestamp: req.timestamp
      })
    });

    setRequests(prev => prev.filter(r => r.timestamp !== req.timestamp));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Aktualne prośby o rezerwacje</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">Brak zapytań.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req, index) => (
            <li key={index} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>Samochód:</strong> {req.carName}</p>
              <p><strong>Imię:</strong> {req.name}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Telefon:</strong> {req.phone}</p>
              <p><strong>Data:</strong> {req.startDate} – {req.endDate}</p>
              <p><strong>Wiadomość:</strong> {req.message}</p>
              <p className="text-sm text-gray-500">Zgłoszono: {new Date(req.timestamp).toLocaleString()}</p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => archiveRequest(req, 'accept')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Akceptuj
                </button>
                <button
                  onClick={() => archiveRequest(req, 'reject')}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Odrzuć
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
