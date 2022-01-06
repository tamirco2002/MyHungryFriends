import React, { Component} from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate} from "react-router-dom";
import {Rating} from 'react-simple-star-rating';

//Stars rating for the Rate component
export default class StarRate extends Component {
    constructor(props){
        super(props);
        this.state={
            rating:null,
        }
    }

   handleRating = (rate) => {
    this.setState({rating:rate});
    this.props.ratingFunc(rate/20);
  }
     render(){
        return (
            <span className="StarRate">
                <Rating onClick={this.handleRating} ratingValue={this.state.rating} size={50} transition/> 
            </span>
        )
    }
}