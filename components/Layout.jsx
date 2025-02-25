import React from 'react';
import Header from './Header';
import { Analytics } from "@vercel/analytics/react"

function Layout({ children }) {
  return (
    <>
      <Header />
      <Analytics/>
      {children}
    </>
  );
}

export default Layout;
