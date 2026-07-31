import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import { PokemonListItem } from '../types';
import { pad, getPokemonIconUrl } from '../helpers';
import { TYPE_COLORS } from '../pokemonTypes';
import PokemonDescription from './PokemonDescription';
import EvolutionChain from './EvolutionChain';
import TypeBadges from './TypeBadges';
import FavoriteButton from './FavoriteButton';
import pokeballSvg from '../images/faded-pokeball.svg';
import LoadingSpinner from './LoadingSpinner';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

interface StatBarProps {
  name: string;
  value: number;
}

function StatBar({ name, value }: StatBarProps) {
  const label = STAT_LABELS[name] || name;
  const pct = Math.min((value / 255) * 100, 100);
  const color =
    value >= 80
      ? 'bg-emerald-500'
      : value >= 50
        ? 'bg-amber-400'
        : 'bg-rose-500';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-16 text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-gray-700 w-8 shrink-0">
        {value}
      </span>
    </div>
  );
}

interface Props {
  allPokemon: PokemonListItem[];
  favorites: Record<string, boolean>;
  toggleFavorite: (name: string) => void;
}

function PokemonDetails({ allPokemon, favorites, toggleFavorite }: Props) {
  const { currentUser } = useAuth();
  const [pokemon, setPokemon] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pokemonTitle = pokemon
    ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    : 'Pokédex';
  useDocumentTitle(pokemonTitle);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

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
    [navigate],
  );

  useEffect(() => {
    fetchPokemon(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const radarData = pokemon?.stats?.map((s) => ({
    stat: s.stat.name,
    value: s.base_stat,
    fullMark: 255,
  }));

  const paddedId = pokemon ? pad(pokemon.id, 3) : null;
  const types = pokemon ? pokemon.types.map((t) => t.type.name) : [];
  const isFavorited = pokemon && favorites && favorites[pokemon.name];
  const primaryType = pokemon && types[0];
  const bgColor = TYPE_COLORS[primaryType]?.bg || 'bg-gray-200';
  const bgColorLight = TYPE_COLORS[primaryType]?.bgLight || '';

  function playPokemonSound(url) {
    const audio = new Audio(url);

    setIsSoundPlaying(true);
    audio.play();
    audio.onended = () => setIsSoundPlaying(false);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 w-full">
      <div className={`${bgColorLight} rounded-t-md p-6`}>
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(`/pokemon/${id - 1}`, { replace: true })}
            disabled={numericId <= 1}
            className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Prev
          </button>
          <button
            onClick={() =>
              navigate(`/pokemon/${numericId + 1}`, { replace: true })
            }
            disabled={numericId >= maxId}
            className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-white bg-gray-700 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Sprite hero */}
        <div className="flex justify-center py-8 relative min-h-48">
          {pokemon && (
            <div>
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
                alt={pokemon.name}
                className="w-48 h-48 object-contain drop-shadow-lg"
                width="192"
                height="192"
              />
            </div>
          )}
          {!pokemon && showSpinner && <LoadingSpinner />}
        </div>
      </div>

      {pokemon && (
        <div className="p-6 bg-white rounded-b-md relative">
          <span className="text-xs absolute -top-7 left-0 mx-auto bg-white p-1.5 w-25 text-center mb-1 rounded-t-xl font-alt font-bold text-gray-500">
            #{paddedId}
          </span>
          {/* Name + types */}
          <div className="mb-4">
            <h1 className="capitalize text-3xl font-bold text-gray-800 mb-2">
              {pokemon.name}
            </h1>
            <TypeBadges className="mt-2" types={types} />
          </div>

          {/* Controls */}
          <div className="absolute right-6 top-6 flex gap-3">
            {currentUser && (
              <FavoriteButton
                pokemon={pokemon}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                className="relative"
              />
            )}
            <button
              onClick={() => playPokemonSound(pokemon.cries.latest)}
              aria-label="plays pokemon cry"
              disabled={isSoundPlaying}
              className="p-1 rounded-full hover:bg-gray-100 transition hover:cursor-pointer hover:scale-110 w-8 h-8 disabled:cursor-not-allowed disabled:text-gray-600 disabled:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="w-6 h-6"
              >
                <path
                  d="M112 416L160 416L294.1 535.2C300.5 540.9 308.7 544 317.2 544C336.4 544 352 528.4 352 509.2L352 130.8C352 111.6 336.4 96 317.2 96C308.7 96 300.5 99.1 294.1 104.8L160 224L112 224C85.5 224 64 245.5 64 272L64 368C64 394.5 85.5 416 112 416zM505.1 171C494.8 162.6 479.7 164.2 471.3 174.5C462.9 184.8 464.5 199.9 474.8 208.3C507.3 234.7 528 274.9 528 320C528 365.1 507.3 405.3 474.8 431.8C464.5 440.2 463 455.3 471.3 465.6C479.6 475.9 494.8 477.4 505.1 469.1C548.3 433.9 576 380.2 576 320.1C576 260 548.3 206.3 505.1 171.1zM444.6 245.5C434.3 237.1 419.2 238.7 410.8 249C402.4 259.3 404 274.4 414.3 282.8C425.1 291.6 432 305 432 320C432 335 425.1 348.4 414.3 357.3C404 365.7 402.5 380.8 410.8 391.1C419.1 401.4 434.3 402.9 444.6 394.6C466.1 376.9 480 350.1 480 320C480 289.9 466.1 263.1 444.5 245.5z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <PokemonDescription pokemon={pokemon.name} />
          </div>

          {/* Physical attributes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Height
              </div>
              <div className="font-semibold text-gray-700">
                {(pokemon.height * 0.1).toFixed(1)} m
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Weight
              </div>
              <div className="font-semibold text-gray-700">
                {(pokemon.weight * 0.1).toFixed(1)} kg
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Abilities
            </h3>
            <div className="flex gap-2 flex-wrap">
              {pokemon.abilities.map((a) => (
                <span
                  key={a.ability.name}
                  className="capitalize bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {a.ability.name.replace('-', ' ')}
                  {a.is_hidden && (
                    <span className="text-gray-400 text-xs ml-1">(hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Base stats */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Base Stats
            </h3>
            <div className="flex flex-col gap-2">
              {pokemon.stats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  name={s.stat.name}
                  value={s.base_stat}
                />
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="stat" />
              <Radar
                dataKey="value"
                fill="#f59e0b"
                fillOpacity={0.4}
                stroke="#f59e0b"
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Evolution chain */}
          {speciesData && speciesData.evolution_chain && (
            <EvolutionChain
              evolutionChainUrl={speciesData.evolution_chain.url}
              allPokemon={allPokemon}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
