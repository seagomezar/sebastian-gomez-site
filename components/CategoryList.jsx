import React, { useState } from 'react';
import Link from 'next/link';

const CategoryList = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-white font-semibold focus:outline-none"
        onClick={toggleDropdown}
      >
        {/* Ícono de menú */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
          <nav className="py-1 rounded-md divide-y divide-gray-200">
            {/* Enlace "About" */}
            <Link href="/about">
              <span onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                📄 About
              </span>
            </Link>
            {/* Enlace "Conferencias" */}
            <Link href="/talks">
              <span onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                🎤 Conferencias
              </span>
            </Link>
            {/* Categorías */}
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.slug}`}>
                <span onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  📚 {category.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoryList);
