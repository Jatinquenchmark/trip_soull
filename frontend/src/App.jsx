import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import DestinationDetails from './pages/DestinationDetails';
import PackageDetails from './components/PackageDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import DataSafety from './pages/DataSafety';
import ServiceRules from './pages/ServiceRules';
import SitePreferences from './pages/SitePreferences';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import MyBookings from './pages/MyBookings';
import Wishlist from './pages/Wishlist';
import Footer from './components/Footer';
import RefundPolicy from './pages/RefundPolicy';
import Reviews from './pages/Reviews';
import OurTeam from './pages/OurTeam';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import WhatsAppButton from './components/WhatsAppButton';

function AppInner() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isUserDashboard = ['/dashboard', '/profile', '/bookings', '/wishlist'].includes(location.pathname);
  const hideNavAndFooter = isAdminPath || isAuthPage || isUserDashboard;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-luxury-gold selection:text-white">
      <Toaster position="top-center">
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button 
                    onClick={() => toast.dismiss(t.id)} 
                    className="ml-2 p-1 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/destination/:countryId" element={<DestinationDetails />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/privacy-policy" element={<DataSafety />} />
        <Route path="/terms-conditions" element={<ServiceRules />} />
        <Route path="/cookie-policy" element={<SitePreferences />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Customer Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        
        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
      {!hideNavAndFooter && <WhatsAppButton />}
    </div>
  );
}

import { ClerkProvider } from '@clerk/react';

function App() {
  const navigate = useNavigate();
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={(to) => navigate(to)}>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ClerkProvider>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
