import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import AllPokemon from './AllPokemon';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/allpokemon" component={AllPokemon} />
      </div>
    );
  }
}

export default App;
