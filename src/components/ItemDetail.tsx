import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { fetchItemDetail, fetchMachineMove } from '../api/items';
import { getItemSpriteUrl, getEnglishEntry, formatLabel } from '../helpers';
import pokeballSvg from '../images/pokeball.svg';
import ProductActions from './ProductActions';
import TypeBadges from './TypeBadges';
import LoadingSpinner from './LoadingSpinner';

function ItemDetail() {
  const { itemName } = useParams();
  const [item, setItem] = useState(null);

  const itemTitle = item
    ? (getEnglishEntry(item.names)?.name ?? itemName)
    : itemName;
  useDocumentTitle(itemTitle);
  const [loading, setLoading] = useState(false);
  const [moveName, setMoveName] = useState(null);
  const [moveType, setMoveType] = useState(null);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setItem(null);
    setMoveName(null);
    setMoveType(null);

    fetchItemDetail(`https://pokeapi.co/api/v2/item/${itemName}`).then(
      (data) => {
        setItem(data);
        setLoading(false);
        fetchMachineMove(data).then((move) => {
          setMoveName(move?.name);
          setMoveType(move?.type);
        });
      },
    );
  }, [itemName]);

  const englishName = getEnglishEntry(item?.names)?.name;
  const englishEffect = getEnglishEntry(item?.effect_entries)?.short_effect;
  const englishFlavor = item?.flavor_text_entries
    .filter((e) => e.language.name === 'en')
    .at(-1)?.text;

  return (
    <div className="max-w-2xl mx-auto px-8 py-20 w-full">
      <div className="bg-blue-50 rounded-t-md p-6">
        <div className="flex justify-start">
          <Link
            to="/shop"
            className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Shop
          </Link>
        </div>
        {/* Sprite hero */}
        <div className="flex justify-center py-8 relative min-h-48">
          {item && (
            <img
              src={getItemSpriteUrl(itemName)}
              alt={englishName || itemName}
              className="w-48 h-48 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = item.sprites?.default || '';
              }}
            />
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>

      {/* Content card */}
      {item && (
        <div className="p-6 bg-white rounded-b-md relative">
          {/* Name */}
          <h1 className="capitalize text-3xl font-alt font-bold text-gray-700 mb-4">
            {englishName}
          </h1>

          {/* Cost + Category grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Cost
              </div>
              <div className="font-semibold text-gray-700">₽{item.cost}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Category
              </div>
              <div className="font-semibold text-gray-700">
                {formatLabel(item.category.name)}
              </div>
            </div>
          </div>

          {/* TM move */}
          {moveName && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Teaches
              </h3>
              <p className="text-gray-700">{formatLabel(moveName)}</p>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2 mt-6">
                Move Type
              </h3>
              <TypeBadges className="mt-2" types={[moveType]} />
            </div>
          )}

          {/* Effect */}
          {englishEffect && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Effect
              </h3>
              <p className="text-gray-700">{englishEffect}</p>
            </div>
          )}

          {/* Flavor text */}
          {englishFlavor && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Description
              </h3>
              <p className="text-gray-600 italic">{englishFlavor}</p>
            </div>
          )}

          <ProductActions item={item} />
        </div>
      )}
    </div>
  );
}

export default ItemDetail;
