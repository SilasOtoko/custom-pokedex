import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { formatSpriteName, getEnglishEntry } from '../helpers';
import OrderSummary from '../components/OrderSummary';

function CartDrawer({ isOpen, onClose }) {
  const { cart } = useCart();
  const dialogRef = useRef(null);

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
        <div>{cart && <OrderSummary cart={cart} showControls={true} />}</div>
        <Link
          to="/checkout"
          className="mt-6 px-8 py-3 bg-gray-800 text-white rounded-md transition-colors inline-block mx-auto hover:cursor-pointer hover:bg-gray-600 duration-200"
          onClick={onClose}
        >
          Checkout
        </Link>
      </div>
    </dialog>
  );
}

export default CartDrawer;
