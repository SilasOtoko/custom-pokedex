import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchItemDetail, fetchMachineMove } from '../api/items';
import { getItemSpriteUrl, getEnglishEntry, formatLabel } from '../helpers';
import pokeballSvg from '../images/pokeball.svg';
import ProductActions from './ProductActions';

function ItemDetail() {
  const { itemName } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moveName, setMoveName] = useState(null);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setItem(null);
    setMoveName(null);

    fetchItemDetail(`https://pokeapi.co/api/v2/item/${itemName}`).then(
      (data) => {
        setItem(data);
        setLoading(false);
        fetchMachineMove(data).then((move) => setMoveName(move));
      },
    );
  }, [itemName]);

  const englishName = getEnglishEntry(item?.names)?.name;
  const englishEffect = getEnglishEntry(item?.effect_entries)?.short_effect;
  const englishFlavor = item?.flavor_text_entries
    .filter((e) => e.language.name === 'en')
    .at(-1)?.text;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 w-full">
      {/* Sprite hero */}
      <div className="flex justify-center py-8 relative min-h-48">
        {item && (
          <img
            src={getItemSpriteUrl(itemName)}
            alt={englishName || itemName}
            className="w-48 h-48 object-contain drop-shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = item.sprites?.default || '';
            }}
          />
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={pokeballSvg}
              className="w-12 h-12 spinner-pokeball"
              alt="Loading spinner"
            />
          </div>
        )}
      </div>

      {/* Content card */}
      {item && (
        <div className="p-6 bg-white rounded-md rounded-tl-none relative">
          {/* Category tab */}
          <span className="text-xs absolute -top-7 left-0 bg-white p-1.5 w-25 text-center rounded-t-xl font-serif text-gray-500">
            {formatLabel(item.category.name)}
          </span>

          {/* Name */}
          <h1 className="capitalize text-3xl font-bold text-gray-800 mb-4">
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
