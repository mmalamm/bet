import React, { Component } from "react";

import s from "./ChangePicForm.module.scss";

import { connect } from "react-redux";
import { updateIcon } from "../../actions/authActions";
import { hideModal } from "../../actions/modalActions";

export class ChangePicForm extends Component {
  updateIcon = iconName => e => {
    this.props.updateIcon(iconName);
  };

  render() {
    const { closeModal } = this.props;
    return (
      <div className={s.ChangePicForm}>
        <button onClick={this.updateIcon("apple")}>apple</button>
        <button onClick={this.updateIcon("bananas")}>bananas</button>
        <button onClick={closeModal}>cherry</button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { selectedIcon: auth.icon, username: auth.username };
};

const mapDispatchToProps = dispatch => {
  return {
    updateIcon(iconName) {
      dispatch(updateIcon(iconName));
    },
    closeModal() {
      dispatch(hideModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePicForm);
