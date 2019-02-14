import React, { Component } from "react";
import UserIcon from "../common/UserIcon/UserIcon";

import s from "./CurrentUsers.module.scss";

import { connect } from "react-redux";

class CurrentUsers extends Component {
  render() {
    console.log("currUsrs", this.props.currentUsers);
    return (
      <div className={s.CurrentUsers}>
        {this.props.currentUsers.map(usr => {
          return (
            <div className={s.userTile} key={usr.username}>
              <UserIcon user={usr} />
              <p className={s.userTileText}>{usr.username}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ currentUsers: users });

export default connect(mapStateToProps)(CurrentUsers);
