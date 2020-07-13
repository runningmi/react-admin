import React, { PureComponent } from "react";

import { NavLink, withRouter } from "react-router-dom";

import "./index.css";
import logo from "../../assets/images/logo.png";
import menuConfig from "../../config/menuConfig";

import { Menu } from "antd";
import { PieChartOutlined, AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class LeftNav extends PureComponent {
  hasAuth = (item) => {
    if (!item.children  ) {
      console.log([...this.props.menus])
      return !!this.props.menus.find((menu) => item.key === menu);
    } else {
      return !!item.children.find((child) => this.props.menus.indexOf(child.key)!==-1)
    }
  };
  showItem = (menuList) => {
    return menuList.map((item) => {
      // if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={<PieChartOutlined />}>
              <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
          );
        // }
       }

        // if (this.hasAuth(item)) {
        if (item.children){
          const path = this.props.location.pathname;
          const it = item.children.find((item) => path.indexOf(item.key) === 0);
          if (it) {
            this.openKey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              icon={<AppstoreOutlined />}
              title={item.title}
            >
              {this.showItem(item.children)}
            </SubMenu>
          );
        // }
      }
    });
  };

  UNSAFE_componentWillMount() {
    this.menuList = this.showItem(menuConfig);

    // this.menuList = this.showItem(menuConfig);
  }
  render() {
    //得到当前请求的路由路径
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }
    return (
      <div>
        <NavLink className="left-nav" to="/">
          <header className="left-nav-header">
            <img src={logo} alt="logo" />
            <h1>后台管理</h1>
          </header>
        </NavLink>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuList}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
