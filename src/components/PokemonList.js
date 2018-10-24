import React, { Component } from 'react';
import Header from './Header';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: {},
      searchTerm: '',
      fetched: false
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
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

  updateSearchTerm(event) {
    const term = event.target.value.toLowerCase();
    this.setState({
      searchTerm: term
    }, () => this.searchPokemon());
  }

  searchPokemon() {
    let query = this.state.searchTerm;
    const filteredPokemon = this.props.allPokemon.filter(pokemon => {
      return pokemon.name.toLowerCase().indexOf(query) !== -1;
    });
    this.setState({
      allPokemon: filteredPokemon
    });
  }

  render() {
    let { allPokemon, searchTerm, fetched } = this.state;
    let pokemonList;
    console.log('search: ' + searchTerm);
    if (fetched) {
      pokemonList = allPokemon.map((pokemon, index) => (
        <Pokemon
          key={pokemon.name}
          id={pokemon.id}
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
        <div className="search-box">
          <div>
            <input
                onChange={this.updateSearchTerm}
                value={searchTerm}
                type="text"
                placeholder="Search For Pokemon"
              />
          </div>
        </div>
        <div className="flex-grid">{pokemonList}</div>
      </div>
    );
  }
}

export default PokemonList;
