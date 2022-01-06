import React, { Component } from 'react';
import OrderTabSmall from './OrderTabSmall';
import "../css/custom.css"

const images = require.context('../../../backend/db_images/users', true);
const icons = require.context('../../../backend/db_images', true);

//A small ratings list for the friends page
export default class OrderListSmall extends Component {

    loadImage = (username) => (images(`./${username+".png"}`).default);
    loadIcons = (icon) => (icons(`./${icon+".png"}`).default);
    renderTabs = () =>{
      if(this.props.names.length>0 && this.props.friendsRating.length>0){
          return(<OrderTabSmall name={this.props.names[1][0]} image={this.loadImage(this.props.names[1][1])} foodRating={this.props.friendsRating[0]}
               serviceRating={this.props.friendsRating[1]}  deliveryRating={this.props.friendsRating[2]} />);
              }
      return;
  }

    render() {
        return (

            <article class="leaderboard" style={{"maxWidth": "200px"}}>

            <header style={{"height": "85px"}}>

              <h1 className="leaderboard__title"><span className="leaderboard__title--bottom" style={{"margin-right": "30px", "margin-bottom": "10px"}}>Ratings</span></h1>
              <img src={this.loadIcons("food")} style={{"width":"20%","height":"50%","left":"15%","position":"sticky","zIndex":"2","top":"100px"}}/>
              <img src={this.loadIcons("service")} style={{"width":"20%","height":"42%","left":"48%","position":"sticky","zIndex":"2","top":"100px"}}/>
              <img src={this.loadIcons("delivery")} style={{"width":"20%","height":"47%","left":"75%","position":"sticky","zIndex":"2","top":"100%"}}/>
            </header>

            <div class="leaderboard__profiles">

                {this.renderTabs()}
            </div>
          </article>
        );
    }
}




