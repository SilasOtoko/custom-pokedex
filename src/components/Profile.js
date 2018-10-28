import React, { Component } from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';
import '../css/profile.css';
import PokemonList from './PokemonList';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    auth.signOut();
    this.props.history.replace("/allpokemon");
  }


  render() {
    const { currentUser } = this.props;
    return (
      <div className="user-profile">
        {currentUser && (
          <div>
            <div className="current-user card">
              <div className="current-user__photo">
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              </div>
              <div className="current-user__identification">
                <h3>{currentUser.displayName}</h3>
                <p>{currentUser.email}</p>
                <button onClick={this.handleLogout}>Sign Out</button>
              </div>
            </div>
            <PokemonList />
          </div>
        )}
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