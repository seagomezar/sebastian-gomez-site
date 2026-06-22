import React, { useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.scss';
import { DefaultSeo } from 'next-seo';
import Layout from '../components/Layout';
import SEO from '../next-seo.config';
import * as ga from '../lib/analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-HM718Q7C20';
const shouldLoadAnalytics = process.env.NODE_ENV === 'production'
  && GA_MEASUREMENT_ID
  && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize analytics when the app loads
    ga.initGA();

    const handleRouteChange = (url) => {
      ga.pageview(url);
    };

    // Track initial page view
    ga.pageview(router.asPath);

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.asPath]);

  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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

                // Privacy-compliant defaults; consent is granted via CookieConsent.
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  wait_for_update: 500
                });

                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                  send_page_view: false,
                  cookie_flags: 'SameSite=Strict;Secure'
                });
              `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
