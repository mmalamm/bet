import React, { Component } from "react";

import io from "socket.io-client";
import { connect } from "react-redux";

import s from "./Dashboard.module.scss";

import NavBar from "../NavBar/NavBar";
import { updateCurrentUsers } from "../../actions/usersActions";
import CurrentUsers from "./CurrentUsers";

class Dashboard extends Component {
  componentDidMount() {
    const updateUsers = this.props.updateCurrentUsers;
    this.socket = io();
    this.socket.on("connect", socket => console.log("connected"));
    this.socket.on("welcome", d => console.log("welcome recieved:", d));
    this.socket.on("currentUsers", d => updateUsers(d));
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className={s.Dashboard}>
        <NavBar />
        <CurrentUsers />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ currentUsers: users });

const mapDispatchToPros = dispatch => {
  return {
    updateCurrentUsers(users) {
      dispatch(updateCurrentUsers(users));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(Dashboard);
