import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pad } from '../helpers';
import '../css/pokemon.css';

class Pokemon extends Component {
  constructor() {
    super();

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites(event) {
    event.preventDefault();

    console.log(event.currentTarget.dataset.value);
  }

  render() {
    const { pokemon, id } = this.props;
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
      </div>
    );
  }
}

export default Pokemon;
