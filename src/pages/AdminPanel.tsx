// src/pages/AdminPanel.tsx
import { useAdminAuth } from '../auth/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel administratora</h1>
      <button
        onClick={() => navigate('/admin/requests')}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition mb-4"
      >
        Aktualne prośby o rezerwacje
      </button>
      <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
        Wyloguj
      </button>
      <p className="mt-4 text-gray-600">Tu pojawią się funkcje: zdejmowanie aut, dodawanie po VIN itd.</p>
    </div>
  );
}
