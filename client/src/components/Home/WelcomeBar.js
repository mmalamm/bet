import React, { Component } from "react";
import { connect } from "react-redux";

class WelcomeBar extends Component {
  render() {
    // const { username, imgUrl, points } = this.props.auth.user;
    // return (
    //   <div>
    //     <img src={imgUrl} alt={username} />
    //     <h3>{username}</h3>
    //     <h6>{points}</h6>
    //     <button>Dashboard</button>
    //     <button>Sign Out</button>
    //   </div>
    // );
    return <p>{JSON.stringify(this.props.auth)}</p>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(WelcomeBar);
