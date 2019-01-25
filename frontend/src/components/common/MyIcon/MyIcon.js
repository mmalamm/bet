import icons from "../../../assets/icons";
import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./MyIcon.module.scss";

class MyIcon extends Component {
  render() {
    const {
      className,
      onClick,
      auth: { username, icon }
    } = this.props;
    return (
      <img
        className={`${styles.MyIcon} ${className}`}
        src={icons[icon]}
        alt={username}
        onClick={onClick}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(MyIcon);
