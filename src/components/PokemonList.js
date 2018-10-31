import React, { Component } from 'react';
import Pokemon from './Pokemon';
import { auth, database } from '../firebase';

class PokemonList extends Component {
  constructor() {
    super();

    this.state = {
      allPokemon: {},
      searchTerm: '',
      fetched: false,
      favoritePokemon: []
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.markFavorites = this.markFavorites.bind(this);
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
    event.preventDefault();
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

  onSubmit(event) {
    event.preventDefault();
    document.getElementById('search').blur();
  }

  addToFavorites(event) {
    event.preventDefault();

    const favorite = event.currentTarget.dataset.value;

    return this.usersRef.push(favorite);
  }

  markFavorites() {
    console.log('marking favorites');
    if (this.props.currentUser) {
      this.usersRef.on('value', snapshot => {
        this.setState({
          favoritePokemon: snapshot.val()
        });
      });
      console.log(this.state.favoritePokemon);
    }
  }

  render() {
    let { allPokemon, searchTerm, fetched } = this.state;
    let { currentUser } = this.props;
    let pokemonList;
    if (fetched) {
      pokemonList = allPokemon.map((pokemon, index) => (
        <div className="pokemon-list" key={pokemon.name}>
          <Pokemon
            id={pokemon.id}
            pokemon={pokemon}
            allPokemon={allPokemon}
            currentUser={currentUser}
          />
          { currentUser && (
            <button onClick={this.addToFavorites} className="favorite" data-value={pokemon.name}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          )}
        </div>
      ));
    } else {
      pokemonList = null;
    }
    return (
      <div className="all-pokemon-container">
        <h1 className="site-title">The Kanto Pokedex!</h1>
        <div className="search-box">
          <div>
          <form onSubmit={this.onSubmit}>
            <input
              onChange={this.updateSearchTerm}
              value={searchTerm}
              type="text"
              placeholder="Search For Pokemon"
              id="search"
            />
          </form>
          </div>
        </div>
        <div className="flex-grid">{pokemonList}</div>
      </div>
    );
  }
}

export default PokemonList;
