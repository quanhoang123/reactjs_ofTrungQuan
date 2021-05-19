import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            _admin:[],
            username:"",
            password:"",
            confirmpassword:"",
            img:"",
            check:true
        }
        this.previewImage=this.previewImage.bind(this);
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
            url: 'http://localhost:8080/api/admin',
            data: null
        }).then(res => {
            this.setState({ 
                _admin: res.data,     
                id:res.data.length,
            });
            // console.log(this.state.drinks.length);
        }).catch(err => { });
          
    }
    postAccount = (event) => {
        
        console.log("hihihi");
        event.preventDefault();
        var { username,password,confirmpassword,img} = this.state;
        // var exist = this._admin.find(u => u.username === user)
        // if (exist) {
        //     alert('Tên tài khoản đã tồn tại!');
        //     return;
        // }
        var checkPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
        const checkCharacter = /^[a-z]/;
        // var exist = this.state._admin.find(u => u.username === username)
        if (username & password & confirmpassword & img) {
            alert("Vui long nhap du thong tin")
            
            return;

        } else {

            if (!(checkCharacter.test(username))) {
                alert("Tên đăng nhập không hợp lệ.")
                console.log(username + username + password);
                return false;

            }
            if (!checkPass.test(password)) {
                alert('Vui lòng nhập mật khẩu từ 6-10 kí tự và có ít 1 nhất số, chữ thường và chữ hoa.')
                return false;
                //console.log(email + username + password + cpassword);
            }
            var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!checkEmail.test(username)) {
                alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
                // email.focus;
                return false;

            }
            if (confirmpassword !== password) {
                alert("mat khau xac nhan chua dung");
                return;
            }
            // if (exist) {
            //     alert('Tên tài khoản đã tồn tại!');
            //     return;
            // }
           
        }
        
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/admin',
            data: {
                username:username,
                password: password,
                confirmpassword:confirmpassword,
                avatar: img,              
            }
        }).then(res => {
            
            this.getData();
            alert("Add account successly");
            window.location.pathname='/login';
            alert('Mời bạn đăng nhập vào');
        }).catch(err => {
            alert(err);
        });
    }
    previewImage(){
        // const preview=document.getElementById('imageDrink');     
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
                        <div className="group"><input type="password" placeholder="Confirmpassword" required  name="confirmpassword" value={this.state.confirmpassword} onChange={this.onChange} /><i className="fa fa-lock icoin" /></div>
                        <div className="group"> <input type="file" name="avatar" id="avatarAdmin" value={this.state.avatar} onChange={this.previewImage}/> </div>
                        <button className="btnbutton"> Sign Up</button>
                    </form>
           
                    <p className="fs">Forgot <a href="#">Username</a> / <a href="#">Password</a> ? </p>
                    <p className="ss">Do have an account? <Link to="login">Sign In</Link></p>
                </div>
            </div>
        );
    }
}

export default SignUp;