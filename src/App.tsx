import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './auth/AdminAuthContext'; // DODAJ TO
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import CarDetails from './pages/CarDetails';
import AdminLogin from './pages/AdminLogin'; // ścieżka zależna od repo
import AdminPanel from './pages/AdminPanel';
import AdminRequests from './pages/AdminRequests';
import ProtectedRoute from './components/ProtectedRoute';
import AdminHistory from './pages/AdminHistory';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';



function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<ProtectedRoute><AdminRequests /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<AdminRequests />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/add-car" element={<AddCar />} />
              <Route path="/admin/edit-car/:id" element={<EditCar />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AdminAuthProvider>
  );
}


export default App;