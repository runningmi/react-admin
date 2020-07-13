import React, { Component } from "react";
import Linkbutton from "../../components/link-button";
import {formateDate} from "../../utils/dateUtils"

import AddUser from "./add-user";
import UpdateUser from "./update-user";
import { reqGetusers,reqDeleteUser,reqRoles } from "../../api";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Card, Button, Table, Modal, message } from "antd";

const { confirm } = Modal;
export default class User extends Component {
  state = {
    users: [],
    visible: 0,
      roles:[ ]
  };
  showAdd = () => {
    //显示添加用户
    this.setState({
      visible: 1,
    });
  };
  showUpdate=(user)=>{
    this.setState({
      visible: 2,//更新用户
    });
    this._id = user._id
      console.log(user)
  }

   getRoles = async () => {
    const result = await reqRoles();
    console.log('获取角色')
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
      console.log('获取角色成功')
    }
  };
  showDelete = (userId) => {
    confirm({
      title: "真的要删除吗?",
      icon: <ExclamationCircleOutlined />,
      content: "点击确定删除",
      onOk: async () => {
        const result = await reqDeleteUser(userId)
        if(result.status===0){
          this.getUsers()
          message.info("删除成功");
        }
      },
      onCancel() {
        console.log("取消");
      },
    });
  };

  handleCancel = () => {
    this.setState({
      visible: 0,
    });
  };
  UNSAFE_componentWillMount() {
    //初始化列的数组
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render:formateDate

      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        
        // render:(role_id)=>this.state.roles.find((role)=>role._id===role_id)
      }
        
      ,
      {
        title: "操作",
        render: (user) => (
          <span>
            <Linkbutton onClick={()=>{this.showUpdate(user)}}>修改</Linkbutton>&nbsp;&nbsp;
            <Linkbutton onClick={()=>{this.showDelete(user._id)}}>删除</Linkbutton>
          </span>
        ),
      },
    ];
  }

  getUsers = async () => {
    const result = await reqGetusers();
    if (result.status === 0) {
      const { users } = result.data;
      this.setState({ users });
      console.log("获取用户成功",users);
    
    }
  };

  componentDidMount() {
    this.getUsers();
    this.getRoles();
  }
  render() {
    const { users, visible,roles } = this.state;
    const title = (
      <Button onClick={this.showAdd} type="primary">
        添加用户
      </Button>
    );
    return (
      <Card title={title}>
        <Table
          footer={null}
          dataSource={users}
          bordered
          rowKey="_id"
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        ></Table>
        <Modal
          title="创建用户"
          visible={visible === 1}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddUser  getUsers={this.getUsers} roles={roles} handleCancel={this.handleCancel}></AddUser>
        </Modal>

        <Modal
          title="更新用户"
          visible={visible === 2}
          onCancel={this.handleCancel}
          footer={null}
        >
         <UpdateUser _id={this._id} getUsers={this.getUsers} roles={roles} handleCancel={this.handleCancel}></UpdateUser>
        </Modal>
      </Card>
    );
  }
}
