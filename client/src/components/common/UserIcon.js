import icons from "../../assets/icons";
import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./UserIcon.module.scss";

console.log(styles);

class UserIcon extends Component {
  render() {
    const { username, icon } = this.props.auth;
    const { className } = this.props;
    return (
      <img
        className={[styles.UserIcon, className].join(" ")}
        src={icons[icon]}
        alt={username}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(UserIcon);
