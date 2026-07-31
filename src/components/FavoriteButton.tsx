import React, { useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PokemonListItem } from '../types';

interface Props {
  pokemon: PokemonListItem;
  favorites: Record<string, boolean>;
  toggleFavorite: (name: string) => void;
  className?: string;
}

function FavoriteButton({
  pokemon,
  favorites,
  toggleFavorite,
  className = '',
}: Props) {
  const isFavorited = favorites && favorites[pokemon.name];
  const dotLottieRef = useRef(null);

  return (
    <div className={`${className}`}>
      <button
        onClick={() => {
          if (!isFavorited) dotLottieRef.current?.play();
          toggleFavorite(pokemon.name);
        }}
        className="p-1 rounded-full hover:bg-gray-100 transition hover:cursor-pointer hover:scale-110 w-8 h-8"
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 148 148"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-translate-y-3 -translate-x-3"
        >
          <g transform="translate(74,74)">
            <path
              strokeWidth="3.6"
              fill="none"
              stroke="#9ca3af"
              d="M11.176,-20.5C6.301,-20.5,2.068,-17.976,0,-14.302C-2.067,-17.976,-6.301,-20.5,-11.175,-20.5C-18.577,-20.5,-23,-14.04,-23,-7.795C-23,6.995,-1.588,19.778,-0.676,20.315C-0.467,20.439,-0.234,20.5,0,20.5C0.234,20.5,0.467,20.439,0.676,20.315C1.588,19.778,23,6.995,23,-7.795C23,-14.04,18.577,-20.5,11.176,-20.5Z"
            />
          </g>
        </svg>
      </button>
      <DotLottieReact
        src="https://lottie.host/6a0c3d09-12f4-4cb7-b323-0bf9b4b99c09/PL3vBYolOG.lottie"
        className={`absolute pointer-events-none w-12 h-12 -top-2 -right-2 ${isFavorited ? 'opacity-100' : 'opacity-0'}`}
        dotLottieRefCallback={(ref) => {
          dotLottieRef.current = ref;
        }}
      />
    </div>
  );
}

export default FavoriteButton;
