import icons from "../../../assets/icons";
import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./UserIcon.module.scss";

class UserIcon extends Component {
  render() {
    const { className, onClick, auth } = this.props;
    const { username, icon } = auth;
    return (
      <img
        className={[styles.UserIcon, className].join(" ")}
        src={icons[icon]}
        alt={username}
        onClick={onClick}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(UserIcon);
