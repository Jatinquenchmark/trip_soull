import React, { useEffect, useRef } from 'react';

const TravelpayoutsWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Ensure the script is only appended once
    if (widgetRef.current && widgetRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = "https://tpemb.com/content?currency=usd&trs=540094&shmarker=740018&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
      script.async = true;
      script.charset = "utf-8";
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white p-4 md:p-6 border border-slate-100 relative z-10">
      <div ref={widgetRef} className="w-full min-h-[250px] flex justify-center items-center">
        {/* The widget will be injected here */}
      </div>
    </div>
  );
};

export default TravelpayoutsWidget;
