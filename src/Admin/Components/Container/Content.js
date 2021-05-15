import React, { Component } from 'react';
import './cssContent.css';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
// import Header from '../Header/Header';

class Content extends Component {
    render() {
        return (
            <div>                      
                <div id="wrapper ">
                    <main>                    
                        <RightContent/>
                    </main>
                    <nav id="nav">
                        <LeftContent/>
                    </nav>
                </div>    
            </div>
        );
    }
}

export default Content; 


