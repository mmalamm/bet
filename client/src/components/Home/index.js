import React, { Component } from "react";
import { connect } from "react-redux";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../../constants";

import Logo from "../Logo";
import LoginForm from "./LoginForm";
import WelcomeBar from "./WelcomeBar";

const Loading = () => <h1>Loading...</h1>;

class Home extends Component {
  renderHomePanel = () => {
    const authStatus = this.props.auth.status;
    switch (authStatus) {
      case AWAITING_AUTH_RESPONSE:
        return <Loading />;
      case LOGGED_OUT:
        return <LoginForm />;
      case LOGGED_IN:
        return <WelcomeBar />;
      default:
        return null;
    }
  };
  render() {
    return (
      <div>
        <Logo height={"150px"} />
        {this.renderHomePanel()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);
