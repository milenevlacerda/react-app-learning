import React, { Component } from "react";

export default class BotaoSubmit extends Component {
  render() {
    return (
      <div className="pure-control-group">
        <label />
        <input
          type="submit"
          className="pure-button pure-button-primary"
          value={this.props.label}
        />
      </div>
    );
  }
}