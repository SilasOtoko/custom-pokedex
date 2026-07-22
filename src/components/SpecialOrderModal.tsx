import { useRef, useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { database, auth } from '../firebase';
import { useToast } from '../context/ToastContext';
import { formatLabel } from '../helpers';
import { ITEM_SUPPLEMENTS } from '../itemSupplements';

function SpecialOrderModal({ itemName, isOpen, onClose, onSubscribed }) {
  const dialogRef = useRef(null);
  const { addToast } = useToast();
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [submitting, setSubmitting] = useState(false);
  const supplement = ITEM_SUPPLEMENTS[itemName];

  useEffect(() => {
    if (isOpen) {
      setEmail(auth.currentUser?.email || '');
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleClose() {
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // Firebase doesn't allow dots in keys — replace with commas
    const safeEmail = email.replace(/\./g, ',');

    try {
      await set(ref(database, `notifications/${itemName}/${safeEmail}`), {
        email,
        itemName,
        createdAt: Date.now(),
      });
      addToast("We'll notify you when it's available!");
      onSubscribed();
      onClose();
    } catch (err) {
      addToast('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleClose}
      className="backdrop:bg-black/30 rounded-xl shadow-xl p-0 w-full max-w-sm mx-auto my-auto"
    >
      <div className="p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            How to obtain this item
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {supplement?.description
            ? supplement?.description
            : `The ${formatLabel(itemName)} is only available in special circumstances. Submit your email to hear from us on how you can obtain this item.`}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="notify-email" className="text-sm text-gray-600">
              Email address
            </label>
            <input
              id="notify-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-600 transition-colors duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : 'Contact Us'}
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default SpecialOrderModal;
