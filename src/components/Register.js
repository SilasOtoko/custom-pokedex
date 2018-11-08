import React, { Component } from 'react';
import { auth, database } from '../firebase';
import '../css/profile.css';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      currentUser: null,
      error: null
    }

    this.handleUserCreation = this.handleUserCreation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
   this.setState({ [event.target.name]: event.target.value });
  };

  handleUserCreation(event) {
    event.preventDefault();
    const { email, password, error, username } = this.state;

    auth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const { user } = data;

        if(user) {
          user.updateProfile({
            displayName: username
          });
        }
      }).catch((error) => {
        this.setState({ error: error });
      });
    this.props.history.replace("/profile");
  }

  render() {
    const { currentUser } = this.props;
    const { email, password, username, error } = this.state;
    return (
      <div className="page-container">
        <div className="card user-form">
          <h2>Register</h2>
          <form onSubmit={this.handleUserCreation}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleInputChange}
            />
            <input 
              type="text" 
              name="email" 
              placeholder="Email" 
              value={email} 
              onChange={this.handleInputChange} />
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
            <div className="button-wrapper">
              <button className="button" type="submit">Sign Up</button>
              <button className="button button--subtle" type="submit" onClick={this.props.history.goBack}>Cancel</button>
            </div>
          </form>
          {error && <p>{this.state.error.message}</p> }
        </div>
      </div>
    );
  }
}

export default withRouter(Register);