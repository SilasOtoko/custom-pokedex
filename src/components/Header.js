import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, googleAuthProvider } from '../firebase';
import '../css/header.css';

class Header extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <header className="header">
        <div className="header__home-link">
          <Link exact="true" to="/allpokemon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>
        </div>
        <div className="header__logo">
          <img src={require('../images/pokedex-logo.svg')} alt="Pokedex Logo" />
        </div>
        <div className="header__account">
          {
            !currentUser && (
            <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          )}
          {currentUser && (
            <div className="current-user__photo">
              <Link exact="true" to="/profile">
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
              </Link>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
