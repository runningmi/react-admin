import React, { Component } from "react";
import { Card, Button, Table, message, Modal, Form, Select, Input } from "antd";
import LinkButton from "../../components/link-button";
import { reqCategorys, reqAddCategory, reqUpdateCategory } from "../../api";

const Option = Select.Option;
const Item = Form.Item;

export default class Category extends Component {
  state = {
    categorys: [],
    isLoading: true,
    subCategorys: [],
    parentId: "0", //当前显示的父分类id
    parentName: "", //当前显示的父分类名称
    visible: 0, //确认框是否显示,1添加,2更新,0都不显示
    confirmLoading: false, //提交表单的等待
  };

  addCategory = async (values) => {
    this.setState({
      confirmLoading: true,
    });

    const result = await reqAddCategory(values.categoryName, values.parentId);
    if (result.status === 0) {
      this.setState({
        visible: 0,
        confirmLoading: false,
      });
      message.success("添加成功");
      this.getCategorys();
    }
  };
  updateCategory = async (values) => {
    this.setState({
      confirmLoading: true,
    });

    const result = await reqUpdateCategory(
      values.categoryName,
      this.categoryID
    );
    if (result.status === 0) {
      this.setState({
        visible: 0,
        confirmLoading: false,
      });
      message.success("修改成功");
      this.getCategorys();
    }
  };
  showAdd = () => {
    //显示添加确认框
    this.setState({
      visible: 1,
    });
  };
  showUpdate = (category) => {
    //显示修改确认框
    this.setState({
      visible: 2,
    });
    this.categoryID = category._id;
    this.categoryValue = category.name;
  };

  handleCancel = () => {
    this.setState({
      visible: 0,
    });
  };
  showSubCa = (category) => {
    //异步更新 state
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        //异步完成之后再执行
        this.getCategorys();
      }
    );
  };
  showCategory = () => {
    this.setState({
      subCategorys: [],
      parentId: "0", //当前显示的父分类id
      parentName: "",
    });
  };
  getCategorys = async () => {
    const { parentId } = this.state;
    // 发ajax请求要数据,可以封装方法
    const result = await reqCategorys(parentId);
    this.setState({ isLoading: false });
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        this.setState({ categorys }); //更新一级分类列表
      } else {
        this.setState({ subCategorys: categorys }); //更新一级分类列表
      }
    } else {
      message.error("获取分类列表失败");
    }
  };

  componentDidMount() {
    this.getCategorys();
  }
  UNSAFE_componentWillMount() {
    //初始化列的数组
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        width: 300,
        render: (category) => (
          //指定需要返回的标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>
              修改分类
            </LinkButton>
            {this.state.parentId === "0" ? (
              <LinkButton onClick={() => this.showSubCa(category)}>
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
        key: "age",
      },
    ];
  }
  render() {
    const {
      categorys,
      subCategorys,
      parentId,
      parentName,
      confirmLoading,
    } = this.state;
    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
          <span> → </span>
          <span>{parentName}</span>
        </span>
      );

    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={<a href="#!">{extra}</a>}>
        <Table
          dataSource={parentId === "0" ? categorys : subCategorys}
          bordered
          rowKey="_id"
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          loading={this.state.isLoading}
        />

        <Modal
          title="添加分类"
          visible={this.state.visible === 1}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            initialValues={{ parentId }}
            onFinish={this.addCategory}
          >
            <Item
              label="所属分类"
              name="parentId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select style={{ width: "100%" }}>
                <Option value="0">一级分类</Option>
                {categorys.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              label="分类名称"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "请输入名称",
                },
              ]}
            >
              <Input placeholder="请输入分类名称"></Input>
            </Item>
            <Item>
              <Button
                style={{ float: "right" }}
                type="primary"
                htmlType="submit"
              >
                添加
              </Button>
            </Item>
          </Form>
        </Modal>

        <Modal
          title="修改分类"
          visible={this.state.visible === 2}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onFinish={this.updateCategory}>
            <Item
              label="分类名称"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "请输入名称",
                },
              ]}
            >
              <Input placeholder="请输入分类名称"></Input>
            </Item>
            <Item>
              <Button
                style={{ float: "right" }}
                type="primary"
                htmlType="submit"
              >
                修改
              </Button>
            </Item>
          </Form>
        </Modal>
      </Card>
    );
  }
}
