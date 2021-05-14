import "./App.css";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Movies from "./component/movies";
import Customers from "./component/customers";
import NavBar from "./component/navBar";
import Rentals from "./component/rentals";
import NotFound from "./component/notFound";
import MovieForm from "./component/movieForm";

class App extends Component {
   render() {
      return (
         <div>
            <Container fluid="sm">
               <NavBar />

               <Switch>
                  <Route path="/movies/:id" component={MovieForm} />
                  <Route path="/movies" render={(props) => <Movies {...props} />} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/rentals" component={Rentals} />
                  <Redirect from="/movies" to="/" />
                  <Route path="/not-found" component={NotFound} />
                  <Route path="/" exact component={Movies} />
                  <Redirect to="/not-found" />
               </Switch>
            </Container>
         </div>
      );
   }
}

export default App;
