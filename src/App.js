import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Home />
      </div>
    );
  }
}

export default App;
