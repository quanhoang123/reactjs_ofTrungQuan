import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import emailjs from 'emailjs-com';

import callAPI from '../CallAPI/callApi';
// npm i emailjs-com --save
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            _admin:[],
           checkmail:false,
            username:"",
            password:"",
            confirmpassword:"",
            img:"",
            check:true
        }
        this.previewImage=this.previewImage.bind(this);
        this.sendEmail=this.sendEmail.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }
    onChange=(event)=>{
        let key = event.target.name;
        let value = event.target.value;
        this.setState({ [key]: value });
    }
    clear = () => {  
        this.setState({ username: "" })
        this.setState({ password: "" })
        this.setState({ confirmpassword: "" })
        this.setState({ img: "" })
    }
    getData = () => {
        axios({
            method: 'GET',
            url: 'https://data-json-server.herokuapp.com/api/admin',
            data: null
        }).then(res => {
            this.setState({ 
                _admin: res.data,     
                id:res.data.length,
            });
            // console.log(this.state.drinks.length);
        }).catch(err => { });
          
    }
    sendEmail(e) {
        e.preventDefault();   
        emailjs.sendForm('service_bi9bt5f', 'template_kohh149', e.target, 'user_7l56tBxkScGrQk6pbBiXH')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
   
    

    postAccount = (e) => {      
        e.preventDefault();
        var { username,password,confirmpassword,img,checkmail} = this.state;
        var check=this.state._admin.find(
            (row)=>{row.username===username}
        ); 
        if (username & password & confirmpassword & img) {
            alert("Vui long nhap du thong tin")           
            return;
        } 
        if(check){
            alert('Tên tài khoản đã tồn tại!');
            return;
        }
        // var x = parseInt(this.getRandomArbitrary(100000, 999999));
        // var num = prompt("Mã xác nhận đăng ký của bạn đã được gửi qua email. Vui lòng nhập mã xác nhận: ", "******");
       else
        {
            var data1={
                username:username,
                password: password,
                confirmpassword:confirmpassword,
                avatar: img, 
            }
            callAPI('admin', 'POST', data1).then(response => {
                this.getData();
                alert("Add account successly");
                window.location.pathname='/login';           
                alert('Mời bạn đăng nhập vào');
                checkmail=true;
            }).catch(err => {
                alert(err);
            });       
        }
        if(this.state.checkmail=true){
            this.sendEmail();
        }
    }
   
    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let imga = event.target.files[0];
            this.setState({
                img: URL.createObjectURL(imga)
            });
        } else {
            alert("Không được")
        }
    };
    previewImage(){
         
        const file=document.getElementById('avatarAdmin').files[0];
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            ()=>{
                // preview.src=reader.result;
                this.setState({
                    img:reader.result
                   });
                console.log(reader.result); 
            },
            false
        )
        if(file){
            reader.readAsDataURL(file);
        }
    }
    
    render() {
 
        return (
            <div className="divlogin">
                <div className="login">
                    <img src="https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg" className="imgLogin"/>
                    <h2>Register</h2>
                    <form onSubmit={this.postAccount}>
                        <div className="group"><input type="text" placeholder="Username" required name="username" value={this.state.username} onChange={this.onChange} /><i className="fa fa-user icoin" /></div>
                        <div className="group"><input type="password" placeholder="Password" required  name="password" value={this.state.password} onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <div className="group"><input type="password" placeholder="Confirmpassword"   name="confirmpassword" value={this.state.confirmpassword} onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <div className="group"> <input type="file" name="avatar" value={this.state.avatar} onChange={this.onImageChange}/> </div>
                        <button className="btnbutton"> Sign Up</button>
                    </form>
           
                    <p className="fs">Forgot <a >Username</a> / <a >Password</a> ? </p>
                    <p className="ss">Do have an account? <Link to="login">Sign In</Link></p>
                </div>
            </div>
        );
    }
}

export default SignUp;