import React, { useState, useEffect } from 'react';

interface Props {
  pokemon: string;
}

function PokemonDescription({ pokemon }: Props) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemon) return;
    setLoading(true);
    setDescription('');
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
      .then(res => res.json())
      .then(data => {
        const entry = data.flavor_text_entries.find(item => item.language.name === 'en');
        if (entry) {
          // Clean up newlines/form feeds that appear in flavor text
          setDescription(entry.flavor_text.replace(/[\f\n]/g, ' '));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pokemon]);

  if (loading) return <p className="text-gray-400 italic text-sm">Loading description...</p>;
  if (!description) return null;

  return <p className="text-gray-600 text-sm leading-relaxed">{description}</p>;
}

export default PokemonDescription;
