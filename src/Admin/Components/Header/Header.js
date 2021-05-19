import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./cssHeader.css";

// var temp=localStorage.getItem('Listadmin');

class Header extends Component { 
    _admin=[];
    _avatar=[];

    getUser=()=>{     
        this._admin=JSON.parse(localStorage.getItem("Listadmin"));
        console.log(this._admin[0].username)
        return this._admin[0].username;
    }
    // getAvatar=()=>{     
    //     this._avatar=JSON.parse(localStorage.getItem("Listadmin"));
    //     console.log(this._avatar[0].password)
    //     return this._avatar[0].avatar;
    // }
    componentDidMount(){
        this.getUser();
        // this.getAvatar();
    }
  
    render() {
      
        if( localStorage.getItem("Listadmin")!=null){
            return (   
                <div>             
                    <div className="head">                
                        <nav className="navbar navbar-expand-sm navbar-fixed-top " role="navigation">
                            <div className="container">
                                <div id="navbarCollapse" className="navbar-collapse collapse topNarbar" aria-expanded="false">
                                    <ul className="nav navbar-nav ">                       
                                        <li className="dropdown active">
                                            <a  className="dropdown-toggle" data-toggle="dropdown">Dashboard </a>  
                                            <ul className="dropdown-menu" role="menu">
                                                <a className="dropdown-toggle" data-toggle="dropdown"></a>
                                                <li>
                                                    <a  className="dropdown-toggle" data-toggle="dropdown"><Link to="usertable">User</Link></a>
                                                    <a  className="dropdown-item">Employee</a>
                                                </li>                          
                                            </ul>                         
                                        </li>   
                                        <li> <Link to=""><span className="glyphicon glyphicon-bell" /></Link></li> 
                                        <li><Link to=""><i class="glyphicon glyphicon-envelope-o"></i></Link></li>            
                                       
                                    </ul>
                                    <ul className="nav navbar-nav navbar-right col-sm-4">
    
                                    {/* <li className="dropdown">
                                        <a  className="dropdown-toggle" data-toggle="dropdown" ><span className="glyphicon glyphicon-user" />Account</a>
                                        <ul className="dropdown-menu" role="menu">          
                                            <li id="account">
                                                <a href="#" id="userAccount" href="#" className="dropdown-toggle" data-toggle="dropdown"></a>
                                                <Link to="/login" ><span className="glyphicon glyphicon-user" /> Login</Link>
                                                <a id="account" className="dropdown-toggle" data-toggle="dropdown" ><span className="glyphicon glyphicon-user"/> {this.getUser()}</a>
                                                <a href="#" className="dropdown-item" ><span className="glyphicon glyphicon-off" /> Log out</a>
                                            </li>
                                        </ul>
                                    </li>           */}
                                    </ul>
                                    {/* <form className="navbar-form navbar-right col-sm-4" action>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search" name="search" style={{width: '25vh'}} />
                                    </div>      
                                    </form> */}
                                </div>
                            </div>
                        </nav>
                    </div>         
                </div>
            );         
        }
        //end
        
    }
}
export default Header;