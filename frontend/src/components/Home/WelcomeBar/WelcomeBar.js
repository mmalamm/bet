import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../../actions/authActions";
import LinkButton from "../../common/LinkButton";
import UserIcon from "../../common/UserIcon/UserIcon";

import s from "./WelcomeBar.module.scss";

/// refactor with grid
class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { username, points } = this.props.auth;
    return (
      <div className={s.WelcomeBar}>
        <h3 className={s.heading}>Logged In:</h3>
        <UserIcon className={s.userIcon} />
        <div className={s.userInfo}>
          {username} <span className={s.points}>({points})</span>
        </div>
        <LinkButton
          to="/dashboard"
          className={[s.btn, s.dashboardBtn].join(" ")}
        >
          Dashboard
        </LinkButton>
        <button
          className={[s.btn, s.logoutBtn].join(" ")}
          onClick={this.logout}
        >
          Log Out
        </button>
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