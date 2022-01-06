import React, { Component } from "react";
import FriendImages from "./FriendImages";
import axios from 'axios';

const images = require.context('../../../backend/db_images/users', true);


// Friends Page
export default class Friends extends Component {
    constructor(props){
        super(props);
        this.state={
            orders: [],
            friendsData: [],
            names: {},
            friendReviews: []
        };
    }

    componentDidMount(){
        this.getNames();
    }


    getNames = async () =>{
        var namesDict={};
        axios
        .get("/api/userselective/")
        .then(async (res) => {
            for (var friend in this.props.friendsList) {
                if(this.props.friendsList[friend]!=null && this.props.friendsList[friend]!=this.props.userid){
                    var ind = this.props.friendsList[friend];
                    await this.getFriendsReviews(ind);
                    await this.getRestaurantAndDish();
                    namesDict[ind]=[res.data[ind - 1]["username"],res.data[ind - 1]["fullname"], this.state.friendReviews];
                }
            }
            this.setState({names:namesDict}, this.makeFriendsList);
        })
        .catch((err) => console.log(err));
    }


    getFriendsReviews = async (user) =>{
        await axios
        .get("/api/userorders/", {params:{userid:user}})
        .then(async (res) =>{
            await this.setState({orders:res.data, friendsData:this.state.friendsData, names:this.state.names, friendReviews:this.state.friendReviews});
        })
        return;
    }


    getRestaurantAndDish = async () =>{
        var reviews = [];
        if (this.state.orders != undefined) {
            for (var [key, order] of Object.entries(this.state.orders)) {
                await axios.all([await axios
                .get("/api/restselective/", {params:{restaurantid:order["restaurantid"]}}),
                await axios.get("/api/dishbyid/", {params:{dishid:order["dishid"]}})])
                .then(axios.spread(async(...responses) =>{
                    var resRest = responses[0];
                    var resDish = responses[1];
                    reviews.push([resRest.data[0]["restaurantname"], resDish.data[0]["nameofdish"], order["foodrating"], order["servicerating"],
                    order["deliveryrating"], order["messagereco"], resDish.data[0]["dishaddress"]]);}
                ))
            }
        }
        await this.setState({friendReviews:reviews, orders:this.state.orders, friendsData:this.state.friendsData, names:this.state.names});
        return;
    }


    loadImage = (imagename) => (images(`./${imagename+".png"}`).default);

    makeFriendsList = () => {
        var friendsListTmp=[];
        for (var id in this.state.names) {
            friendsListTmp.push([this.state.names[id][1], this.loadImage(this.state.names[id][0]), this.state.names[id][2]]);
        }
        this.setState({friendsData:friendsListTmp});
    }



    render(){
        if (this.state.names != undefined && this.state.names != {}) {
            return(
                <div className="stuff-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="heading-title text-center">
                                    <h2>My Friends</h2>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="row" style={{"justify-content": "center"}}>
                                {Object.keys(this.state.names).map((id) => (
                                    <FriendImages id={id} username={this.state.names[id][0]} name={this.state.names[id][1]} reviews={this.state.names[id][2]}
                                    stars={this.props.stars} starsClick={this.props.starsClick}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(<span></span>);
        }
    }
}