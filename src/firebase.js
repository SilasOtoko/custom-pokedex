import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBkVI8RXpaeov8QTFzM0Q11oudP52KMFKI',
  authDomain: 'custom-pokedex-69a9e.firebaseapp.com',
  databaseURL: 'https://custom-pokedex-69a9e.firebaseio.com',
  projectId: 'custom-pokedex-69a9e',
  storageBucket: '',
  messagingSenderId: '271775346745',
};

const app = initializeApp(config);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
