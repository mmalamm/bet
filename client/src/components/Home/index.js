import React, { Component } from "react";
import { connect } from "react-redux";
import qS from "query-string";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../../constants";

import Logo from "../Logo";
import LoginForm from "./LoginForm";
import WelcomeBar from "./WelcomeBar";
import Loading from "../Loading";

const homePanels = {
  [AWAITING_AUTH_RESPONSE]: Loading,
  [LOGGED_OUT]: LoginForm,
  [LOGGED_IN]: WelcomeBar
};

class Home extends Component {
  componentDidMount() {
    console.log(qS.parse(this.props.location.search));
  }
  renderHomePanel = panelProps => {
    const Panel = homePanels[this.props.auth.status];
    return (
      <div className="App-homePanel">
        <Panel {...panelProps} />
      </div>
    );
  };
  render() {
    const queryParams = qS.parse(this.props.location.search);
    return (
      <div className="App">
        <Logo className="App-logo" height={"150px"} />
        {this.renderHomePanel(queryParams)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
