import React, { Component } from "react";
import memoryUtils from "../../utils/memoryUtils";
import { Redirect,Route,S } from "react-router-dom";

import { Layout } from "antd";
import Header from "../../components/header/header";
import LeftNav from "../../components/left-nav/left-nav";
const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user._id) {
      //没登录,自动跳转
      return <Redirect to="/login"></Redirect>;
    }

    return (
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav>

          </LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer style={{textAlign:"center"}}>欢迎使用</Footer>
        </Layout>
      </Layout>
    );
  }
}
