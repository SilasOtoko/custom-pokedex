import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { pad } from '../helpers';
import PokemonDescription from './PokemonDescription';

class PokemonDetails extends Component {
  constructor() {
    super();

    this.state = {
      singlePokemon: {},
      allPokemon: [],
      searchTerm: '',
      fetched: false,
      loading: false
    };

    this.getPokemon = this.getPokemon.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.getAllPokemon = this.getAllPokemon.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    this.getPokemon(this.props.location.state.pokemon.name);
  }

  getPokemon(parameter) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${parameter}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          singlePokemon: data,
          loading: true,
          fetched: true
        });
      })
      .catch(err => console.log(err));
  }

  getAllPokemon() {
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

  changeSearchTerm = event => {
    this.setState({ searchTerm: event.target.value });
  };

  setSearchTerm(event) {
    event.preventDefault();
    const renderedTerm = this.state.searchTerm.toLowerCase();
    return this.getPokemon(renderedTerm);
  }

  render() {
    const { loading, fetched, singlePokemon, searchTerm, allPokemon } = this.state;
    let content;
    if (fetched) {
      const typeList = singlePokemon.types.map(item => (
        <li key={item.type.name}>{item.type.name}</li>
      ));
      const abilities = singlePokemon.abilities.map(item => (
        <li key={item.ability.name}>{item.ability.name}</li>
      ));
      let paddedId = pad(singlePokemon.id, 3);
      content = (
        <div className="pokemon-info">
          <Link exact="true" to="/allpokemon" className="button button--back">
            <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 40 40">
              <path d="M17.1,34.1c-0.7,0-1.4-0.7-1.6-0.8C15.1,32.9,2,23.1,0.6,21.7c-0.5-0.5-0.6-1-0.6-1.4c0-0.8,0.7-1.4,0.8-1.5l14.5-12
  c0.2-0.2,0.9-0.9,1.6-0.9c0.3,0,1.1,0.1,1.1,1.5v6.2h20.5c0.1,0,0.1,0,0.2,0c0.2,0,1.4,0.1,1.4,1.9v9.5c0,1.3-0.9,1.7-1.4,1.7H18.3
  v5.7C18.3,33.9,17.6,34.1,17.1,34.1L17.1,34.1z M17.1,32.9v0.6V32.9z" />
            </svg>
            <span>Back</span>
          </Link>
          <div className="search-box">
            <form onSubmit={this.setSearchTerm}>
              <input
                onChange={this.changeSearchTerm}
                value={this.state.searchTerm}
                type="text"
                placeholder="Search For Pokemon"
              />
              <button type="submit">Search</button>
            </form>
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
      content = <h2>Loading...</h2>;
    }
    return (
      <div>
        <Header />
        {content}
      </div>
    );
  }
}

export default PokemonDetails;
