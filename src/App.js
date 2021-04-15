import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/login/login';
import BlogIndex from './pages/blogIndex/blogIndex'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={BlogIndex}></Route>
         
        </Switch>
      </BrowserRouter>
    )
  }
}