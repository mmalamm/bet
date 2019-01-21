import React, { Component } from "react";

import s from "./ChangePicForm.module.scss";

import { connect } from "react-redux";
import { updateIcon } from "../../actions/authActions";
import { hideModal } from "../../actions/modalActions";

import icons from "../../assets/icons";

export class ChangePicForm extends Component {
  updateIcon = iconName => e => {
    this.props.updateIcon(iconName);
    this.props.closeModal();
  };

  render() {
    const { closeModal } = this.props;
    return (
      <div>
        <div className={s.ChangePicForm}>
          <button onClick={closeModal}>Close</button>
          <div className={s.buttonPanel}>
            {Object.keys(icons).map(key => {
              return (
                <button
                  key={key}
                  onClick={this.updateIcon(key)}
                  className={s.iconButton}
                >
                  <img className={s.buttonPic} src={icons[key]} alt={key} />
                </button>
              );
            })}
          </div>
        </div>
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
