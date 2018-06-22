import React, { Component } from 'react';
import './index.css';
import Header from './Header';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="home__main">
          <div className="home__logo">
            <img src={require('./images/pokedex-logo-stacked.svg')} alt="Pokedex Logo" />
          </div>
        </div>
        <div className="home__search">
          <label>Begin Search</label>
          <input type="text" placeholder="search" />
        </div>
      </div>
    );
  }
}

export default Home;
