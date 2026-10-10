import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';

function Categories({ activeCategory = null }) {
  const [categories, setCategories] = useState([]);
  const activeSlug = activeCategory;

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories || []);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h3 className="text-xl font-semibold">Categorías</h3>
        {categories.length > 0 && (
          <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
            {categories.length} Temas
          </span>
        )}
      </div>
      {categories.map((category, index) => {
        const isActive = activeSlug === category.slug;
        return (
          <Link key={category.slug || index} href={`/category/${category.slug}`}>
            <span
              className={`cursor-pointer flex items-center justify-between transition duration-200 ${
                index === categories.length - 1 ? 'border-b-0' : 'border-b'
              } pb-3 mb-3 ${
                isActive
                  ? 'text-pink-600 font-semibold'
                  : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              <span>{category.name}</span>
              {typeof category.count === 'number' && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    isActive
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category.count}
                </span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default Categories;
