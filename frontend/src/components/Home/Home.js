import React, { Component } from "react";
import { connect } from "react-redux";
import qS from "query-string";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../../constants";

import s from "./Home.module.scss";

import AnimatedLogo from "../Logo/AnimatedLogo";

import Loading from "../Loading/Loading";
import LoginForm from "./LoginForm";
import WelcomeBar from "./WelcomeBar/WelcomeBar";

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
      <div className={s.homePanel}>
        <Panel {...panelProps} />
      </div>
    );
  };
  render() {
    const queryParams = qS.parse(this.props.location.search);
    return (
      <div className={s.Home}>
        <AnimatedLogo className={s.Logo} height={"150px"} />
        <h2 className={s.Heading}>锄大地 DEUCES</h2>
        {this.renderHomePanel(queryParams)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Home);
