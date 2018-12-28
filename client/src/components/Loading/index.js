import React, { Component } from "react";
import "./Loading.css";
import { BeatLoading } from "respinner";

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <BeatLoading fill="#708090" gap={10} />
      </div>
    );
  }
}

export default Loading;
