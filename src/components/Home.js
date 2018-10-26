import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home__main">
          <div className="home__logo">
            <img src={require('../images/pokedex-logo-stacked.svg')} alt="Pokedex Logo" />
          </div>
        </div>
        <div className="home__search-link">
          <Link exact="true" to="/allpokemon" className="button">
            Begin
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
