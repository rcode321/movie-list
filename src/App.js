import "./App.css";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import Movies from "./movies.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <Container fluid="sm">
          <Movies />
        </Container>
      </div>
    );
  }
}

export default App;
