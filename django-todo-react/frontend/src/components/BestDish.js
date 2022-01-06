import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'reactstrap';
import '../css/bestDish.css';
import axios from 'axios';

const images = require.context('../../../backend/db_images/dishes', true);

//I'm feeling lucky feature
export default class BestDish extends Component {

    constructor(props) {
        super(props);
        this.state = {
          fullDishes:[],
          dishIndex:0,
          restList:[],
          recieve:false,
        };
      }

    loadImage = (dishname) => (images(`./${dishname+".jpg"}`).default);

    componentDidMount(){
            this.getDishes();
            this.props.changeKey();
    }

    getDishes = () =>{
        if(this.props.dishes!=undefined && this.props.dishRatings!=undefined){
            for (var dish in this.props.dishes){
            if(dish!=null){
                axios
                .get("/api/dishbyid/",{params:{dishid:this.props.dishes[dish]}})
                .then((res) => {
                    axios
                        .get("/api/restselective/",{params:{restaurantid:res.data[0]["restaurantid"]}})
                        .then((response)=>{
                            this.setState({fullDishes:[...this.state.fullDishes, res.data[0]],restList:[...this.state.restList, response.data[0]]})
                        })
                        .catch((err) => console.log(err));
                        
                })
            .catch((err) => console.log(err));
            }
            
        } 
    }
}



    goToRest = () =>{
        window.open("/"+this.state.restList[this.state.dishIndex]["restaurantaddress"],"_self");
    }

    chooseDish = () =>{
        this.setState({dishIndex:(this.state.dishIndex+1)%(3)});
    }

    closeModal = (e) => {
        if (e.target.id == "modal") {
            this.setState({show:false})
        }
    }


    
    render() {
        if(this.props.show && this.props.dishes!=undefined && this.props.dishRatings!=undefined &&
             this.state.fullDishes!=undefined && this.state.fullDishes.length>this.state.dishIndex &&
             this.state.restList!=undefined && this.state.restList.length>this.state.dishIndex){
        return (
            <div className="Modal" style={{"position":"fixed","top":"50%","right":"45%","zIndex":"100"}}>
                {/*<label className="modal__label" id="modal__checkbox">FEELING LUCKY?</label>*/}
                <input className="modal__checkbox" id="modal__checkbox" type="checkbox"/>
                <div className="modal__window">
                    <div className="modal__content" style={{"text-align":"-webkit-center", "width":"400px"}}>
                    <button type="button" className="modal__restbtn" onClick={this.props.closeFunc} style={{"position": 'relative', "left":"175px", "padding": "16px", "width":"30px", "height":"30px", "background-color":"red", "margin-top":"5px"}}>x</button>
                        <label className="modal__close-icon" id="modal__checkbox">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                        </svg></label>
                        <input className="modal__checkbox" id="modal__checkbox" type="checkbox"/>
                        <img id="dishpic" src={this.loadImage(this.state.fullDishes[this.state.dishIndex]["dishaddress"])} />
                        <h3 className="modal__title" id="dishname">{this.state.fullDishes[this.state.dishIndex]["nameofdish"]}</h3>
                        <h5 className="modal__title" id="dishscore">Friends Rating: {Math.round(this.props.dishRatings[this.state.dishIndex] * 100) / 100}/5</h5>
                        <p id="dish exp">{this.state.fullDishes[this.state.dishIndex]["explaindish"]}</p>
                        <div id="modal" onClick={(e) => this.closeModal(e)}></div>
                        <button type="button" className="modal__restbtn"style={{"background-color":"green","margin-bottom":"5px"}}  onClick={this.goToRest}>Go To Restaurant!</button>
                        <button type="button" className="modal__restbtn" onClick={this.chooseDish} style={{"width":"150px", "height":"50px"}}>Try Again</button>
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

