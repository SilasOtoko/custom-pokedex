import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBkVI8RXpaeov8QTFzM0Q11oudP52KMFKI",
  authDomain: "custom-pokedex-69a9e.firebaseapp.com",
  databaseURL: "https://custom-pokedex-69a9e.firebaseio.com",
  projectId: "custom-pokedex-69a9e",
  storageBucket: "",
  messagingSenderId: "271775346745"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();