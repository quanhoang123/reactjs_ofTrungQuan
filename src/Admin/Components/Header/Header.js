import React from "react";
import { Link } from "react-router-dom";
import "./cssHeader.css";
const Header = () => {
  return (
    <div >
        <header id="header">    
          
            <div id="menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/allproduct">About </Link></li>
                    <li><Link to="/addproduct">Dashboard</Link>
                        <ul className="sub-menu">
                            <li>WordPress</li>
                            <li>SEO</li>
                            <li>Hosting</li>
                        </ul>
                    </li>
                    <li  style={{float: 'right'}}><Link to="/logout">Log out</Link></li>
                    <li  style={{float: 'right'}}><Link to="/login">Login</Link> </li>
                </ul>
            </div>
          
        </header>
        <div id="wrapper">
            <main>
                <div id="content">
                <div className="innertube">
                <div id="menu">
                <ul>
                    <li><Link to="/">Employees</Link></li>
                    <li><Link to="/allproduct">Drink Table </Link></li>
                    <li><Link to="/addproduct">Users</Link>
                        <ul className="sub-menu">
                            <li>WordPress</li>
                            <li>SEO</li>
                            <li>Hosting</li>
                        </ul>
                    </li>
                   
                </ul>
            </div>
                </div>
                </div>
            </main>
            <nav id="nav">
                <div className="innertube">
                    <h3>Interface</h3>
                    <div  id="menu">
                        <ul>
                            <li> ADsda
                                <ul className="sub-menu">
                                    <li>WordPress</li>
                                    <li>SEO</li>
                                    <li>Hosting</li>
                                </ul>
                            </li>                        
                        </ul>
                    </div>
                
                    <h3>Interface</h3>
                    <div  id="menu">
                        <ul>
                            <li> ADsda
                                <ul className="sub-menu">
                                        <li>WordPress</li>
                                        <li>SEO</li>
                                        <li>Hosting</li>
                                </ul>
                            </li>                        
                        </ul>
                    </div>
                    <h3>Interface</h3>
                    <div  id="menu">
                        <ul>
                            <li> ADsda
                                <ul className="sub-menu">
                                        <li>WordPress</li>
                                        <li>SEO</li>
                                        <li>Hosting</li>
                                </ul>
                            </li>                        
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        {/*          */}
    </div>
  );
};

export default Header;
