import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookie, EyeOff, Settings, Calendar, ArrowLeft, Mail, Phone, ChevronRight } from 'lucide-react';

const SitePreferences = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'intro', label: '1. What are Cookies' },
    { id: 'how-use', label: '2. How We Use Cookies' },
    { id: 'types', label: '3. Types of Cookies We Use' },
    { id: 'control', label: '4. How to Manage Cookies' },
    { id: 'third-party', label: '5. Third-Party Cookies' },
    { id: 'updates', label: '6. Policy Updates' },
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
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Cookie Policy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-purple-400 text-xs font-semibold tracking-wider uppercase mb-4 border border-white/10">
                <Cookie className="w-3.5 h-3.5" /> Browser Preferences
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 font-poppins">
                Cookie <span className="text-purple-400">Policy</span>
              </h1>
              <p className="text-slate-300 max-w-2xl text-base md:text-lg font-medium">
                We use cookies to enhance your browsing experience, provide custom package searches, and improve our services.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 self-start md:self-auto">
              <Calendar className="w-5 h-5 text-purple-400" />
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
                Policy Sections
              </h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600 font-bold'
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

          {/* Right Column: Cookie Policy Document Text */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white border border-slate-100 shadow-2xl rounded-[32px] p-8 md:p-12 space-y-12">
              
              {/* What are Cookies */}
              <section id="intro" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  1. What are Cookies?
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    Cookies are small text files containing a string of alphanumeric characters that are downloaded to your browser or device when you visit a website. They allow the website to recognize your browser, remember certain options you selected, and keep the user interface operating efficiently.
                  </p>
                  <p>
                    Cookies can be "persistent" cookies (which remain on your device for a pre-set duration or until manually deleted) or "session" cookies (which are deleted as soon as you close your web browser).
                  </p>
                </div>
              </section>

              {/* How We Use Cookies */}
              <section id="how-use" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  2. How We Use Cookies
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    TripSoul uses cookies for multiple purposes, mostly centered on keeping the website functional and gathering basic analytics. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Optimizing the speed and layout of our web pages.</li>
                    <li>Remembering your search terms and destination filter preferences so you don't have to re-select them repeatedly.</li>
                    <li>Analyzing general user flow to understand what tour destinations or tour packages are most popular.</li>
                  </ul>
                </div>
              </section>

              {/* Types of Cookies We Use */}
              <section id="types" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  3. Types of Cookies We Use
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4 text-left">
                  <p>
                    We classify the cookies used on our website into two primary categories:
                  </p>
                  
                  <div className="mt-4 space-y-4">
                    <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50">
                      <h4 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        Essential & Functional Cookies (First-Party)
                      </h4>
                      <p className="text-slate-600 text-sm">
                        These cookies are required to enable core site functionality. They do not store any personally identifiable information. For instance, they remember which packages you expanded, or ensure that styles and animations render correctly.
                      </p>
                    </div>

                    <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50">
                      <h4 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                        Performance & Analytics Cookies (Third-Party)
                      </h4>
                      <p className="text-slate-600 text-sm">
                        These cookies collect aggregate data about website utilization (e.g. total page views, average time spent, exit pages). We use tools like Google Analytics to compile reports. This data is completely anonymized.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Manage Cookies */}
              <section id="control" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  4. How to Manage Cookies
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    You have the right to decide whether to accept or reject cookies. Most web browsers are configured to accept cookies by default, but you can change your settings to alert you when a cookie is being set, or block them entirely.
                  </p>
                  <p>
                    To block or delete cookies in your browser, refer to the official settings guides:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="text-purple-600 underline">Google Chrome Settings</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noreferrer" className="text-purple-600 underline">Apple Safari Settings</a></li>
                    <li><a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noreferrer" className="text-purple-600 underline">Mozilla Firefox Settings</a></li>
                    <li><a href="https://support.microsoft.com/microsoft-edge/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer" className="text-purple-600 underline">Microsoft Edge Settings</a></li>
                  </ul>
                  <p className="text-sm bg-purple-50 border-l-4 border-purple-300 p-4 text-purple-700 rounded-r-xl">
                    <strong>Note:</strong> If you decide to disable or block essential cookies, certain features of our Website (such as custom destination filters or smooth animations) may not function as intended.
                  </p>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section id="third-party" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  5. Third-Party Cookies
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    In addition to our first-party cookies, you may receive cookies from third-party services that integrate with our site:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-slate-800">WhatsApp widget:</strong> Standard cookies set by WhatsApp/Meta when clicking the chat button to establish an inquiry session.
                    </li>
                    <li>
                      <strong className="text-slate-800">Google Analytics:</strong> Tracking tags used to understand website visitor volume and demographics.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Policy Updates */}
              <section id="updates" className="scroll-mt-28 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full block"></span>
                  6. Policy Updates
                </h2>
                <div className="text-slate-600 leading-relaxed font-medium space-y-4">
                  <p>
                    We may update this Cookie Policy from time to time in response to changing legal, technical, or business developments.
                  </p>
                  <p>
                    If you have any questions about our use of cookies or other technologies, please email us at <span className="text-purple-600 font-semibold underline">privacy@tripsoul.com</span>.
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

export default SitePreferences;
