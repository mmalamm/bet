import React, { Component } from "react";
import UserIcon from "../common/UserIcon/UserIcon";

import { connect } from "react-redux";

class CurrentUsers extends Component {
  render() {
    console.log("currUsrs", this.props.currentUsers);
    return (
      <div>
        {this.props.currentUsers.map(usr => {
          return (
            <div key={usr.username}>
              <UserIcon user={usr} />
              <p>{usr.username}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ currentUsers: users });

export default connect(mapStateToProps)(CurrentUsers);
