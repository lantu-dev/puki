import { WebView } from "@tarojs/components";
import React, { Component } from "react";
import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleMessage(e) {
    console.log(e);
  }

  render() {
    return (
      <WebView
        src="http://127.0.0.1:8000/auth/phone-login"
        onMessage={this.handleMessage}
      />
    );
  }
}
