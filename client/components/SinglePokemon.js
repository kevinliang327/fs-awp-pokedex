import React, { Component } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TYPE_COLORS = {
  bug: "#B1C12E",
  dark: "#4F3A2D",
  dragon: "#755EDF",
  electric: "#FCBC17",
  fairy: "#F4B1F4",
  fighting: "#C22E28",
  fire: "#E73B0C",
  flying: "#A3B3F7",
  ghost: "#6060B2",
  grass: "#74C236",
  ground: "#D3B357",
  ice: "#A3E7FD",
  normal: "#C8C4BC",
  poison: "#934594",
  psychic: "#ED4882",
  rock: "#B9A156",
  steel: "#B5B5C3",
  water: "#3295F6",
};

export default class SinglePokemon extends Component {
  state = {
    name: "",
    pokeIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    genus: "",
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
      let genus = "";

      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          this.setState({ description });
          return;
        }
      });

      res.data.genera.some((genus) => {
        if (genus.language.name === "en") {
          genus = genus.genus;
          this.setState({ genus });
          return;
        }
      });
    });
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div
            className="card-header"
            data-aos="zoom-in-down"
            data-aos-easing="ease-in-sine"
          >
            <div className="row">
              <div className="col-5">
                <h5>No. {this.state.pokeIndex}</h5>
              </div>
            </div>
          </div>
          <div
            className="card-body"
            data-aos="flip-right"
            data-aos-easing="ease-in-sine"
            data-aos-delay="500"
          >
            <div className="row ">
              <div className="col-md-3">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-6">
                <h3 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split(" ")
                    .map(
                      (letter) =>
                        letter.charAt(0).toUpperCase() + letter.substring(1)
                    )}
                </h3>
                <h7 className="mx-auto">{this.state.genus}</h7>
                <p>{this.state.description}</p>
              </div>
              <div className="col-md-3 justify-items-center">
                {this.state.types.map((type) => (
                  <span
                    key={type}
                    className="badge badge-pill"
                    style={{
                      backgroundColor: `${TYPE_COLORS[type]}`,
                      color: "white",
                    }}
                  >
                    {type.toUpperCase()}
                  </span>
                ))}
                <div>Height: {this.state.height} ft.</div>
                <div>Weight: {this.state.weight} lbs.</div>
              </div>
            </div>
          </div>
          <div
            className="card-footer text-muted"
            data-aos="zoom-in-up"
            data-aos-easing="ease-in-sine"
            data-aos-delay="1000"
          >
            <div>
              Sprite From{" "}
              <a
                href="https://projectpokemon.org/"
                target="_blank"
                className="card-link"
              >
                Project Pokémon
              </a>
            </div>
            <div>
              Data From{" "}
              <a
                href="https://pokeapi.co"
                target="_blank"
                className="card-link"
              >
                PokéApi
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
