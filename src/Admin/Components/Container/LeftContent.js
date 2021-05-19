import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeftContent extends Component {
    _admin=[];
    _avatar=[];
   
    getUser=()=>{      
        this._admin=JSON.parse(localStorage.getItem("Listadmin"));
        console.log(this._admin)
        return this._admin[2].username;
    }
    getAvatar=()=>{     
        this._avatar=JSON.parse(localStorage.getItem("Listadmin"));
        return this._avatar[2].avatar.toString();
    }
    componentDidMount(){
        this.getUser(); 
        this.getAvatar();
    }
    render() {
        return (
            <div className="innertube">
                <h3 className="">ADMIN</h3>
                <div>
                    <ul>
                        <li className="dropdown">
                            <a  className="dropdown-toggle" data-toggle="dropdown" ><span className="glyphicon glyphicon-user" />Account</a>
                            <ul className="dropdown-menu" role="menu">          
                                <li id="account">
                                    <a href="#" id="userAccount" href="#" className="dropdown-toggle" data-toggle="dropdown"></a>
                                    {/* <Link to="/login" ><span className="glyphicon glyphicon-user" /> Login</Link> */}
                                    <img src={this.getAvatar()}  width="400px" className="col-sm-12 text-center"/>
                                    <a id="account" className="dropdown-toggle" data-toggle="dropdown" ><span className="glyphicon glyphicon-user"/> {this.getUser()}</a>
                                    <a href="#" className="dropdown-item" ><span className="glyphicon glyphicon-off" /> Log out</a>
                                </li>
                            </ul>
                        </li>                        
                    </ul>
                </div>                          
            </div>
        );
    }
}

export default LeftContent;

