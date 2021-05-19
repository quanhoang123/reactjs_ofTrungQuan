import React, { Component } from 'react';
import './cssContent.css';
import AllProduct from '../Product/AllProduct';
import AllUser from '../User/AllUser';
import Header from '../Header/Header';
import Employee from '../Employee/Employee';
import Comment from '../Notification/Comment';

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
                    <li><a data-toggle="tab" href="#orderstatistics" title="Notification">Management detail order</a></li>
                </ul>
                <div className="tab-content">
                   

                    <div id="user" className="tab-pane fade in active">
                        <AllUser></AllUser>
                    </div>
                    <div id="employee" className="tab-pane fade">   
                    <Employee></Employee>              
                    </div>
                    <div id="drinks" className="tab-pane fade">
                        <AllProduct></AllProduct>    
                    </div>
                    <div id="notification" className="tab-pane fade">
                        <Comment/>
                    </div>
                    <div id="orderstatistics" className="tab-pane fade">
                        {/* <Comment/> */}
                    </div>
                </div>             
            </div>
        );
    }

}


export default RightContent;