/* eslint-disable react/no-danger */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import Script from 'next/script'; // Import Script

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-HM718Q7C20';
    const GOOGLE_ADS_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
    const isProduction = process.env.NODE_ENV === 'production';
    const shouldLoadAnalytics = isProduction && GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

    return (
      <Html>
        <Head>
          {/* Google Analytics - Only load in production with valid ID */}
          {shouldLoadAnalytics && (
            <>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}

                    // Initialize with privacy-compliant defaults
                    gtag('consent', 'default', {
                      analytics_storage: 'denied',
                      ad_storage: 'denied',
                      wait_for_update: 500
                    });

                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                      // Privacy settings
                      anonymize_ip: true,
                      allow_google_signals: false,
                      allow_ad_personalization_signals: false,
                      // Performance settings
                      send_page_view: false,
                      // Cookie settings
                      cookie_flags: 'SameSite=Strict;Secure'
                    });
                  `,
                }}
              />
            </>
          )}

          {/* Google Ads - Only load if client ID is provided */}
          {isProduction && GOOGLE_ADS_CLIENT_ID && GOOGLE_ADS_CLIENT_ID !== 'ca-pub-XXXXXXXXX' && (
            <script
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}`}
              async
              crossOrigin="anonymous"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
