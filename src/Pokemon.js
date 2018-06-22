import React, { Component } from 'react';

class Pokemon extends Component {
  render() {
    const { pokemon, id } = this.props;
    return (
      <div className="pokemon--species">
        <div className="pokemon--species--container">
          <div className="pokemon--species--sprite">
            <img src={require(`../public/sprites/${id}.png`)} alt=" " />
          </div>
          <div className="pokemon--species--name">{pokemon.name}</div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
