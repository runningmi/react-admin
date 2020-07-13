import React, { Component } from "react";
import { List, Typography, Card, Button } from "antd";

const Item = List.Item;

export default class Detail extends Component {
  state = {};
  render() {
    const { name, desc, price, detail } = this.props.location.state;
    const title = (
      <span>
        <Button
          type="primary"
          className="back"
          onClick={() => this.props.history.goBack()}
        >
          后退
        </Button>
        <span>商品详情</span>
      </span>
    );

    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <Typography.Text>[商品名称]</Typography.Text>
            {name}
          </Item>

          <Item>
            <Typography.Text>[商品描述]</Typography.Text>
            {desc}
          </Item>

          <Item>
            <Typography.Text>[商品价格]</Typography.Text>
            {price}
          </Item>

          <Item>
            <Typography.Text>[所属分类]</Typography.Text>
            {name}
          </Item>
          <Item>
            <Typography.Text>[商品详情]</Typography.Text>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
