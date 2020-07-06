import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import './product.css'

import Home from "./home";
import Detail from "./detail";
import AddUpdate from "./add-update";

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product/addupdate" component={AddUpdate}></Route>
        <Route path="/product/detail" component={Detail}></Route>
        <Route path="/product" exact component={Home}></Route>

        <Redirect to="/product"></Redirect>
      </Switch>
    );
  }
}
