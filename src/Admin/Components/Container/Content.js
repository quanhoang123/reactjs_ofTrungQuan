import React, { Component } from 'react';
import LeftContent from './LeftContent';
import User from '../User/AllUser';
import AllProduct from '../Product/AllProduct';
import Comment from '../Notification/Comment';
import Employee from '../Employee/Employee';
import Order from '../Order/Order';
import callAPI from '../CallAPI/callApi';
import axios from 'axios';
import Deliver from '../Order/Deliver';


class Content extends Component {
    _admin=[];
    _avatar=[];
   
    constructor(props){
        super(props);
        this.state={
            _ourShop:[],
            comments:[],
            content:'',
            userCustomer:''
           
        }
    }
    _getComments=()=> {  
        axios({
            method: 'GET',
            url: 'https://data-json-server.herokuapp.com/api/comments',
            data: null
        }).then(res => {
            this.setState({ 
                comments: res.data,            
            });          
        }).catch(err => { });
          
    }
    _getCommentsTitle(commentCount) {   
        if (commentCount === 0) {
          return '0';
        } else if (commentCount === 1) {
          return "1";
        } else {
          return `${commentCount}`;
        }
      }
    
    getOurShop = () => {
        callAPI('coffeeShop','GET',null).then(res=>{
            this.setState({ 
                _ourShop: res.data,
            });
        }).catch(err => { });
       
    }
    getUser=()=>{                
        this._admin=JSON.parse(localStorage.getItem("AdminActive"));     
        return this._admin;
    }
    getAvatar=()=>{     
        this._avatar=JSON.parse(localStorage.getItem("Listadmin"));
        return this._avatar[3].avatar.toString();
    }
    componentDidMount(){
        this.getUser(); 
        this.getAvatar();
        this.getOurShop();
        this._getComments();
    }
    logOut(){
        // localStorage.removeItem('Listadmin');
        localStorage.removeItem('AdminActive');
        window.location.pathname='/login';
    }
    render() {
        if( localStorage.getItem("AdminActive")!=null){
            const comments = this.state.comments;
            
        return (
            <div>   

                <div className="wrapper ">          
                    <div className="sidebar" data-color="purple" data-background-color="white" >
                        <LeftContent></LeftContent>
                    </div>
                    <div className="main-panel">
                            {/* Navbar */}
                            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                                <div className="container-fluid">
                                <div className="navbar-wrapper">
                                    <a className="navbar-brand" >
                                    {
                                        this.state._ourShop.map(shop => (
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tr className=" text-primary">                                                                                                                                     
                                                        <td>{shop.address}</td>
                                                        <td>{shop.numberphone}</td>
                                                        <td>{shop.money}</td>                                                               
                                                    </tr>                                                                                                                                                                                                                  
                                                </table>
                                            </div>
                                        ))
                                    }</a>
                                </div>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="navbar-toggler-icon icon-bar" />
                                    <span className="navbar-toggler-icon icon-bar" />
                                    <span className="navbar-toggler-icon icon-bar" />
                                </button>
                                <div className="collapse navbar-collapse justify-content-end">
                                    <form className="navbar-form">
                                    <div className="input-group no-border">
                                        <input type="text" className="form-control" placeholder="Search..."  />
                                        <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                        <i className="material-icons">search</i>
                                        <div className="ripple-container" />
                                        </button>
                                    </div>
                                    </form>
                                    <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" >
                                        <i className="material-icons">dashboard</i>
                                        <p className="d-lg-none d-md-block">
                                            Stats
                                        </p>
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">notifications</i>
                                        <span className="notification">{this._getCommentsTitle(comments.length)}</span>
                                        <p className="d-lg-none d-md-block">
                                            Some Action
                                        </p>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="navbarDropdownMenuLink">
                                            User Comment
                                            {
                                                this.state.comments.map(comment=>(                                         
                                                    comment.user.map(us=>{                                  
                                                        return <a className="dropdown-item "  >{us.name}</a>
                                                    })
                                                
                                                ))
                                            }                                                                           
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link"  id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">person</i>
                                        <p className="d-lg-none d-md-block">
                                            Account
                                        </p>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                                        <img src={this.getAvatar()}  width="400px" className="col-sm-12 text-center dropdown-item"/>
                                        <a className="dropdown-item" >{this.getUser()}</a>
                                        <a className="dropdown-item" >Settings</a>
                                        <div className="dropdown-divider" />
                                        <a onClick={()=>this.logOut()} className="dropdown-item" >Log out</a>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                                </div>
                            </nav>
                            {/* End Navbar */}
                        <div className="content">
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                <div className="warpper">
                                    <input className="radio" id="one" name="group" type="radio" defaultChecked />
                                    <input className="radio" id="two" name="group" type="radio" />
                                    <input className="radio" id="three" name="group" type="radio" />
                                    <input className="radio" id="four" name="group" type="radio" />
                                    <input className="radio" id="five" name="group" type="radio" />
                                    <input className="radio" id="six" name="group" type="radio" />
                                    <div className="tabs">
                                        <label className="tab" id="one-tab" htmlFor="one">User</label>
                                        <label className="tab" id="two-tab" htmlFor="two">Products</label>
                                        <label className="tab" id="three-tab" htmlFor="three">Employee</label>
                                        <label className="tab" id="four-tab" htmlFor="four">Comment</label>
                                        <label className="tab" id="five-tab" htmlFor="five">Order</label>
                                        <label className="tab" id="six-tab" htmlFor="six">Deliver</label>
                                    </div>
                                    <div className="panels">
                                        <div className="panel" id="one-panel">
                                            <div className="panel-title">Table User</div>                                        
                                            <div className="card">                                    
                                            <User></User>
                                            </div>
                                        </div>
                                        <div className="panel" id="two-panel">
                                            <div className="panel-title">Table Product</div>
                                            <div className="card">                                       
                                                <AllProduct></AllProduct>
                                            </div>
                                        </div>
                                        {/* tabpenel 3 */}                                   
                                        <div className="panel" id="three-panel">
                                            <div className="panel-title">Table Employee</div>
                                            <div className="card">
                                                <Employee></Employee>                                               
                                            </div>
                                        </div>
                                        {/* tab Comment */}
                                        <div className="panel" id="four-panel">
                                            <div className="panel-title">Table Comment</div>
                                            <div className="card">
                                                <Comment></Comment>                                         
                                            </div>
                                        </div>
                                        <div className="panel" id="five-panel">
                                            <div className="panel-title">Table Order</div>
                                            <div className="card">
                                                <Order></Order>                                         
                                            </div>
                                        </div>
                                        <div className="panel" id="six-panel">
                                            <div className="panel-title">Table Delivering</div>
                                            <div className="card">
                                                <Deliver></Deliver>                                         
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-12">
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        <footer className="footer">
                        <div className="container-fluid">
                        <nav className="float-left">
                            <ul>
                            <li>
                                <a >
                               Trung Quan
                                </a>
                            </li>
                            <li>
                                <a >
                                About Us
                                </a>
                            </li>
                            <li>
                                <a >
                                Blog
                                </a>
                            </li>
                            <li>
                                <a >
                                Licenses
                                </a>
                            </li>
                            </ul>
                        </nav>
                        
                        </div>
                    </footer>
                    </div>
                </div>             
            </div>
        );       
    }
    //end
    }
}

export default Content; 


