import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './css/normalize.css';
import './css/App.css';
import './css/spinner.css';
import Home from './components/Home';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import pick from 'lodash/pick';
import Profile from './components/Profile';
import jsonData from './pokemonlist';
import Login from './components/Login';
import Register from './components/Register';
import { auth, database } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemonData: {},
      currentUser: null,
      userFavorites: []
    };

    this.getFavorites = this.getFavorites.bind(this);

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
      this.setState({
        currentUser: currentUser
      });
      if(currentUser) {
        this.usersRef = database.ref('/users');
        this.userRef = this.usersRef.child(currentUser.uid);

        this.userRef.once('value').then((snapshot) => {
          if (snapshot.val()) return;
          const userData = pick(currentUser, ['displayName', 'photoURL', 'email']);
          this.userRef.set(userData);
        });

        this.getFavorites();
      }
    });
  }

  getFavorites() {

  }
  render() {
    const { allPokemonData, currentUser, userFavorites } = this.state;
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
          render={props => <Profile {...props} currentUser={currentUser} favoritePokemon={userFavorites} allPokemon={allPokemonData}/>}
        />
        <Route
          path="/login"
          render={props => <Login />}
        />
        <Route
          path="/register"
          render={props => <Register />}
        />
      </div>
    )
  }
}

export default withRouter(App);
