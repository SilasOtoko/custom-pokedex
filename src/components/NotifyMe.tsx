import { useState, useEffect } from 'react';
import NotifyMeModal from './NotifyMeModal';
import { get, ref } from 'firebase/database';
import { auth, database } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

interface Props {
  itemName: string;
}

function NotifyMe({ itemName }: Props) {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
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
          You're on the list ✓
        </button>
      ) : (
        <div>
          <button
            type="button"
            className="w-full px-8 py-3 bg-gray-800 text-white rounded-md transition-colors hover:cursor-pointer hover:bg-gray-600 duration-200"
            onClick={() => setIsNotifyOpen(true)}
          >
            Notify Me
          </button>
          <NotifyMeModal
            itemName={itemName}
            isOpen={isNotifyOpen}
            onClose={() => setIsNotifyOpen(false)}
            onSubscribed={() => setIsSubscribed(true)}
          />
        </div>
      )}
    </>
  );
}

export default NotifyMe;
