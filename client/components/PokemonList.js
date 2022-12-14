import React, { Component } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

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
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading Pokémon!</h1>
        )}
      </div>
    );
  }
}
