import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import s from "./App.module.scss";

import Home from "../Home/Home";
import Dashboard from "../Dashboard";
import BotGame from "../BotGame/botgame";

import { fetchCurrentUser } from "../../actions/authActions";
import { LOGGED_IN } from "../../constants";

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  isLoggedIn = () => this.props.auth.status === LOGGED_IN;

  render() {
    return (
      <Router>
        <div className={s.App}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home/" component={Home} />
            <Route
              path="/dashboard/"
              render={props =>
                this.isLoggedIn() ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to={"/home"} />
                )
              }
            />
            <Route path="/bots" component={BotGame} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser() {
      dispatch(fetchCurrentUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);