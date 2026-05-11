import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customize from './pages/Customize';
import Packages from './pages/Packages';
import PackageDetails from './components/PackageDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCFB] selection:bg-luxury-gold selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/customize/:countryId" element={<Customize />} />
          <Route path="/package/:id" element={<PackageDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
