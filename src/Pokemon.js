import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pad } from './helpers';

class Pokemon extends Component {
  render() {
    const { pokemon, id } = this.props;

    return (
      <Link
        className="card"
        exact="true"
        to={{ pathname: `/pokemon/${id}`, state: { pokemon } }}
      >
        <div className="card__number">#{pad(id, 3)}</div>
        <div className="card__sprite">
          <img src={require(`../public/sprites/${id}.png`)} alt=" " />
        </div>
        <div className="card__name">
          <h3>{pokemon.name}</h3>
        </div>
      </Link>
    );
  }
}

export default Pokemon;
