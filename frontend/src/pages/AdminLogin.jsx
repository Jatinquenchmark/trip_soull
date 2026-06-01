import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Cloud, AlertCircle, Compass } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();

  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        await login();
        navigate('/admin');
      } else {
        const errData = await response.json();
        throw new Error(errData.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotClick = () => {
    alert("Please contact the main developer or database administrator to reset your credentials.");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col md:flex-row overflow-x-hidden font-sans">
      
      {/* LEFT PANEL - Branding & Visuals (Visible on MD and up) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0A0E1A] via-[#111827] to-[#1E293B] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        {/* Dynamic Background Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#2B4A8C]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 relative z-10"
        >
          <div className="bg-luxury-gold/10 p-2.5 rounded-2xl border border-luxury-gold/20 flex items-center justify-center">
            <Compass className="w-6 h-6 text-luxury-gold animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <span className="text-xl font-bold tracking-[0.15em] text-white uppercase font-sans">
            Trip<span className="text-luxury-gold">Soul</span>
          </span>
        </motion.div>

        {/* Center Content */}
        <div className="my-auto relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-[10px] tracking-[0.3em] text-luxury-gold uppercase font-bold bg-luxury-gold/10 px-3 py-1.5 rounded-full border border-luxury-gold/20">
              Admin Control Panel
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-medium tracking-tight text-white mt-6 leading-tight font-serif"
          >
            Manage the Future of <br />
            <span className="text-luxury-gold italic font-normal">Travel.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-400 text-base mt-6 leading-relaxed font-normal"
          >
            Our advanced admin dashboard gives you complete control over premium travel experiences, bookings, and customer insights.
          </motion.p>
        </div>

        {/* Bottom Features */}
        <div className="relative z-10 border-t border-slate-800/80 pt-8 mt-8">
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-luxury-gold text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Access</span>
              </div>
              <p className="text-xs text-slate-400">Enterprise-grade security using JWT & Bcrypt.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-luxury-gold text-sm font-semibold">
                <Cloud className="w-4 h-4" />
                <span>Global Cloud</span>
              </div>
              <p className="text-xs text-slate-400">Fast content delivery with Cloudinary integration.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-slate-500 text-[10px] mt-8 font-medium flex justify-between"
          >
            <span>© 2026 TripSoul Admin Portal</span>
            <span>v1.0.0 Stable</span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL - Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 relative">
        {/* Background elements for mobile/tablet */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-luxury-gold/5 rounded-full blur-[80px] pointer-events-none md:hidden"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2B4A8C]/5 rounded-full blur-[80px] pointer-events-none md:hidden"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-10 md:hidden justify-center">
            <Compass className="w-5 h-5 text-luxury-gold" />
            <span className="text-lg font-bold tracking-wider text-slate-900 uppercase">
              Trip<span className="text-luxury-gold">Soul</span>
            </span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 font-serif">
              Sign In
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Enter your administrative credentials.
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 font-medium flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold/50 transition-all placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={handleForgotClick}
                  className="text-xs font-semibold text-luxury-gold hover:text-luxury-black transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold/50 transition-all placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1A1A1A] hover:bg-[#C5A059] text-white py-4 rounded-2xl font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-[#1A1A1A] disabled:hover:shadow-md cursor-pointer"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Quick Note Box */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 items-start">
            <div className="bg-luxury-gold/10 p-1.5 rounded-lg text-luxury-gold mt-0.5 animate-pulse">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Quick Note</h4>
              <p className="text-[11px] text-slate-500 leading-normal mt-1">
                Only authorized administrators can access this portal. If you've lost your access, please contact the system owner.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default AdminLogin;
