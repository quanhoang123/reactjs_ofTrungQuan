import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="ui fixed menu">
        <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/addproduct">Dashboard</Link>
                </li>
                <li style={{float: 'right'}}><Link to="/logout">Log out</Link></li>
                <li style={{float: 'right'}}><Link to="/login">Login</Link> </li>
        </ul>
            <hr />
            
    </div>
  );
};

export default Header;
