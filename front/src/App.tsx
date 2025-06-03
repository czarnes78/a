import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { AdminAuthProvider } from './auth/AdminAuthContext'; // DODAJ TO
=======
import { AdminAuthProvider } from './auth/AdminAuthContext';
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import CarDetails from './pages/CarDetails';
<<<<<<< HEAD
import AdminLogin from './pages/AdminLogin'; // ścieżka zależna od repo
import AdminPanel from './pages/AdminPanel';
import AdminRequests from './pages/AdminRequests';
import ProtectedRoute from './components/ProtectedRoute';
import AdminHistory from './pages/AdminHistory';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';


=======
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminRequests from './pages/AdminRequests';
import AdminHistory from './pages/AdminHistory';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import ProtectedRoute from './components/ProtectedRoute';
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)

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
<<<<<<< HEAD
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<ProtectedRoute><AdminRequests /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<AdminRequests />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/add-car" element={<AddCar />} />
              <Route path="/admin/edit-car/:id" element={<EditCar />} />
=======

              {/* 🔓 Logowanie admina */}
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* 🔒 Zabezpieczone trasy */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <ProtectedRoute>
                    <AdminRequests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/history"
                element={
                  <ProtectedRoute>
                    <AdminHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-car"
                element={
                  <ProtectedRoute>
                    <AddCar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-car/:id"
                element={
                  <ProtectedRoute>
                    <EditCar />
                  </ProtectedRoute>
                }
              />
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
            </Routes>
          </main>
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

<<<<<<< HEAD

export default App;
=======
export default App;
>>>>>>> 416abc3 (Wersja projektu oddana, zaliczona)
