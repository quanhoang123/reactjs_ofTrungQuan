import React, { Component } from 'react';
import './user.css';
import { Link } from "react-router-dom";

import axios from 'axios';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _admin: [],   
            _checkAmin:[],
            user:"",
            password:"",
            status:false,
            check:false,
        }
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
            this.setState({ 
                _admin: res.data,
                id:res.data.length,
            });       
            console.log(this.state._admin);
        }).catch(err => { });
       
    }
    componentDidMount(){       
        axios({
            method: "GET",
            url:'https://data-json-server.herokuapp.com/api/admin',
            data: null
        }).then(res => {
            this.setState({ 
                _admin: res.data,
                id:res.data.length,
            });       
            console.log(this.state._admin);
        }).catch(err => { });
    }
    loginAdmin=()=>{
        console.log("Cam on ban da dang nhap");
        const a=document.getElementById('username').value;
        var { user,password,check} = this.state;
        const admin=this.state._admin;
 
        admin.filter(login=>{
            if(login.username===user || login.password===password){                        
                localStorage.setItem("Listadmin", JSON.stringify(admin));                          
                check=true;              
            }                     
        });
 
        if(check===true){
            for(let i in admin){
                if(admin[i].username===a){
                    this.state._checkAmin.push(admin[i].username);
                }
            }
            localStorage.setItem('AdminActive',JSON.stringify(this.state._checkAmin));
            window.location.pathname='/content';
            alert("Login thanh cong");

        }
        if(check===false){
            alert("Tài khoản hoặc mật khẩu không đúng");
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
                        <div className="group"><input type="text" placeholder="Username" required id= "username" name="username" onChange={this.onChange}/><i className="fa fa-user icoin" /></div>
                        <div className="group"><input type="password" placeholder="Password" required id="password"  name="password" onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <button className="btnbutton" type="button" onClick={this.loginAdmin}> Login</button>
                    </from>                  
                    <p className="fs">Forgot <a >Username</a> / <a >Password</a> ? </p>
                    <p className="ss">Don't have an account? <Link to="signup">Sign Up</Link></p>
                </div>
            </div>      
        );
    }
}

export default Login;