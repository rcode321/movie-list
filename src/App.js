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
import LoginForm from "./component/loginForm";

class App extends Component {
   render() {
      return (
         <div>
            <Container fluid="sm">
               <NavBar />
               <Switch>
                  <Route path="/login" component={LoginForm} />
                  <Route path="/movies/:id" component={MovieForm} />
                  <Route path="/movies" component={Movies} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/rentals" component={Rentals} />
                  <Route path="/not-found" component={NotFound} />

                  <Redirect from="/" exact to="/movies" />
                  <Redirect to="/not-found" />
               </Switch>
            </Container>
         </div>
      );
   }
}

export default App;
