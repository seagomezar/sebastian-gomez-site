import React from 'react';
import Header from './Header';
import CookieConsent from './CookieConsent';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <CookieConsent />
    </>
  );
}

export default Layout;
