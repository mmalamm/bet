import React, { Component } from "react";
import { connect } from "react-redux";
import qS from "query-string";

import { AWAITING_AUTH_RESPONSE, LOGGED_OUT, LOGGED_IN } from "../../constants";

import s from "./Home.module.scss";

import AnimatedLogo from "../Logo/AnimatedLogo";

import Loading from "../Loading/Loading";
import LoginForm from "./LoginForm";
import WelcomeBar from "./WelcomeBar/WelcomeBar";

import { showFlash, loggedInFlash } from "../../actions/flashActions";
import { hideModal } from "../../actions/modalActions";

const homePanels = {
  [AWAITING_AUTH_RESPONSE]: Loading,
  [LOGGED_OUT]: LoginForm,
  [LOGGED_IN]: WelcomeBar
};

class Home extends Component {
  componentDidMount() {
    const queryStrings = qS.parse(this.props.location.search),
      { showFlash, loggedInFlash, hideModal } = this.props,
      { r, l } = queryStrings;
    hideModal();
    console.log(queryStrings);
    if (r) {
      showFlash(r);
    }
    if (l) {
      console.log(l);
      loggedInFlash();
    }
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
const mapDispatchToProps = dispatch => {
  return {
    showFlash(flashId) {
      dispatch(showFlash(flashId));
    },
    loggedInFlash() {
      dispatch(loggedInFlash());
    },
    hideModal() {
      dispatch(hideModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
