import React, { PureComponent } from "react";
import { reqUpdateUser } from "../../api";
import { Form, Input, Button, message } from "antd";
import { Select } from "antd";

const { Option } = Select;
const Item = Form.Item;
export default class AddUser extends PureComponent {
  state = {
    role_id: "",
  };
  updateUser = async (e) => {
     var { role_id } = this.state;
     console.log("正在创建",e)
    const result = await reqUpdateUser(
       this.props._id,
      e.username,
      e.phone,
      e.email,
      role_id
    );
    if (result.status === 0) {
      this.props.handleCancel();
      message.success("更新成功")
        this.props.getUsers()
   }else{
      message.error(result.msg)
    }
  };

  handleChange = (role_id) => {
    this.setState({ role_id });
  };
  render() {
    return (
      <Form onFinish={this.updateUser}>
        <Item
          label="用户名"
          key="username"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Input placeholder="请输入用户名"></Input>
        </Item>

      
        <Item
          label="手机号"
          name="phone"
          key="phone"
          rules={[
            {
              required: true,
              message: "请输入手机号",
            },
          ]}
        >
          <Input placeholder="请输入手机号"></Input>
        </Item>

        <Item
          label="邮&nbsp; 箱"
          name="email"
          key="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}
        >
          <Input placeholder="请输入邮箱"></Input>
        </Item>

        <Item
          label="角 &nbsp;色"
          key="role"
        >
          <Select style={{ width: 120 }} onChange={this.handleChange}>
            {this.props.roles.map((role) => (
              <Option key={role._id} value={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item>
          <Button style={{ float: "right" }} type="primary" htmlType="submit">
            更新
          </Button>
        </Item>     
      </Form>
    );
  }
}
