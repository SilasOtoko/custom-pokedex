import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import {
  SHOP_CATEGORIES,
  UNAVAILABLE_ITEMS,
  SPECIAL_ORDER_ITEMS,
} from '../shopCategories';
import { fetchCategoryItems, fetchItemDetail } from '../api/items';
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
  const [sortOrder, setSortOrder] = useState<
    'asc' | 'desc' | 'name-asc' | 'name-desc' | null
  >(null);

  useEffect(() => {
    setLoading(true);

    fetchCategoryItems(selectedCategory).then((stubs) => {
      Promise.all(stubs.map((stub) => fetchItemDetail(stub.url))).then(
        (details) => {
          setItems(details);
          setLoading(false);
        },
      );
    });
  }, [selectedCategory]);

  const availableItems = items
    .filter(
      (item) =>
        ![...UNAVAILABLE_ITEMS, ...SPECIAL_ORDER_ITEMS].includes(item?.name),
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.cost - b.cost;
      if (sortOrder === 'desc') return b.cost - a.cost;
      if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  const unavailableItems = items.filter((item) =>
    [...UNAVAILABLE_ITEMS, ...SPECIAL_ORDER_ITEMS].includes(item?.name),
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
      <div className="relative">
        <h1 className="text-3xl text-center text-gray-700 mb-6 font-alt">
          {selectedCategory.label}
        </h1>
        <div className="flex items-center gap-2 absolute right-0 top-2">
          <label htmlFor="sort-options">Sort by: </label>
          <select
            id="sort-options"
            onChange={(e) =>
              setSortOrder(e.target.value as 'asc' | 'desc' | null)
            }
            className="min-h-10 px-4 py-2 bg-white border border-gray-400 rounded-md cursor-text focus-within:outline-2 focus-within:outline-sky-600 focus-within:-outline-offset-1 focus-visible:border-transparent"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
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
                <ProductCard item={item} selectedCategory={selectedCategory} />
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
                      item={item}
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
