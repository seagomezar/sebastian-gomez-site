# Google Analytics Implementation

This project includes a privacy-compliant Google Analytics implementation with the following features:

## Features

### Privacy & Compliance
- ✅ **GDPR/CCPA Compliant**: Analytics loads only with user consent
- ✅ **IP Anonymization**: User IP addresses are anonymized
- ✅ **Consent Management**: Cookie consent banner with accept/decline options
- ✅ **Opt-out Support**: Users can opt out of analytics tracking
- ✅ **Secure Cookies**: SameSite=Strict and Secure cookie flags

### Environment Configuration
- ✅ **Environment Variables**: GA tracking ID configured via environment variables
- ✅ **Development Safety**: Analytics disabled in development mode
- ✅ **Production Only**: Scripts load only in production with valid tracking IDs

### Error Handling & Debugging
- ✅ **Safe Execution**: All analytics calls include error handling
- ✅ **Development Debugging**: Console logging in development mode
- ✅ **Graceful Fallbacks**: Functions work even if gtag fails to load

### Enhanced Tracking
- ✅ **Custom Events**: Pre-built functions for common tracking scenarios
- ✅ **Page View Tracking**: Automatic page view tracking on route changes
- ✅ **Content Tracking**: Track content views, external links, downloads
- ✅ **Engagement Metrics**: Time on page and interaction tracking

## Setup

### 1. Environment Variables

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID=ca-pub-XXXXXXXXX  # Optional, for Google Ads
```

### 2. Production Deployment

The analytics will automatically activate in production when:
- `NODE_ENV=production`
- Valid `NEXT_PUBLIC_GA_MEASUREMENT_ID` is provided
- Tracking ID is not the placeholder value

## Usage

### Basic Tracking

Page views are tracked automatically. For custom events:

```javascript
import { event, trackCommonEvents } from '../lib/analytics';

// Custom event
event({
  action: 'custom_action',
  category: 'user_interaction',
  label: 'button_click',
  value: 1
});

// Pre-built common events
trackCommonEvents.viewContent('blog_post', 'post-123', 'My Blog Post');
trackCommonEvents.clickExternalLink('https://example.com', 'External Link');
trackCommonEvents.downloadFile('whitepaper.pdf', 'pdf');
```

### Consent Management

The consent banner appears automatically for new users. Users' choices are stored in localStorage and respected across sessions.

### Privacy Controls

```javascript
import { setAnalyticsConsent, optOutOfAnalytics } from '../lib/analytics';

// Update consent (can be called from privacy settings)
setAnalyticsConsent(true);  // Grant consent
setAnalyticsConsent(false); // Revoke consent

// Complete opt-out
optOutOfAnalytics();
```

## Analytics Configuration

The implementation includes privacy-focused settings:

- **IP Anonymization**: `anonymize_ip: true`
- **No Google Signals**: `allow_google_signals: false`
- **No Ad Personalization**: `allow_ad_personalization_signals: false`
- **Manual Page Views**: `send_page_view: false` (handled by router)
- **Secure Cookies**: `cookie_flags: 'SameSite=Strict;Secure'`

## Development

In development mode:
- Analytics scripts don't load
- Console logging shows tracking attempts
- All functions work safely without gtag

## Privacy Notice Example

Include in your privacy policy:

> We use Google Analytics to understand how visitors interact with our website. 
> This helps us improve our content and user experience. Analytics data is:
> - Anonymized (IP addresses are not stored)
> - Used only for website improvement
> - Not used for advertising personalization
> - Optional (you can opt out via our cookie banner)

## Files

- `lib/analytics.js` - Main analytics utility functions
- `components/CookieConsent.jsx` - Consent banner component
- `pages/_document.js` - GA script loading with privacy settings
- `pages/_app.js` - Analytics initialization and page view tracking