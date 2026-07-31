import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, database } from '../firebase.js';
import { generateTrainerAddress } from '../trainerProfile';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profileRef = ref(database, `users/${user.uid}/profile`);
        const snapshot = await get(profileRef);
        if (!snapshot.exists()) {
          await set(profileRef, generateTrainerAddress());
        }
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
