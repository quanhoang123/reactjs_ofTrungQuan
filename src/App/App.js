// import logo from '../logo.svg'; import './App.css'; 
import React, { Component } from "react";
import "./App.css";
// import axios from 'axios';
import Header from '../Admin/Components/Header/Header';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import routes from "../router";
import AllProduct from '../Admin/Components/Product/AllProduct';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
            <Header/>
            
          <hr />
          <Switch>
                <Route exact path="/">
                {this.showContentMenu(routes)}
                </Route>            
                <Route path="/allproduct">
                <AllProduct />
                </Route>
                <Route path="/editproduct">              
                </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  showContentMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
        );
      });
    }
    return result;
  };
}



export default App;


