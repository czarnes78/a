import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-center mb-6">
        <UserCircle className="h-16 w-16 text-blue-600" />
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Logowanie dla klientów biznesowych' : 'Rejestracja konta biznesowego'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block mb-1">Hasło</label>
          <input
            type="password"
            required
            className="w-full border rounded-md p-2"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block mb-1">Nazwa firmy</label>
            <input
              type="text"
              required
              className="w-full border rounded-md p-2"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
        </button>
      </div>
    </div>
  );
}