import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../../actions/authActions";
import LinkButton from "../../common/LinkButton";
import UserIcon from "../../common/UserIcon/UserIcon";

import s from "./WelcomeBar.module.scss";
import uS from "./UserInfo.module.scss";

class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  renderUserInfo = () => {
    const { username, points } = this.props.auth;
    return (
      <div className={uS.userInfo}>
        <UserIcon className={uS.userIcon} />
        <div className={uS.username}>{username}</div>
        <div className={uS.points}>{points}</div>
      </div>
    );
  };
  render() {
    return (
      <div className={s.WelcomeBar}>
        {this.renderUserInfo()}
        <LinkButton to="/dashboard" className={[s.btn, s.dashboardBtn].join(' ')}>
          Dashboard
        </LinkButton>
        <button className={s.logoutBtn} onClick={this.logout}>
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
