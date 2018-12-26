import React from "react";

import Cookies from "js-cookie";

class Home extends React.Component {
  state = {
    username: this.props.username
  };
  emitNumber = e => {
    this.props.io.emit("playTurn", {
      player: Cookies.get("username"),
      cards: [1, 2, 3, 4]
    });
  };
  render() {
    const { username } = this.state;
    return username ? (
      <h1 onClick={this.emitNumber}>{JSON.stringify(username)}</h1>
    ) : (
      <h1>Please log in</h1>
    );
  }
}

export default Home;
