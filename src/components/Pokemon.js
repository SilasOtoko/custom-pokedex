import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pad } from '../helpers';
import '../css/pokemon.css';

class Pokemon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pokemon, id, currentUser } = this.props;
    let paddedId = pad(id, 3);

    return (
      <div>
        <Link
          className="card"
          exact="true"
          to={{ pathname: `/pokemon/${id}`, state: { pokemon } }}
        >
          <div className="card__number">#{paddedId}</div>
          <div className="card__sprite">
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`}
              alt=" "
            />
          </div>
          <div className="card__name">
            <h3 className="capitalize">{pokemon.name}</h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Pokemon;
