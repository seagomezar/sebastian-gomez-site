import React, { useEffect, useState } from 'react';

function AdWidget() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if AdSense script is loaded
    const checkAdSenseScript = () => {
      if (typeof window !== 'undefined') {
        const isProduction = process.env.NODE_ENV === 'production';
        const hasAdSenseConfig = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID &&
                                 process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID &&
                                 process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID !== 'ca-pub-XXXXXXXXX';

        if (!isProduction || !hasAdSenseConfig) {
          setShowFallback(true);
          return;
        }

        // Check if adsbygoogle script is loaded
        if (window.adsbygoogle) {
          // Push the AdSense ad slot to the display queue
          try {
            window.adsbygoogle.push({});
          } catch {
            setShowFallback(true);
          }
        } else {
          // Wait a bit for script to load, then show fallback if not available
          setTimeout(() => {
            if (!window.adsbygoogle) {
              setShowFallback(true);
            } else {
              try {
                window.adsbygoogle.push({});
              } catch {
                setShowFallback(true);
              }
            }
          }, 2000);
        }
      }
    };

    checkAdSenseScript();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-xl mb-3 font-semibold border-b pb-3">
        Advertisements
      </h3>
      <div>
        {showFallback ? (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 text-center text-gray-600">
            <p className="text-sm">
              Advertisement space
            </p>
            <p className="text-xs mt-2 opacity-75">
              {process.env.NODE_ENV !== 'production'
                ? 'Ads are only shown in production'
                : 'Ad content temporarily unavailable'}
            </p>
          </div>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
            data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}

export default AdWidget;
