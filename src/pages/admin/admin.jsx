import React, { Component } from "react";
import memoryUtils from "../../utils/memoryUtils";
import { Redirect,Route,Switch } from "react-router-dom";

import { Layout } from "antd";
import Header from "../../components/header/header";
import LeftNav from "../../components/left-nav/left-nav";

import Category from "../category/category"
import Home from "../home/home"
import Role from "../role/role"
import User from "../user/user"
import Bar from "../charts/bar"
import Line from "../charts/line"
import Pie from "../charts/pie"
import Product from "../product/product"
import Order from "../order/order"

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
          <Content style={{backgroundColor:"#fff",margin:"20px"}}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/order" component={Order}></Route>

              <Redirect to='/home'/>
            </Switch>
          </Content>
          <Footer style={{textAlign:"center"}}>欢迎使用</Footer>
        </Layout>
      </Layout>
    );
  }
}
