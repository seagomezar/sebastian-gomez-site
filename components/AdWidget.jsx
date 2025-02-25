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
      <h3 className="text-xl mb-3 font-semibold border-b pb-3">
        Advertisements
      </h3>
      <div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
          data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

export default AdWidget;
