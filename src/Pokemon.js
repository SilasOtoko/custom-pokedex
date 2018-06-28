import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { pad } from './helpers';

class Pokemon extends Component {
  constructor() {
    super();

    this.state = {
      singlePokemon: {},
      fetched: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(this.props.pokemon.url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          singlePokemon: data,
          loading: true,
          fetched: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { fetched, loading, singlePokemon } = this.state;

    let content;
    if (fetched) {
      content = (
        <Link
          className="card"
          exact="true"
          to={{ pathname: `/pokemon/${singlePokemon.id}`, state: { singlePokemon } }}
        >
          <div className="card__number">#{pad(singlePokemon.id, 3)}</div>
          <div className="card__sprite">
            <img
              src={require(`../public/sprites/${singlePokemon.id}.png`)}
              alt={singlePokemon.name}
            />
          </div>
          <div className="card__name">
            <h3>{singlePokemon.name}</h3>
          </div>
        </Link>
      );
    } else if (loading && !fetched) {
      content = <h2>Loading...</h2>;
    }
    return <div>{content}</div>;
  }
}

export default Pokemon;
