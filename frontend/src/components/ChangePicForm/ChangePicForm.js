import React, { Component } from "react";

import s from "./ChangePicForm.module.scss";

import { connect } from "react-redux";
import { updateIcon } from "../../actions/authActions";

import MyIcon from "../common/MyIcon/MyIcon";

import icons from "../../assets/icons";

export class ChangePicForm extends Component {
  updateIcon = iconName => e => {
    this.props.updateIcon(iconName);
  };

  renderUserInfo() {
    return (
      <div className={s.userInfo}>
        <MyIcon className={s.MyIcon} />
          <div className={s.userInfoText}>
            <div className={s.username}>{this.props.username}</div>
            <div className={s.points}>{this.props.points}</div>
          </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={s.ChangePicForm}>
          {this.renderUserInfo()}
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

const mapStateToProps = ({ auth: { username, points } }) => ({
  username,
  points
});

const mapDispatchToProps = dispatch => {
  return {
    updateIcon(iconName) {
      dispatch(updateIcon(iconName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePicForm);
