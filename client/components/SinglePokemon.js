import React, { Component } from "react";
import axios from "axios";

export default class SinglePokemon extends Component {
  state = {
    name: "",
    pokeIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    height: "",
    weight: "",
  };

  async componentDidMount() {
    const { pokeIndex } = this.props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokeIndex}`;

    const { data: pokemonUrlRes } = await axios.get(pokemonUrl);

    const name = pokemonUrlRes.name;

    let imageUrl = `https://projectpokemon.org/images/normal-sprite/${name}.gif`;
    if (name === "mr-mime") {
      imageUrl = "https://projectpokemon.org/images/normal-sprite/mr.mime.gif";
    }
    if (name === "nidoran-f") {
      imageUrl =
        "https://projectpokemon.org/images/normal-sprite/nidoran_f.gif";
    }
    if (name === "nidoran-m") {
      imageUrl =
        "https://projectpokemon.org/images/normal-sprite/nidoran_m.gif";
    }

    // height is given in decimeters and weight is given in hectograms
    // convert to feet and pounds
    const height =
      Math.round((pokemonUrlRes.height * 0.328084 + 0.0001) * 100) / 100;
    const weight =
      Math.round((pokemonUrlRes.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonUrlRes.types.map((type) => type.type.name);

    this.setState({ pokeIndex, name, imageUrl, height, weight, types });

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      this.setState({ description });
    });
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}
