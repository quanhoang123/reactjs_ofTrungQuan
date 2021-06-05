import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "../router";
import AllProduct from '../Admin/Components/Product/AllProduct';
import Login from '../Admin/Components/AdminAccount/login';
import Content from "../Admin/Components/Container/Content";
import SignUp from "../Admin/Components/AdminAccount/signup";
import Comment from "../Admin/Components/Notification/Comment";
import AdminProfile from "../Admin/Components/Container/AdminProfile";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
                {this.showContentMenu(routes)} 
                <Route exact path="/">               
                </Route>  

                <Route path="/allproduct">
                <AllProduct />
                </Route>

                <Route path="/user">  

                </Route>
               

                <Route path="/login">    
                <Login />         
                </Route>
                

                <Route path="/signup">    
                <SignUp />          
                </Route>

                <Route path="/content"> 
                   <Content />       
                </Route>
                <Route path="/commnet"> 
                   <Comment />       
                </Route>
                <Route path="/adminProfile"> 
                   <AdminProfile />       
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


