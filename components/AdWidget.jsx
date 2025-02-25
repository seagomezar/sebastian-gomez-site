import React, { useEffect } from 'react';
 
function AdWidget() {
  useEffect(() => {
    // Push the AdSense ad slot to the display queue
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-xl mb-3 font-semibold border-b pb-3">Advertisements</h3>
      <div>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5241677876798110" // Replace with your AdSense Publisher ID
          data-ad-slot="8712802376" // Replace with your AdSense Ad Slot ID
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
};

export default AdWidget;
