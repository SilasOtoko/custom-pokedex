import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchItemDetail } from '../api/items';
import { formatSpriteName, getEnglishEntry, formatLabel } from '../helpers';
import { useCart } from '../context/CartContext';

function ItemDetail() {
  const { itemName } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    setLoading(true);

    fetchItemDetail(`https://pokeapi.co/api/v2/item/${itemName}`).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [itemName]);

  return (
    <div className='max-w-2xl mx-auto px-4 py-8 w-full'>
      <div>
        <div className='flex justify-center py-8 relative min-h-48'>
          {item && (
            <div>
              <div>
                <img src={`https://www.serebii.net/itemdex/sprites/sv/${formatSpriteName(itemName)}.png`} alt={itemName} className='w-48 h-48 object-contain drop-shadow-lg' />
              </div>
              <h3 className='capitalize font-semibold text-gray-800 text-xl mt-1 mb-2'>{getEnglishEntry(item.names)?.name}</h3>
              <p>Cost: ₽{item.cost}</p>
              <p>Category: {formatLabel(item.category.name)}</p>
              <p>Effect: {getEnglishEntry(item.effect_entries)?.short_effect}</p>
              <p>{item.flavor_text_entries.filter((e) => e.language.name === 'en').at(-1)?.text}</p>

              <button type='button' className='px-8 py-3 bg-gray-800 text-white rounded-md transition-colors inline-block mx-auto hover:cursor-pointer hover:bg-gray-600 duration-200' onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
