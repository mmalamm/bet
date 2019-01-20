import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import store from "../../store";
import { Provider } from "react-redux";

class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = "Modal";
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>{this.props.children}</Provider>,
      this.modalTarget
    );
  }
  render() {
    return <noscript />;
  }
}

export const modalize = component => <Modal>{component}</Modal>;

export default Modal;