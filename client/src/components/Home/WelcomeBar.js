import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

class WelcomeBar extends Component {
  // logout = e => {
  //   e.preventDefault();

  // };
  render() {
    const { username, imgUrl, points } = this.props.auth;
    return (
      <div>
        <img src={imgUrl} alt={username} />
        <h3>{username}</h3>
        <h6>{points}</h6>
        <button>Dashboard</button>
        <form action="/auth/logout">
          <input type="submit" value="Log Out" />
        </form>
        {/* <button onClick={this.logout}>Log Out</button> */}
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
    signOut() {
      dispatch(signOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeBar);
