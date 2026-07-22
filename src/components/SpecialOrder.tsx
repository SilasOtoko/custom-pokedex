import { useState, useEffect } from 'react';
import SpecialOrderModal from './SpecialOrderModal';
import { get, ref } from 'firebase/database';
import { auth, database } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function SpecialOrder({ itemName }) {
  const [isSpecialOrderOpen, setIsSpecialOrderOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      async function checkSubscription() {
        const safeEmail = auth.currentUser.email.replace(/\./g, ',');
        const snapshot = await get(
          ref(database, `notifications/${itemName}/${safeEmail}`),
        );

        if (snapshot.exists()) {
          setIsSubscribed(true);
        }
      }
      checkSubscription();
    });

    return unsubscribe;
  }, [itemName]);

  return (
    <>
      {isSubscribed ? (
        <button
          type="button"
          className="w-full px-8 py-3 bg-gray-500 text-white rounded-md transition-colors hover:cursor-not-allowed duration-200"
          disabled
        >
          Request Sent ✓
        </button>
      ) : (
        <div>
          <button
            type="button"
            className="w-full px-8 py-3 bg-gray-800 text-white rounded-md transition-colors hover:cursor-pointer hover:bg-gray-600 duration-200"
            onClick={() => setIsSpecialOrderOpen(true)}
          >
            Learn More
          </button>
          <SpecialOrderModal
            itemName={itemName}
            isOpen={isSpecialOrderOpen}
            onClose={() => setIsSpecialOrderOpen(false)}
            onSubscribed={() => setIsSubscribed(true)}
          />
        </div>
      )}
    </>
  );
}

export default SpecialOrder;
