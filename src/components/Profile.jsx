import React from 'react';
import { useNavigate } from 'react-router';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import Pokemon from './Pokemon';

function Profile({ currentUser, allPokemon, favorites, toggleFavorite, history }) {
  if (!currentUser) {
    return (
      <div className='flex justify-center items-center flex-1 py-20'>
        <p className='text-gray-500'>Please sign in to view your profile.</p>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate('/allpokemon', { replace: true });
  };

  const favoritedPokemon = allPokemon ? allPokemon.filter((p) => favorites && favorites[p.name]) : [];

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 w-full'>
      {/* User card */}
      <div className='bg-white rounded-2xl shadow p-6 flex items-center gap-4 mb-8'>
        <img src={currentUser.photoURL} alt={currentUser.displayName} className='w-16 h-16 rounded-full border-2 border-red-400' />
        <div className='flex-1'>
          <h2 className='text-xl font-bold text-gray-800'>{currentUser.displayName}</h2>
          <p className='text-gray-500 text-sm'>{currentUser.email}</p>
        </div>
        <button onClick={handleLogout} className='px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors'>
          Sign Out
        </button>
      </div>

      {/* Favorites section */}
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        Favorite Pokémon
        <span className='ml-2 text-sm font-normal text-gray-400'>({favoritedPokemon.length})</span>
      </h2>

      {favoritedPokemon.length === 0 ? (
        <div className='bg-white rounded-2xl shadow p-12 text-center text-gray-400'>
          <p className='text-lg mb-2'>No favorites yet.</p>
          <p className='text-sm'>Tap the ♥ on any Pokémon to save it here.</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {favoritedPokemon.map((pokemon) => (
            <Pokemon key={pokemon.name} id={pokemon.id} pokemon={pokemon} currentUser={currentUser} favorites={favorites} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
