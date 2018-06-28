import React, { Component } from 'react';

import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      searchTerm: '',
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
          pokemonList: response.results,
          loading: true,
          fetched: true
        });
      });
  }

  changeSearchTerm = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { fetched, loading, pokemonList, searchTerm } = this.state;
    const filteredList = pokemonList.filter(pokemon =>
      pokemon.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
    let content;
    if (fetched) {
      content = (
        <div className="flex-grid">
          {filteredList.map((pokemon, index) => (
            <Pokemon key={pokemon.name} id={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      );
    } else if (loading && !fetched) {
      content = <p> Loading ...</p>;
    } else {
      content = <div />;
    }
    return (
      <div>
        <div className="search-box">
          <input
            onChange={this.changeSearchTerm}
            value={this.state.searchTerm}
            type="text"
            placeholder="Search"
          />
        </div>
        {content}
      </div>
    );
  }
}

export default PokemonList;
