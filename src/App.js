import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';
import './css/spinner.css';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import jsonData from './pokemonlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemonData: {}
    };
  }
  componentWillMount() {
    const data = jsonData.data.results;
    this.setState({
      allPokemonData: data.slice(0, 151),
    });
  }
  render() {
    const { allPokemonData } = this.state;
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/allpokemon"
          render={props => <PokemonList allPokemon={allPokemonData} />}
        />
        <Route
          exact
          path={`/pokemon/:id`}
          render={props => <PokemonDetails {...props} allPokemon={allPokemonData} />}
        />
      </div>
    )
  }
}

export default App;
