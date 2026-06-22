
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Google Analytics lives in _app.js: next/script afterInteractive does not
              reliably inject from _document. */}

          {/* Google AdSense is loaded on demand by AdWidget, so pages without ads
              (e.g. the conference landing page) don't pay for the ad stack. */}
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
