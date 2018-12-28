import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Home from "../Home";

import { signIn, signOut } from "../../actions/authActions";

class AppRouter extends Component {
  componentDidMount() {
    axios
      .get("/api/current_user")
      .then(data => data.data)
      .then(({ user }) => {
        console.log(user);
        if (user) {
          this.props.signIn(user);
        } else {
          this.props.signOut();
        }
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/home/" component={Home} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn(user) {
      dispatch(signIn(user));
    },
    signOut() {
      dispatch(signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
