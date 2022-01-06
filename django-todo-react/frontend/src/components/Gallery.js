import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";

// Gallery for the restaurants pages
export default class Gallery extends Component {
    render(){
        return(
            <div className="gallery-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="heading-title text-center">
                                    <h2 style={{"font-size": "40px","color": "#1799d8"}}>Gallery</h2>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="tz-gallery">
                            <div className="row" style={{"justifyContent":"center"}}>
                                {this.props.Images.map((element) => {      
                                    return (<div className="col-sm-12 col-md-4 col-lg-4">
                                    <Link className="lightbox" onClick={()=> window.open(element)} to={element} target="_blank" rel="noopener noreferrer" >
                                        <img className="img-fluid" src={element} alt="Gallery Images"/>
                                    </Link>
                                </div>) 
                                })}    
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
