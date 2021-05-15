import React, { Component } from 'react';
import './cssContent.css';
// import { Link } from "react-router-dom";
import AllProduct from '../Product/AllProduct';
import AllUser from '../User/AllUser';
import Header from '../Header/Header';
class RightContent extends Component {
    render() {
        return (
            <div id="content">
                <Header />              
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#user" title="User">Users </a></li>
                    <li><a data-toggle="tab" href="#employee" title="Employee">Employee</a></li>
                    <li><a data-toggle="tab" href="#drinks" title="Drinks"> Drink Table </a></li>
                    <li><a data-toggle="tab" href="#notification" title="Notification">Notification</a></li>
                </ul>
                <div className="tab-content">
                    <div id="user" className="tab-pane fade in active">
                        <AllUser></AllUser>
                    </div>
                    <div id="employee" className="tab-pane fade">                 
                    </div>
                    <div id="drinks" className="tab-pane fade">
                        <AllProduct></AllProduct>    
                    </div>
                    <div id="notification" className="tab-pane fade">
                        <h3>Menu 3</h3>
                        <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div>
                </div>             
            </div>
        );
    }

}


export default RightContent;