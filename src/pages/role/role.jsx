import React, { Component } from "react";
import { Card, Table, Form, Modal, Button, message, Tree } from "antd";
import { reqRoles, reqUpdateRoles } from "../../api";
import CreateForm from "./create-form";
import menuConfig from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import { formateDate } from "../../utils/dateUtils";
const Item = Form.Item;
export default class Role extends Component {
  state = {
    roles: [],
    role: {}, //选中的对象
    visible: 0,
    menus: [],
  };
  UNSAFE_componentWillMount() {
    //初始化列的数组
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formateDate,
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];

    this.treeData = this.getMenuList(menuConfig);
  }
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
      this.getRoles();
    }
  };
  showCreate = () => {
    this.setState({ visible: 1 });
  };
  showSet = () => {
    this.setState({ visible: 2 });
  };
  handleCancel = () => {
    this.setState({ visible: 0 });
  };

  componentDidMount() {
    this.getRoles();
  }
  createRole = async () => {
    const { role, menus } = this.state;
    const auth_time = Date.now();
    const auth_name = memoryUtils.user.username;
    const result = await reqUpdateRoles(role._id, menus, auth_time, auth_name);
    if (result.status === 0) {
      message.success(`更新成功`);
      this.handleCancel();
      this.getRoles();
    } else {
      message.success(`更新失败`);
    }
  };

  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    this.setState({ menus: checkedKeys }, () => {
      console.log(this.state.menus);
    });
  };

  getMenuList = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return { title: item.title, key: item.key };
      } else {
        return {
          title: item.title,
          key: item.key,
          children: item.children,
        };
      }
    });
  };
  render() {
    const { roles, role, visible } = this.state;
    const title = (
      <span>
        <Button
          type={"primary"}
          style={{ marginRight: 30 }}
          onClick={this.showCreate}
        >
          创建角色
        </Button>
        <Button
          type={"primary"}
          disabled={role._id ? false : true}
          onClick={this.showSet}
        >
          设置角色权限
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          footer={null}
          rowSelection={{
            fixed: true,
            type: "radio",
            onSelect: (role) => {
              this.setState({ role });
            },
            selectedRowKeys: [role._id],
          }}
          dataSource={roles}
          bordered
          rowKey="_id"
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
          onRow={
            //每一行
            (role) => {
              return {
                onClick: (event) => {
                  this.setState({ role }, () => {
                    console.log(role);
                  });
                },
              };
            }
          }
        ></Table>
        <Modal
          title="创建角色"
          visible={visible === 1}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateForm handleCancel={this.handleCancel}></CreateForm>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={visible === 2}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onFinish={this.createRole}>
            <Item label="角色名称">
              <span>{role.name}</span>
            </Item>
            <Item label="权限选择">
              <Tree
                defaultExpandAll={true}
                checkable
                defaultCheckedKeys={role.menus}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                treeData={this.treeData}
              />
            </Item>

            <Item>
              <Button
                style={{ float: "right" }}
                type="primary"
                htmlType="submit"
              >
                设置
              </Button>
            </Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
