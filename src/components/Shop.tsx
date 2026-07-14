import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SHOP_CATEGORIES, UNAVAILABLE_ITEMS } from '../shopCategories';
import { fetchCategoryItems } from '../api/items';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory =
    SHOP_CATEGORIES.find((c) => c.id === searchParams.get('category')) ||
    SHOP_CATEGORIES[0];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setLoading(true);

    fetchCategoryItems(selectedCategory).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  const availableItems = items.filter(
    (item) => !UNAVAILABLE_ITEMS.includes(item?.name),
  );
  const unavailableItems = items.filter((item) =>
    UNAVAILABLE_ITEMS.includes(item?.name),
  );

  return (
    <div className="max-w-6xl mx-auto p-8 w-full">
      <div
        role="tablist"
        aria-label="Shop categories"
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {SHOP_CATEGORIES.map((category) => (
          <button
            key={category.id}
            role="tab"
            aria-selected={selectedCategory.id === category.id}
            aria-controls="category-panel"
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:cursor-pointer ${
              selectedCategory.id === category.id
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <h1 className="text-3xl text-center text-gray-700 mb-6 font-alt">
        {selectedCategory.label}
      </h1>
      {loading && <LoadingSpinner />}
      {!loading && (
        <div>
          <div
            id="category-panel"
            role="tabpanel"
            aria-label={`${selectedCategory.label} items`}
            className="grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8"
          >
            {availableItems.map((item, index) => (
              <div
                key={`${selectedCategory.id}-${item.name}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  url={item.url}
                  selectedCategory={selectedCategory}
                />
              </div>
            ))}
          </div>
          {unavailableItems.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-alt text-center">
                Unavailable Items
              </h3>
              <div className="grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                {unavailableItems.map((item, index) => (
                  <div
                    key={`${selectedCategory.id}-${item.name}`}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <ProductCard
                      url={item.url}
                      selectedCategory={selectedCategory}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Shop;
