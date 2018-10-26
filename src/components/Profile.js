import React, { Component } from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';
import '../css/profile.css';
import PokemonList from './PokemonList';

class Profile extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {currentUser && (
          <div>
            <div className="current-user card">
              <div className="current-user__photo">
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              </div>
              <div className="current-user__identification">
                <h3>{currentUser.displayName}</h3>
                <p>{currentUser.email}</p>
                <button onClick={() => auth.signOut()}>Sign Out</button>
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

export default Profile;