import React, { Component } from "react";
import { connect } from "react-redux";

import icons from "../../assets/icons";
import { logout } from "../../actions/authActions";
import LinkButton from "../common/LinkButton";

class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { username, icon, points } = this.props.auth;
    return (
      <div className="Home-WelcomeBar">
        <img src={icons[icon]} alt={username} />
        <h3>{username}</h3>
        <h6>{points}</h6>
        <LinkButton to="/dashboard">Dashboard</LinkButton>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeBar);
