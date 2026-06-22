import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { isAdSenseEnabled } from '../lib/ads';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const ADSENSE_AD_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_ID;
// Require BOTH the client and slot IDs: without a slot the ad can't render, so
// loading the heavy AdSense script would be wasted. Gating the script on the same
// condition as rendering keeps it truly on-demand.
const adsEnabled = isAdSenseEnabled({
  nodeEnv: process.env.NODE_ENV,
  clientId: ADSENSE_CLIENT_ID,
  slotId: ADSENSE_AD_SLOT_ID,
});

function AdWidget() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if AdSense script is loaded
    const checkAdSenseScript = () => {
      if (typeof window !== 'undefined') {
        if (!adsEnabled) {
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
      {/* Load AdSense only when an ad is actually rendered; next/script dedupes by id
          across multiple AdWidgets. Pages without ads never load the ad stack. */}
      {adsEnabled && (
        <Script
          id="google-ads"
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      )}
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
