import React, { Component } from "react";
import s from "./Loading.module.scss";
import { BeatLoading } from "respinner";

class Loading extends Component {
  render() {
    return (
      <div className={s.Loading}>
        <BeatLoading className={s.BeatLoading} gap={10} />
      </div>
    );
  }
}

export default Loading;
