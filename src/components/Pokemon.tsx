import React from 'react';
import { Link } from 'react-router';
import { pad } from '../helpers';
import { POKEMON_TYPES, TYPE_COLORS } from '../pokemonTypes';
import { useAuth } from '../context/AuthContext';
import TypeBadges from './TypeBadges';
import FavoriteButton from './FavoriteButton';
import { PokemonListItem } from '../types';

interface Props {
  pokemon: PokemonListItem;
  id: number;
  favorites: Record<string, boolean>;
  toggleFavorite: (name: string) => void;
}

function Pokemon({ pokemon, id, favorites, toggleFavorite }: Props) {
  const { currentUser } = useAuth();
  const paddedId = pad(id, 3);
  const types = POKEMON_TYPES[pokemon.name] || [];

  return (
    <div className="relative group transform-gpu will-change-transform transition duration-200 hover:scale-105 hover:shadow-md">
      <Link
        to={{ pathname: `/pokemon/${id}`, state: { pokemon } }}
        className="block bg-white rounded-md shadow p-4 pt-10 transition duration-200 outline outline-transparent hover:outline-gray-400 h-full"
      >
        <div className="text-xs absolute top-0 left-0 right-0 mx-auto bg-gray-500 text-white p-1.5 w-25 text-center mb-1 rounded-b-md">
          #{paddedId}
        </div>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
          alt={pokemon.name}
          className="w-36 md:w-46 h-36 md:h-46 mx-auto object-contain"
          width="180"
          height="180"
        />
        <h3 className="font-alt font-bold capitalize text-gray-800 text-xl mt-1 mb-2">
          {pokemon.name}
        </h3>
        <TypeBadges types={types} />
      </Link>
      {currentUser && (
        <FavoriteButton
          pokemon={pokemon}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          className="absolute top-3 right-3"
        />
      )}
    </div>
  );
}

export default Pokemon;
