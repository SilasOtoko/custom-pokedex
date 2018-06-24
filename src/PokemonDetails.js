import React, { Component } from 'react';
import Header from './Header';
import { pad } from './helpers';

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
          <div className="pokemon-info__sprite">
            <img src={this.state.singlePokemon.sprites.front_default} />
          </div>
          <div className="pokemon-info__details">
            <span class="pokemon-info__number">
              {pad(this.state.singlePokemon.id, 3)}
            </span>
            <h1 className="pokemon-name">{this.state.singlePokemon.name}</h1>
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
