import React, { useState, useEffect } from 'react';
import { SHOP_CATEGORIES } from '../shopCategories';
import { fetchCategoryItems } from '../api/items';
import pokeballSvg from '../images/pokeball.svg';
import ProductCard from './ProductCard';

function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(SHOP_CATEGORIES[0]);

  useEffect(() => {
    setLoading(true);

    fetchCategoryItems(selectedCategory.apiCategories).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [selectedCategory]);

  return (
    <div className='max-w-6xl mx-auto p-8 w-full'>
      <h1 className='text-3xl text-center text-gray-700 mb-6 font-serif'>{selectedCategory.label}</h1>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <img src={pokeballSvg} className='w-12 h-12 spinner-pokeball' alt='Loading spinner' />
        </div>
      )}
      {!loading && (
        <div className='grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8'>
          {items.map((item) => (
            <ProductCard url={item.url} key={item.name} selectedCategory={selectedCategory} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;
