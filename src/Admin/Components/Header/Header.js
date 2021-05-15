import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./cssHeader.css";

class Header extends Component { 
    render() {
        return (
            <div>
                
                <div className="head">
                    
                    <nav className="navbar navbar-expand-sm navbar-fixed-top " role="navigation">
                        <div className="container">
                            <div id="navbarCollapse" className="navbar-collapse collapse topNarbar" aria-expanded="false">
                                <ul className="nav navbar-nav ">                       
                                    <li className="dropdown active">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dashboard </a>  
                                        <ul className="dropdown-menu" role="menu">
                                            <a className="dropdown-toggle" data-toggle="dropdown"></a>
                                            <li>
                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><Link to="usertable">User</Link></a>
                                                <a href="#" className="dropdown-item">Employee</a>
                                            </li>                          
                                        </ul>                         
                                    </li>   
                                    <li> <Link to=""><span className="glyphicon glyphicon-bell" /></Link></li> 
                                    <li><Link to=""><i class="glyphicon glyphicon-envelope-o"></i></Link></li>            
                                   
                                </ul>
                                <ul className="nav navbar-nav navbar-right col-sm-4">
                                <li id="account" >
                                    <Link to="/login" ><span className="glyphicon glyphicon-user" /> Login</Link>
                                </li>
                                <li className="dropdown">
                                    <a id="userAccount" className="dropdown-toggle" data-toggle="dropdown"><Link to=""><span className="glyphicon glyphicon-user" />Account</Link></a>
                                    <ul className="dropdown-menu" role="menu">
                                        <a href="#" id="userAccount" href="#" className="dropdown-toggle" data-toggle="dropdown"></a>
                                        <li>
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">asdasd</a>
                                            <a href="#" className="dropdown-item" href="#">Log out</a>
                                        </li>
                                    </ul>
                                </li>          
                                </ul>
                                <form className="navbar-form navbar-right col-sm-4" action>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" name="search" style={{width: '25vh'}} />
                                </div>      
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
        
            </div>
        );
    }
}
export default Header;