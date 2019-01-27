import icons from "../../../assets/icons";
import React, { Component } from "react";

import styles from "./UserIcon.module.scss";

class UserIcon extends Component {
  render() {
    const {
      className,
      onClick,
      user: { username, icon }
    } = this.props;
    return (
      <img
        className={`${styles.UserIcon} ${className}`}
        src={icons[icon]}
        alt={username}
        onClick={onClick}
      />
    );
  }
}

export default UserIcon;
