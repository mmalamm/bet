import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";

class WelcomeBar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
  };
  renderUserInfo = () => {
    const { username, icon, points } = this.props.auth;
    return (
      <div>
        <img className="WelcomBar_icon" src={icons[icon]} alt={username} />
        <h3 className="WelcomeBar_username">{username}</h3>
        <h6 className="WelcomeBar_points">{points}</h6>
      </div>
    );
  };
  render() {
    return (
      <div className="Home_WelcomeBar">
        {this.renderUserInfo()}
        <Link className="WelcomeBar_dashboardButton" to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <div className="WelcomeBar_logoutButton">
          <button onClick={this.logout}>Log Out</button>
        </div>
      </div>
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
    logout() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeBar);
