import React, { useState, useEffect } from 'react';
import { setAnalyticsConsent } from '../lib/analytics';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('analytics-consent');
    if (consentGiven === null) {
      setShowBanner(true);
    } else {
      // Apply previously saved consent
      setAnalyticsConsent(consentGiven === 'true');
    }
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics-consent', 'true');
    setAnalyticsConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('analytics-consent', 'false');
    setAnalyticsConsent(false);
    setShowBanner(false);
  };

  if (isLoading || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm">
          <p>
            We use cookies and analytics to improve your experience on our site.
            Your privacy is important to us - analytics data is anonymized and used only
            for improving our content.
          </p>
        </div>
        <div className="flex gap-3 whitespace-nowrap">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            type="button"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded transition-colors"
            type="button"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
