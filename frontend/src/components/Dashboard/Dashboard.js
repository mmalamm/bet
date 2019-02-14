import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import io from "socket.io-client";
import { connect } from "react-redux";

import s from "./Dashboard.module.scss";

import NavBar from "../NavBar/NavBar";

class Dashboard extends Component {
  componentDidMount() {
    this.socket = io();
    this.socket.on("connect", () => console.log("connected"));
    this.socket.on("welcome", d => console.log("welcome recieved:", d));

    this.socket.on("disconnect", () => this.props.history.push("/home"));
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div className={s.Dashboard}>
        <NavBar />
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth }) => ({ currentUsers: users, auth });

export default withRouter(connect(mapStateToProps)(Dashboard));
