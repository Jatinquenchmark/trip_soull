import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Award, HelpCircle, Calendar, ArrowLeft, Mail, Phone, ChevronRight } from 'lucide-react';

const ServiceRules = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'intro', label: '1. Acceptance of Terms' },
    { id: 'services', label: '2. Our Travel Services' },
    { id: 'bookings', label: '3. Bookings & Payments' },
    { id: 'cancellation', label: '4. Cancellation & Refunds' },
    { id: 'user-conduct', label: '5. Website Usage & Conduct' },
    { id: 'intellectual', label: '6. Intellectual Property' },
    { id: 'liability', label: '7. Limitation of Liability' },
    { id: 'governing', label: '8. Governing Law' },
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
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Terms & Conditions</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4 border border-white/10">
                <FileText className="w-3.5 h-3.5" /> Legal Agreement
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 font-poppins">
                Terms & <span className="text-amber-400">Conditions</span>
              </h1>
              <p className="text-slate-300 max-w-2xl text-base md:text-lg font-medium">
                Please read these terms and conditions carefully before booking your personalized travel experience with TripSoul.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 self-start md:self-auto">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Last Updated</p>
                <p className="text-white text-sm font-semibold">May 25, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
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
                Document Sections
              </h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-amber-50 text-amber-600 border-l-4 border-amber-600 font-bold'
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

          {/* Right Column: Terms Document Text */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-[32px] p-8 md:p-12 space-y-12">
              
              {/* Acceptance of Terms */}
              <section id="intro" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  1. Acceptance of Terms
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    By accessing, browsing, or using the website of TripSoul ("Website"), or by requesting customized itinerary services from us, you agree to be bound by these Terms & Conditions.
                  </p>
                  <p>
                    If you do not agree to all of these Terms, please do not use this Website or register for our custom tour packages. We reserve the right to modify these terms at any time without prior notice, and such changes will become active immediately upon posting.
                  </p>
                </div>
              </section>

              {/* Our Travel Services */}
              <section id="services" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  2. Our Travel Services
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    TripSoul functions as a boutique travel service provider. We design, customize, and arrange multi-day tours, packages, accommodation coordination, tour guides, and transportation support.
                  </p>
                  <p>
                    All itineraries, pricing estimates, and travel packages listed on the Website are subject to change and availability. We act as an intermediary coordinating with third-party service providers (hotels, flight operators, local ground handlers) to implement your tour.
                  </p>
                </div>
              </section>

              {/* Bookings & Payments */}
              <section id="bookings" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  3. Bookings & Payments
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Since our website does not support user accounts/logins, booking requests are initiated via our package forms, email inquiries, or WhatsApp integration.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-slate-800">Booking Confirmation:</strong> A booking is confirmed only when we receive the initial deposit/payment specified in your travel quote and send you a formal confirmation receipt.
                    </li>
                    <li>
                      <strong className="text-slate-800">Payment Modes:</strong> We process payments securely through certified third-party payment links (such as Razorpay or Stripe) or bank transfers. We do not store your credit card or financial details.
                    </li>
                    <li>
                      <strong className="text-slate-800">Inaccurate Information:</strong> You are responsible for ensuring that all traveler names, passport details, and flight information provided are accurate.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Cancellation & Refunds */}
              <section id="cancellation" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  4. Cancellation & Refunds
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Cancellation rules vary depending on the destination, duration, and time of booking. Each customized itinerary has its specific cancellation terms which will be shared with you before payment.
                  </p>
                  <p>
                    Standard cancellation charges usually apply to recover deposits made to hotels, transport operators, and flight providers who do not offer full refunds. All refund claims will be verified and processed within 14 business days of approval.
                  </p>
                </div>
              </section>

              {/* Website Usage & Conduct */}
              <section id="user-conduct" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  5. Website Usage & Conduct
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    You agree to use this Website for lawful purposes only. You must not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Submit fake booking queries, spam requests, or false contact details.</li>
                    <li>Attempt to gain unauthorized access to our administrative dashboard or servers.</li>
                    <li>Use any automated tools (scrapers, web spiders) to download data from our website without our explicit written consent.</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  6. Intellectual Property
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    All content on this Website, including text descriptions, itinerary formats, images, logos, graphics, color combinations, and website code, is the exclusive intellectual property of TripSoul.
                  </p>
                  <p>
                    You may not reuse, redistribute, or reproduce any part of our itinerary details or travel content for commercial purposes without our express written permission.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  7. Limitation of Liability
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    TripSoul acts as an agent arranging bookings for travel, transport, and lodging. We are not liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Any delays, cancellations, or disruptions caused by airlines, weather conditions, natural disasters, or government restrictions (Force Majeure).</li>
                    <li>Any personal injury, illness, loss of life, or property damage during your tour, except where caused directly by our gross negligence.</li>
                    <li>Any fluctuations in visa processing times or refusal of visa applications by foreign consulates.</li>
                  </ul>
                </div>
              </section>

              {/* Governing Law */}
              <section id="governing" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full block"></span>
                  8. Governing Law
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    These Terms & Conditions are governed by and construed in accordance with local regulations, without regard to conflict of law principles. Any legal disputes arising out of your booking or Website usage shall be resolved in the competent courts within our primary business registration city.
                  </p>
                </div>
              </section>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ServiceRules;
