import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta name="viewport" content="width=device-width,minimum-scale=1, initial-scale=1" /> */}
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
          <script data-ad-client="ca-pub-5241677876798110" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
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
