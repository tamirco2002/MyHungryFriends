
import React, { Component } from "react";

// Quote box for the homepage
export default class QtBox extends Component {
    render(){
        return(
            <div className="qt-box qt-background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ml-auto mr-auto text-center">
                            <p className="lead ">
                                " Research show that more and more customers are moving to online shopping and are not planning to move back to the face-to-face shopping. "
                            </p>
                            <span className="lead">Dr. Slava Novgorodov</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
