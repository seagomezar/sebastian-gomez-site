
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
    const GOOGLE_ADS_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
    const isProduction = process.env.NODE_ENV === 'production';

    return (
      <Html>
        <Head>
          {/* Google Analytics lives in _app.js: next/script afterInteractive does not
              reliably inject from _document. */}

          {/* Google Ads - Only load if client ID is provided */}
          {isProduction && GOOGLE_ADS_CLIENT_ID && GOOGLE_ADS_CLIENT_ID !== 'ca-pub-XXXXXXXXX' && (
            <Script
              id="google-ads"
              strategy="lazyOnload"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADS_CLIENT_ID}`}
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
