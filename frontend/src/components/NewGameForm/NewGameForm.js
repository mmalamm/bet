import React, { Component } from "react";

import s from "./NewGameForm.module.scss";

export default class NewGameForm extends Component {
  state = {
    gameName: "",
    inviteOnly: false,
    invitedUsers: []
  };

  handleNameChange = e => {
    const gameName = e.target.value;
    this.setState({ gameName });
  };

  handlePrivacyToggle = e => {
    const inviteOnly = e.target.checked;
    this.setState({ inviteOnly });
  };

  handleSearchInput = e => {
    console.log(e.target.value);
  };

  render() {
    return (
      <div className={s.NewGameForm}>
        <input type="text" onChange={this.handleNameChange} />
        <input
          type="checkbox"
          name="inviteOnly"
          onChange={this.handlePrivacyToggle}
        />
        <input type="text" onChange={this.handleSearchInput} />
      </div>
    );
  }
}
