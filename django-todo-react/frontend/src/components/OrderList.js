import React, { Component } from 'react';
import OrderTab from './OrderTab';
import "../css/custom.css"

const images = require.context('../../../backend/db_images/users', true);
const icons = require.context('../../../backend/db_images', true);

//Latest Rating List placed at each restaurant's page
export default class OrderList extends Component {

    loadImage = (username) => (images(`./${username+".png"}`).default);
    loadIcons = (icon) => (icons(`./${icon+".png"}`).default);
    
    renderTabs = () =>{
      if(this.props.names.length>0){
          return(
            this.props.names.map((element) => {
              return (<OrderTab name={element[1][0]} image={this.loadImage(element[1][1])} foodRating={this.props.friendsRating[element[0]][0]}
               serviceRating={this.props.friendsRating[element[0]][1]}  deliveryRating={this.props.friendsRating[element[0]][2]} />)
              }));


      }
      return;
  }
    render() {
        return (
            
            <article class="leaderboard">
              
            <header>

              <h1 class="leaderboard__title"><span className="leaderboard__title--top">Friends</span><span className="leaderboard__title--bottom">Latest Ratings</span></h1>
              <img src={this.loadIcons("food")} style={{"width":"8%","height":"25%","left":"87%","position":"sticky","zIndex":"2","top":"100px"}}/>
              <img src={this.loadIcons("delivery")} style={{"width":"8%","height":"20%","left":"65%","position":"sticky","zIndex":"2","top":"100px"}}/>
              <img src={this.loadIcons("service")} style={{"width":"8%","height":"25%","left":"75%","position":"sticky","zIndex":"2","top":"100%"}}/>
            </header>
            
            <div class="leaderboard__profiles" style={{"max-height":"500px","overflow-y": "scroll", "overflow-x":"hidden"}}>
            
                {this.renderTabs()}
            </div>
          </article>
        );
    }
}




