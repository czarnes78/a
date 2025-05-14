import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6">Panel administratora</h1>

      <div className="space-x-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/admin/requests')}
        >
          Aktualne prośby o rezerwacje
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={() => navigate('/admin/history')}
        >
          Historia rezerwacji
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate('/admin/add-car')}
        >
          Dodaj samochód
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/');
          }}
        >
          Wyloguj
        </button>
      </div>

      <p className="text-gray-500">
        Tu pojawią się funkcje: zdejmowanie aut, dodawanie po VIN itd.
      </p>
    </div>
  );
}
