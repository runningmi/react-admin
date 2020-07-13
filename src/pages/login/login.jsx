import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { reqLogin } from "../../api";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Redirect } from "react-router-dom";
import storgeUtils from "../../utils/storgeUtils";

import "./login.css";
import logo from "../../assets/images/logo.png";
import memoryUtils from "../../utils/memoryUtils";

export default class Login extends Component {
  onFinish = async (values) => {
    const result = await reqLogin(values.username, values.password);
    // console.log("success",response.data)
    if (result.status === 0) {
      message.success("登陆成功");
      const user = result.data;
      memoryUtils.user = user; //存在内存中 ,其实就是找了中介模块,临时一存
      storgeUtils.saveUser(user); // 存在本地存储localstorge中

      this.props.history.replace("/");
    } else {
      message.error(result.msg);
    }
  };
  render() {
    // 已经登录则自动跳转
    if (memoryUtils.user._id) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1 className="title">后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                //声明式验证
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名!",
                },
                {
                  min: 4,
                  message: "用户名至少4位!",
                },
                {
                  max: 12,
                  message: "用户名最多12位!",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "英文数字下划线组成!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输出密码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
