import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './css/normalize.css';
import './css/App.css';
import './css/spinner.css';
import Home from './components/Home';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Profile from './components/Profile';
import jsonData from './pokemonlist';
import { auth, database } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemonData: {},
      currentUser: null
    };

    this.usersRef = database.ref('users');
  }
  componentWillMount() {
    let data = jsonData.data.results;
    let id = 0;
    data.forEach(item => {
      id = id + 1;
      item.id = id;
    });
    this.setState({
      allPokemonData: data.slice(0, 151),
    });
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });
    });
  }
  render() {
    const { allPokemonData, currentUser } = this.state;
    return (
      <div className="app-wrapper">
        <Header currentUser={currentUser} />
        <Route 
          exact 
          path="/" 
          component={Home} 
        />
        <Route
          exact
          path="/allpokemon"
          render={props => <PokemonList allPokemon={allPokemonData} currentUser={currentUser} />}
        />
        <Route
          exact
          path={`/pokemon/:id`}
          render={props => <PokemonDetails {...props} allPokemon={allPokemonData} />}
        />
        <Route
          path="/profile"
          render={props => <Profile currentUser={currentUser} />}
        />
      </div>
    )
  }
}

export default withRouter(App);
