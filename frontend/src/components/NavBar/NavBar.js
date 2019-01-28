import React, { Component } from "react";

import MyIcon from "../common/MyIcon/MyIcon";

import s from "./NavBar.module.scss";

import { connect } from "react-redux";

import LinkButton from "../common/LinkButton";
class NavBar extends Component {
  render() {
    const { username, points } = this.props.auth;
    return (
      <div className={s.NavBar}>
        <MyIcon />
        <div className={s.navBarDetails}>
          <h4>{username}</h4>
          <div>{points}</div>
        </div>
        <LinkButton to="/home">Home</LinkButton>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(NavBar);
