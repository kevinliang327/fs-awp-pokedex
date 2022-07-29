import React, { Component } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=151",
    pokemon: null,
  };

  async componentDidMount() {
    const { data } = await axios.get(this.state.url);
    this.setState({ pokemon: data["results"] });
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard />
            ))}
          </div>
        ) : (
          <h1>Loading Pokémon!</h1>
        )}
      </div>
    );
  }
}
