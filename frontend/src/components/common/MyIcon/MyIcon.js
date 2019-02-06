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
      <div
        className={`${styles.MyIcon} ${className}`}
        style={{ backgroundColor: `#${icon}` }}
        onClick={onClick}
      >
        {username[0].toUpperCase()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(MyIcon);
