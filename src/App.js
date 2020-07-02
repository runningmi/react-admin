import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./pages/admin/admin.jsx"
import Login from "./pages/login/login.jsx"

export default class App extends React.Component {
  render() {
    return <BrowserRouter>
    {/* //只匹配其中一个 */}
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/" component={Admin}></Route>
    </Switch>
    </BrowserRouter>;
  }
}
