import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { pad } from '../helpers';

function flattenChain(chain) {
  const result = [];
  let node = chain;
  while (node) {
    result.push(node.species.name);
    node =
      node.evolves_to && node.evolves_to.length > 0 ? node.evolves_to[0] : null;
  }
  return result;
}

function EvolutionChain({ evolutionChainUrl, allPokemon }) {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!evolutionChainUrl) return;
    setLoading(true);
    fetch(evolutionChainUrl)
      .then((res) => res.json())
      .then((data) => {
        setChain(flattenChain(data.chain));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [evolutionChainUrl]);

  if (loading)
    return (
      <p className="text-gray-400 italic text-sm">Loading evolutions...</p>
    );
  if (chain.length <= 1) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
        Evolution Chain
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {chain.map((name, i) => {
          const pokemonData =
            allPokemon && allPokemon.find((p) => p.name === name);
          const id = pokemonData ? pokemonData.id : null;
          const paddedId = id ? pad(id, 3) : null;
          return (
            <React.Fragment key={name}>
              {i > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
              {id ? (
                <Link
                  to={`/pokemon/${id}`}
                  className="flex flex-col items-center group"
                >
                  {paddedId && (
                    <img
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
                      alt={name}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                  )}
                  <span className="capitalize text-xs text-gray-600 transition-colors">
                    {name}
                  </span>
                </Link>
              ) : (
                <span className="capitalize text-sm text-gray-600">{name}</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default EvolutionChain;
