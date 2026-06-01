import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Calendar, ArrowLeft, Mail, ChevronRight, CreditCard } from 'lucide-react';

const RefundPolicy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'general', label: '1. General Refund Terms' },
    { id: 'flights', label: '2. Cancellation - Flights' },
    { id: 'hotels', label: '3. Hotels & Stays' },
    { id: 'packages', label: '4. Tour Packages & Activities' },
    { id: 'tripsoul', label: '5. Cancellation by TripSoul' },
    { id: 'force_majeure', label: '6. Force Majeure' },
    { id: 'timeline', label: '7. Refund Processing Timeline' },
    { id: 'no_refund', label: '8. No Refund Situations' },
    { id: 'contact', label: '9. Contact Us' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
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
            <span className="text-white font-medium">Refund Policy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-soul-blue text-xs font-semibold tracking-wider uppercase mb-4 border border-white/10 text-blue-400">
                <CreditCard className="w-3.5 h-3.5" /> Cancellations & Refunds
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 font-poppins">
                Refund <span className="text-blue-400">Policy</span>
              </h1>
              <p className="text-slate-300 max-w-2xl text-base md:text-lg font-medium">
                Understand the terms for refunds, cancellations, and credits for bookings made through our platform.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 self-start md:self-auto">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Last Updated</p>
                <p className="text-white text-sm font-semibold">May 29, 2026</p>
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
              
              <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                <p>
                  Welcome to TripSoul. This Refund Policy explains the terms under which refunds, cancellations, and credits are handled for bookings, travel packages, activities, and services purchased through our platform.
                </p>
              </div>

              {/* General Refund Terms */}
              <section id="general" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  1. General Refund Terms
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Refund eligibility depends on the type of booking, supplier policies, cancellation timing, and payment status.</li>
                    <li>Certain bookings may be non-refundable or partially refundable.</li>
                    <li>Refunds are processed only to the original payment method unless otherwise agreed.</li>
                    <li>Convenience fees, payment gateway charges, visa fees, taxes, and processing charges may be non-refundable.</li>
                  </ul>
                </div>
              </section>

              {/* Cancellation by Customer – Flights */}
              <section id="flights" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  2. Cancellation by Customer – Flights
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Flight cancellations and refunds are subject to the airline's policies.</li>
                    <li>Domestic flights may allow partial refunds.</li>
                    <li>International flights often have stricter cancellation rules.</li>
                    <li>Promotional or discounted fares may be non-refundable.</li>
                    <li>Airline-approved refunds typically take 7–21 business days after confirmation.</li>
                  </ul>
                </div>
              </section>

              {/* Hotels & Stays */}
              <section id="hotels" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  3. Hotels & Stays
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hotel refund eligibility depends on the cancellation policy selected during booking.</li>
                    <li>Free cancellation may be available before the allowed deadline.</li>
                    <li>Partial refunds may apply for late cancellations.</li>
                    <li>No refund for no-shows, early check-outs, or non-refundable bookings.</li>
                  </ul>
                </div>
              </section>

              {/* Tour Packages & Activities */}
              <section id="packages" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  4. Tour Packages & Activities
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>30+ days before trip:</strong> 90% refund</li>
                    <li><strong>15–29 days before trip:</strong> 70% refund</li>
                    <li><strong>7–14 days before trip:</strong> 50% refund</li>
                    <li><strong>Less than 7 days before trip:</strong> No refund</li>
                  </ul>
                </div>
              </section>

              {/* Cancellation by TripSoul */}
              <section id="tripsoul" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  5. Cancellation by TripSoul
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>TripSoul may cancel bookings due to operational issues, supplier/vendor cancellation, weather conditions, government restrictions, or force majeure events.</li>
                    <li>Users may receive a full refund, travel credit, or alternative booking options.</li>
                  </ul>
                </div>
              </section>

              {/* Force Majeure */}
              <section id="force_majeure" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  6. Force Majeure
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    No refunds or compensation may be provided for disruptions caused by events beyond reasonable control such as natural disasters, pandemics, political unrest, or airport shutdowns.
                  </p>
                </div>
              </section>

              {/* Refund Processing Timeline */}
              <section id="timeline" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  7. Refund Processing Timeline
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>UPI/Wallet refunds:</strong> 3–7 business days</li>
                    <li><strong>Debit/Credit card refunds:</strong> 5–15 business days</li>
                    <li><strong>Bank transfers:</strong> 5–10 business days</li>
                  </ul>
                </div>
              </section>

              {/* No Refund Situations */}
              <section id="no_refund" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  8. No Refund Situations
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visa rejections</li>
                    <li>Incorrect traveler information submitted by the user</li>
                    <li>Failure to carry valid documents</li>
                    <li>Missed flights or transport</li>
                    <li>Personal schedule changes</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="scroll-mt-28 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full block"></span>
                  9. Contact Us
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>TripSoul may update this Refund Policy at any time without prior notice. Users are encouraged to review the policy periodically.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Us</p>
                      <p className="text-slate-800 text-sm font-semibold">support@tripsoul.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Website</p>
                      <p className="text-slate-800 text-sm font-semibold">https://tripsoul.in</p>
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

export default RefundPolicy;
