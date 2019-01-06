import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../../actions/authActions";
import LinkButton from "../../common/LinkButton";
import UserIcon from "../../common/UserIcon/UserIcon";

import s from './WelcomeBar.module.scss';

class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  renderUserInfo = () => {
    const { username, points } = this.props.auth;
    return (
      <div className="WelcomeBar_userInfo">
        <UserIcon className="" />
        <h3 className="WelcomeBar_username">{username}</h3>
        <h6 className="WelcomeBar_points">{points}</h6>
      </div>
    );
  };
  render() {
    return (
      <div className={s.WelcomeBar}>
        {this.renderUserInfo()}
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
