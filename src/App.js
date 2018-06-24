import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import AllPokemon from './AllPokemon';
import PokemonDetails from './PokemonDetails';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/allpokemon" component={AllPokemon} />
        <Route exact path={`/pokemon/:pokemonId`} component={PokemonDetails} />
      </div>
    );
  }
}

export default App;
