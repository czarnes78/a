import React from 'react';
import { Link } from 'react-router-dom';
import { Car, UserCircle, Phone, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">MBM_rental</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-blue-100 transition-colors">
              <Home className="h-5 w-5" />
              <span>Strona główna</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-blue-100 transition-colors">
              <UserCircle className="h-5 w-5" />
              <span>O nas</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-blue-100 transition-colors">
              <Phone className="h-5 w-5" />
              <span>Kontakt</span>
            </Link>
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Logowanie
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}