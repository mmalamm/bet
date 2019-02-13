import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "../../store";
import { Provider } from "react-redux";

import { connect } from "react-redux";
import { hideModal } from "../../actions/modalActions";

import s from "./Modal.module.scss";

class _Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement("div");
    this.modalTarget.className = `${s.Modal} ${s.initialState}`;
    this.modalTarget.addEventListener("click", this.closeOnBackgroundClick);
    document.body.appendChild(this.modalTarget);
    this._render();
    document.addEventListener("keydown", this.closeOnEscape);
  }

  componentWillUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.modalTarget.removeEventListener("click", this.closeOnBackgroundClick);
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
    document.removeEventListener("keydown", this.closeOnEscape);
  }

  closeOnBackgroundClick = e => {
    const cN = e.target.className,
      isBackgroundClick = cN.includes(s.Modal) || cN.includes(s.ModalContainer);
    if (isBackgroundClick) this.closeModal();
  };

  closeOnEscape = e => e.keyCode === 27 && this.closeModal();

  closeModal = e => {
    this.modalTarget.classList.remove(s.readyState);
    this.modalTarget.classList.add(s.initialState);
    setTimeout(() => this.props.hideModal(), 100);
  };

  renderCloseButton = () => (
    <button className={s.closeButton} onClick={this.closeModal}>
      ✖
    </button>
  );

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        {this.renderCloseButton()}
        <div className={s.ModalContainer}>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    );
    setImmediate(() => this.modalTarget.classList.add(s.readyState));
  }

  render() {
    return <noscript />;
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal() {
    dispatch(hideModal());
  }
});

const Modal = connect(
  null,
  mapDispatchToProps
)(_Modal);

export const modalize = component => <Modal>{component}</Modal>;
