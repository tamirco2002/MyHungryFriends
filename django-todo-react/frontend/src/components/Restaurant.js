import React, { Component } from "react";
import AboutSec from "./AboutSec";
import Menu from "./Menu";
import Gallery from './Gallery';
import ReviewBox from "./ReviewBox";
import axios from "axios";


const images = require.context('../../../backend/db_images/restaurants/covers', true);
const images2 = require.context('../../../backend/db_images/restaurants', true);
const images3 = require.context('../../../backend/db_images/restaurants/addition', true);

// Restaurant's page
export default class Restaurant extends Component {
    constructor(props){
        super(props);
        //[sum of all ratings, amount of ratings, average]
        this.state={
            friendFood:[0,0,0],
            userFood:[0,0,0],
            friendService:[0,0,0],
            userService:[0,0,0],
            friendDelivery:[0,0,0],
            userDelivery:[0,0,0],
            friendsOrders:[],
            friendsReviews:[],
            friendsRatings:[],
            names:{},
            
        }
    }

    loadImage = (imagename) => (images(`./${imagename+".jpg"}`).default);
    loadImage2 = (imagename) => (images2(`./${imagename+".jpg"}`).default);
    loadImage3 = (imagename) => (images3(`./${imagename+".jpg"}`).default);
    
    componentDidMount(){
        this.friendsAvg();
        this.totalAvg();
    }

    friendsAvg = () => {
        var Orders=[];
        for(var friend in this.props.friendsList){
            if(this.props.friendsList[friend]!=null && this.props.friendsList[friend]!=this.props.userid){
            axios
          .get("/api/restaurantordersfriends/",{params:{userid:this.props.friendsList[friend], restaurantid:this.props.id}})
          .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                Orders.push(res.data[i])
                this.setState({friendFood:[this.state.friendFood[0] + res.data[i]["foodrating"],
                    this.state.friendFood[1]+1,
                   ((this.state.friendFood[0] + res.data[i]["foodrating"]) / (this.state.friendFood[1]+1))]})
                
                this.setState({friendService:[this.state.friendService[0] + res.data[i]["servicerating"],
                        this.state.friendService[1]+1,
                       ((this.state.friendService[0] + res.data[i]["servicerating"]) / (this.state.friendService[1]+1))]})
                
                this.setState({friendDelivery:[this.state.friendDelivery[0] + res.data[i]["deliveryrating"],
                        this.state.friendDelivery[1]+1,
                       ((this.state.friendDelivery[0] + res.data[i]["deliveryrating"]) / (this.state.friendDelivery[1]+1))]})
                    }
                
                    this.setState({friendsOrders:Orders});   
                    this.getFriendsReviews(Orders);  
            }
          )
          .catch((err) => console.log(err));
        }
        }
      };

      totalAvg = () => {
        axios
          .get("/api/restaurantorders/",{params:{restaurantid:this.props.id}})
          .then((res) => {

            for (var i = 0; i < res.data.length; i++) {


                this.setState({userFood:[this.state.userFood[0] + res.data[i]["foodrating"],
                    this.state.userFood[1]+1,
                   ((this.state.userFood[0] + res.data[i]["foodrating"]) / (this.state.userFood[1]+1))]})


                    this.setState({userService:[this.state.userService[0] + res.data[i]["servicerating"],
                        this.state.userService[1]+1,
                       ((this.state.userService[0] + res.data[i]["servicerating"]) / (this.state.userService[1]+1))]})
                    

                    this.setState({userDelivery:[this.state.userDelivery[0] + res.data[i]["deliveryrating"],
                        this.state.userDelivery[1]+1,
                       ((this.state.userDelivery[0] + res.data[i]["deliveryrating"]) / (this.state.userDelivery[1]+1))]})

                    
            }
          })
          .catch((err) => console.log(err));
        }
        
    getFriendsReviews =(Orders) =>{
        var reviews = {};
        var ratings ={};
        for (var i = 0; i < Orders.length; i++) {
            ratings[Orders[i]["userid"]]=[Orders[i]["foodrating"],Orders[i]["servicerating"],Orders[i]["deliveryrating"]];
            reviews[Orders[i]["userid"]]=Orders[i]["messagereco"];
    }
    this.getNames(reviews);
    this.setState({friendsReviews:reviews, friendsRatings:ratings});
}

getNames = (reviews) =>{
    var namesDict={};
    Object.entries(reviews).map( ([user, review]) => {
        axios
        .get("/api/usersid/", {params:{userid:user}})
        .then((res) =>{
            namesDict[user]=[res.data[0]["fullname"],res.data[0]["username"]];
            this.setState({names:Object.entries(namesDict)});
            
        } )
        .catch((err) => console.log(err));}
    )
    
}


    render(){
        return(
            <><AboutSec title={this.props.name}
                subTitle={this.props.subtitle}
                firstPar={this.props.par1}
                secondPar={this.props.par2}
                btnLink={this.props.name}
                btnTxt="Order Now"
                image={this.loadImage2(this.props.address)}
                bgImg={this.loadImage(this.props.address)} 
                friendsRate={Math.round(((this.state.friendDelivery[2]+this.state.friendFood[2]+this.state.friendService[2])/3) * 100) / 100}
                overallRate={Math.round(((this.state.userDelivery[2]+this.state.userFood[2]+this.state.userService[2])/3) * 100) / 100}/>
                
                <Menu id={this.props.id}  name={this.props.name} address={this.props.address} userid={this.props.userid} friendsRatings={this.state.friendsRatings} friendsNames={this.state.names}/>
                
                <Gallery Images={[this.loadImage3(this.props.address+"1"),this.loadImage3(this.props.address+"2"),
                this.loadImage3(this.props.address+"3"),this.loadImage3(this.props.address+"4"),
                this.loadImage3(this.props.address+"5"),this.loadImage3(this.props.address+"6")]} />
                
                <ReviewBox reviewList={this.state.friendsReviews} names={this.state.names} restname={this.props.name} />
                
                </>


        );
    }
}