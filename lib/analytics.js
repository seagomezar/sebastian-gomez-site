// Google Analytics utility functions
// Provides privacy-compliant and error-safe analytics tracking

// Configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-HM718Q7C20';
export const isProduction = process.env.NODE_ENV === 'production';
export const isAnalyticsEnabled = isProduction && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

// Debug logging for development
const debug = (message, data) => {
  if (!isProduction && typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(`[Analytics] ${message}`, data);
  }
};

// Check if gtag is available and analytics is enabled
const isGtagAvailable = () => (
  typeof window !== 'undefined' &&
         typeof window.gtag === 'function' &&
         isAnalyticsEnabled
);

// Initialize Google Analytics with privacy-compliant settings
export const initGA = () => {
  if (!isGtagAvailable()) {
    debug('Analytics initialization skipped', {
      isProduction,
      hasGtag: typeof window !== 'undefined' && typeof window.gtag === 'function',
      measurementId: GA_MEASUREMENT_ID,
    });
    return;
  }

  try {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      // Privacy-compliant settings
      anonymize_ip: true, // IP anonymization
      allow_google_signals: false, // Disable Google Signals for privacy
      allow_ad_personalization_signals: false, // Disable ad personalization
      // Performance settings
      send_page_view: false, // We'll handle page views manually
      // Cookie settings
      cookie_flags: 'SameSite=Strict;Secure', // Secure cookie settings
    });

    debug('Analytics initialized', { measurementId: GA_MEASUREMENT_ID });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Analytics] Initialization error:', error);
  }
};

// Track page views
export const pageview = (url) => {
  if (!isGtagAvailable()) {
    debug('Pageview tracking skipped', { url });
    return;
  }

  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      // Additional privacy settings for page views
      anonymize_ip: true,
    });

    debug('Pageview tracked', { url, measurementId: GA_MEASUREMENT_ID });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Analytics] Pageview tracking error:', error);
  }
};

// Track custom events
export const event = ({ action, category = 'general', label, value, ...customParams }) => {
  if (!isGtagAvailable()) {
    debug('Event tracking skipped', { action, category, label });
    return;
  }

  try {
    const eventParams = {
      event_category: category,
      event_label: label,
      value,
      ...customParams,
    };

    // Remove undefined values
    Object.keys(eventParams).forEach((key) => {
      if (eventParams[key] === undefined) {
        delete eventParams[key];
      }
    });

    window.gtag('event', action, eventParams);

    debug('Event tracked', { action, params: eventParams });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Analytics] Event tracking error:', error);
  }
};

// Predefined common events for better tracking consistency
export const trackCommonEvents = {
  // Content interactions
  viewContent: (contentType, contentId, contentTitle) => {
    event({
      action: 'view_item',
      category: 'content',
      label: contentTitle,
      content_type: contentType,
      content_id: contentId,
    });
  },

  // Navigation
  clickExternalLink: (url, linkText) => {
    event({
      action: 'click',
      category: 'external_link',
      label: linkText,
      external_url: url,
    });
  },

  // Engagement
  timeOnPage: (timeInSeconds, pageUrl) => {
    event({
      action: 'timing_complete',
      category: 'engagement',
      label: pageUrl,
      value: Math.round(timeInSeconds),
    });
  },

  // Search (if applicable)
  search: (searchTerm, resultsCount) => {
    event({
      action: 'search',
      category: 'site_search',
      label: searchTerm,
      value: resultsCount,
    });
  },

  // Downloads
  downloadFile: (fileName, fileType) => {
    event({
      action: 'file_download',
      category: 'downloads',
      label: fileName,
      file_type: fileType,
    });
  },
};

// Consent management
export const setAnalyticsConsent = (granted) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
      });

      debug('Consent updated', { granted });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Analytics] Consent update error:', error);
    }
  }
};

// Opt-out functionality
export const optOutOfAnalytics = () => {
  if (typeof window !== 'undefined') {
    try {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      debug('Analytics opt-out enabled');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Analytics] Opt-out error:', error);
    }
  }
};
