import React, { Component } from 'react';
import PokemonList from './PokemonList';

class PokeApp extends Component {
  render() {
    return (
      <div className="pokeapp">
        <h1>The Kanto Pokedex!</h1>
        <PokemonList />
      </div>
    );
  }
}

export default PokeApp;
