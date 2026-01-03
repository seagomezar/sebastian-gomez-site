import React from 'react';
import Header from './Header';
import CookieConsent from './CookieConsent';

function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link absolute -top-96 left-0 bg-white p-4 focus:top-0 z-50">Skip to content</a>
      <Header />
      <main id="main-content">
        {children}
      </main>
      <CookieConsent />
    </>
  );
}

export default Layout;
