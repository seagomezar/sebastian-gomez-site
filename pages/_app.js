import React, { useEffect } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.scss';
import { Layout } from '../components';
import * as ga from '../lib/analytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights/>
    </Layout>
  );
}

export default MyApp;
