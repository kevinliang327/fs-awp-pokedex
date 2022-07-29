import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/style.css";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default App;
