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
    this.flashTarget.className = s.Flash;
    document.body.insertBefore(this.flashTarget, rootDiv);
    this._render();
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
  render() {
    return <noscript />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideFlash() {
      dispatch(hideFlash());
    }
  };
};

const Flash = connect(
  null,
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
