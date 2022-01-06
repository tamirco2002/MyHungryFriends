import React, { Component } from "react";
import Dish from "./Dish";
import axios from "axios";
import Rate from "./Rate";
import OrderList from "./OrderList";
const images = require.context('../../../backend/db_images/dishes', true);

// menu section for the restaurants pages
export default class Menu extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          dishList: [],
          toggle:false,
          chosenDish:0,
        };
      }
      
      componentDidMount() {
        this.refreshList();
      }
    
      refreshList = () => {
        axios
          .get("/api/dishes/", {params:{restaurantid:this.props.id}})
          .then((res) => this.setState({ dishList: res.data }))
          .catch((err) => console.log(err));
      };

      Order=(event) =>{
        if(this.state.chosenDish!=0){
            this.setState({toggle:!this.state.toggle})
        }
    }

    chooseDish = (dishid) =>{
        this.setState({chosenDish:dishid});
    }
    

    loadImage = (dishname) => (images(`./${dishname+".jpg"}`).default);


    render(){
        if(!this.state.toggle){
            return(
                <div className="menu-box">
                    <h2 style={{"font-size": "40px","margin-top": "-3%","margin-bottom": "-3%","margin-left": "61%"}}>Dishes</h2>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="heading-title text-center">
                                        <h2>{this.props.title}</h2>
                                        <p>{this.props.subtitle}</p>
                                    </div>
                                </div>
                            </div>
            
                            <div className="row inner-menu-box">
                                <div className="col-3">
                                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <OrderList friendsRating={this.props.friendsRatings} names={this.props.friendsNames}/>
                                    </div>
                                </div>
                                
                                <div className="col-9">
                                
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div className="row" style={{"justify-content": "center"}}>
                                            {this.state.dishList.map((element) => {      
                                                return (<Dish image={this.loadImage(element['dishaddress'])} id={element['dishid']} chosenDishId={this.state.chosenDish} name={element['nameofdish']} description={element['explaindish']} ingredients={element['ingredients']} price={element['price']} chooseDish={this.chooseDish}/>) 
                                                })
                                            }
                                            
                                        </div>
                                        <br/><br/>
                                        <button className="order-btn" role="button" onClick={()=>this.Order()}>Place Order</button>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                        <Rate restaurantid={this.props.id} restaurant={this.props.name} text="write something..." userid={this.props.userid} dishid={this.state.chosenDish} />
                    </div>
            );
        }
        

    }

}
