// src/auth/AdminAuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔁 Przy pierwszym załadowaniu sprawdź localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem('isAdmin');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true'); // 🔐 zapisz do localStorage
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin'); // ❌ usuń z localStorage
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};
