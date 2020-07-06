import React, { Component } from "react";
import "./index.css";
import { formateDate } from "../../utils/dateUtils";
import { withRouter } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storgeUtils from "../../utils/storgeUtils";
import menuConfig from "../../config/menuConfig";
import LinkButton from "../../components/link-button"


import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //当前时间
    user: memoryUtils.user,
  };

  componentDidMount() {
    this.id = setInterval(() => {
      //更新时间
      this.setState({ currentTime: formateDate(Date.now()) });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }
  getTitle = () => {
    const path = this.props.location.pathname;

    let title;
    menuConfig.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const Ctitle = item.children.find((item2) => item2.key === path);
        if (Ctitle) {
          title = Ctitle.title;
        }
      }
    });
    return title;
  };

  showConfirm = () => {
    confirm({
      title: "真的要退出吗?",
      icon: <ExclamationCircleOutlined />,
      content: "点击确定退出",
      onOk: () => {
        memoryUtils.user = {};
        storgeUtils.removeUser();
        this.props.history.replace("/");
        message.info("退出成功");
      },
      onCancel() {
        console.log("取消");
      },
    });
  };

  render() {
    const { currentTime } = this.state;
    return (
      <div>
        <div className="header">
          <div className="header-top">
            <span>欢迎 {memoryUtils.user.username}</span>
            <LinkButton href="#!" onClick={this.showConfirm}>
              退出
            </LinkButton>
          </div>
          <div className="header-bottom">
            <div className="header-bottom-left">{this.getTitle()}</div>
            <div className="header-bottom-right">
              <span>{currentTime}</span>
              <img alt="weather" />
              <span>晴</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
