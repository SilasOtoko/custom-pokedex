import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemonData: {},
      fetched: false,
      loading: false
    };
  }
  componentWillMount() {
    this.setState({
      loading: true
    });
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(response => {
        this.setState({
          allPokemonData: response.results,
          loading: true,
          fetched: true
        });
      });
  }
  render() {
    const { fetched, loading, allPokemonData } = this.state;

    let content;
    if (fetched) {
      content = (
        <div>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/allpokemon"
            render={props => <PokemonList allPokemon={allPokemonData} />}
          />
          <Route
            exact
            path={`/pokemon/:pokemonId`}
            component={PokemonDetails}
            allPokemon={allPokemonData}
          />
        </div>
      );
    } else if (loading && !fetched) {
      content = (
        <div>
          <Route exact path="/" component={Home} />
          <p> Loading ...</p>
        </div>
      );
    } else {
      content = <div />;
    }
    return <div className="app">{content}</div>;
  }
}

export default App;
