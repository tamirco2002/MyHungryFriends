import React, { Component} from "react";
import StarRate from "./StarRate";
import axios from 'axios';

//Rating window - pops up after making an order
export default class Rate extends Component {
    constructor(props){
        super(props);
        this.state={
            text:"",
            userid:this.props.userid,
            restaurantid:this.props.restaurantid,
            foodRating:null,
            serviceRating:null,
            deliveryRating:null,
        }
    }


    postReview = ()=>{
    if(this.state.foodRating!=null && this.state.serviceRating!=null && this.state.deliveryRating!=null){
        axios
            .post("/api/orders/" ,{
                userid: this.state.userid,
                restaurantid:this.state.restaurantid,
                dishid: this.props.dishid,
                foodrating:this.state.foodRating,
                servicerating:this.state.serviceRating,
                deliveryrating:this.state.deliveryRating,
                messagereco:this.state.text,
              })
            .catch((err) => console.log(err));
        window.open("/","_self")
    }
    }


    foodRatingChanged = (rate) =>{
        this.setState({foodRating: rate}) 
    }
    serviceRatingChanged = (rate) =>{
        this.setState({serviceRating: rate}) 
    }
    deliveryRatingChanged = (rate) =>{
        this.setState({deliveryRating: rate}) 
    }
    

    textChange(event) {
        this.setState({text: event.target.value}) 
    }
    render(){
        return(
           
                <div className="rate-title">
                    
                    <h3>How would you rate your overall experience with the order from {this.props.restaurant}?</h3>
                    <table style={{"border": "1px solid black",
                                    "border-right": "1px solid black","width":"500px"}}> 
                    <tbody>
                    <tr style={{"border-bottom": "1px solid black",
                                    "border-right": "1px solid black", "backgroundColor":"rgb(32, 140, 241)"}}>
                    <td style={{"fontSize":"26px","margin-right":"40px"}}>Food Rating:  </td>
                    <td><StarRate ratingFunc={this.foodRatingChanged}/></td>
                    </tr>
                    <tr style={{"border-bottom": "1px solid black",
                                    "border-right": "1px solid black","backgroundColor":"#white"}}>
                    <td style={{"fontSize":"26px","margin-right":"40px"}}>Service Rating:  </td>
                    <td><StarRate ratingFunc={this.serviceRatingChanged}/></td>
                    </tr>
                    <tr style={{"border-bottom": "1px solid black",
                                    "border-right": "1px solid black","backgroundColor":"rgb(32, 140, 241)"}}>
                    <td style={{"fontSize":"26px","margin-right":"40px"}}>Delivery Rating:  </td>
                    <td><StarRate ratingFunc={this.deliveryRatingChanged}/></td>
                    </tr>
                    </tbody>
                    </table>
                    <br/><br/>
                    <h3>Tell your friends about your experience:</h3>
                    <textarea value={this.state.text}  className="reviewText" onChange={this.textChange.bind(this)}/>
                    <button className="order-btn" onClick={this.postReview}>Submit</button>
                </div>
                

        );
    }
}