import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import styled from "styled-components";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav className="navbar navbar-expand-md nav-dark bg-dark fixed-top">
      <a
        href=""
        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        draggable="false"
      >
        FS-AWP-Pokédex
      </a>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
