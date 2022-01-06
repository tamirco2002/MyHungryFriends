import React, { Component } from "react";
import MenuBox from "./MenuBox";



const images = require.context('../../../backend/db_images/restaurants', true);

// The restaurants section at the home page
export default class HomeMenu extends Component {
  
    
    loadImage = (imageName) => (images(`./${imageName +".jpg"}`).default);

    render(){
        return(
            <div className="homemenu-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="heading-title text-center">
                                    <h2>{this.props.title}</h2>
                                    <p>{this.props.subtitle}</p>
                                </div>
                            </div>
                        </div>
        
                        <div className="row inner-menu-box" style={{"justifyContent":"center"}}>
                            <div className="col-9" style={{}}>
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <div className="row">
                                        {this.props.Boxes.map((element) => {    
                                              
                                            return (
                                            <MenuBox image={this.loadImage(element["restaurantaddress"])} address={"/"+element["restaurantaddress"]}
                                             name={element["restaurantname"]} id={element["restaurantid"]} friendsList={this.props.friendsList} userid={this.props.userid}/>) 
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}
