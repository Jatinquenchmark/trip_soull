import React, { useEffect, useRef } from 'react';

const TravelpayoutsHotelWidget = () => {
  const iframeCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 250px; font-family: sans-serif; background: transparent; }
        </style>
      </head>
      <body>
        <script async src="https://tpemb.com/content?currency=USD&trs=540094&shmarker=740018&locale=en&city_id=2&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497" charset="utf-8"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white p-4 md:p-6 border border-slate-100 relative z-10">
      <iframe 
        srcDoc={iframeCode} 
        className="w-full min-h-[350px] border-none"
        title="Hotel Search Widget"
        scrolling="no"
      />
    </div>
  );
};

export default TravelpayoutsHotelWidget;
