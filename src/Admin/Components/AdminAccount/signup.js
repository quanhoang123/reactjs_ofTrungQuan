import React, { Component } from 'react';
import { Link } from "react-router-dom";
class SignUp extends Component {
    render() {
        return (
            <div className="divlogin">
                <div className="login">
                    <img src="https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg" className="imgLogin"/>
                    <h2>Login</h2>
                    <form>
                        <div className="group"><input type="text" placeholder="Username" name="username" /><i className="fa fa-user icoin" /></div>
                        <div className="group"><input type="password" placeholder="Password"  name="password" /><i className="fa fa-lock icoin" /></div>
                        <button className="btnbutton"> Sign Up</button>
                    </form>
           
                    <p className="fs">Forgot <a href="#">Username</a> / <a href="#">Password</a> ? </p>
                    <p className="ss">Do have an account? <Link to="login">Sign In</Link></p>
                </div>
            </div>

            // <div>
                
            //     <div className="modal fade" id="signupModal" tabindex="{-1}" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            //         <div className="modal-dialog modal-dialog-centered" role="document">
            //             <div className="modal-content">
            //                 <div className="modal-header border-bottom-0">
            //                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                         <span aria-hidden="true">×</span>
            //                     </button>
            //                 </div>
            //                 <div className="modal-body">
            //                     <div className="form-title text-center">
            //                         <h4>Sign Up</h4>
            //                     </div>
            //                     <div className="d-flex flex-column text-center">
            //                         <form>
            //                             <div className="form-group">
            //                                 <input type="email" className="form-control" id="email1" placeholder="Your email address..." />
            //                             </div>
            //                             <div className="form-group">
            //                                 <input type="password" className="form-control" id="password1" placeholder="Your password..." />
            //                             </div>
            //                             <button type="button" className="btn btn-info btn-block btn-round">Sign Up</button>
            //                         </form>
            //                         <div className="text-center text-muted delimiter">or use a social network</div>
                                   
            //                     </div>
            //                 </div>
            //                 <div className="modal-footer d-flex justify-content-center">
            //                     <div className="signup-section">Not a member yet? <a href="#a" className="text-info" data-toggle="modal" data-target="#loginModal"> 
            //                     <Link to="login">Log In</Link></a>.</div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>

            // </div>
        );
    }
}

export default SignUp;