import React, { Component } from "react";
import OrderListSmall from "./OrderListSmall";

const images = require.context('../../../backend/db_images/users', true);
const dishes = require.context('../../../backend/db_images/dishes', true);

// A single Friend's image and info - placed at the friends page
export default class FriendImages extends Component {

    constructor(props){
        super(props);
        if (this.props.id in this.props.stars) {
            this.state = {color: "#ffe135", rating: {}, names: [], clicked:false};
        }
        else {
            this.state = {color: "#F0F0F0", rating: {}, names: [],clicked:false};
        }
    }

    componentDidMount(){
        this.renderFriendsRating();
    }


    renderFriendsRating = () =>{
        if (this.props.reviews.length > 0) {
            var rating = [];
            var i = 0;
            for (var [key, review] of Object.entries(this.props.reviews)) {
                rating.push([review[2], review[3], review[4]]);
            }
            var names = [this.props.id, [this.props.name, this.props.username]];
            this.setState({names:names, rating: rating});

        }
    }

    
    toggleStar = () => {
        if (!(this.props.id in this.props.stars)) {
            var newColor = "#ffe135";
        }
        else {
            var newColor = "#F0F0F0";
        }
        this.setState({color:newColor});
        this.props.starsClick(newColor, this.props.id);
    }


    loadImage = (username) => (images(`./${username+".png"}`).default);
    loadDish = (meal) => (dishes(`./${meal+".jpg"}`).default);

    render(){
        if (this.props.reviews != undefined && this.props.reviews != [] &&
            this.props.username != undefined && this.props.name != undefined
            && this.props.id != undefined && this.state.rating != undefined) {

                return(
                    <div style={{    "flex": "0 0 33%","max-width": "33%", "margin-bottom": "10%"}} onClick={() => this.setState({clicked:!this.state.clicked})}>
                        <li className="ImageHover">
                            <img className="company-header-avatar" src={this.loadImage(this.props.username)} alt="Image" />
                            <div>
                                <h4 className="ImageText">{this.props.name}</h4>
                                <div className="favorite-star-character" style={{color: this.state.color}} onClick={() => this.toggleStar()}>★</div>
                            </div>
                            <div className="FriendReview">
                                {this.props.reviews.map((review, index) => (
                                    <div key={index} style={{color: '#fff'}} className="FriendsPageReview">
                                        {<div>
                                            <OrderListSmall friendsRating={this.state.rating[index]} names={this.state.names}/>
                                        </div>}
                                        <div className="FriendsPageRating">
                                            <h5>Meal at {review[0]}</h5>
                                            <h6>{this.props.name.split(" ")[0]}'s opinion: {review[5]}</h6>
                                            <div className="FriendsPageMeal">
                                                <div className="FriendsPageRatingMeal">
                                                    <img className="company-header-avatar-meal" src={this.loadDish(review[6])} alt="Image"/>
                                                </div>
                                                <div className="FriendsPageMealName">
                                                    <h6>{review[1]}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </li>
                    </div>
            );
            }

        else{
            return(<span></span>);
        }
    }
}