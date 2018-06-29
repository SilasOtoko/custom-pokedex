import React, { Component } from 'react';
import Header from './Header';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: {},
      fetched: false
    };
  }

  componentDidMount() {
    const { allPokemon } = this.props;
    if (allPokemon !== undefined) {
      this.setState({
        allPokemon: allPokemon,
        fetched: true
      });
    }
  }

  render() {
    let { allPokemon, fetched } = this.state;
    let pokemonList;
    if (fetched) {
      pokemonList = allPokemon.map((pokemon, index) => (
        <Pokemon
          key={pokemon.name}
          id={index + 1}
          pokemon={pokemon}
          allPokemon={allPokemon}
        />
      ));
    } else {
      pokemonList = null;
    }
    return (
      <div>
        <Header />
        <h1 className="site-title">The Kanto Pokedex!</h1>
        <div className="flex-grid">{pokemonList}</div>
      </div>
    );
  }
}

export default PokemonList;
