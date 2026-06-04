import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { pad } from '../helpers';
import { TYPE_COLORS } from '../pokemonTypes';
import PokemonDescription from './PokemonDescription';
import EvolutionChain from './EvolutionChain';
import TypeBadges from './TypeBadges';
import pokeballSvg from '../images/pokeball.svg';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

function StatBar({ name, value }) {
  const label = STAT_LABELS[name] || name;
  const pct = Math.min((value / 255) * 100, 100);
  const color = value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-yellow-400' : 'bg-red-400';
  return (
    <div className='flex items-center gap-3'>
      <span className='text-xs text-gray-500 w-16 text-right shrink-0'>{label}</span>
      <div className='flex-1 bg-gray-200 rounded-full h-2'>
        <div className={`h-2 rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className='text-xs font-mono text-gray-700 w-8 shrink-0'>{value}</span>
    </div>
  );
}

function PokemonDetails({ allPokemon, currentUser, favorites, toggleFavorite }) {
  const [pokemon, setPokemon] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();

  const maxId = allPokemon ? allPokemon.length : 151;

  const fetchPokemon = useCallback(
    (id) => {
      setLoading(true);

      const spinnerTimer = setTimeout(() => setShowSpinner(true), 100);

      setPokemon(null);
      setSpeciesData(null);
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          clearTimeout(spinnerTimer);
          setShowSpinner(false);
          setLoading(false);
          navigate(`/pokemon/${data.id}`, { replace: true });
          // Also fetch species for evolution chain URL
          return fetch(data.species.url);
        })
        .then((res) => res && res.json())
        .then((data) => data && setSpeciesData(data))
        .catch(() => {
          clearTimeout(spinnerTimer);
          setShowSpinner(false);
          setLoading(false);
        });
    },
    [navigate]
  );

  useEffect(() => {
    fetchPokemon(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const paddedId = pokemon ? pad(pokemon.id, 3) : null;
  const types = pokemon ? pokemon.types.map((t) => t.type.name) : [];
  const isFavorited = pokemon && favorites && favorites[pokemon.name];
  const primaryType = pokemon && types[0];
  const bgColor = TYPE_COLORS[primaryType]?.bg || 'bg-gray-200';

  return (
    <div className='max-w-2xl mx-auto px-4 py-8 w-full'>
      {/* Navigation */}
      <div className='flex items-center justify-between mb-6'>
        <button onClick={() => fetchPokemon(id - 1)} disabled={numericId <= 1} className='flex items-center gap-1 px-3 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
          Prev
        </button>
        <button onClick={() => fetchPokemon(numericId + 1)} disabled={numericId >= maxId} className='flex items-center gap-1 px-3 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors'>
          Next
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <polyline points='9 18 15 12 9 6' />
          </svg>
        </button>
      </div>

      <div>
        {/* Sprite hero */}
        <div className='flex justify-center py-8 relative min-h-48'>
          {pokemon && (
            <div>
              <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`} alt={pokemon.name} className='w-48 h-48 object-contain drop-shadow-lg' />
              {currentUser && (
                <button onClick={() => toggleFavorite(pokemon.name)} className='absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 shadow transition-all' title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill={isFavorited ? '#ef4444' : 'none'} stroke={isFavorited ? '#ef4444' : '#9ca3af'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                  </svg>
                </button>
              )}
            </div>
          )}
          {!pokemon && showSpinner && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <img src={pokeballSvg} className='w-12 h-12 spinner-pokeball' alt='Loading spinner' />
            </div>
          )}
        </div>

        {pokemon && (
          <div className='p-6 bg-white rounded-md rounded-tl-none relative'>
            <span className='text-xs absolute -top-7 left-0 mx-auto bg-white p-1.5 w-25 text-center mb-1 rounded-t-xl font-serif text-gray-500'>#{paddedId}</span>
            {/* Name + types */}
            <div className='mb-4'>
              <h1 className='capitalize text-3xl font-bold text-gray-800 mb-2'>{pokemon.name}</h1>
              <TypeBadges className='mt-2' types={types} />
            </div>

            {/* Description */}
            <div className='mb-6'>
              <PokemonDescription pokemon={pokemon.name} />
            </div>

            {/* Physical attributes */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='bg-gray-50 rounded-xl p-3 text-center'>
                <div className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Height</div>
                <div className='font-semibold text-gray-700'>{(pokemon.height * 0.1).toFixed(1)} m</div>
              </div>
              <div className='bg-gray-50 rounded-xl p-3 text-center'>
                <div className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Weight</div>
                <div className='font-semibold text-gray-700'>{(pokemon.weight * 0.1).toFixed(1)} kg</div>
              </div>
            </div>

            {/* Abilities */}
            <div className='mb-6'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2'>Abilities</h3>
              <div className='flex gap-2 flex-wrap'>
                {pokemon.abilities.map((a) => (
                  <span key={a.ability.name} className='capitalize bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full'>
                    {a.ability.name.replace('-', ' ')}
                    {a.is_hidden && <span className='text-gray-400 text-xs ml-1'>(hidden)</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Base stats */}
            <div className='mb-6'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3'>Base Stats</h3>
              <div className='flex flex-col gap-2'>
                {pokemon.stats.map((s) => (
                  <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
                ))}
              </div>
            </div>

            {/* Evolution chain */}
            {speciesData && speciesData.evolution_chain && <EvolutionChain evolutionChainUrl={speciesData.evolution_chain.url} allPokemon={allPokemon} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
