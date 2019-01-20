import React, { Component } from "react";

import LinkButton from '../common/LinkButton';

import s from './Dashboard.module.scss';

import NavBar from '../NavBar/NavBar'

export default class Dashboard extends Component {
  render() {
    return (
      <div className={s.Dashboard}>
        <LinkButton to="/home">Home</LinkButton>
        <NavBar />
      </div>
    );
  }
}
