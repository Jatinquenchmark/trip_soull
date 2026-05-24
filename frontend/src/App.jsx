import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import DestinationDetails from './pages/DestinationDetails';
import PackageDetails from './components/PackageDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function AppInner() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-luxury-gold selection:text-white">
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/destination/:countryId" element={<DestinationDetails />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInner />
      </Router>
    </AuthProvider>
  );
}

export default App;
