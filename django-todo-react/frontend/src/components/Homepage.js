import React, { Component } from "react";
import AboutSec from "./AboutSec";
import QtBox from "./QtBox";
import HomeMenu from "./HomeMenu";
import axios from 'axios';



const images = require.context('../../../backend/db_images', true);

//The homepage of the website
export default class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          restList: [],
          
        };
      }
    
      componentDidMount() {
        this.refreshList();
      }
    
      refreshList = () => {
        axios
          .get("/api/restaurants/")
          .then((res) => this.setState({ restList: res.data }))
          .catch((err) => console.log(err));
      };

      

    aboutImg =images(`./${"about-img.jpg"}`).default
    aboutBg =images(`./${"about-bg.jpg"}`).default


    render(){
      
        return(
            <body>
              <AboutSec title="Welcome To "
                  spanTitle="My Hungry Friends"
                  subTitle="Little Story"
                  firstPar="This website allows you to get recomendations from your friends about delicious meals in restaurants around you."
                  secondPar="Enjoy the opportunity to visit our restaurants and share your thoughts with your friends!"
                  btnLink="/"
                  btnTxt="Yalla Food"
                  image={this.aboutImg} 
                  bgImg={this.aboutBg}/>
              <QtBox/> 
              <HomeMenu Boxes={this.state.restList} friendsList={this.props.friendsList} userid={this.props.userid}/>
            </body>

            
                    
        );
    }
}