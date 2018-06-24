import React, { Component } from 'react';

import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
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
          pokemon: response.results,
          loading: true,
          fetched: true
        });
      });
  }

  render() {
    const { fetched, loading, pokemon } = this.state;
    let content;
    if (fetched) {
      content = (
        <div className="flex-grid">
          {pokemon.map((pokemon, index) => (
            <Pokemon key={pokemon.name} id={index + 1} pokemon={pokemon} />
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
