import React, { Component } from "react";
import { connect } from "react-redux";
import qS from "query-string";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../../constants";

import Logo from "../Logo";
import LoginForm from "./LoginForm";
import WelcomeBar from "./WelcomeBar";
import Loading from "../Loading";

const homePanels = {
  [AWAITING_AUTH_RESPONSE]: props => <Loading {...props} />,
  [LOGGED_OUT]: props => <LoginForm {...props} />,
  [LOGGED_IN]: props => <WelcomeBar {...props} />
};

class Home extends Component {
  componentDidMount() {
    console.log(qS.parse(this.props.location.search));
  }
  renderHomePanel = panelProps => {
    const authStatus = this.props.auth.status;
    return (
      <div className="App-homePanel">
        {homePanels[authStatus](panelProps) || null}
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Home);
