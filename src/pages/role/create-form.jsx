import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { reqAddRoles } from "../../api";

const Item = Form.Item;

export default class CreateForm extends Component {
  state = {};

  createRole = async (e) => {
    const result = await reqAddRoles(e.name);
    if (result.status === 0) {
      message.success(`创建成功,名称为"${result.data.name}"`);
      this.props.handleCancel();
    }
  };
  render() {
    return (
      <Form onFinish={this.createRole}>
        <Item
          label="角色名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Input placeholder="请输入角色名称"></Input>
        </Item>
        <Item>
          <Button style={{ float: "right" }} type="primary" htmlType="submit">
            创建
          </Button>
        </Item>
      </Form>
    );
  }
}
