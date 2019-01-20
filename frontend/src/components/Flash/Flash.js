import React from "react";
import ReactDOM from "react-dom";
import store from "../../store";
import { Provider } from "react-redux";
import s from "./Flash.module.scss";

import { connect } from "react-redux";
import { hideFlash } from "../../actions/flashActions";

class _Flash extends React.Component {
  componentDidMount() {
    const rootDiv = document.getElementById("root");
    this.flashTarget = document.createElement("div");
    document.body.insertBefore(this.flashTarget, rootDiv);
    if (this.props.loggedIn) {
      if (this.props.auth.username) {
        this.flashTarget.className = s.Flash_loggedIn;
        this._renderLoggedIn();
      }
    } else {
      this.flashTarget.className = s.Flash;
      this._render();
    }
    setTimeout(this.props.hideFlash, 5000);
  }
  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.flashTarget);
    document.body.removeChild(this.flashTarget);
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>{this.props.children}</Provider>,
      this.flashTarget
    );
  }
  _renderLoggedIn() {
    ReactDOM.render(
      <Provider store={store}>
        <p>Logged In as {this.props.auth.username}</p>
      </Provider>,
      this.flashTarget
    );
  }
  render() {
    return <noscript />;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => {
  return {
    hideFlash() {
      dispatch(hideFlash());
    }
  };
};

const Flash = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Flash);

export const createFlash = child => {
  return props => {
    return (
      <Flash>
        <span>{child}</span>
      </Flash>
    );
  };
};

export const createLoggedInFlash = () => {
  return props => {
    return <Flash loggedIn={props.loggedIn} />;
  };
};
