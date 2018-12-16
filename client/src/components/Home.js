import React from "react";

class Home extends React.Component {
  state = {
    username: this.props.username
  };
  render() {
    const { username } = this.state;
    return username ? <h1>{JSON.stringify(username)}</h1> : <h1>Please log in</h1>;
  }
}

export default Home;