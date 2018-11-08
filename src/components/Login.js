import React, { Component } from 'react';
import { auth } from '../firebase';
import '../css/profile.css';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
   this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin(event) {
    event.preventDefault();

    const { email, password, error } = this.state;
    const { history } = this.props;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/profile");
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  render() {
    const { currentUser } = this.props;
    const { email, password, error } = this.state;
    return (
      <div className="page-container">
        <div className="card user-form">
          <h2>Log In</h2>
          <form onSubmit={this.handleLogin}>
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
              <button className="button" type="submit">Log in</button>
              <button className="button button--subtle" type="submit" onClick={this.props.history.goBack}>Cancel</button>
            </div>
          </form>
          {error && <p>{this.state.error.message}</p> }
        </div>
      </div>
    );
  }
}

export default withRouter(Login);