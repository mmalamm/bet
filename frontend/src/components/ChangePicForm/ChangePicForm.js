import React, { Component } from "react";

import s from "./ChangePicForm.module.scss";

import { connect } from "react-redux";
import { updateIcon } from "../../actions/authActions";

import UserIcon from "../common/UserIcon/UserIcon";

import icons from "../../assets/icons";

export class ChangePicForm extends Component {
  updateIcon = iconName => e => {
    this.props.updateIcon(iconName);
  };

  render() {
    return (
      <div>
        <div className={s.ChangePicForm}>
          <UserIcon />
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

const mapDispatchToProps = dispatch => {
  return {
    updateIcon(iconName) {
      dispatch(updateIcon(iconName));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChangePicForm);
