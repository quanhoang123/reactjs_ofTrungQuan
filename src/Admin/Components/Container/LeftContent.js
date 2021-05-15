import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeftContent extends Component {
    render() {
        return (
            <div className="innertube">
                <h3>Interface</h3>
                <div  id="menu">
                    <ul>
                        <li className="dropdown active">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Dashboard </a>  
                            <ul className="dropdown-menu" role="menu">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#"></a>
                                <li>
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"><Link to="usertable">User</Link></a>
                                    <a href="#" className="dropdown-item"><Link to="allproduct">Employee</Link></a>
                                </li>                          
                            </ul>                         
                        </li>                        
                    </ul>
                </div>                          
            </div>
        );
    }
}

export default LeftContent;

