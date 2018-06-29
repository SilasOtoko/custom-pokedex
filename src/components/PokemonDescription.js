import React, { Component } from 'react';

class PokemonDescription extends Component {
  constructor() {
    super();

    this.state = {
      species: {},
      fetched: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.pokemon}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          species: data,
          loading: true,
          fetched: true
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { loading, fetched, species } = this.state;
    let content;
    if (fetched) {
      var text = species.flavor_text_entries.find(item => item.language.name === 'en');
      content = (
        <div>
          <p>{text.flavor_text}</p>
        </div>
      );
    } else if (loading && !fetched) {
      content = <h2>Loading...</h2>;
    }
    return <div className="pokemon-info__description">{content}</div>;
  }
}

export default PokemonDescription;
