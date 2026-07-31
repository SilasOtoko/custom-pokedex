import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { getEnglishEntry, getItemSpriteUrl } from '../helpers';
import { fetchItemDetail } from '../api/items';
import { useAddToCart } from '../hooks/useAddToCart';
import OrderSummary from './OrderSummary';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ProductCard from './ProductCard';

const UPSELL_ITEMS = [
  'https://pokeapi.co/api/v2/item/potion/',
  'https://pokeapi.co/api/v2/item/antidote/',
  'https://pokeapi.co/api/v2/item/repel/',
  'https://pokeapi.co/api/v2/item/escape-rope/',
];

function Cart() {
  useDocumentTitle('Cart');

  const { cart } = useCart();
  const [upsellItems, setUpsellItems] = useState([]);

  useEffect(() => {
    Promise.all(UPSELL_ITEMS.map((url) => fetchItemDetail(url))).then(
      setUpsellItems,
    );
  }, []);

  const cartItemNames = new Set(cart.map((e) => e.item.name));
  const filteredUpsells = upsellItems.filter(
    (item) => !cartItemNames.has(item.name),
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart</h1>
        <p className="text-gray-500 mb-8">
          You haven't added anything yet.{' '}
          <Link
            to="/shop"
            className="text-stone-700 font-semibold hover:underline"
          >
            Browse the shop →
          </Link>
        </p>
        {upsellItems.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Start with these suggestions
            </h2>
            <div className="grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {upsellItems.map((item) => (
                <ProductCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <OrderSummary cart={cart} showControls={true} />

      <div className="mt-6 flex justify-end">
        <Link
          to="/checkout"
          className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 hover:cursor-pointer"
        >
          Proceed to Checkout
        </Link>
      </div>

      {filteredUpsells.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
            You might also need
          </h2>
          <div className="grid xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredUpsells.map((item) => (
              <ProductCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
