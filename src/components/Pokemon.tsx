import React from 'react';
import { Link } from 'react-router';
import { pad } from '../helpers';
import { POKEMON_TYPES, TYPE_COLORS } from '../pokemonTypes';
import TypeBadges from './TypeBadges';
import FavoriteButton from './FavoriteButton';

function Pokemon({ pokemon, id, currentUser, favorites, toggleFavorite }) {
  const paddedId = pad(id, 3);
  const types = POKEMON_TYPES[pokemon.name] || [];

  return (
    <div className="relative">
      <Link
        to={{ pathname: `/pokemon/${id}`, state: { pokemon } }}
        className="block bg-white rounded-md shadow hover:shadow-md p-4 pt-10 hover:scale-105 transition duration-200 transform-gpu will-change-transform outline outline-transparent hover:outline-gray-400 h-full"
      >
        <div className="text-xs absolute top-0 left-0 right-0 mx-auto bg-gray-500 text-white p-1.5 w-25 text-center mb-1 rounded-b-md">
          #{paddedId}
        </div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
          alt={pokemon.name}
          className="w-46 h-46 mx-auto object-contain"
          width="180"
          height="180"
        />
        <h3 className="capitalize font-semibold text-gray-800 text-xl mt-1 mb-2">
          {pokemon.name}
        </h3>
        <TypeBadges types={types} />
      </Link>

      {currentUser && (
        <FavoriteButton
          pokemon={pokemon}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default Pokemon;
