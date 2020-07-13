import React, { Component } from "react";
import { Card, Form, Input, Cascader, Button } from "antd";
import { reqCategorys } from "../../api";
import PicturesWall from "./pictures-wall";

const Item = Form.Item;
const { TextArea } = Input;
// 默认子路由组件

export default class AddUpdate extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  handleSubmit = (value) => {
    const imgs = this.myRef.current.getImages();
    console.log(value, imgs);
  };
  state = {
    options: [],
  };

  onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions)
  };

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const categoryId = targetOption.value;
    const subCategory = await this.getCategorys(categoryId);
    targetOption.loading = false;
    if (subCategory && subCategory.length > 0) {
      const cOptions = subCategory.map((category) => ({
        value: category._id,
        label: category.name,
        isLeaf: true,
      }));
      targetOption.children = cOptions;
    } else {
      targetOption.isLeaf = true;
    }
    this.setState({
      options: [...this.state.options],
    });
  };

  getCategorys = async (parentId = "0") => {
    const result = await reqCategorys(parentId);
    if (result.status === 0) {
      // 如果是一级
      if (parentId === "0") {
        this.initoptions(result.data);
      } else {
        //二级
        return result.data;
      }
    }
  };
  initoptions = (categorys) => {
    const options = categorys.map((category) => ({
      value: category._id,
      label: category.name,
      isLeaf: false,
    }));
    this.setState({ options });
  };
  componentDidMount() {
    this.getCategorys();

    //根据返回的数组生成需要的数组
  }
  UNSAFE_componentWillMount() {
    const product = this.props.location.state;
    this.isUpdate = !!product; //转换成boolen
    this.product = product || {};
  }
  render() {
    const { isUpdate, product } = this;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          后退
        </Button>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    const categoryIds = [];
    if (isUpdate) {
      if (product.pCategoryId === "0") {
        categoryIds.push(product.categoryId);
      } else {
        categoryIds.push(product.pCategoryId);
        categoryIds.push(product.categoryId);
      }
    }
    return (
      <Card title={title}>
        <Form
          {...layout}
          initialValues={{
            name: product.name,
            desc: product.desc,
            price: product.price,
            categoryIds,
          }}
          onFinish={this.handleSubmit}
        >
          <Item
            name="name"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
            label="商品名称"
          >
            <Input placeholder="请输入商品名称"></Input>
          </Item>
          <Item
            name="desc"
            label="商品描述"
            rules={[
              {
                required: true,
                message: "请输入描述!",
              },
            ]}
          >
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            name="price"
            label="商品价格"
            rules={[
              {
                required: true,
                message: "请输入价格!",
              },

              {
                validator: async (rule, value) => {
                  if (value * 1 > 0) {
                    return await Promise.resolve(value);
                  }
                  return await Promise.reject("价格必须大于0");
                },
              },
            ]}
          >
            <Input
              type="number"
              placeholder="请输入商品价格"
              addonAfter="元"
            ></Input>
          </Item>
          <Item name="categoryIds" label="商品分类">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              onChange={this.onChange}
              changeOnSelect
            />
          </Item>

          <Item name="pics" label="商品图片">
            <PicturesWall ref={this.myRef} imgs={product.imgs}></PicturesWall>
          </Item>

          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}
