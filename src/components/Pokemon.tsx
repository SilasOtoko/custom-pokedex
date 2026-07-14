import React from 'react';
import { Link } from 'react-router';
import { pad } from '../helpers';
import { POKEMON_TYPES, TYPE_COLORS } from '../pokemonTypes';
import TypeBadges from './TypeBadges';

function Pokemon({ pokemon, id, currentUser, favorites, toggleFavorite }) {
  const paddedId = pad(id, 3);
  const types = POKEMON_TYPES[pokemon.name] || [];
  const isFavorited = favorites && favorites[pokemon.name];

  return (
    <div className='relative'>
      <Link to={{ pathname: `/pokemon/${id}`, state: { pokemon } }} className='block bg-white rounded-md shadow hover:shadow-md p-4 pt-10 hover:scale-105 transition duration-200 transform-gpu will-change-transform outline outline-transparent hover:outline-gray-400 h-full'>
        <div className='text-xs absolute top-0 left-0 right-0 mx-auto bg-gray-500 text-white p-1.5 w-25 text-center mb-1 rounded-b-md'>#{paddedId}</div>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`} alt={pokemon.name} className='w-46 h-46 mx-auto object-contain' width='180' height='180' />
        <h3 className='capitalize font-semibold text-gray-800 text-xl mt-1 mb-2'>{pokemon.name}</h3>
        <TypeBadges types={types} />
      </Link>

      {currentUser && (
        <button onClick={() => toggleFavorite(pokemon.name)} className='absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors' title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill={isFavorited ? '#ef4444' : 'none'} stroke={isFavorited ? '#ef4444' : '#9ca3af'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Pokemon;
