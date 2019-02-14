import React, { Component } from "react";

import s from "./NewGameForm.module.scss";
import UserIcon from "../common/UserIcon/UserIcon";
import { runSearch } from "./helpers";

export default class NewGameForm extends Component {
  state = {
    gameName: "MyGame",
    inviteOnly: false,
    invitedUsers: [],
    searchQuery: "",
    searchResults: []
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
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  };

  removeFromInvited = user => e => {
    this.setState(prevState => {
      return {
        invitedUsers: prevState.invitedUsers.filter(
          u => u.username !== user.username
        )
      };
    });
  };

  addToInvited = user => e => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        invitedUsers: [...prevState.invitedUsers, user]
      };
    });
  };

  executeSearch = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    runSearch(searchQuery).then(results =>
      this.setState({ searchResults: results })
    );
  };

  renderSearchBox() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleSearchInput}
          value={this.state.searchQuery}
        />
        <button onClick={this.executeSearch}>Search</button>
        <div>
          {this.state.searchResults.map(result => {
            return (
              <div key={result.username}>
                <UserIcon user={result} />
                <p>{result.username}</p>
                <button onClick={this.addToInvited(result)}>+</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  renderInvitedList() {
    return (
      <div>
        {this.state.invitedUsers.map(user => {
          return (
            <div key={user.username}>
              <UserIcon user={user} />
              <p>{user.username}</p>
              <button onClick={this.removeFromInvited(user)}>-</button>
            </div>
          );
        })}
      </div>
    );
  }

  createGame = e => {
    e.preventDefault();
    const { gameName, inviteOnly, invitedUsers: invites } = this.state;
    console.log({
      gameName,
      inviteOnly,
      invites
    });
  };

  render() {
    return (
      <div className={s.NewGameForm}>
        <input
          type="text"
          onChange={this.handleNameChange}
          value={this.state.gameName}
        />
        <div>
          <input
            type="checkbox"
            name="inviteOnly"
            checked={this.state.inviteOnly}
            onChange={this.handlePrivacyToggle}
          />
          <label htmlFor="inviteOnly">Invite Only?</label>
        </div>
        {this.renderSearchBox()}
        {this.renderInvitedList()}
        <button onClick={this.createGame}>Create Game</button>
      </div>
    );
  }
}
