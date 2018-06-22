import React, { Component } from 'react';
import PokemonList from './PokemonList';
import Header from './Header';

class AllPokemon extends Component {
  render() {
    return (
      <div className="AllPokemon">
        <Header />
        <h1 className="site-title">The Kanto Pokedex!</h1>
        <PokemonList />
      </div>
    );
  }
}

export default AllPokemon;
