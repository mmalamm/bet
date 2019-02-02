import React, { Component } from "react";

import MyIcon from "../common/MyIcon/MyIcon";

import s from "./NavBar.module.scss";

import { connect } from "react-redux";

import { showNewGameForm } from "../../actions/modalActions";

import LinkButton from "../common/LinkButton";
class NavBar extends Component {
  renderMenu() {
    return (
      <div>
        <LinkButton to="/home">Home</LinkButton>
        <button onClick={e => this.props.showNewGameForm()}>Create Game</button>
      </div>
    );
  }
  render() {
    const { username, points } = this.props.auth;
    return (
      <div className={s.NavBar}>
        <MyIcon />
        <div className={s.navBarDetails}>
          <h4>{username}</h4>
          <div>{points}</div>
        </div>
        {this.renderMenu()}
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
    showNewGameForm() {
      dispatch(showNewGameForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
