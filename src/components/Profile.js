import React, { Component } from 'react';
import { auth, database } from '../firebase';
import PropTypes from 'prop-types';
import '../css/profile.css';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import Login from './Login';
import { withRouter, Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
      filteredPokemon: ''
    }

    this.dataRef = database.ref();

    this.handleLogout = this.handleLogout.bind(this);
    this.findFavorites = this.findFavorites.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    if(currentUser) {
      this.findFavorites();
    }
  }

  handleLogout() {
    auth.signOut();
    this.props.history.replace("/profile");
  }

  findFavorites() {
   const { favoritePokemon } = this.props;
    console.log(favoritePokemon);

    const filteredPokemon = this.props.favoritePokemon.forEach(pokemonName => {
      this.props.allPokemon.filter(pokemon => {
        return pokemon.name.toLowerCase().indexOf(pokemonName) !== -1;
      });
    })
    
    this.setState({
      filteredPokemon: filteredPokemon
    });
  }


  render() {
    const { currentUser, favoritePokemon } = this.props;
    const { email, password, error, filteredPokemon } = this.state;
    let pokemonList;
    return (
      <div className="page-container">
        <div className="current-user card">
          {currentUser && (
            <div>
              <div className="current-user__identification">
                <p>{currentUser.email}</p>
                <button className="button" onClick={this.handleLogout}>Sign Out</button>
              </div>
            </div>
          )}
          {!currentUser && (
            <div className="button-wrapper">
              <Link to="/login" className="button">
                Login
              </Link>
              <Link to="/register" className="button">
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="all-pokemon-container">
          <div className="flex-grid">{pokemonList}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired
  })
};

export default withRouter(Profile);