import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  pad,
  formatSpriteName,
  getEnglishEntry,
  getItemSpriteUrl,
  formatLabel,
} from '../helpers';
import { fetchItemDetail, fetchMachineMove } from '../api/items';
import pokeballSvg from '../images/pokeball.svg';
import { UNAVAILABLE_ITEMS } from '../shopCategories';
import ProductActions from './ProductActions';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

function ProductCard({ name, url, selectedCategory }) {
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moveName, setMoveName] = useState(null);
  const [moveType, setMoveType] = useState(null);
  const isAvailable = !UNAVAILABLE_ITEMS.includes(itemDetail);

  useEffect(() => {
    setLoading(true);

    fetchItemDetail(url).then((data) => {
      setItemDetail(data);
      setLoading(false);
      if (selectedCategory.id === 'tms') {
        fetchMachineMove(data).then((move) => {
          setMoveName(move?.name);
          setMoveType(move?.type);
        });
      }
    });
  }, [url]);

  return (
    <Card>
      {loading && !itemDetail && <LoadingSpinner />}
      {!loading && itemDetail && (
        <div className="relative">
          <Link
            to={`/shop/${itemDetail.name}`}
            className="absolute inset-0 z-0"
          ></Link>
          <div className="relative pt-10 z-10 text-center pointer-events-none">
            <img
              src={getItemSpriteUrl(itemDetail.name, moveType)}
              alt={itemDetail.name}
              className="w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 mx-auto object-contain"
              width="128"
              height="128"
            />
            <h3 className="capitalize font-semibold text-gray-800 text-xl mt-1 mb-2 flex justify-center">
              {getEnglishEntry(itemDetail.names)?.name}
              {moveName && <p>: {formatLabel(moveName)}</p>}
            </h3>
            <p>Cost: ₽{itemDetail.cost}</p>
          </div>
          <div className="relative z-10 px-4 pb-6">
            <ProductActions item={itemDetail} className="mt-4" />
          </div>
        </div>
      )}
    </Card>
  );
}

export default ProductCard;
