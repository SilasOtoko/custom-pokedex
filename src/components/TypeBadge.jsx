import React from 'react';
import { POKEMON_TYPES, TYPE_COLORS } from '../pokemonTypes';

function TypeBadge({ type, children }) {
  const colors = TYPE_COLORS[type] || { bg: 'bg-gray-400', text: 'text-white' };
  return (
    <div className='flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md'>
      <img className='max-w-5' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/small/${colors.id}.png`} alt={`${type} type badge`} />
      <span className={`capitalize text-xs font-semibold`}>{type}</span>
      {children}
    </div>
  );
}

export default TypeBadge;
