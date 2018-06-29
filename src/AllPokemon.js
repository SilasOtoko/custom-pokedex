import React, { Component } from 'react';
import PokemonList from './PokemonList';

class AllPokemon extends Component {
  render() {
    return (
      <div className="AllPokemon">
        <PokemonList />
      </div>
    );
  }
}

export default AllPokemon;
