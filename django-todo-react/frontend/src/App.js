import React, { Component } from "react";
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import axios from 'axios';

//Components Imports
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import NavBar from './components/NavBar';
import Restaurant from './components/Restaurant';
import OrderPage from "./components/OrderPage";
import Team from "./components/Team";
import Friends from "./components/Friends";
import BestDish from "./components/BestDish";
import Contact from "./components/Contact";

//CSS Imports
import './css/login.css'
import './css/animate.css';
import './css/baguetteBox.min.css';
import './css/bootstrap.min.css';
import './css/classic.css';
import './css/classic.date.css';
import './css/classic.time.css';
import './css/custom.css';
import './css/font-awesome.min.css';
import './css/responsive.css';
import './css/style.css';
import './css/superslides.css';
import './css/login.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state= JSON.parse(window.localStorage.getItem('state')) ||
    {
        user:"NULL",
        userid:-1,
        restList: [],
        friendsList:[],
        dishRatings:[],
        bestThree:[],
        bestRatings:[],
        showModal:false,
        stars:{}

    }
  }
  componentDidMount() {
    this.refreshList(this.state.user);
    this.getFriends(this.state.userid);
  }

  refreshList = (username) => {
    axios
      .get("/api/restaurants/")
      .then((res) => this.setState({stars:this.state.stars, restList:res.data, user:username,userid:this.state.userid,
         friendsList:this.state.friendsList,dishRatings:this.state.dishRatings,bestThree:this.state.bestThree,showModal: this.state.showModal,bestRatings:this.state.bestRatings}))
      .catch((err) => console.log(err));
  };

  getFriends = (userid) => {
    axios
      .get("/api/friends/",{params: {userid:userid}})
      .then((res) => {
        this.setState({stars:this.state.stars, restList:this.state.restList, user:this.state.user, userid:this.state.userid,
         friendsList: res.data[0],dishRatings:this.state.dishRatings,bestThree:this.state.bestThree,showModal: this.state.showModal,bestRatings:this.state.bestRatings})
         this.dishAvgScore(res.data[0]);
        })
      .catch((err) => console.log(err));
  };
  

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  userChange = (userName,userid) => {
    
    this.refreshList(userName);
    
    this.setState({stars:this.state.stars, user:userName,restList:this.state.restList,userid:userid,friendsList:this.state.friendsList,bestThree:this.state.bestThree,showModal: this.state.showModal,bestRatings:this.state.bestRatings});
    
    
  };
  signOut=()=>{
    this.setState({stars:{}, user:"NULL",restList:[],userid:-1,friendsList:[],dishRatings:[],bestThree:[],showModal: false,bestRatings:[]});
  }


  dishAvgScore = (friendsList) => {
    //dishid: [sum of all ratings, amount of ratings, average]
    var DishScores = {};
    for(var friend in friendsList){
      
      if(friendsList[friend]!=null && friendsList[friend]!=this.state.userid){
          axios
          .get("/api/userorders/",{params:{userid:friendsList[friend]}})
          .then((res) => {
            for (var i = 0; i < res.data.length; i++){
              
                if(!(res.data[i]["dishid"] in DishScores)){
                  DishScores[res.data[i]["dishid"]]=[res.data[i]["foodrating"],1,res.data[i]["foodrating"]];
                }
                else{
                  DishScores[res.data[i]["dishid"]]=[DishScores[res.data[i]["dishid"]][0]+res.data[i]["foodrating"],
                  DishScores[res.data[i]["dishid"]][1]+1,(DishScores[res.data[i]["dishid"]][0]+res.data[i]["foodrating"])/(DishScores[res.data[i]["dishid"]][1]+1)];

                }
          }
          this.setState({stars:this.state.stars, dishRatings: DishScores,bestRatings:this.state.bestRatings,
            restList:this.state.restList, user:this.state.user, userid:this.state.userid, friendsList: this.state.friendsList,bestThree:this.state.bestThree,showModal: this.state.showModal})
          this.best3Dishes(DishScores);
          })
        .catch((err) => console.log(err));
      }
    }
  

    
    }
    
  best3Dishes = (dishRatings) =>{
    var maxs =[0,0,0];
    var dishes =[null,null,null];
    var bestRate =[null,null,null];
    for(let i=0; i<3;i++){
      for(var dish in dishRatings){
        if(dish!=dishes[0]&&dish!=dishes[1]&&dish!=dishes[2]){
          if(i==0 || (i==1 && dishRatings[dish][2]<=maxs[0]) || (i==2 && (dishRatings[dish][2]<=maxs[0] && dishRatings[dish][2]<=maxs[1]))){
            if(dishRatings[dish][2]>maxs[i]){
              maxs[i]=dishRatings[dish][2];
              dishes[i]=dish;
              bestRate[i]=dishRatings[dish][2]
            }
          }
          
        }
        }
        
      
      }
      this.setState({stars:this.state.stars, bestThree:dishes,bestRatings:bestRate,
        restList:this.state.restList, user:this.state.user, userid:this.state.userid, friendsList: this.state.friendsList,dishRatings: this.state.dishRatings,showModal: this.state.showModal})
  }

  
    
  modalClick = () =>{
    this.setState({stars:this.state.stars, showModal: !this.state.showModal,bestThree:this.state.bestThree,bestRatings:this.state.bestRatings,
      restList:this.state.restList, user:this.state.user, userid:this.state.userid, friendsList: this.state.friendsList,dishRatings: this.state.dishRatings})
	}

  starsClick = (color, id) =>{
      if (color == "#ffe135") {
        this.state.stars[id] = "on";
      }
      else {
        delete this.state.stars[id];
      }
      this.setState({stars:this.state.stars, showModal: this.state.showModal,bestThree:this.state.bestThree,bestRatings:this.state.bestRatings,
      restList:this.state.restList, user:this.state.user, userid:this.state.userid, friendsList: this.state.friendsList,dishRatings: this.state.dishRatings})

	}
  bestdishKey=1;

  changeKey= ()=>{
    this.bestdishKey++;
  }


  render() {
    //localStorage.removeItem("state");

      //if you are signed-out
      if(this.state.user=="NULL"){
        return(

        <Router>
          <div>
            <NavBar userName={this.state.user}/>
          </div>
          
          <Routes>
              <Route exact path="/" element={<Login userChange={this.userChange}/>}/>
          </Routes>
        </Router>
      );}
      
      //if you are signed-in
      else{
        
        return(
          
        <Router>
          <div>
              <NavBar userName={this.state.user} signOut={this.signOut} modalClick={this.modalClick}/>
          </div>

          <Routes>
            <Route exact path="/" element={<Homepage friendsList={this.state.friendsList} userid={this.state.userid}/>}/>  
            <Route path={"/"+this.state.restList[0]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[0]["restaurantaddress"]} id={this.state.restList[0]["restaurantid"]} name={this.state.restList[0]["restaurantname"]} subtitle={this.state.restList[0]["restaurantabout"]}/>}/>
            <Route path={"/"+this.state.restList[1]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[1]["restaurantaddress"]} id={this.state.restList[1]["restaurantid"]} name={this.state.restList[1]["restaurantname"]} subtitle={this.state.restList[1]["restaurantabout"]}/>}/>
            <Route path={"/"+this.state.restList[2]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[2]["restaurantaddress"]} id={this.state.restList[2]["restaurantid"]} name={this.state.restList[2]["restaurantname"]} subtitle={this.state.restList[2]["restaurantabout"]}/>}/>
            <Route path={"/"+this.state.restList[3]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[3]["restaurantaddress"]} id={this.state.restList[3]["restaurantid"]} name={this.state.restList[3]["restaurantname"]} subtitle={this.state.restList[3]["restaurantabout"]}/>}/>
            <Route path={"/"+this.state.restList[4]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[4]["restaurantaddress"]} id={this.state.restList[4]["restaurantid"]} name={this.state.restList[4]["restaurantname"]} subtitle={this.state.restList[4]["restaurantabout"]}/>}/>
            <Route path={"/"+this.state.restList[5]["restaurantaddress"]} element={<Restaurant userid={this.state.userid} friendsList={this.state.friendsList} address={this.state.restList[5]["restaurantaddress"]} id={this.state.restList[5]["restaurantid"]} name={this.state.restList[5]["restaurantname"]} subtitle={this.state.restList[5]["restaurantabout"]}/>}/>
            <Route exact path="team" element={<Team/>}/>
            <Route exact path="/friends" element={<Friends userid={this.state.userid} friendsList={this.state.friendsList} stars={this.state.stars} starsClick={this.starsClick}/>}/>
            <Route exact path="/orders" element={<OrderPage userid={this.state.userid}/>}/>
          </Routes>

          <BestDish key={this.bestdishKey} show={this.state.showModal} closeFunc={this.modalClick} dishes={this.state.bestThree} dishRatings={this.state.bestRatings} changeKey={this.changeKey} />
          <Contact/>

        </Router>
      );
  }  
      
    
  }
}

export default App;