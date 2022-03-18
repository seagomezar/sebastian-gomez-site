import React, { useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import '../styles/globals.scss';
import { Layout } from '../components';
import * as ga from '../lib/analytics';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
