import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import axios from 'axios';

const images = require.context('../../../backend/db_images/users', true);

// restaurant's box for the main menu
export default class MenuBox extends Component {

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
            recieved:false,
        }
    }

    imageClick(){
        <Link to={this.props.name}/>
    }
    componentDidMount(){
        this.totalAvg();

    }
    
    loadImage = (uname) => (images(`./${uname+".png"}`).default);

    componentDidUpdate(){
        
        if(!this.state.recieved && this.props.friendsList!=undefined){
            this.friendsAvg();
            this.setState({recieved:true});
        }
        
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
        //this.calcAvg(this.state.friendSum,this.state.friendCnt);
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
    this.setState({friendsReviews:reviews, friendsRatings:ratings});
    this.getNames(reviews);
    
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
    cnt=0;
    resetCnt(){
        this.cnt=0;
    }

    render(){
        
        return(
            
            <div className="col-lg-4 col-md-6 special-grid drinks">
                <div className="gallery-single fix">
                <Link className="lightbox" onClick={()=> window.open(this.props.address,"_self")}  to="/" target="_self" rel="noopener noreferrer" >
                    <img src={this.props.image} className="img-fluid" alt="Image"/>
                    
                    <div className="why-text">
                        <h4>{this.props.name}</h4>
                        

                        <p>this is how your friends rated it:</p>
                        {(this.state.friendDelivery[2]+this.state.friendFood[2]+this.state.friendService[2]>0) ? (
                                 <h5>Average Rating: {Math.round(((this.state.friendDelivery[2]+this.state.friendFood[2]+this.state.friendService[2])/3) * 100) / 100}/5</h5>
                                ) : (
                                    <h5>Not Rated Yet</h5>
                         )}
                          
                        {   
                            Object.values(this.state.names).map((user)=> {
                                if(this.cnt<5){
                                    this.cnt++;
                                    return(
                                        <img src={this.loadImage(user[1][1])} style={{"borderRadius":"50%","width":"45px","height":"45px" ,"margin-right":"4px", "margin-bottom":"6px"} } />
                                        
                                    )
                                }
                                else{
                                    return(<div/>)
                                }
                            }) 
                            
                        }
                        {this.resetCnt()}
                    </div>
                    </Link>
                </div>
            </div>
            
        );
    }
}