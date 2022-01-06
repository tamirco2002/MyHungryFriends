import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";

// Contact bar at the bottom of every page
export default class Contact extends Component {
  
    render(){
        return(
            <>
            <footer className="footer-area bg-f">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <h3>About Us</h3>
                                <p>This project was created by 5 computer science students that had lots of fun learning js. We hope you enjoy it !</p>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h3>Subscribe</h3>
                                <div className="subscribe_form">
                                    <form className="subscribe_form">
                                        <input name="EMAIL" id="subs-email" className="form_input" placeholder="Email Address..." type="email" />
                                    </form>
                                </div>
                                <ul className="list-inline f-social">
                                    <li className="list-inline-item"><Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                    <li className="list-inline-item"><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                    <li className="list-inline-item"><Link to="#"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                    <li className="list-inline-item"><Link to="#"><i className="fa fa-google-plus" aria-hidden="true"></i></Link></li>
                                    <li className="list-inline-item"><Link to="#"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h3>Contact information</h3>
                                <p className="lead">Ramat Aviv Tel Aviv, 69978 Israel </p>
                                <p className="lead"><Link to="#">+972-3-640-8111</Link></p>
                                <p><Link to="#"> www.tau.ac.il</Link></p>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h3>Opening hours</h3>
                                <p><span className="text-color">Saturday: </span>Closed</p>
                                <p><span className="text-color">Sun-Fri :</span> 7:Am - 10PM</p>
                            </div>
                        </div>
                    </div>

                    
                </footer></>
        );
    }
}
