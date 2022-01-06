import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";

//A teammember's box for the team page
export default class TeamMember extends Component {
    render(){
        return(
            <div className="col-md-4 col-sm-6">
                <div className="our-team">
                    <div className="pic">
                        <img src={this.props.image}/>
                        <ul className="social">
                            <li><Link to="#" className="fa fa-facebook"></Link></li>
                            <li><Link to="#" className="fa fa-google-plus"></Link></li>
                            <li><Link to="#" className="fa fa-instagram"></Link></li>
                            <li><Link to="#" className="fa fa-linkedin"></Link></li>
                        </ul>
                    </div>
                    <div className="team-content">
                        <h3 className="title">{this.props.name}</h3>
                        <span className="post">{this.props.job}</span>
                    </div>
                </div>
            </div>
            
        );
    }
}