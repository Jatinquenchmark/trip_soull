import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    { q: "How do I book a tour with TripSoul?", a: "You can start by exploring our packages or searching for a destination. Once you find a tour you like, click 'Request Callback' or 'Enquire Now', and our expert planners will get in touch with you." },
    { q: "Can itineraries be fully customized?", a: "Yes, our specialty is personalization. We connect you with local experts who can tailor every aspect of your trip, from accommodation to activities, matching your preferences and budget." },
    { q: "Is it safe to book through TripSoul?", a: "Absolutely. We work only with verified and highly-rated local tour operators. Your payments are secure, and we provide 24/7 support during your journey." },
    { q: "What is included in the package price?", a: "Typically, our packages include accommodation, transfers, guided tours, and some meals. However, inclusions vary by package. You can check the 'What's Included' section on the package details page." },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked <span className="text-soul-blue">Questions</span></h2>
          <p className="text-slate-500 font-medium">Everything you need to know about your next soulful journey</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left p-6 flex items-center justify-between group"
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === i ? 'text-soul-blue' : 'text-soul-blue/80 group-hover:text-soul-blue'}`}>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === i ? 'bg-soul-blue text-white rotate-180' : 'bg-blue-50 text-soul-blue'}`}>
                  {activeIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${activeIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 border-t border-slate-50">
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default FAQSection;
