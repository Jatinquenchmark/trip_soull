import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import DestinationDetails from './pages/DestinationDetails';
import PackageDetails from './components/PackageDetails';
import Footer from './components/Footer';

function AppInner() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/package/') || location.pathname.startsWith('/destination/');

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-luxury-gold selection:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/destination/:countryId" element={<DestinationDetails />} />
        <Route path="/package/:id" element={<PackageDetails />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
