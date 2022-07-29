import React, { Component } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default class PokemonCard extends Component {
  state = {
    name: "",
    pokeIndex: "",
    imageUrl: "",
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokeIndex = url.split("/")[url.split("/").length - 2];
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

    this.setState({
      name,
      pokeIndex,
      imageUrl,
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5" data-aos="fade-up">
        <div className="pokemon-card card">
          <h5 className="card-header">{this.state.pokeIndex}</h5>
          <img
            className="sprite card-img-top rounded mx-auto mt-2"
            src={this.state.imageUrl}
          />
          {this.state.error ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Error</span>
            </h6>
          ) : null}
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {this.state.name
                .toLowerCase()
                .split(" ")
                .map(
                  (letter) =>
                    letter.charAt(0).toUpperCase() + letter.substring(1)
                )}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
