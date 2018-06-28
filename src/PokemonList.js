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

    this.updateResults = this.updateResults.bind(this);
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

  handleSearchTermChange = (
    event: SyntheticKeyboardEvent & { target: HTMLInputElement }
  ) => {
    this.setState({ searchTerm: event.target.value });
    this.updateResults();
  };

  updateResults() {
    const filteredList = this.state.pokemonList.filter(
      pokemon =>
        pokemon.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
    );
    console.log(this.state.searchTerm);
    this.setState({
      pokemonList: filteredList
    });
  }

  render() {
    const { fetched, loading, pokemonList } = this.state;
    let content;
    if (fetched) {
      content = (
        <div className="flex-grid">
          {pokemonList.map((pokemon, index) => (
            <Pokemon key={pokemon.name} id={index + 1} pokemon={pokemon} />
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
        <input
          onChange={this.handleSearchTermChange}
          value={this.state.searchTerm}
          type="text"
          placeholder="Search"
        />
        {content}
      </div>
    );
  }
}

export default PokemonList;
