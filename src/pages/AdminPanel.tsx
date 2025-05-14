// src/pages/AdminPanel.tsx
import { useAdminAuth } from '../auth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Panel administratora</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/requests')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Aktualne prośby o rezerwacje
        </button>
        <button
          onClick={() => navigate('/admin/history')}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
        >
          Historia rezerwacji
        </button>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Wyloguj
        </button>
      </div>

      <p className="text-gray-600">
        Tu pojawią się funkcje: zdejmowanie aut, dodawanie po VIN itd.
      </p>
    </div>
  );
}
