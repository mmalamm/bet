import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "../Login";
import Navbar from "../Navbar";
import Home from "../Home";
import Registration from "../Registration";
import io from "socket.io-client";

// import renderModal from "./renderModal";

import "./App.css";

const initialState = {
  username: null,
  loggedIn: null
};

class AppRouter extends React.Component {
  state = { ...initialState };
  componentDidMount() {
    console.log(this.props);
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
          this.socket.on("disconnect", e => {
            console.log("disconnected from socket...", e);
            axios.post("/api/logout").then(e => {
              console.log(e);
              this.setState({ loggedIn: false, username: null });
            });
          });
          this.socket.on("updateStatus", d => console.log(d));
          this.socket.on("currentUsers", d => console.log(d));
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

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps)(AppRouter);
// export default AppRouter;
