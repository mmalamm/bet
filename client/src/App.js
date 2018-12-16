import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Registration from "./components/Registration";

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
        this.setState({ loggedIn: Boolean(username), username });
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
            render={props => <Home username={username} />}
          />
        </div>
      </Router>
    );
    return loggedIn === null ? loader : loggedIn ? loggedInJSX : loggedOutJSX;
  }
}

export default AppRouter;
