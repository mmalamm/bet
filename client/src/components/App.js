import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";
import Registration from "./Registration";
import io from "socket.io-client";

// import renderModal from "./renderModal";

import "./App.css";

class AppRouter extends React.Component {
  state = {
    username: null,
    loggedIn: null
  };
  componentDidMount() {
    axios
      .get("/api/current_user")
      .then(data => data.data)
      .then(username => {
        const loggedIn = Boolean(username);
        if (loggedIn) {
          this.socket = io();
          this.socket.on("connect", socket =>
            console.log("connected to socket:", this.socket.id)
          );
          this.socket.on("welcome", thing =>
            console.log("welcomed with thing:", thing)
          );
        }

        this.setState({ loggedIn, username });
      });
  }
  render() {
    const { loggedIn, username } = this.state;

    const loggedOutJSX = (
      <Router>
        <div>
          <Navbar loggedIn={loggedIn} />
          <Route path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={Registration} />
        </div>
      </Router>
    );
    const loader = <h1>Loading...</h1>;
    const loggedInJSX = (
      <Router>
        <div>
          <Navbar loggedIn={loggedIn} />
          <Route
            path="/"
            exact
            render={props => <Home username={username} io={this.socket} />}
          />
        </div>
      </Router>
    );
    return loggedIn === null ? loader : loggedIn ? loggedInJSX : loggedOutJSX;
  }
}

export default AppRouter;
