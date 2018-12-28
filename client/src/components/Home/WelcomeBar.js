import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { signOut, logout } from "../../actions/authActions";
import { Link } from "react-router-dom";

class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { username, imgUrl, points } = this.props.auth;
    return (
      <Fragment>
        <img src={imgUrl} alt={username} />
        <h3>{username}</h3>
        <h6>{points}</h6>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <button onClick={this.logout}>Log Out</button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signOut() {
      dispatch(signOut());
    },
    logout() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeBar);
