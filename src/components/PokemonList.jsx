import React, { useState, useMemo } from 'react';
import Pokemon from './Pokemon';
import { POKEMON_TYPES, TYPE_COLORS } from '../pokemonTypes';
import Label from './form/Label';
import TypeCombobox from './TypeCombobox';
import pokeballSvg from '../images/pokeball.svg';

function PokemonList({ allPokemon, currentUser, favorites, toggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTypes, setActiveTypes] = useState([]);

  const toggleType = (type) => {
    setActiveTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const filteredPokemon = useMemo(() => {
    return (allPokemon || []).filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      if (activeTypes.length === 0) return true;
      const types = POKEMON_TYPES[pokemon.name] || [];
      return activeTypes.some((t) => types.includes(t));
    });
  }, [allPokemon, searchTerm, activeTypes]);

  if (!allPokemon || allPokemon.length === 0) {
    return (
      <div className='flex justify-center items-center flex-1 py-20'>
        <div className='w-16 h-16 spinner-pokeball opacity-50'>
          <img src={pokeballSvg} alt='Loading' className='w-full' />
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 w-full'>
      <h1 className='text-3xl text-center text-gray-700 mb-6 font-serif'>Kanto Pokédex</h1>

      <div className='flex justify-between'>
        {/* Search */}
        <div className='min-w-sm'>
          <Label htmlFor='pokemon-search'>Search by name</Label>
          <input id='pokemon-search' type='text' placeholder='Search Pokémon...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-full max-w-md mx-auto block px-4 py-2 border border-gray-400 rounded-md focus-within:outline-2 focus-within:outline-sky-600 focus-within:-outline-offset-1 focus-visible:border-transparent bg-white' />
        </div>

        <TypeCombobox selectedTypes={activeTypes} onChange={setActiveTypes} />
      </div>

      {/* Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
        {filteredPokemon.map((pokemon) => (
          <Pokemon key={pokemon.name} id={pokemon.id} pokemon={pokemon} currentUser={currentUser} favorites={favorites} toggleFavorite={toggleFavorite} />
        ))}
      </div>

      {filteredPokemon.length === 0 && <p className='text-center text-gray-500 py-16'>No Pokémon match your search.</p>}
    </div>
  );
}

export default PokemonList;
