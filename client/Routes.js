import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import SinglePokemon from "./components/SinglePokemon";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/pokemon/:pokeIndex"
                component={SinglePokemon}
              />
              <Route exact path="/" component={Main} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
