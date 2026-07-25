import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  pad,
  formatSpriteName,
  getEnglishEntry,
  getItemSpriteUrl,
  formatLabel,
} from '../helpers';
import { fetchMachineMove } from '../api/items';
import pokeballSvg from '../images/pokeball.svg';
import { UNAVAILABLE_ITEMS } from '../shopCategories';
import ProductActions from './ProductActions';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

function ProductCard({ name, item, selectedCategory }) {
  const [loading, setLoading] = useState(false);
  const [moveName, setMoveName] = useState(null);
  const [moveType, setMoveType] = useState(null);
  const isAvailable = !UNAVAILABLE_ITEMS.includes(item);

  useEffect(() => {
    if (selectedCategory.id === 'tms') {
      fetchMachineMove(item).then((move) => {
        setMoveName(move?.name);
        setMoveType(move?.type);
      });
    }
  }, [item]);

  return (
    <Card className="h-full">
      {loading && !item && <LoadingSpinner />}
      {!loading && item && (
        <div className="relative h-full flex flex-col">
          <Link
            to={`/shop/${item.name}`}
            className="absolute inset-0 z-0"
          ></Link>
          <div className="relative pt-10 z-10 text-center pointer-events-none">
            <img
              src={getItemSpriteUrl(item.name, moveType)}
              alt={item.name}
              className="w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 mx-auto object-contain"
              width="128"
              height="128"
            />
            <h3 className="capitalize font-semibold text-gray-800 text-xl mt-1 mb-2 flex justify-center">
              {getEnglishEntry(item.names)?.name}
              {moveName && <p>: {formatLabel(moveName)}</p>}
            </h3>
            <p>Cost: ₽{item.cost}</p>
          </div>
          <div className="relative z-10 px-4 pb-6 mt-auto">
            <ProductActions item={item} className="mt-4" />
          </div>
        </div>
      )}
    </Card>
  );
}

export default ProductCard;
