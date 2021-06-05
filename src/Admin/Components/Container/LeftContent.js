import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LeftContent extends Component {

    render() {
        return (
            <div>
                <div className="logo"><a className="simple-text logo-normal">
                    ADMIN COFFE SHOP
                            </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item  ">
                            <a className="nav-link" >
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </a>
                        </li>
                        <li className="nav-item ">
                            {/* <Link to="adminProfile"> */}
                                <a className="nav-link" href='adminProfile' >
                                    <i className="material-icons">person</i>
                                    <p>Admin Profile</p>
                                </a>
                            {/* </Link> */}
                        </li>
                        <li className="nav-item active ">
                            {/* <Link to="content"> */}
                                <a className="nav-link" href='content'>
                                    <i className="material-icons">content_paste</i>
                                    <p>Table List</p>
                                </a>
                            {/* </Link> */}

                        </li>

                    </ul>
                </div>
            </div>
        );
    }
}

export default LeftContent;

