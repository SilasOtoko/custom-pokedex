import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pad } from '../helpers';
import PokemonDescription from './PokemonDescription';
import '../css/spinner.css';

class PokemonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singlePokemon: {},
      searchResults: [],
      searchTerm: '',
      fetched: false,
      loading: false
    };

    this.getPokemon = this.getPokemon.bind(this);
    this.searchPokemon = this.searchPokemon.bind(this);
    this.changeSearchTerm = this.changeSearchTerm.bind(this);
    this.getSelectedPokemon = this.getSelectedPokemon.bind(this);
    this.getNextPokemon = this.getNextPokemon.bind(this);
    this.getPreviousPokemon = this.getPreviousPokemon.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.getPokemon(this.props.match.params.id);
  }

  getPokemon(parameter) {
    fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/${parameter}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          singlePokemon: data,
          loading: true,
          fetched: true
        });
      })
      .catch(err => {
        console.log(err)
      });
    if (this.state.singlePokemon.id === this.props.allPokemon.length) {
      document.querySelector('.button--next').disabled = true;
    } else if (this.state.singlePokemon.id === 1) {
      document.querySelector('.button--previous').disabled = true;
    } else if (this.state.singlePokemon.id > 1) {
      document.querySelector('.button--previous').disabled = false;
    } else if (this.state.singlePokemon.id < this.props.allPokemon.length) {
      document.querySelector('.button--next').disabled = false;
    }
  }

  searchPokemon() {
    var query = this.state.searchTerm;
    const allPokemon = this.props.allPokemon;
    let filteredList = allPokemon.filter(pokemon => {
      return pokemon.name.toLowerCase().indexOf(query) !== -1;
    });
    let limitList = filteredList.slice(0,7);
    this.setState({
      searchResults: limitList
    });
  }

  changeSearchTerm(event) {
    const term = event.target.value.toLowerCase();
    this.setState({
      searchTerm: term}, () => this.searchPokemon());
  };

  getSelectedPokemon(event) {
    const term = event.target.value.toLowerCase();
    this.setState({
      searchTerm: '',
      searchResults: []
    }, () => this.getPokemon(term));
  }

  getNextPokemon() {
    let currentPokemonId = this.state.singlePokemon.id;
    if (currentPokemonId < this.props.allPokemon.length) {
      let nextPokemonId = currentPokemonId + 1;
      this.getPokemon(nextPokemonId);
      document.querySelector('.button--next').disabled = false;
    } else {
      console.log('last pokemon');
      document.querySelector('.button--next').disabled = true;
    }
  }

  getPreviousPokemon() {
    let currentPokemonId = this.state.singlePokemon.id;
    if (currentPokemonId > 1) {
      let nextPokemonId = currentPokemonId - 1;
      this.getPokemon(nextPokemonId);
      document.querySelector('.button--previous').disabled = false;
    } else if (currentPokemonId === 1) {
      document.querySelector('.button--previous').disabled = true;
    }
  }

  render() {
    const { loading, fetched, singlePokemon, searchResults } = this.state;
    let content;
    if (fetched) {
      const typeList = singlePokemon.types.map(item => (
        <li key={item.type.name}>{item.type.name}</li>
      ));
      const abilities = singlePokemon.abilities.map(item => (
        <li key={item.ability.name} className="capitalize">{item.ability.name}</li>
      ));
      const pokemonMatches = searchResults.map(pokemon => (
        <li key={pokemon.name} className="capitalize">
          <button value={pokemon.name} onClick={this.getSelectedPokemon}>{pokemon.name}</button>
        </li>
      ));
      let paddedId = pad(singlePokemon.id, 3);
      content = (
        <div className="pokemon-info">
          <div className="pokemon-info__navigation">
            <div>
              <button className="button button--navigation button--previous" onClick={this.getPreviousPokemon}>
                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 40 40">
                  <path d="M17.1,34.1c-0.7,0-1.4-0.7-1.6-0.8C15.1,32.9,2,23.1,0.6,21.7c-0.5-0.5-0.6-1-0.6-1.4c0-0.8,0.7-1.4,0.8-1.5l14.5-12
      c0.2-0.2,0.9-0.9,1.6-0.9c0.3,0,1.1,0.1,1.1,1.5v6.2h20.5c0.1,0,0.1,0,0.2,0c0.2,0,1.4,0.1,1.4,1.9v9.5c0,1.3-0.9,1.7-1.4,1.7H18.3
      v5.7C18.3,33.9,17.6,34.1,17.1,34.1L17.1,34.1z M17.1,32.9v0.6V32.9z" />
                </svg>
                <span>Prev</span>
              </button>
            </div>
            <div className="search-box">
              <div>
                <input
                    onChange={this.changeSearchTerm}
                    value={this.state.searchTerm}
                    type="text"
                    placeholder="Search For Pokemon"
                  />
                <div className="search-box__dropdown">
                  <ul>{pokemonMatches}</ul>
                </div>
              </div>
            </div>
            <div>
              <button className="button button--navigation button--next" onClick={this.getNextPokemon}>
                <span>Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M23 5.9c.7 0 1.4.7 1.6.8.4.4 13.5 10.2 14.9 11.6.5.5.6 1 .6 1.4 0 .8-.7 1.4-.8 1.5l-14.5 12c-.2.2-.9.9-1.6.9-.3 0-1.1-.1-1.1-1.5v-6.2H1.4c-.2 0-1.4-.1-1.4-1.9V15c0-1.3.9-1.7 1.4-1.7h20.4V7.6c0-1.5.7-1.7 1.2-1.7z"/></svg>
              </button>
            </div>
          </div>
          <div className="pokemon-info__sprite">
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
              alt={singlePokemon.name}
            />
          </div>
          <div className="pokemon-info__details">
            <span className="pokemon-info__number">#{pad(singlePokemon.id, 3)}</span>
            <h1 className="pokemon-info__name capitalize">{singlePokemon.name}</h1>
            <ul className="pokemon-info__types">{typeList}</ul>
            <PokemonDescription pokemon={singlePokemon.name} />
            <div className="pokemon-info__attributes">
              <h3>Height</h3>
              <span>{singlePokemon.height}</span>
              <h3>Weight</h3>
              <span>{singlePokemon.weight}</span>
              <h3>Abilities</h3>
              <ul>{abilities}</ul>
            </div>
          </div>
        </div>
      );
    } else if (loading && !fetched) {
      content = <div className="spinner"><img src={require('../images/pokeball.svg')} alt="Pokedex Logo" /></div>;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default PokemonDetails;
