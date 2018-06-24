import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { pad } from './helpers';
import PokemonDetails from './PokemonDetails';
import map from 'lodash/map';

class Pokemon extends Component {
  render() {
    const { pokemon, id } = this.props;

    return (
      <div className="card">
        <div className="card__number">{pad(id, 3)}</div>
        <div className="card__sprite">
          <img src={require(`../public/sprites/${id}.png`)} alt=" " />
        </div>
        <div className="card__name">
          <h3>{pokemon.name}</h3>
        </div>
        <Link
          className="button button--small button--blue"
          exact="true"
          to={{ pathname: `/pokemon/${id}`, state: { pokemon } }}
        >
          View
        </Link>
      </div>
    );
  }
}

export default Pokemon;
