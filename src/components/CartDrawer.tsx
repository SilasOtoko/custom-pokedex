import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { getEnglishEntry, getItemSpriteUrl } from '../helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CartDrawer({ isOpen, onClose }: Props) {
  const { cart } = useCart();
  const dialogRef = useRef(null);

  const total = cart.reduce(
    (sum, entry) => sum + entry.item.cost * entry.quantity,
    0,
  );

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleClose() {
    const dialog = dialogRef.current;
    dialog?.classList.add('closing');
    setTimeout(() => {
      dialog?.classList.remove('closing');
      onClose();
    }, 300);
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleClose}
      className="drawer"
    >
      <div
        className={`p-4 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            Your cart is empty.
          </p>
        ) : (
          <ul className="flex flex-col gap-3 py-4">
            {cart.map((entry) => {
              const name = getEnglishEntry(entry.item.names)?.name;
              return (
                <li key={entry.item.name} className="flex items-center gap-3">
                  <img
                    src={getItemSpriteUrl(entry.item.name)}
                    alt={name}
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {name}
                    </p>
                    <p className="text-xs text-gray-400">
                      ×{entry.quantity} · ₽{entry.item.cost * entry.quantity}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="border-t pt-4 flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-700">Total</span>
            <span className="text-sm font-bold text-gray-800">₽{total}</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="w-full py-2 text-center border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors hover:cursor-pointer"
          >
            View Cart
          </Link>
          {cart.length > 0 && (
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full py-2 text-center bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors hover:cursor-pointer"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default CartDrawer;
