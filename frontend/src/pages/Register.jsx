import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SignUp } from '@clerk/react';
import { Plane, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';

// Icons for social login
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
    <path d="M12 20.25c-1.635 0-3.136-.504-4.502-1.512-.916-.672-1.782-1.572-2.598-2.7-.816-1.128-1.442-2.316-1.878-3.564-.436-1.248-.654-2.52-.654-3.816 0-2.352.55-4.272 1.65-5.76C5.118 1.41 6.646.666 8.602.666c1.176 0 2.228.336 3.156 1.008.928.672 1.488.948 1.68.828.192.12.752-.156 1.68-.828.928-.672 1.98-1.008 3.156-1.008 1.584 0 2.916.48 3.996 1.44 1.08.96 1.788 2.304 2.124 4.032-1.92.96-2.88 2.472-2.88 4.536 0 1.968.96 3.528 2.88 4.68-.576 1.776-1.488 3.24-2.736 4.392-1.248 1.152-2.616 1.728-4.104 1.728-1.296 0-2.484-.444-3.564-1.332-1.08-.888-1.704-.972-1.872-.252-.168-.72-.792-.636-1.872.252-1.08.888-2.268 1.332-3.564 1.332zM15.48 6.426c0-1.248.42-2.328 1.26-3.24.84-.912 1.848-1.416 3.024-1.512.048 1.248-.36 2.328-1.224 3.24-.864.912-1.884 1.416-3.06 1.512z"/>
  </svg>
);

const SkylineSilhouette = () => (
  <svg viewBox="0 0 1000 200" className="absolute bottom-0 left-0 w-full h-auto text-[#0095f6]" fill="currentColor" preserveAspectRatio="none">
    {/* Taj Mahal inspired */}
    <path d="M100,200 L100,140 C100,100 140,80 150,60 C160,80 200,100 200,140 L200,200 Z" />
    <rect x="80" y="140" width="10" height="60" />
    <rect x="210" y="140" width="10" height="60" />
    {/* Eiffel / Generic Tower */}
    <path d="M350,200 L320,80 L340,80 L350,20 L360,80 L380,80 L350,200 Z" />
    {/* Leaning Tower / Column structure */}
    <path d="M800,200 L790,60 L830,65 L840,200 Z" />
    <rect x="785" y="60" width="50" height="10" transform="rotate(5 810 65)" />
    <rect x="785" y="80" width="50" height="10" transform="rotate(5 810 85)" />
    <rect x="785" y="100" width="50" height="10" transform="rotate(5 810 105)" />
    <rect x="785" y="120" width="50" height="10" transform="rotate(5 810 125)" />
    {/* Notre Dame / Cathedral */}
    <rect x="880" y="100" width="60" height="100" />
    <rect x="880" y="50" width="15" height="50" />
    <rect x="925" y="50" width="15" height="50" />
    {/* Base line */}
    <rect x="0" y="195" width="1000" height="5" />
    {/* Additional city blocks */}
    <rect x="10" y="160" width="30" height="40" />
    <rect x="50" y="130" width="20" height="70" />
    <rect x="230" y="150" width="40" height="50" />
    <rect x="280" y="120" width="30" height="80" />
    <rect x="400" y="160" width="50" height="40" />
    <rect x="460" y="140" width="60" height="60" />
    <rect x="530" y="100" width="40" height="100" />
    <rect x="580" y="150" width="70" height="50" />
    <rect x="660" y="130" width="50" height="70" />
    <rect x="720" y="170" width="40" height="30" />
  </svg>
);

const Register = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* Left Panel - Image Background */}
      <div className="hidden md:flex md:w-1/2 relative bg-blue-900">
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1000" 
          alt="Travel Landscape" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center pt-24 px-12 text-center">
          <h1 className="text-5xl lg:text-7xl text-white mb-6 tracking-wide drop-shadow-md" style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}>
            TripSoul Tours
          </h1>
          <p className="text-white text-lg lg:text-xl font-medium max-w-md drop-shadow-md leading-relaxed">
            Travel is the only purchase that enriches you in ways beyond material wealth
          </p>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full md:w-1/2 relative flex flex-col justify-center items-center px-8 pt-12 pb-36 md:pb-24 bg-white overflow-y-auto">
        
        {/* Back to Home Button */}
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0095f6] transition-colors group z-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Airplane & Dotted Line */}
        <div className="absolute top-12 right-12 text-[#0095f6] flex items-center">
          <svg width="200" height="60" viewBox="0 0 200 60" className="absolute right-6 -top-2 overflow-visible pointer-events-none">
            <path d="M 0 50 Q 100 0 200 10" fill="transparent" stroke="#0095f6" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <Plane className="w-8 h-8 transform rotate-45 relative z-10" fill="currentColor" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm z-10 relative mt-16 md:mt-0 flex justify-center">
          <SignUp signInUrl="/login" forceRedirectUrl="/dashboard" />
        </div>

        {/* Bottom Skyline Illustration */}
        <SkylineSilhouette />
        
      </div>
    </div>
  );
};

export default Register;
