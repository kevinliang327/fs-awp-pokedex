import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
