import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <div>Dashboard!!!</div>
      </div>
    );
  }
}
