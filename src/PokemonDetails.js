import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { pad } from './helpers';
import PokemonDescription from './PokemonDescription';

import map from 'lodash/map';

class PokemonDetails extends Component {
  constructor() {
    super();

    this.state = {
      singlePokemon: {},
      fetched: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(this.props.location.state.pokemon.url)
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
  render() {
    const { loading, fetched, singlePokemon } = this.state;
    let content;
    if (fetched) {
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
          <div className="pokemon-info__sprite">
            <img src={this.state.singlePokemon.sprites.front_default} />
          </div>
          <div className="pokemon-info__details">
            <span className="pokemon-info__number">
              {pad(this.state.singlePokemon.id, 3)}
            </span>
            <h1 className="pokemon-name">{this.state.singlePokemon.name}</h1>
            <PokemonDescription pokemon={this.state.singlePokemon.name} />
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
