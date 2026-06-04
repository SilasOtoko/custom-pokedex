import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { ref, onValue, set, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './css/index.css';
import Home from './components/Home';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Profile from './components/Profile';
import jsonData from './pokemonlist';
import { auth, database } from './firebase.js';

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = still loading
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const data = jsonData.data.results.slice(0, 151).map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setAllPokemonData(data);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setFavorites({});
      return;
    }
    const favRef = ref(database, `users/${currentUser.uid}/favorites`);
    const unsubscribe = onValue(favRef, (snapshot) => {
      setFavorites(snapshot.val() || {});
    });
    return unsubscribe;
  }, [currentUser]);

  const toggleFavorite = (pokemonName) => {
    if (!currentUser) return;
    if (favorites[pokemonName]) {
      remove(ref(database, `users/${currentUser.uid}/favorites/${pokemonName}`));
    } else {
      set(ref(database, `users/${currentUser.uid}/favorites/${pokemonName}`), true);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/allpokemon' element={<PokemonList allPokemon={allPokemonData} currentUser={currentUser} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path='/pokemon/:id' element={<PokemonDetails allPokemon={allPokemonData} currentUser={currentUser} favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path='/profile' element={<Profile currentUser={currentUser} allPokemon={allPokemonData} favorites={favorites} toggleFavorite={toggleFavorite} />} />
      </Routes>
    </div>
  );
}

export default App;
