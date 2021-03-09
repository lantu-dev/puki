import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import "./index.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/login/index",
            });
          }}
        >
          登录/注册
        </View>
        <View
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/me/index",
            });
          }}
        >
          个人信息
        </View>
        <View
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/events/index",
            });
          }}
        >
          活动
        </View>
      </View>
    );
  }
}
