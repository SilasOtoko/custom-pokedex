import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { pad, formatSpriteName, getEnglishEntry } from '../helpers';
import { fetchItemDetail } from '../api/items';
import pokeballSvg from '../images/pokeball.svg';

function ProductCard({ name, url, selectedCategory }) {
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchItemDetail(url).then((data) => {
      setItemDetail(data);
      setLoading(false);
    });
  }, [url]);

  return (
    <div className='relative bg-white rounded-md shadow hover:shadow-md has-[:hover]:cursor-pointer has-[:hover]:scale-105 has-[:focus]:scale-105 transition duration-200 transform-gpu will-change-transform outline outline-transparent has-[:hover]:outline-gray-400 aspect-square'>
      {loading && !itemDetail && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <img src={pokeballSvg} className='w-12 h-12 spinner-pokeball' alt='Loading spinner' />
        </div>
      )}
      {!loading && itemDetail && (
        <Link to={`/shop/${itemDetail.name}`} className='block p-4 pt-10 h-full text-center'>
          <img src={`https://www.serebii.net/itemdex/sprites/sv/${formatSpriteName(itemDetail.name)}.png`} alt={itemDetail.name} className='w-32 h-32 mx-auto object-contain' width='128' height='128' />
          <h3 className='capitalize font-semibold text-gray-800 text-xl mt-1 mb-2'>{getEnglishEntry(itemDetail.names)?.name}</h3>
          <p>Cost: ₽{itemDetail.cost}</p>
          {/* {itemDetail.category.name !== selectedCategory.id && <p>Category: {selectedCategory.label}</p>} */}
        </Link>
      )}
    </div>
  );
}

export default ProductCard;
