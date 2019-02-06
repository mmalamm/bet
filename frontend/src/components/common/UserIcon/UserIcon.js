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
      <div
        className={`${styles.UserIcon} ${className}`}
        style={{ backgroundColor: `#${icon}` }}
        onClick={onClick}
      >
        {username[0].toUpperCase()}
      </div>
    );
  }
}

export default UserIcon;
