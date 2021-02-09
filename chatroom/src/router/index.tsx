import { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

import login from '../pages/login/login';
const chatRoom = asyncComponent(() => import("../pages/chatRoom/chatRoom"));
const selectRoom = asyncComponent(() => import("../pages/selectRoom/selectRoom"));

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component{
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path="/" exact component={login} />
          <Route path="/chatroom/:roomId" component={chatRoom} />
          <Route path='/selectroom' component={selectRoom} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    )
  }
}
