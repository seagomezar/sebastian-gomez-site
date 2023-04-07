import React from 'react';
import Link from 'next/link';

function MenuItem({ href, children }) {
  return (
    <Link href={href}>
      <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-4 py-3 cursor-pointer border-blue-400 border-r">
        {children}
      </span>
    </Link>
  );
}

export default React.memo(MenuItem);
