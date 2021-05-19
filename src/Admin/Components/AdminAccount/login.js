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
        // this.loginAdmin=this.loginAdmin.bind(this);
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
            url:'http://localhost:8080/api/admin',
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
    loginAdmin=()=>{
        console.log("Cam on ban da dang nhap");
        var { user,password,check} = this.state;
        const admin=this.state._admin;
        // const check=false;
        
        admin.filter(login=>{
            if(login.user===user || login.password===password){
                alert("Login thanh cong");
                window.location.pathname='/content';
                localStorage.setItem("Listadmin", JSON.stringify(admin));       
                check=true;
                
            }
            // localStorage.setItem('loggedInUsers', JSON.stringify(admin))
        });
        if(check==false){
            alert("User or password is incorrect");
        }
    }
    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    };
   
    render(){
        return ( 
            <div className="divlogin">
                <div className="login">
                    <img src="https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg" className="imgLogin"/>
                    <h2>Login</h2>
                    <from >
                        <div className="group"><input type="text" placeholder="Username" required name="username" onChange={this.onChange}/><i className="fa fa-user icoin" /></div>
                        <div className="group"><input type="password" placeholder="Password" required  name="password" onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <button className="btnbutton" type="button" onClick={this.loginAdmin}> Login</button>
                    </from>
                    
                    <p className="fs">Forgot <a href="#">Username</a> / <a href="#">Password</a> ? </p>
                    <p className="ss">Don't have an account? <Link to="signup">Sign Up</Link></p>
                </div>
            </div>      
        );
    }
}

export default Login;