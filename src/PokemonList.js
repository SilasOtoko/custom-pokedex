import React, { Component } from 'react';

import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemon: [],
      fetched: false,
      loading: false
    };
  }
  componentWillMount() {
    this.setState({
      loading: true
    });
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(response => {
        this.setState({
          allPokemon: response.results,
          loading: true,
          fetched: true
        });
      });
  }

  render() {
    const { fetched, loading, allPokemon } = this.state;
    let content;
    if (fetched) {
      content = (
        <div className="flex-grid">
          {allPokemon.map((pokemon, index) => (
            <Pokemon
              key={pokemon.name}
              id={index + 1}
              pokemon={pokemon}
              allPokemon={allPokemon}
            />
          ))}
        </div>
      );
    } else if (loading && !fetched) {
      content = <p> Loading ...</p>;
    } else {
      content = <div />;
    }
    return <div>{content}</div>;
  }
}

export default PokemonList;
