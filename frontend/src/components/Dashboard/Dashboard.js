import React, { Component } from "react";

import { withRouter } from "react-router-dom";

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
    this.socket.on("connect", () => console.log("connected"));
    this.socket.on("welcome", d => console.log("welcome recieved:", d));
    this.socket.on("currentUsers", d =>
      updateUsers(d.filter(u => u.username !== this.props.auth.username))
    );
    this.socket.on("disconnect", () => this.props.history.push("/home"));
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

const mapStateToProps = ({ users, auth }) => ({ currentUsers: users, auth });

const mapDispatchToPros = dispatch => {
  return {
    updateCurrentUsers(users) {
      dispatch(updateCurrentUsers(users));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToPros
  )(Dashboard)
);
