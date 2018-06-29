import React, { Component } from 'react';

class EvolutionChain extends Component {
  constructor() {
    super();

    this.state = {
      evolutionChain: {},
      fetched: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    fetch(this.props.evolutionChainUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({
          evolutionChain: data,
          loading: true,
          fetched: true
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { loading, fetched, evolutionChain } = this.state;
    let content;
    if (fetched) {
      var chain = evolutionChain.chain.evolves_to.map(item => (
        <li key={item.species.name}>{item.species.name}</li>
      ));
      content = (
        <div>
          <ul>{chain}</ul>
        </div>
      );
    } else if (loading && !fetched) {
      content = <h2>Loading...</h2>;
    }
    return <div className="pokemon-info__evolution-chain">{content}</div>;
  }
}

export default EvolutionChain;
