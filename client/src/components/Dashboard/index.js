import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <button>
          <Link to="/home">Home</Link>
        </button>
        <div>Dashboard!!!</div>
      </div>
    );
  }
}
