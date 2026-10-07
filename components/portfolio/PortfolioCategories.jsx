import React from 'react';

function PortfolioCategories({
  categories = [],
  activeCategory = 'all',
  onSelectCategory,
}) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h3 className="text-xl font-semibold">Categorías</h3>
        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
          {categories.length} Temas
        </span>
      </div>
      {categories.map((category, index) => {
        const isActive = activeCategory === category.slug;
        return (
          <button
            key={category.slug}
            type="button"
            onClick={() => onSelectCategory && onSelectCategory(category.slug)}
            className={`w-full text-left cursor-pointer flex items-center justify-between transition duration-200 ${
              index === categories.length - 1 ? 'border-b-0' : 'border-b'
            } pb-3 mb-3 ${
              isActive
                ? 'text-pink-600 font-semibold'
                : 'text-gray-700 hover:text-pink-600'
            }`}
          >
            <span>{category.name}</span>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                isActive
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default PortfolioCategories;
