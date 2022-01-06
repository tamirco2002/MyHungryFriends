
import React, { Component } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";

//About section for the home page and the restaurants pages
export default class AboutSec extends Component {
    render(){
        if(this.props.friendsRate!=undefined || this.props.overallRate!=undefined  ){
            return(
                
                <div className="about-section-box" style={{backgroundImage: `url(${this.props.bgImg})`}}>
                    
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 text-center" style={{"font-weight":"700"}}>
                                    <div className="inner-column" style={{"background-color":"rgb(252 248 248 / 50%)"}}>
                                        <h1>{this.props.title} <span>{this.props.spanTitle}</span></h1>
                                        <h4>{this.props.subTitle}</h4>
                                        <p>{this.props.firstPar}</p>
                                        <p>{this.props.secondPar}</p>
                                        <p>Your friends average rating: {this.props.friendsRate}/5</p>
                                        <p>Overall average rating: {this.props.overallRate}/5</p>
                                        
                                        <Link className="btn btn-lg btn-circle btn-outline-new-white" to={this.props.btnLink}>{this.props.btnText}</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <img src={this.props.image} alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                </div>
            );
        }
        else{
            return(
            
                <div className="about-section-box" style={{backgroundImage: `url(${this.props.bgImg})`}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 text-center" style={{"font-weight":"700"}}>
                                    <div className="inner-column" style={{"background-color":"rgb(252 248 248 / 50%)"}}>
                                        <h1>{this.props.title} <span>{this.props.spanTitle}</span></h1>
                                        <h4>{this.props.subTitle}</h4>
                                        <p>{this.props.firstPar}</p>
                                        <p>{this.props.secondPar}</p>
                                        <Link className="btn btn-lg btn-circle btn-outline-new-white" to={this.props.btnLink}>{this.props.btnText}</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <img src={this.props.image} alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                </div>
            );
        }
        
    }
}
