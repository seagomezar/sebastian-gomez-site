/* eslint-disable react/no-danger */
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
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-HM718Q7C20"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-HM718Q7C20', {
                                page_path: window.location.pathname,
                                });
                            `,
            }}
          />
          <script
            id="Adsense-id"
            data-ad-client="ca-pub-5241677876798110"
            async
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
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
