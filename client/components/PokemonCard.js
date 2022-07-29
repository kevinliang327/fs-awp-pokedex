import React, { Component } from "react";

import styled from "styled-components";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
`;

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
      <div className="col-md-3 col-sm-6 mb-5">
        <div className="card">
          <h5 className="card-header">{this.state.pokeIndex}</h5>
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            src={this.state.imageUrl}
          ></Sprite>
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
