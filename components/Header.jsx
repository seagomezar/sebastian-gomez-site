import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';
import CategoryList from './CategoryList';

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <span className="cursor-pointer font-bold text-3xl text-white min-w-200 max-w-330">
                Sebastian Gomez
              </span>
            </Link>
          </div>
          <div>
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
