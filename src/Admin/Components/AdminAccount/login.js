import React, { Component } from 'react';
import './user.css';
import { Link } from "react-router-dom";

import axios from 'axios';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _admin: [],      
            user:"",
            password:"",
            status:false,
            check:false,
        }
        this.login=this.login.bind(this);
    }

    onChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ 
            [key]: value 
        });
    }
    getData=()=>{
        axios({
            method: "GET",
            url:'https://data-json-server.herokuapp.com/api/admin',
            data: null
        }).then(res => {
            this.setState({ _admin: res.data,
                // id:res.data.length,
            });       
            console.log(this.state._admin.length);
        }).catch(err => { });
       
    }
    componentDidMount(){
        this.getData();
    }
    login=()=>{
        var admin=this.state._admin;
        admin.filter(login=>{
            if(this.user===login.user && this.password===login.password){
                alert("Thanh cong");
                this.check=true;
                this.props.history('/');
            }
        });
        if(this.check==false){
            alert("That Bai");
        }
    }
   
     
        // console.log("hihi");
    render(){
        return ( 
            <div className="divlogin">
                <div className="login">
                    <img src="https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg" className="imgLogin"/>
                    <h2>Login</h2>
                    <from >
                        <div className="group"><input type="text" placeholder="Username" name="username" onChange={this.onChange}/><i className="fa fa-user icoin" /></div>
                        <div className="group"><input type="password" placeholder="Password"  name="password" onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <button className="btnbutton" type="button" onClick={()=>this.login}> Login</button>
                    </from>
                    
                    <p className="fs">Forgot <a href="#">Username</a> / <a href="#">Password</a> ? </p>
                    <p className="ss">Don't have an account? <Link to="signup">Sign Up</Link></p>
                </div>
            </div>      
        );
    }
}

export default Login;