import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import {
  formatSpriteName,
  getEnglishEntry,
  getItemSpriteUrl,
} from '../helpers';
import QuantityControls from './QuantityControls';
import { CartEntry } from '../types';

interface Props {
  cart: CartEntry[];
  showControls?: boolean;
}

function OrderSummary({ cart, showControls = false }: Props) {
  const total = cart.reduce(
    (sum, entry) => sum + entry.item.cost * entry.quantity,
    0,
  );

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Order Summary
      </h2>
      <ul className="flex flex-col gap-3 mb-6">
        {cart.map((entry, index) => (
          <li
            key={index}
            className="flex items-center gap-3 bg-white rounded-md p-3 shadow-sm"
          >
            <img
              src={getItemSpriteUrl(entry.item.name)}
              alt={getEnglishEntry(entry.item.names)?.name}
              className="w-10 h-10 object-contain"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {getEnglishEntry(entry.item.names)?.name}
              </p>
              <p className="text-xs text-gray-500">Qty: {entry.quantity}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-700">
                ₽{entry.item.cost * entry.quantity}
              </p>
              {showControls && (
                <QuantityControls item={entry.item} className="w-16 mt-2" />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-700">Total</span>
        <span className="font-bold text-lg text-gray-800">₽{total}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
