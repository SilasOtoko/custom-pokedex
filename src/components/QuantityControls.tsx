import React from 'react';
import { useCart } from '../context/CartContext';

function QuantityControls({ item, className = '', children }) {
  const { cart, dispatch } = useCart();
  const entry = cart.find((e) => e.item.name === item?.name);

  if (!entry) return null;

  return (
    <div
      role="group"
      aria-label="Quantity controls"
      className={`flex justify-between ${className}`}
    >
      {entry.quantity === 1 ? (
        <button
          type="button"
          aria-label={`Remove ${name} from cart`}
          className="w-6 h-6 bg-rose-800 flex items-center justify-center text-white rounded-md hover:cursor-pointer hover:scale-115 hover:bg-rose-900 duration-200 transition"
          onClick={() =>
            dispatch({
              type: 'REMOVE_ITEM',
              payload: entry.item,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-3 h-3 fill-current"
          >
            <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          aria-label={`Decrease quantity of ${name}`}
          className="w-6 h-6 bg-sky-800 flex items-center justify-center text-white rounded-md hover:cursor-pointer hover:scale-115 hover:bg-sky-900 duration-200 transition"
          onClick={() =>
            dispatch({
              type: 'DECREMENT_ITEM',
              payload: entry.item,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-3 h-3 fill-current"
          >
            <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" />
          </svg>
        </button>
      )}
      {children}
      <button
        type="button"
        aria-label={`Increase quantity of ${name}`}
        className="w-6 h-6 bg-sky-800 flex items-center justify-center text-white rounded-md hover:cursor-pointer hover:scale-115 hover:bg-sky-900 duration-200 transition"
        onClick={() => dispatch({ type: 'ADD_ITEM', payload: entry.item })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-3 h-3 fill-current"
        >
          <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityControls;
