import React, { Component } from 'react';

class Pokemon extends Component {
  render() {
    const { pokemon, id } = this.props;
    return (
      <div className="card">
        <div className="card__sprite">
          <img src={require(`../public/sprites/${id}.png`)} alt=" " />
        </div>
        <div className="card__header">
          <h3>{pokemon.name}</h3>
        </div>
      </div>
    );
  }
}

export default Pokemon;
