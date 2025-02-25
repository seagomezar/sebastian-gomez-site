import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Analytics />
      <Header />
      {children}
    </>
  );
}

export default Layout;
