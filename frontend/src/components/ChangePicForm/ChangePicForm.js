import React, { Component } from "react";

import s from "./ChangePicForm.module.scss";

import { connect } from "react-redux";
import { updateIcon } from "../../actions/authActions";

import MyIcon from "../common/MyIcon/MyIcon";

const icons = [
  "068587",
  "F2B134",
  "ED553B",
  "47AB6C",
  "cd1e1f",
  "911EB4",
  "000075",
  "4363D8",
  "E6194B",
  "28dfbb"
];

class ChangePicForm extends Component {
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
    );
  }

  render() {
    return (
      <div className={s.ChangePicForm}>
        {this.renderUserInfo()}
        <div className={s.buttonPanel}>
          {icons.map(color => {
            return (
              <button
                key={color}
                onClick={this.updateIcon(color)}
                className={s.iconButton}
              >
                <div
                  className={s.buttonPic}
                  style={{ backgroundColor: `#${color}` }}
                  alt={color}
                />
              </button>
            );
          })}
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
