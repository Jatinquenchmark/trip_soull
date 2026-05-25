import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Calendar, ArrowLeft, Mail, Phone, ChevronRight } from 'lucide-react';

const DataSafety = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'collect', label: '2. Information We Collect' },
    { id: 'use', label: '3. How We Use Information' },
    { id: 'share', label: '4. Data Sharing & Disclosure' },
    { id: 'security', label: '5. Data Security' },
    { id: 'rights', label: '6. Your Legal Rights' },
    { id: 'cookies', label: '7. Cookies & Analytics' },
    { id: 'contact', label: '8. Contact Information' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 font-sans">
      {/* Top Hero Banner */}
      <section className="pt-32 lg:pt-40 pb-16 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background vectors */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Privacy Policy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-soul-blue text-xs font-semibold tracking-wider uppercase mb-4 border border-white/10 text-blue-400">
                <Shield className="w-3.5 h-3.5" /> Privacy & Protection
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 font-poppins">
                Privacy <span className="text-blue-400">Policy</span>
              </h1>
              <p className="text-slate-300 max-w-2xl text-base md:text-lg font-medium">
                At TripSoul, we protect your personal space as much as we value your journeys. Learn how we handle your data.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 self-start md:self-auto">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Last Updated</p>
                <p className="text-white text-sm font-semibold">May 25, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button for Navigation */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-soul-blue transition-colors font-semibold text-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Go Back
        </button>
      </div>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Left Column: Sticky Sidebar Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-100 shadow-xl rounded-2xl p-6 hidden lg:block">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-4 mb-4">
                Table of Contents
              </h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Policy Document Text */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-[32px] p-8 md:p-12 space-y-12">
              
              {/* Introduction */}
              <section id="intro" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  1. Introduction
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Welcome to TripSoul ("we", "our", "us"). We craft soul-stirring journeys and perfectly personalized multi-day tours across the globe's most beautiful destinations.
                  </p>
                  <p>
                    Your privacy is of paramount importance to us. This Privacy Policy describes how TripSoul collects, uses, stores, and protects your personal information when you visit our website and use our custom trip planning services.
                  </p>
                  <p className="bg-slate-50 p-4 border-l-4 border-slate-300 rounded-r-xl text-slate-500 italic text-sm">
                    <strong>Note for our visitors:</strong> TripSoul does not support or require user account creation or login features. You can explore all our travel packages, itineraries, and design requests freely. We only request information when you voluntarily choose to contact us or submit an inquiry to plan a tour.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="collect" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  2. Information We Collect
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Since you do not need to register a user account, we only collect information when you actively interact with our services, such as requesting a customized itinerary or contacting us. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-slate-800">Inquiry & Contact Details:</strong> When you fill out an inquiry form or reach out through WhatsApp, we collect your name, email address, phone/WhatsApp number, travel destination interest, estimated travel dates, budget preference, and specific requests.
                    </li>
                    <li>
                      <strong className="text-slate-800">Communication History:</strong> Records of your emails, WhatsApp conversations, and other communication with our trip designers to help coordinate your bookings.
                    </li>
                    <li>
                      <strong className="text-slate-800">Technical Device Data:</strong> Basic usage data (IP address, operating system, browser type, referral pages) collected through essential website tools and cookies to optimize website performance.
                    </li>
                  </ul>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="use" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  3. How We Use Your Information
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    We collect your information to serve your travel needs and ensure you have a seamless experience. Specifically, we use it to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Design and personalize your requested travel itineraries.</li>
                    <li>Provide pricing estimates and coordinate bookings with partner airlines, hotels, and local ground handlers.</li>
                    <li>Communicate directly with you regarding tour updates, scheduling, or customization requests.</li>
                    <li>Send relevant administrative notifications regarding your ongoing inquiries.</li>
                    <li>Maintain website security, prevent fraud, and optimize our pages.</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing & Disclosure */}
              <section id="share" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  4. Data Sharing & Disclosure
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    We respect your privacy. We do not sell, rent, or trade your personal data to third parties. We share your information only in the following limited circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-slate-800">Travel Vendors:</strong> We share essential traveler details (such as names and dietary or accessibility preferences) with hotels, activity operators, airlines, and transport coordinators only as required to reserve your services.
                    </li>
                    <li>
                      <strong className="text-slate-800">Legal Compliance:</strong> If required by law, regulation, or legal process to protect our rights, your safety, or the safety of others.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section id="security" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  5. Data Security
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    We prioritize protecting your data and use robust administrative and technical security measures to prevent unauthorized access, alteration, or deletion of your information.
                  </p>
                  <p>
                    Please be aware that while we use industry-standard measures (SSL encryption, secure servers) to protect your transmission, no transmission of information over the internet is completely risk-free.
                  </p>
                </div>
              </section>

              {/* Your Legal Rights */}
              <section id="rights" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  6. Your Legal Rights
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Depending on your location, you have certain legal rights regarding your personal information. You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request access to the personal data we hold about you.</li>
                    <li>Request correction of any incomplete or inaccurate data.</li>
                    <li>Request the deletion or removal of your personal information from our databases.</li>
                    <li>Withdraw consent for us to contact you at any time.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us at <span className="text-blue-600 font-semibold underline">privacy@tripsoul.com</span>. We will respond to your request within 30 days.
                  </p>
                </div>
              </section>

              {/* Cookies & Analytics */}
              <section id="cookies" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  7. Cookies & Analytics
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Our website uses small text files called "cookies" to enhance your browsing experience. These files store basic metadata about your preferences, which keeps the website responsive and remembers your search inputs.
                  </p>
                  <p>
                    For detailed info on how cookies are deployed and how you can opt-out, please review our separate <span className="text-blue-600 font-semibold underline cursor-pointer hover:text-blue-800" onClick={() => navigate('/cookie-policy')}>Cookie Policy</span>.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  8. Contact Information
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    If you have any questions or concerns about this Privacy Policy or our practices, you can contact our privacy officer:
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Us</p>
                      <p className="text-slate-800 text-sm font-semibold">privacy@tripsoul.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Support</p>
                      <p className="text-slate-800 text-sm font-semibold">+1 234 567 890</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DataSafety;
